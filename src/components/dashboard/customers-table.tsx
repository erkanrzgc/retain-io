"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Users } from "lucide-react";

type CustomerData = {
  id: string;
  name: string | null;
  email: string;
  stripeCustomerId: string;
  recoveries: { status: string; amount: number }[];
};

export function CustomersTable({ customers }: { customers: CustomerData[] }) {
  const [search, setSearch] = useState("");

  const filtered = customers.filter((c) => {
    if (search === "") return true;
    const q = search.toLowerCase();
    return (
      c.email.toLowerCase().includes(q) ||
      c.name?.toLowerCase().includes(q) ||
      c.stripeCustomerId.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, email, or Stripe ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed rounded-lg">
          <Users className="h-10 w-10 text-zinc-300 dark:text-zinc-700 mb-3" />
          <p className="text-sm text-muted-foreground">
            {search ? "No customers match your search." : "No customers yet."}
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
              {filtered.map((customer) => {
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
          <div className="text-xs text-muted-foreground mt-3">
            Showing {filtered.length} of {customers.length} customers
          </div>
        </div>
      )}
    </div>
  );
}
