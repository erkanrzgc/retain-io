import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DollarSign, Activity, Users, ArrowUpRight, CheckCircle2, Clock, Mail, TrendingUp, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { stripeConnectId: true }
  });

  const isStripeConnected = !!user?.stripeConnectId;

  const [
    recoveredResult,
    totalRecoveries,
    successfulRecoveries,
    activeDunning,
    failedRecoveries,
    emailsSentResult,
    recentRecoveries,
    recentActivity,
    totalCustomers
  ] = await Promise.all([
    prisma.recovery.aggregate({
      _sum: { amount: true },
      where: { userId: session.user.id, status: 'RECOVERED' }
    }),
    prisma.recovery.count({
      where: { userId: session.user.id }
    }),
    prisma.recovery.count({
      where: { userId: session.user.id, status: 'RECOVERED' }
    }),
    prisma.recovery.count({
      where: { userId: session.user.id, status: 'PENDING' }
    }),
    prisma.recovery.count({
      where: { userId: session.user.id, status: 'FAILED' }
    }),
    prisma.recovery.aggregate({
      _sum: { emailsSent: true },
      where: { userId: session.user.id }
    }),
    prisma.recovery.findMany({
      where: { userId: session.user.id, status: 'RECOVERED' },
      orderBy: { updatedAt: 'desc' },
      take: 5,
      include: { customer: true }
    }),
    prisma.recovery.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: 'desc' },
      take: 8,
      include: { customer: true }
    }),
    prisma.customer.count({
      where: { userId: session.user.id }
    })
  ]);

  const recoveredRevenue = (recoveredResult._sum.amount || 0) / 100;
  const recoveryRate = totalRecoveries > 0 ? Math.round((successfulRecoveries / totalRecoveries) * 100) : 0;
  const totalEmailsSent = emailsSentResult._sum.emailsSent || 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <p className="text-muted-foreground">
            Here&apos;s a summary of your automated recovery campaigns.
          </p>
        </div>
        {!isStripeConnected && (
          <Link href="/api/stripe/connect">
            <Button className="bg-[#635BFF] hover:bg-[#5851E5] text-white shadow-md">
              Connect Stripe to Get Started
            </Button>
          </Link>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recovered Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isStripeConnected ? `$${recoveredRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "—"}
            </div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recovery Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isStripeConnected ? `${recoveryRate}%` : "—"}</div>
            <p className="text-xs text-muted-foreground">Of all failed payments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Dunning</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isStripeConnected ? activeDunning.toString() : "—"}</div>
            <p className="text-xs text-muted-foreground">Customers in email sequence</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emails Sent</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isStripeConnected ? totalEmailsSent.toString() : "—"}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Bar */}
      {isStripeConnected && totalRecoveries > 0 && (
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-muted-foreground">Recovered:</span>
                  <span className="font-semibold">{successfulRecoveries}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-muted-foreground">Pending:</span>
                  <span className="font-semibold">{activeDunning}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-muted-foreground">Failed:</span>
                  <span className="font-semibold">{failedRecoveries}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">Customers:</span>
                  <span className="font-semibold">{totalCustomers}</span>
                </div>
              </div>
              <Link href="/dashboard/recoveries">
                <Button variant="ghost" size="sm" className="text-xs">View All →</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Recoveries Table */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Recoveries</CardTitle>
                <CardDescription>
                  Payments that were successfully recovered.
                </CardDescription>
              </div>
              {recentRecoveries.length > 0 && (
                <Link href="/dashboard/recoveries">
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {!isStripeConnected ? (
              <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed rounded-lg">
                <DollarSign className="h-10 w-10 text-zinc-300 dark:text-zinc-700 mb-3" />
                <p className="text-sm text-muted-foreground mb-4">Connect your Stripe account to see recoveries.</p>
                <Link href="/api/stripe/connect">
                  <Button className="bg-[#635BFF] hover:bg-[#5851E5] text-white text-sm">Connect Stripe</Button>
                </Link>
              </div>
            ) : recentRecoveries.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed rounded-lg">
                <Activity className="h-10 w-10 text-zinc-300 dark:text-zinc-700 mb-3" />
                <p className="text-sm text-muted-foreground">No recoveries yet. We are actively listening for failed payments.</p>
              </div>
            ) : (
               <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentRecoveries.map((rec) => (
                    <TableRow key={rec.id}>
                      <TableCell>
                        <div className="font-medium">{rec.customer?.name || "Unknown"}</div>
                        <div className="text-xs text-muted-foreground">{rec.customer?.email}</div>
                      </TableCell>
                      <TableCell className="font-semibold text-emerald-600 dark:text-emerald-400">
                         +${(rec.amount / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground">
                        {new Date(rec.updatedAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
        
        {/* Activity Feed + Stripe Card */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          {/* Activity Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest events from your recovery campaigns.</CardDescription>
            </CardHeader>
            <CardContent>
              {!isStripeConnected || recentActivity.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Clock className="h-8 w-8 text-zinc-300 dark:text-zinc-700 mb-2" />
                  <p className="text-sm text-muted-foreground">No activity yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentActivity.slice(0, 6).map((item, i) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          item.status === 'RECOVERED' ? 'bg-emerald-100 dark:bg-emerald-900/30' :
                          item.status === 'PENDING' ? 'bg-amber-100 dark:bg-amber-900/30' :
                          'bg-red-100 dark:bg-red-900/30'
                        }`}>
                          {item.status === 'RECOVERED' ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                          ) : item.status === 'PENDING' ? (
                            <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                          )}
                        </div>
                        {i < Math.min(recentActivity.length, 6) - 1 && (
                          <div className="w-px h-full bg-zinc-200 dark:bg-zinc-800 min-h-[16px]"></div>
                        )}
                      </div>
                      <div className="pb-4">
                        <p className="text-sm font-medium">
                          {item.status === 'RECOVERED' ? 'Payment recovered' :
                           item.status === 'PENDING' ? 'Recovery started' : 'Recovery failed'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.customer?.email} — ${(item.amount / 100).toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {new Date(item.updatedAt).toLocaleDateString()} · {item.emailsSent} email{item.emailsSent !== 1 ? 's' : ''} sent
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stripe Connection */}
          <Card>
            <CardHeader>
              <CardTitle>Stripe Integration</CardTitle>
              <CardDescription>
                Manage your connection to Stripe.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {isStripeConnected ? (
                  <div className="rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 p-5 flex flex-col items-center justify-center text-center">
                    <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/40 p-3 mb-3">
                      <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-1">Stripe Connected</h3>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300 mb-3">
                      Account: ...{user?.stripeConnectId?.slice(-6)}
                    </p>
                    <Badge className="bg-emerald-200 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-200 border-0">Active</Badge>
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 p-6 flex flex-col items-center justify-center text-center">
                    <div className="rounded-full bg-[#635BFF]/10 p-3 mb-4">
                      <DollarSign className="h-6 w-6 text-[#635BFF]" />
                    </div>
                    <h3 className="font-semibold mb-2 text-lg">Connect Your Stripe</h3>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                      Securely connect your Stripe account to detect failed payments and send smart recovery emails.
                    </p>
                    <Link href="/api/stripe/connect" className="w-full">
                      <Button className="w-full bg-[#635BFF] hover:bg-[#5851E5] text-white shadow-md shadow-[#635BFF]/20 transition-all font-medium h-11">
                        Connect with Stripe
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
