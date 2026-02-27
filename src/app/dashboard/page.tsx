import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DollarSign, Activity, Users, ArrowUpRight, CheckCircle2 } from 'lucide-react';
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

  // --- Prisma Real Data Queries ---
  // 1. Recovered Revenue (Sum of 'RECOVERED' status)
  const recoveredResult = await prisma.recovery.aggregate({
    _sum: { amount: true },
    where: {
      userId: session.user.id,
      status: 'RECOVERED'
    }
  });
  const recoveredRevenue = (recoveredResult._sum.amount || 0) / 100;

  // 2. Recovery Rate calculation
  const totalRecoveries = await prisma.recovery.count({
     where: { userId: session.user.id }
  });
  const successfulRecoveries = await prisma.recovery.count({
    where: { userId: session.user.id, status: 'RECOVERED' }
  });
  const recoveryRate = totalRecoveries > 0 ? Math.round((successfulRecoveries / totalRecoveries) * 100) : 0;

  // 3. Active Dunning (PENDING recoveries)
  const activeDunning = await prisma.recovery.count({
    where: { userId: session.user.id, status: 'PENDING' }
  });

  // 4. Emails Sent
  const emailsSentResult = await prisma.recovery.aggregate({
    _sum: { emailsSent: true },
    where: { userId: session.user.id }
  });
  const totalEmailsSent = emailsSentResult._sum.emailsSent || 0;

  // 5. Recent Recoveries List
  const recentRecoveries = await prisma.recovery.findMany({
    where: { userId: session.user.id, status: 'RECOVERED' },
    orderBy: { updatedAt: 'desc' },
    take: 5,
    include: { customer: true }
  });
  // -------------------------------

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground">
          Here&apos;s a summary of your automated recovery campaigns.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isStripeConnected ? `${recoveryRate}%` : "—"}</div>
            <p className="text-xs text-muted-foreground">Of all failed payments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Dunning</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isStripeConnected ? activeDunning.toString() : "—"}</div>
            <p className="text-xs text-muted-foreground">Customers in email sequence</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emails Sent</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isStripeConnected ? totalEmailsSent.toString() : "—"}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Recoveries</CardTitle>
            <CardDescription>
              Payments that were successfully recovered.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isStripeConnected ? (
                <div className="text-sm text-muted-foreground py-8 text-center border border-dashed rounded-lg">
                Connect your Stripe account to see recoveries.
              </div>
            ) : recentRecoveries.length === 0 ? (
              <div className="text-sm text-muted-foreground py-8 text-center border border-dashed rounded-lg">
                No recoveries yet. We are actively listening for failed payments.
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
                      <TableCell className="font-medium">
                        {rec.customer?.email}
                      </TableCell>
                      <TableCell>
                         ${(rec.amount / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell className="text-right">
                        {new Date(rec.updatedAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Stripe Integration</CardTitle>
            <CardDescription>
              Manage your connection to Stripe.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {isStripeConnected ? (
                <div className="rounded-md border border-emerald-200 bg-emerald-50 p-6 flex flex-col items-center justify-center text-center">
                  <div className="rounded-full bg-emerald-100 p-3 mb-4">
                    <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-emerald-900 mb-1">Stripe Connected</h3>
                  <p className="text-sm text-emerald-700 mb-4">
                    Account ID: ...{user?.stripeConnectId?.slice(-6)}
                  </p>
                  <Button variant="outline" className="w-full text-emerald-700 hover:text-emerald-800 border-emerald-300 hover:bg-emerald-100 transition-colors">
                    Manage Connection
                  </Button>
                </div>
              ) : (
                <div className="rounded-md border border-dashed border-slate-300 bg-white p-6 flex flex-col items-center justify-center text-center shadow-sm">
                  <div className="rounded-full bg-[#635BFF]/10 p-3 mb-4">
                    <DollarSign className="h-6 w-6 text-[#635BFF]" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2 text-lg">Connect Your Stripe</h3>
                  <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                    We securely connect to your Stripe account to detect failed payments and send smart recovery emails on your behalf.
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
  );
}
