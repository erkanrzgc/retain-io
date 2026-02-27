import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Activity, ArrowRight, ShieldCheck, Zap, DollarSign } from "lucide-react";
import { LampStringToggle } from "@/components/ui/lamp-string-toggle";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <LampStringToggle />
      <header className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Activity className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Retain.io</span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link href="#features" className="hover:text-slate-900 dark:hover:text-slate-50 transition-colors">Features</Link>
          <Link href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</Link>
          <Link href="#testimonials" className="hover:text-slate-900 transition-colors">Wall of Love</Link>
        </nav>
        <div className="flex items-center gap-4 relative z-10">
          <Link href="/login" className="hidden text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 md:block">
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
          <div className="inline-flex items-center rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 text-sm font-medium text-indigo-800 dark:text-indigo-300 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400 mr-2"></span>
            Recovering $10M+ in failed payments
          </div>
          <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-6xl lg:text-7xl mb-6">
            Stop losing money to <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">failed payments.</span>
          </h1>
          <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
            Retain.io connects to your Stripe account, automatically detects failed credit cards, and runs smart email campaigns to recover your revenue before subscriptions cancel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-10">
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg shadow-indigo-200">
                Start Recovering Revenue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base rounded-full border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
              Calculate ROI
            </Button>
          </div>
          
          <div id="features" className="mt-20 scroll-mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl text-left">
            <div className="group flex flex-col items-start p-6 bg-white dark:bg-slate-800/80 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-indigo-100 dark:hover:border-indigo-800 cursor-default">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg mb-4 transition-transform duration-300 group-hover:scale-110">
                <DollarSign className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-50 transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">High ROI</h3>
              <p className="text-slate-600 dark:text-slate-300">You only pay a fraction of the revenue we successfully recover for you.</p>
            </div>
            <div className="group flex flex-col items-start p-6 bg-white dark:bg-slate-800/80 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-indigo-100 dark:hover:border-indigo-800 cursor-default">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg mb-4 transition-transform duration-300 group-hover:scale-110">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-50 transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">1-Click Setup</h3>
              <p className="text-slate-600 dark:text-slate-300">Connect your Stripe account in seconds. We handle the rest automatically.</p>
            </div>
            <div className="group flex flex-col items-start p-6 bg-white dark:bg-slate-800/80 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-indigo-100 dark:hover:border-indigo-800 cursor-default">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-lg mb-4 transition-transform duration-300 group-hover:scale-110">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-50 transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Smart Dunning</h3>
              <p className="text-slate-600 dark:text-slate-300">Optimized retry schedules and personalized emails that your customers actually read.</p>
            </div>
          </div>
          
          <div id="pricing" className="mt-32 scroll-mt-24 w-full max-w-5xl">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-12">Simple, transparent pricing.</h2>
            <div className="bg-white dark:bg-slate-800/80 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row items-center justify-between mx-auto max-w-3xl">
              <div className="text-left mb-6 md:mb-0">
                <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-slate-50">Performance Built</h3>
                <p className="text-slate-600 dark:text-slate-300">No monthly fees. We only win when you win.</p>
              </div>
              <div className="text-center md:text-right">
                <span className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-400">5%</span>
                <span className="text-slate-500 dark:text-slate-400 font-medium ml-2">of recovered revenue</span>
              </div>
            </div>
          </div>

          <div id="testimonials" className="mt-32 scroll-mt-24 w-full max-w-5xl mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-12">Loved by founders.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800/80 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 text-left">
                <div className="flex text-yellow-400 dark:text-yellow-500 mb-4">★★★★★</div>
                <p className="text-slate-700 dark:text-slate-300 italic mb-6">"Retain.io essentially pays for itself. Setting it up took 2 minutes and it recovered $1,200 in our first week alone that would have completely churned out."</p>
                <div className="font-bold text-slate-900 dark:text-slate-50">Sarah J.</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Founder, SaaS Co.</div>
              </div>
              <div className="bg-white dark:bg-slate-800/80 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 text-left">
                <div className="flex text-yellow-400 dark:text-yellow-500 mb-4">★★★★★</div>
                <p className="text-slate-700 dark:text-slate-300 italic mb-6">"The Stripe integration is flawless. We used to do all of this manually and missed so many failed payments. The automated emails look incredibly professional."</p>
                <div className="font-bold text-slate-900 dark:text-slate-50">David M.</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">CTO, Tech Startup</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-12 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center text-slate-500 dark:text-slate-400 text-sm">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Activity className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <span className="font-semibold text-slate-900 dark:text-slate-50">Retain.io</span>
            <span>© {new Date().getFullYear()}. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</Link>
            <Link href="mailto:hello@retain.io" className="hover:text-indigo-600 transition-colors">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

