import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, AlertTriangle, UserCheck } from "lucide-react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function CustomersPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const customers = await prisma.customer.findMany({
    where: { userId: session.user.id },
    include: {
      recoveries: {
        select: { status: true, amount: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const totalCustomers = customers.length;
  const atRiskCustomers = customers.filter(
    (c) => c.recoveries.some((r) => r.status === "PENDING")
  ).length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <p className="text-muted-foreground">
          View all customers who have been flagged by our payment monitoring system.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">Tracked by Retain.io</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{atRiskCustomers}</div>
            <p className="text-xs text-muted-foreground">With pending recoveries</p>
          </CardContent>
        </Card>
      </div>

      {/* Customer Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
          <CardDescription>
            Customers whose payments have been flagged for recovery.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {customers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Users className="h-12 w-12 mb-4 text-zinc-300 dark:text-zinc-700" />
              <h3 className="text-lg font-semibold mb-1">No customers yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                When a customer&apos;s payment fails, they&apos;ll automatically appear here. Connect your Stripe account to get started.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden sm:table-cell">Stripe ID</TableHead>
                    <TableHead>Recoveries</TableHead>
                    <TableHead>Total Value</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => {
                    const totalValue = customer.recoveries.reduce((sum, r) => sum + r.amount, 0) / 100;
                    const hasPending = customer.recoveries.some((r) => r.status === "PENDING");
                    const recoveredCount = customer.recoveries.filter((r) => r.status === "RECOVERED").length;

                    return (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div className="font-medium">{customer.name || "Unknown"}</div>
                          <div className="text-xs text-muted-foreground">{customer.email}</div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <span className="text-xs text-muted-foreground font-mono">
                            ...{customer.stripeCustomerId.slice(-8)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold">{customer.recoveries.length}</span>
                          {recoveredCount > 0 && (
                            <span className="text-xs text-emerald-600 dark:text-emerald-400 ml-1">
                              ({recoveredCount} recovered)
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="font-semibold">
                          ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </TableCell>
                        <TableCell className="text-right">
                          {hasPending ? (
                            <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 hover:bg-amber-100 border-0">
                              At Risk
                            </Badge>
                          ) : (
                            <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 hover:bg-emerald-100 border-0">
                              Healthy
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
