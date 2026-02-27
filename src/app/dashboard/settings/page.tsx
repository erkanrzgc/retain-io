"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Global Setup</CardTitle>
          <CardDescription>
            Manage your account details and billing.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-[400px] text-zinc-500">
          <Settings className="h-16 w-16 mb-4 text-zinc-300" />
          <p>Settings panel is under construction.</p>
        </CardContent>
      </Card>
    </div>
  );
}
