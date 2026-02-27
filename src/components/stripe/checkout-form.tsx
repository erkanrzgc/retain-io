"use client";

import { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";

export function CheckoutForm({ amount, currency }: { amount: number, currency: string }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Return URL where the customer should be redirected after the payment
        return_url: `${window.location.origin}/recover/success`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || 'An error occurred with your card.');
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs" as const,
  };

  const displayAmount = (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  });

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="w-full">
      <div className="mb-6 pb-6 border-b border-zinc-200">
        <h2 className="text-xl font-semibold text-zinc-900 mb-2">Update Payment Method</h2>
        <p className="text-zinc-500 text-sm">
          Please provide a valid card to complete your pending payment of <span className="font-semibold text-zinc-800">{displayAmount}</span>.
        </p>
      </div>

      <PaymentElement id="payment-element" options={paymentElementOptions} />
      
      <Button 
        disabled={isLoading || !stripe || !elements} 
        id="submit" 
        className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg"
      >
        <span id="button-text">
          {isLoading ? <div className="spinner h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : `Pay ${displayAmount}`}
        </span>
      </Button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message" className="mt-4 p-4 bg-orange-50 text-orange-800 text-sm rounded-md border border-orange-200">{message}</div>}
    </form>
  );
}
