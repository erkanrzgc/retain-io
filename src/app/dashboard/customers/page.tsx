import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, AlertTriangle, UserCheck } from "lucide-react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { CustomersTable } from "@/components/dashboard/customers-table";

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

  // Serialize for client component
  const serializedCustomers = customers.map((c) => ({
    id: c.id,
    name: c.name,
    email: c.email,
    stripeCustomerId: c.stripeCustomerId,
    recoveries: c.recoveries.map((r) => ({ status: r.status, amount: r.amount })),
  }));

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

      {/* Customer Table with Search */}
      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
          <CardDescription>
            Search through customers whose payments have been flagged for recovery.
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
            <CustomersTable customers={serializedCustomers} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
