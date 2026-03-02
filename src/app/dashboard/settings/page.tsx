import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, CreditCard, Shield, LogOut, CheckCircle2, DollarSign, Calendar, Mail } from "lucide-react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
      image: true,
      createdAt: true,
      stripeConnectId: true,
      _count: {
        select: {
          customers: true,
          recoveries: true,
        },
      },
    },
  });

  if (!user) redirect("/login");

  const isStripeConnected = !!user.stripeConnectId;
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account, integrations, and preferences.
        </p>
      </div>

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Profile</CardTitle>
          </div>
          <CardDescription>Your personal account information.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.image ?? ""} alt={user.name ?? "User"} />
              <AvatarFallback className="text-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-lg font-semibold">{user.name || "No name set"}</p>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" />
                  {user.email}
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  Joined {new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  {user._count.customers} customer{user._count.customers !== 1 ? "s" : ""}
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5" />
                  {user._count.recoveries} recover{user._count.recoveries !== 1 ? "ies" : "y"}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stripe Connection */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Stripe Integration</CardTitle>
          </div>
          <CardDescription>Connect your Stripe account to start recovering failed payments.</CardDescription>
        </CardHeader>
        <CardContent>
          {isStripeConnected ? (
            <div className="rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 p-5">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/40 p-2.5">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-emerald-900 dark:text-emerald-100">Connected</h3>
                    <Badge className="bg-emerald-200 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-200 border-0 text-xs">Active</Badge>
                  </div>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300 mb-1">
                    Account ID: <span className="font-mono">...{user.stripeConnectId?.slice(-8)}</span>
                  </p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">
                    Retain.io is actively monitoring your payments for failures.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 p-6 text-center">
              <div className="mx-auto rounded-full bg-indigo-100 dark:bg-indigo-900/30 p-3 w-fit mb-4">
                <DollarSign className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="font-semibold mb-2">No Stripe Account Connected</h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-sm mx-auto">
                Connect your Stripe account to enable automatic failed payment detection and smart recovery emails.
              </p>
              <Link href="/api/stripe/connect">
                <Button className="bg-[#635BFF] hover:bg-[#5851E5] text-white shadow-md transition-all font-medium">
                  Connect with Stripe
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Billing */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Billing</CardTitle>
          </div>
          <CardDescription>Your current plan and payment details.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold">Performance Plan</h3>
                <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border-0 text-xs">Current</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                No monthly fees — you only pay <span className="font-semibold text-foreground">5%</span> of recovered revenue.
              </p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">5%</span>
              <p className="text-xs text-muted-foreground">of recovered</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 dark:border-red-900/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-500" />
            <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
          </div>
          <CardDescription>Irreversible actions for your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-red-200 dark:border-red-900/50 p-4">
            <div>
              <p className="font-medium text-sm">Sign Out</p>
              <p className="text-xs text-muted-foreground">Log out of your current session.</p>
            </div>
            <Link href="/api/auth/signout">
              <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-900 dark:hover:bg-red-900/20">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-red-200 dark:border-red-900/50 p-4">
            <div>
              <p className="font-medium text-sm">Delete Account</p>
              <p className="text-xs text-muted-foreground">Permanently delete your account and all its data.</p>
            </div>
            <Button variant="outline" size="sm" disabled className="text-red-600 border-red-200 dark:text-red-400 dark:border-red-900 opacity-50 cursor-not-allowed">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
