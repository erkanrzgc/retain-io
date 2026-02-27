import { Activity } from "lucide-react";
import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <header className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Activity className="h-8 w-8 text-indigo-600" />
          <span className="text-2xl font-bold tracking-tight text-zinc-900">Retain.io</span>
        </Link>
      </header>

      <main className="flex-1 container mx-auto px-4 md:px-6 py-12 max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-zinc-100">
          <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 mb-6">Terms of Service</h1>
          <p className="text-zinc-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-6 text-zinc-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-zinc-900 mb-3">1. Acceptance of Terms</h2>
              <p>By accessing or using Retain.io's services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-zinc-900 mb-3">2. Service Description</h2>
              <p>Retain.io provides automated payment recovery and dunning management software that integrates directly with payment processors (such as Stripe). We act as a data processor on your behalf.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-zinc-900 mb-3">3. Billing and Fees</h2>
              <p>Fees are calculated based on the successful revenue recovered by our system. You agree to pay all fees associated with your account in accordance with the pricing terms presented to you at the time of subscription.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 mb-3">4. Limitation of Liability</h2>
              <p>In no event shall Retain.io, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of the service.</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
