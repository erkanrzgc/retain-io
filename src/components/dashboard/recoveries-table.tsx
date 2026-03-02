"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Mail, Filter } from "lucide-react";

type Recovery = {
  id: string;
  status: string;
  amount: number;
  emailsSent: number;
  createdAt: string;
  customer: { name: string | null; email: string } | null;
};

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

export function RecoveriesTable({ recoveries }: { recoveries: Recovery[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const filtered = recoveries.filter((rec) => {
    const matchesSearch =
      search === "" ||
      rec.customer?.email?.toLowerCase().includes(search.toLowerCase()) ||
      rec.customer?.name?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || rec.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by customer name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          {["ALL", "RECOVERED", "PENDING", "FAILED"].map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(status)}
              className={statusFilter === status ? "bg-indigo-600 hover:bg-indigo-700 text-white" : ""}
            >
              {status === "ALL" ? "All" : status.charAt(0) + status.slice(1).toLowerCase()}
            </Button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed rounded-lg">
          <Filter className="h-10 w-10 text-zinc-300 dark:text-zinc-700 mb-3" />
          <p className="text-sm text-muted-foreground">No recoveries match your filters.</p>
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
              {filtered.map((rec) => (
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
          <div className="text-xs text-muted-foreground mt-3">
            Showing {filtered.length} of {recoveries.length} records
          </div>
        </div>
      )}
    </div>
  );
}
