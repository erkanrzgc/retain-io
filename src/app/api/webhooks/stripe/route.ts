import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { sendRecoveryEmail } from '@/lib/email';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

const prisma = new PrismaClient();



export async function POST(req: Request) {
  const bodyText = await req.text();
  const signature = req.headers.get('stripe-signature');

  let event: Stripe.Event;

  try {
    if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Missing stripe webhook secret or signature' }, { status: 400 });
    }
    event = stripe.webhooks.constructEvent(
      bodyText,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error: any) {
    console.error(`Webhook signature verification failed.`, error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // To handle events from connected accounts, we extract the account ID from the event wrapper
  const connectedAccountId = event.account;

  if (!connectedAccountId) {
    console.log('Event did not originate from a connected account. Ignoring.');
    return NextResponse.json({ received: true });
  }

  // Find the Retain.io business owner via their Stripe Connect ID
  const businessOwner = await prisma.user.findUnique({
    where: { stripeConnectId: connectedAccountId }
  });

  if (!businessOwner) {
    console.warn(`No user found for Stripe Connect Account: ${connectedAccountId}`);
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Handle the event
  switch (event.type) {
    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      console.log(`Payment failed for invoice ${invoice.id} belonging to user ${businessOwner.id}`);
      
      if (!invoice.customer || typeof invoice.customer !== 'string') {
        console.error('Invoice missing customer ID');
        break;
      }

      // 1. Ensure the Customer exists in our DB
      let customer = await prisma.customer.findUnique({
        where: { stripeCustomerId: invoice.customer }
      });

      if (!customer) {
        customer = await prisma.customer.create({
          data: {
            stripeCustomerId: invoice.customer,
            email: invoice.customer_email || 'unknown@email.com',
            name: invoice.customer_name || 'Unknown',
            userId: businessOwner.id,
          }
        });
      }

      // 2. Ensure the Recovery record exists 
      // Sometimes Stripe sends multiple failed events for the same invoice on retries
      let recovery = await prisma.recovery.findUnique({
        where: { stripeInvoiceId: invoice.id }
      });

      if (!recovery) {
        recovery = await prisma.recovery.create({
          data: {
            stripeInvoiceId: invoice.id,
            amount: invoice.amount_due,
            currency: invoice.currency,
            userId: businessOwner.id,
            customerId: customer.id,
            status: 'PENDING',
            emailsSent: 0,
            stripePaymentIntentId: typeof (invoice as any).payment_intent === 'string' ? (invoice as any).payment_intent : ((invoice as any).payment_intent && typeof (invoice as any).payment_intent === 'object' && 'id' in (invoice as any).payment_intent ? (invoice as any).payment_intent.id : undefined),
          }
        });
      }

      // 3. Trigger Dunning Email (if not maxed out)
      if (invoice.customer_email && recovery.emailsSent === 0) {
        try {
          // Generate our custom, secure Recovery Link (Phase 3 next step)
          // For now we use the hosted invoice URL as fallback
          const recoveryLink = `${process.env.NEXTAUTH_URL}/recover/${recovery.id}`; 

          await sendRecoveryEmail({
            to: invoice.customer_email,
            customerName: invoice.customer_name || 'Valued Customer',
            amount: invoice.amount_due,
            recoveryLink: recoveryLink, // Use our custom secure portal
            companyName: businessOwner.name || 'Your Service',
          });

          // Mark email as sent
          await prisma.recovery.update({
            where: { id: recovery.id },
            data: { emailsSent: recovery.emailsSent + 1 }
          });

        } catch (e: any) {
          console.error('Failed to send dunning email:', e);
        }
      }
      break;
    }
    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice;
      console.log('Payment succeeded for invoice:', invoice.id);
      
      // If this was a previously failed invoice, mark it as recovered!
      const existingRecovery = await prisma.recovery.findUnique({
        where: { stripeInvoiceId: invoice.id }
      });

      if (existingRecovery && existingRecovery.status === 'PENDING') {
        await prisma.recovery.update({
          where: { id: existingRecovery.id },
          data: { status: 'RECOVERED' }
        });
        console.log(`🎉 Recovery successful for ${invoice.id}! Revenue saved: ${invoice.amount_due}`);
      }
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
