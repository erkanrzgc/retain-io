import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Activity, ArrowRight, ShieldCheck, Zap, DollarSign } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Activity className="h-8 w-8 text-indigo-600" />
          <span className="text-2xl font-bold tracking-tight text-slate-900">Retain.io</span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
          <Link href="#features" className="hover:text-slate-900 transition-colors">Features</Link>
          <Link href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</Link>
          <Link href="#testimonials" className="hover:text-slate-900 transition-colors">Wall of Love</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden text-sm font-medium text-slate-600 hover:text-slate-900 md:block">
            Sign In
          </Link>
          <Link href="/dashboard">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 md:px-6 py-24 lg:py-32 flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-800 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2"></span>
            Recovering $10M+ in failed payments
          </div>
          <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl mb-6">
            Stop losing money to <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">failed payments.</span>
          </h1>
          <p className="max-w-2xl text-lg text-slate-600 mb-10 leading-relaxed">
            Retain.io connects to your Stripe account, automatically detects failed credit cards, and runs smart email campaigns to recover your revenue before subscriptions cancel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg shadow-indigo-200">
                Start Recovering Revenue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base rounded-full border-slate-300 text-slate-700">
              Calculate ROI
            </Button>
          </div>
          
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl text-left">
            <div className="flex flex-col items-start p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="p-3 bg-green-100 text-green-700 rounded-lg mb-4">
                <DollarSign className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">High ROI</h3>
              <p className="text-slate-600">You only pay a fraction of the revenue we successfully recover for you.</p>
            </div>
            <div className="flex flex-col items-start p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="p-3 bg-blue-100 text-blue-700 rounded-lg mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">1-Click Setup</h3>
              <p className="text-slate-600">Connect your Stripe account in seconds. We handle the rest automatically.</p>
            </div>
            <div className="flex flex-col items-start p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="p-3 bg-purple-100 text-purple-700 rounded-lg mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Dunning</h3>
              <p className="text-slate-600">Optimized retry schedules and personalized emails that your customers actually read.</p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Activity className="h-5 w-5 text-indigo-600" />
            <span className="font-semibold text-slate-900">Retain.io</span>
            <span>© 2026. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-slate-900">Privacy</Link>
            <Link href="#" className="hover:text-slate-900">Terms</Link>
            <Link href="#" className="hover:text-slate-900">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

