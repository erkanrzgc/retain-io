import { Activity } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Activity className="h-8 w-8 text-indigo-600" />
          <span className="text-2xl font-bold tracking-tight text-slate-900">Retain.io</span>
        </Link>
      </header>

      <main className="flex-1 container mx-auto px-4 md:px-6 py-12 max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Privacy Policy</h1>
          <p className="text-slate-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-6 text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">1. Information We Collect</h2>
              <p>We collect information you provide directly to us when you create an account, connect your Stripe profile, or communicate with us. This includes your name, email address, and payment integration metadata.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">2. How We Use Your Information</h2>
              <p>We use the information we collect to operate and improve our automated dunning services, process transactions, send payment recovery notifications to your customers on your behalf, and provide customer support.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">3. Data Security</h2>
              <p>We implement industry-standard security measures to protect your information. We do not store raw credit card numbers. All sensitive payment processing is handled securely by Stripe.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">4. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:hello@retain.io" className="text-indigo-600 hover:underline">hello@retain.io</a>.</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
