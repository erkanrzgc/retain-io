"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

export default function RecoveriesPage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Recoveries</h2>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Active Recovery Campaigns</CardTitle>
          <CardDescription>
            You have no active recovery campaigns at the moment. Connect your Stripe account to start tracking failed payments.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-[400px] text-zinc-500">
          <Activity className="h-16 w-16 mb-4 text-zinc-300" />
          <p>This page will display detailed analytics about your automated dunning emails and the revenue they recover.</p>
        </CardContent>
      </Card>
    </div>
  );
}
