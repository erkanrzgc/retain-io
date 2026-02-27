import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2026-02-25.clover', // Exact version from typings
});

export async function POST(req: Request) {
  try {
    const { recoveryId } = await req.json();

    if (!recoveryId) {
      return NextResponse.json({ error: 'Recovery ID is required' }, { status: 400 });
    }

    const recovery = await prisma.recovery.findUnique({
      where: { id: recoveryId },
      include: {
        user: true, // Needs the stripeConnectId
      }
    });

    if (!recovery) {
      return NextResponse.json({ error: 'Recovery not found' }, { status: 404 });
    }

    if (!recovery.user.stripeConnectId) {
      return NextResponse.json({ error: 'Business owner is not connected to Stripe' }, { status: 400 });
    }

    if (!recovery.stripePaymentIntentId) {
      return NextResponse.json({ error: 'No PaymentIntent associated with this failed invoice' }, { status: 400 });
    }

    // Retrieve the existing PaymentIntent from the connected account
    const paymentIntent = await stripe.paymentIntents.retrieve(
      recovery.stripePaymentIntentId,
      {
        stripeAccount: recovery.user.stripeConnectId,
      }
    );

    if (!paymentIntent.client_secret) {
        return NextResponse.json({ error: 'Failed to retrieve a client secret for payment intent' }, { status: 500 });
    }

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret,
      stripeAccountId: recovery.user.stripeConnectId,
      amount: recovery.amount,
      currency: recovery.currency
    });

  } catch (error: any) {
    console.error('Error in recovery-intent endpoint:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
