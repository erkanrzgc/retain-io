"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, Suspense } from "react";
import { Activity } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";

function LoginContent() {
  const [isLoading, setIsLoading] = useState<false | 'google' | 'github' | 'credentials' | 'email'>(false);
  const [email, setEmail] = useState("");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("from") || "/dashboard";

  const loginWithGoogle = async () => {
    setIsLoading('google');
    try {
      await signIn("google", { callbackUrl });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const loginWithGithub = async () => {
    setIsLoading('github');
    try {
      await signIn("github", { callbackUrl });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const loginWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading('email');
    try {
      await signIn("email", { email, callbackUrl });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-900 transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10 w-full max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <span className="font-bold text-slate-900 dark:text-slate-50">Retain.io</span>
        </Link>
        <div className="mr-12">
          <ModeToggle />
        </div>
      </div>
      
      <div className="w-full max-w-md space-y-8 mt-10">
        <div className="flex flex-col items-center justify-center text-center">
          <Activity className="h-12 w-12 text-indigo-600 dark:text-indigo-400 mb-4" />
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Welcome to Retain.io
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Sign in to your account to recover lost revenue
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Choose a method to access your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <form onSubmit={loginWithEmail} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading !== false}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-slate-900 text-white hover:bg-slate-800"
                disabled={isLoading !== false || !email}
              >
                {isLoading === 'email' ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-slate-400"></div>
                ) : (
                  "Sign in with Email"
                )}
              </Button>
            </form>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={loginWithGoogle}
                disabled={isLoading !== false}
              >
                {isLoading === 'google' ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-slate-800"></div>
                ) : (
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                  >
                    <path
                      fill="currentColor"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    ></path>
                  </svg>
                )}
                Google
              </Button>

              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={loginWithGithub}
                disabled={isLoading !== false}
              >
                {isLoading === 'github' ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-slate-800"></div>
                ) : (
                  <svg 
                    className="h-5 w-5" 
                    fill="currentColor" 
                    viewBox="0 0 24 24" 
                    aria-hidden="true"
                  >
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                )}
                GitHub
              </Button>
            </div>

            <Button
              variant="ghost"
              className="w-full text-slate-500 hover:text-slate-900 text-xs mt-2"
              onClick={() => {
                setIsLoading('credentials');
                signIn("credentials", { callbackUrl }).finally(() => setIsLoading(false));
              }}
              disabled={isLoading !== false}
            >
              Sign in with Demo Account (Dev Only)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>}>
      <LoginContent />
    </Suspense>
  );
}
