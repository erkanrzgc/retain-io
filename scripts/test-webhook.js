const Stripe = require('stripe');

// Load environment variables directly since Next.js env isn't loaded here automatically
require('dotenv').config({ path: './.env' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-02-25.clover',
});

async function run() {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  if (!webhookSecret) {
    console.error("Missing STRIPE_WEBHOOK_SECRET in .env");
    process.exit(1);
  }

  // Find a connected Stripe account from our DB manually or pass it in
  // Let's use the Demo Admin if no argument is passed
  const connectedAccountId = process.argv[2] || "acct_test_dummy"; 

  console.log(`Simulating failed payment for connected account: ${connectedAccountId}...`);

  const mockEvent = {
    id: 'evt_test_failed_payment_123',
    object: 'event',
    api_version: '2025-02-24.acacia',
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
    account: connectedAccountId // CRITICAL: This is a Connect event
  };

  const payloadString = JSON.stringify(mockEvent);
  
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
