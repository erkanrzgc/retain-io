import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2026-02-25.clover',
});

async function run() {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  if (!webhookSecret) {
    console.error("Missing STRIPE_WEBHOOK_SECRET in .env");
    process.exit(1);
  }

  // A mock Connected Account ID that exists in our local dev DB
  // You must update this with an actual connected account ID from your DB if testing
  const connectedAccountId = process.argv[2] || "acct_test"; 

  console.log(`Simulating failed payment for connected account: ${connectedAccountId}...`);

  // Construct a mock event
  const mockEvent = {
    id: 'evt_test_123',
    object: 'event',
    api_version: '2023-10-16',
    created: Math.floor(Date.now() / 1000),
    data: {
      object: {
        id: 'in_test_failed_123',
        object: 'invoice',
        amount_due: 4900, // $49.00
        currency: 'usd',
        customer: 'cus_test_123',
        customer_email: 'testcustomer@retain.io',
        customer_name: 'Test Customer',
        hosted_invoice_url: 'https://pay.stripe.com/invoice/acct_test/test',
        payment_intent: 'pi_test_123',
      }
    },
    livemode: false,
    pending_webhooks: 1,
    request: {
      id: null,
      idempotency_key: null,
    },
    type: 'invoice.payment_failed',
    account: connectedAccountId // CRITICAL: This makes it a Connect event
  };

  const payloadString = JSON.stringify(mockEvent);
  
  // We need to generate a valid signature for the payload 
  // so the Next.js server accepts it
  const signature = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: webhookSecret,
  });

  try {
    const res = await fetch('http://localhost:3000/api/webhooks/stripe', {
      method: 'POST',
      headers: {
        'stripe-signature': signature,
        'Content-Type': 'application/json',
      },
      body: payloadString,
    });

    const data = await res.json();
    console.log(`Server responded with HTTP ${res.status}:`, data);
  } catch (error) {
    console.error("Failed to send webhook request:", error);
  }
}

run();
