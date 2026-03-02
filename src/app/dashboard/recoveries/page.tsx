import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Activity, CheckCircle2, Clock, XCircle, Mail } from "lucide-react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "RECOVERED":
      return <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 hover:bg-emerald-100 border-0">Recovered</Badge>;
    case "PENDING":
      return <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 hover:bg-amber-100 border-0">Pending</Badge>;
    case "FAILED":
      return <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-100 border-0">Failed</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export default async function RecoveriesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const [recoveries, totalCount, recoveredCount, pendingCount, failedCount, totalRecoveredAmount] = await Promise.all([
    prisma.recovery.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      include: { customer: true },
    }),
    prisma.recovery.count({ where: { userId: session.user.id } }),
    prisma.recovery.count({ where: { userId: session.user.id, status: "RECOVERED" } }),
    prisma.recovery.count({ where: { userId: session.user.id, status: "PENDING" } }),
    prisma.recovery.count({ where: { userId: session.user.id, status: "FAILED" } }),
    prisma.recovery.aggregate({
      _sum: { amount: true },
      where: { userId: session.user.id, status: "RECOVERED" },
    }),
  ]);

  const recoveredRevenue = (totalRecoveredAmount._sum.amount || 0) / 100;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Recoveries</h1>
        <p className="text-muted-foreground">
          Track all failed payment recovery attempts and their outcomes.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Attempts</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recovered</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{recoveredCount}</div>
            <p className="text-xs text-muted-foreground">${recoveredRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{pendingCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{failedCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Recovery Attempts</CardTitle>
          <CardDescription>
            A complete log of every failed payment and its current recovery status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recoveries.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Activity className="h-12 w-12 mb-4 text-zinc-300 dark:text-zinc-700" />
              <h3 className="text-lg font-semibold mb-1">No recovery attempts yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Once a customer&apos;s payment fails, it will appear here automatically. Connect your Stripe account to get started.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      <div className="flex items-center gap-1"><Mail className="h-3 w-3" /> Emails</div>
                    </TableHead>
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recoveries.map((rec) => (
                    <TableRow key={rec.id}>
                      <TableCell>
                        <div className="font-medium">{rec.customer?.name || "Unknown"}</div>
                        <div className="text-xs text-muted-foreground">{rec.customer?.email}</div>
                      </TableCell>
                      <TableCell className="font-semibold">
                        ${(rec.amount / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={rec.status} />
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{rec.emailsSent}</TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground">
                        {new Date(rec.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
