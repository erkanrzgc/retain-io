"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "@/components/stripe/checkout-form";

// Note: Stripe requires the public key to initialize
// In a connected account scenario, you still use your platform's public key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function RecoverPage({ params }: { params: { id: string } }) {
  const [clientSecret, setClientSecret] = useState("");
  const [stripeAccountId, setStripeAccountId] = useState("");
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("usd");
  const [error, setError] = useState("");

  useEffect(() => {
    // 1. Fetch the PaymentIntent client secret for this specific recovery ID
    fetch("/api/stripe/recovery-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recoveryId: params.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setClientSecret(data.clientSecret);
          setStripeAccountId(data.stripeAccountId);
          setAmount(data.amount);
          setCurrency(data.currency);
        }
      })
      .catch((err) => {
        setError("Failed to initialize payment interface.");
        console.error(err);
      });
  }, [params.id]);

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
             <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mb-2">Recovery Link Invalid</h1>
          <p className="text-slate-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        {/* Placeholder for the business owner's logo in the future */}
        <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl mx-auto shadow-sm">
          R
        </div>
      </div>
      
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 p-8">
        
        {!clientSecret ? (
          <div className="animate-pulse flex flex-col items-center justify-center py-12">
            <div className="h-6 w-48 bg-slate-200 rounded mb-4"></div>
            <div className="h-4 w-64 bg-slate-200 rounded mb-8"></div>
            <div className="h-12 w-full bg-slate-200 rounded mb-4"></div>
            <div className="h-12 w-full bg-slate-200 rounded"></div>
          </div>
        ) : (
          <Elements 
            stripe={stripePromise} 
            options={{ 
                clientSecret, 
                appearance: { theme: 'stripe' } 
            }}
          >
            <CheckoutForm amount={amount} currency={currency} />
          </Elements>
        )}
        
      </div>
      
      <p className="mt-8 text-sm text-slate-400 flex items-center justify-center gap-1">
        Secured by <span className="font-semibold text-slate-600">Stripe</span>
      </p>
    </div>
  );
}
