import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 p-8 text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful</h1>
        <p className="text-slate-500 mb-8">
          Thank you! Your payment method has been successfully updated and the pending invoice has been paid.
        </p>

        <Link href="/">
          <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">
            Return to Homepage
          </Button>
        </Link>
      </div>
      
      <p className="mt-8 text-sm text-slate-400 flex items-center justify-center gap-1">
        Secured by <span className="font-semibold text-slate-600">Stripe</span>
      </p>
    </div>
  );
}
