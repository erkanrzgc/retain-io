"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function CustomersPage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>At-Risk Customers</CardTitle>
          <CardDescription>
            A list of customers who currently have failed payments and are in the dunning process.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-[400px] text-slate-500">
          <Users className="h-16 w-16 mb-4 text-slate-300" />
          <p>No customers are currently at risk. Your dashboard is clear.</p>
        </CardContent>
      </Card>
    </div>
  );
}
