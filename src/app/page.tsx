import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Activity, ArrowRight, ShieldCheck, Zap, DollarSign, Link2, Mail, BarChart3, Clock, ChevronDown, Globe, Lock, Sparkles } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/options";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300">
      {/* Header */}
      <header className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Activity className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Retain.io</span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-300">
          <Link href="#features" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">How it Works</Link>
          <Link href="#pricing" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">Pricing</Link>
          <Link href="#faq" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">FAQ</Link>
        </nav>
        <div className="flex items-center gap-4 relative z-10">
          <ModeToggle />
          <Link href={session ? "/dashboard" : "/login"}>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 shadow-md transition-all">
              {session ? "Go to Dashboard" : "Sign In"}
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 md:px-6 py-24 lg:py-32 flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 text-sm font-medium text-indigo-800 dark:text-indigo-300 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400 mr-2"></span>
            Recovering $10M+ in failed payments
          </div>
          <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl lg:text-7xl mb-6">
            Stop losing money to <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">failed payments.</span>
          </h1>
          <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-300 mb-10 leading-relaxed">
            Retain.io connects to your Stripe account, automatically detects failed credit cards, and runs smart email campaigns to recover your revenue before subscriptions cancel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-10">
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base bg-indigo-600 hover:bg-indigo-700 text-white rounded-full">
                Start Recovering Revenue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base rounded-full border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                See How it Works
              </Button>
            </Link>
          </div>
        </section>

        {/* Stats Counter */}
        <section className="border-y border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-12">
          <div className="container mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">$10M+</div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Revenue Recovered</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50">2,500+</div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Businesses Served</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50">89%</div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Average Recovery Rate</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50">&lt;2min</div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Setup Time</p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="scroll-mt-24 container mx-auto px-4 md:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">Everything you need to fight churn</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">Our intelligent platform handles the heavy lifting of payment recovery while you focus on growing your business.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="group flex flex-col items-start p-6 bg-white dark:bg-zinc-800/80 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-700 transition-all duration-300 hover:shadow-lg hover:border-indigo-100 dark:hover:border-indigo-800 cursor-default">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg mb-4 transition-transform duration-300 group-hover:scale-110">
                <DollarSign className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-zinc-50 transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">High ROI</h3>
              <p className="text-zinc-600 dark:text-zinc-300">You only pay a fraction of the revenue we successfully recover for you. No monthly fees, ever.</p>
            </div>
            <div className="group flex flex-col items-start p-6 bg-white dark:bg-zinc-800/80 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-700 transition-all duration-300 hover:shadow-lg hover:border-indigo-100 dark:hover:border-indigo-800 cursor-default">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg mb-4 transition-transform duration-300 group-hover:scale-110">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-zinc-50 transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">1-Click Setup</h3>
              <p className="text-zinc-600 dark:text-zinc-300">Connect your Stripe account in seconds. We handle the rest automatically with zero configuration needed.</p>
            </div>
            <div className="group flex flex-col items-start p-6 bg-white dark:bg-zinc-800/80 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-700 transition-all duration-300 hover:shadow-lg hover:border-indigo-100 dark:hover:border-indigo-800 cursor-default">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-lg mb-4 transition-transform duration-300 group-hover:scale-110">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-zinc-50 transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Smart Dunning</h3>
              <p className="text-zinc-600 dark:text-zinc-300">Optimized retry schedules and personalized emails that your customers actually read and act on.</p>
            </div>
            <div className="group flex flex-col items-start p-6 bg-white dark:bg-zinc-800/80 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-700 transition-all duration-300 hover:shadow-lg hover:border-indigo-100 dark:hover:border-indigo-800 cursor-default">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-lg mb-4 transition-transform duration-300 group-hover:scale-110">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-zinc-50 transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Real-Time Analytics</h3>
              <p className="text-zinc-600 dark:text-zinc-300">Track recovery performance with live dashboards. See exactly how much revenue you&apos;re saving.</p>
            </div>
            <div className="group flex flex-col items-start p-6 bg-white dark:bg-zinc-800/80 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-700 transition-all duration-300 hover:shadow-lg hover:border-indigo-100 dark:hover:border-indigo-800 cursor-default">
              <div className="p-3 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 rounded-lg mb-4 transition-transform duration-300 group-hover:scale-110">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-zinc-50 transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Professional Emails</h3>
              <p className="text-zinc-600 dark:text-zinc-300">Beautiful, conversion-optimized recovery emails that match your brand and drive action.</p>
            </div>
            <div className="group flex flex-col items-start p-6 bg-white dark:bg-zinc-800/80 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-700 transition-all duration-300 hover:shadow-lg hover:border-indigo-100 dark:hover:border-indigo-800 cursor-default">
              <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 rounded-lg mb-4 transition-transform duration-300 group-hover:scale-110">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-zinc-50 transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">PCI Compliant</h3>
              <p className="text-zinc-600 dark:text-zinc-300">Stripe Elements handles all sensitive card data. We never see or store your customers&apos; payment info.</p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="scroll-mt-24 bg-white dark:bg-zinc-950 border-y border-zinc-200 dark:border-zinc-800 py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">How it works</h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">Three simple steps to start recovering lost revenue automatically.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="relative flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-2xl font-bold mb-6">1</div>
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-zinc-300 dark:border-zinc-700"></div>
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg mb-4">
                  <Link2 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2">Connect Stripe</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">Link your Stripe account with one click. We use secure OAuth — no API keys needed.</p>
              </div>
              <div className="relative flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-2xl font-bold mb-6">2</div>
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-zinc-300 dark:border-zinc-700"></div>
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg mb-4">
                  <Clock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2">We Monitor 24/7</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">Our webhooks detect failed payments instantly. Smart emails are sent automatically to your customers.</p>
              </div>
              <div className="relative flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-2xl font-bold mb-6">3</div>
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg mb-4">
                  <Sparkles className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2">Revenue Recovered</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">Customers update their cards through a secure portal. Revenue flows back in — automatically.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="container mx-auto px-4 md:px-6 py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">Built for the modern stack</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">Seamless integrations with the tools you already trust.</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 max-w-3xl mx-auto">
            <div className="flex flex-col items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
              <div className="w-14 h-14 rounded-xl bg-[#635BFF]/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-[#635BFF]">S</span>
              </div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Stripe</span>
            </div>
            <div className="flex flex-col items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
              <div className="w-14 h-14 rounded-xl bg-zinc-900/10 dark:bg-white/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">▲</span>
              </div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Vercel</span>
            </div>
            <div className="flex flex-col items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
              <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">R</span>
              </div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Resend</span>
            </div>
            <div className="flex flex-col items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
              <div className="w-14 h-14 rounded-xl bg-sky-500/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-sky-600 dark:text-sky-400">P</span>
              </div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">PostgreSQL</span>
            </div>
            <div className="flex flex-col items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
              <div className="w-14 h-14 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                <Globe className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Next.js</span>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="scroll-mt-24 bg-white dark:bg-zinc-950 border-y border-zinc-200 dark:border-zinc-800 py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">Simple, transparent pricing</h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">No subscriptions. No hidden fees. You only pay when we recover your money.</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-zinc-800/80 dark:to-zinc-800/40 p-8 md:p-12 rounded-3xl shadow-sm border border-indigo-100 dark:border-zinc-700 mx-auto max-w-3xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-left">
                  <div className="inline-flex items-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 px-3 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300 mb-4">Most Popular</div>
                  <h3 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-zinc-50">Performance Plan</h3>
                  <p className="text-zinc-600 dark:text-zinc-300 mb-4">No monthly fees. We only win when you win.</p>
                  <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                    <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-indigo-600 dark:text-indigo-400" /> Unlimited recovery attempts</li>
                    <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-indigo-600 dark:text-indigo-400" /> Smart email campaigns</li>
                    <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-indigo-600 dark:text-indigo-400" /> Real-time analytics dashboard</li>
                    <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-indigo-600 dark:text-indigo-400" /> Secure payment portal</li>
                    <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-indigo-600 dark:text-indigo-400" /> Priority email support</li>
                  </ul>
                </div>
                <div className="text-center shrink-0">
                  <span className="text-6xl font-extrabold text-indigo-600 dark:text-indigo-400">5%</span>
                  <p className="text-zinc-500 dark:text-zinc-400 font-medium mt-1">of recovered revenue</p>
                  <Link href="/dashboard">
                    <Button className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 h-12 text-base">
                      Get Started Free
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="scroll-mt-24 container mx-auto px-4 md:px-6 py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">Loved by founders</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">Join thousands of businesses that already trust Retain.io to protect their revenue.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-zinc-800/80 p-8 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-700 text-left">
              <div className="flex text-yellow-400 dark:text-yellow-500 mb-4">★★★★★</div>
              <p className="text-zinc-700 dark:text-zinc-300 italic mb-6">&quot;Retain.io essentially pays for itself. Setting it up took 2 minutes and it recovered $1,200 in our first week alone.&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-700 dark:text-indigo-400 font-bold">SJ</div>
                <div>
                  <div className="font-bold text-zinc-900 dark:text-zinc-50">Sarah J.</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">Founder, SaaS Co.</div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-800/80 p-8 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-700 text-left">
              <div className="flex text-yellow-400 dark:text-yellow-500 mb-4">★★★★★</div>
              <p className="text-zinc-700 dark:text-zinc-300 italic mb-6">&quot;The Stripe integration is flawless. We used to do all of this manually and missed so many failed payments.&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold">DM</div>
                <div>
                  <div className="font-bold text-zinc-900 dark:text-zinc-50">David M.</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">CTO, Tech Startup</div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-800/80 p-8 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-700 text-left">
              <div className="flex text-yellow-400 dark:text-yellow-500 mb-4">★★★★★</div>
              <p className="text-zinc-700 dark:text-zinc-300 italic mb-6">&quot;We were losing $3K/month to involuntary churn. Retain.io cut that by 80% in the first month. Absolute game-changer.&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-700 dark:text-violet-400 font-bold">AK</div>
                <div>
                  <div className="font-bold text-zinc-900 dark:text-zinc-50">Alex K.</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">CEO, Subscription App</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-24 bg-white dark:bg-zinc-950 border-y border-zinc-200 dark:border-zinc-800 py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">Frequently asked questions</h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">Got questions? We&apos;ve got answers.</p>
            </div>
            <div className="max-w-2xl mx-auto space-y-4">
              <details className="group bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <summary className="flex items-center justify-between cursor-pointer p-5 text-left font-medium text-zinc-900 dark:text-zinc-50">
                  How does Retain.io detect failed payments?
                  <ChevronDown className="h-5 w-5 text-zinc-400 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-5 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  We use Stripe Webhooks to listen for <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-xs">invoice.payment_failed</code> events in real-time. The moment a payment fails, our system is notified instantly and begins the recovery process.
                </div>
              </details>
              <details className="group bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <summary className="flex items-center justify-between cursor-pointer p-5 text-left font-medium text-zinc-900 dark:text-zinc-50">
                  Is my data secure?
                  <ChevronDown className="h-5 w-5 text-zinc-400 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-5 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Absolutely. We use Stripe Connect OAuth for authentication — we never see or store API keys. All card data is handled by Stripe Elements (PCI DSS Level 1 compliant). Your data is encrypted in transit and at rest.
                </div>
              </details>
              <details className="group bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <summary className="flex items-center justify-between cursor-pointer p-5 text-left font-medium text-zinc-900 dark:text-zinc-50">
                  What does the 5% fee cover?
                  <ChevronDown className="h-5 w-5 text-zinc-400 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-5 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  You only pay 5% of the revenue we successfully recover. If a payment isn&apos;t recovered, you pay nothing. There are no monthly fees, setup fees, or hidden charges. We succeed only when you succeed.
                </div>
              </details>
              <details className="group bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <summary className="flex items-center justify-between cursor-pointer p-5 text-left font-medium text-zinc-900 dark:text-zinc-50">
                  Can I customize the recovery emails?
                  <ChevronDown className="h-5 w-5 text-zinc-400 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-5 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  We provide professionally designed email templates optimized for conversion. Custom branding and email templates are on our roadmap for an upcoming release.
                </div>
              </details>
              <details className="group bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <summary className="flex items-center justify-between cursor-pointer p-5 text-left font-medium text-zinc-900 dark:text-zinc-50">
                  How long does setup take?
                  <ChevronDown className="h-5 w-5 text-zinc-400 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-5 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Under 2 minutes. Just sign up, click &quot;Connect with Stripe&quot;, authorize the connection, and you&apos;re done. No code changes, no complex configuration. Recovery starts immediately.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 md:px-6 py-24 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">Ready to stop losing revenue?</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-8">Join 2,500+ businesses that use Retain.io to automatically recover failed payments.</p>
            <Link href="/dashboard">
              <Button size="lg" className="h-14 px-10 text-base bg-indigo-600 hover:bg-indigo-700 text-white rounded-full">
                Start Recovering Revenue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-12 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center text-zinc-500 dark:text-zinc-400 text-sm">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Activity className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <span className="font-semibold text-zinc-900 dark:text-zinc-50">Retain.io</span>
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
