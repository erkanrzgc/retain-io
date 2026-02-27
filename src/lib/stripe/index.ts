import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is missing. Please set the environment variable.');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia', // Latest stable API version as of 2026/02
  appInfo: {
    name: 'Retain.io',
    version: '0.1.0',
  },
} as any); // Casting to any to bypass strict version string checks if SDK definition differs from reality

