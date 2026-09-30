"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Bell, Shield, Webhook, Monitor } from "lucide-react";

export default function SettingsPage() {
  return (
    <DashboardLayout title="Settings & Configuration">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 flex flex-col gap-1">
          <Button variant="secondary" className="justify-start shadow-none bg-accent">
            <User className="mr-2 h-4 w-4" />
            Profile & Account
          </Button>
          <Button variant="ghost" className="justify-start text-muted-foreground hover:bg-accent/50">
            <Monitor className="mr-2 h-4 w-4" />
            Appearance
          </Button>
          <Button variant="ghost" className="justify-start text-muted-foreground hover:bg-accent/50">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
          <Button variant="ghost" className="justify-start text-muted-foreground hover:bg-accent/50">
            <Webhook className="mr-2 h-4 w-4" />
            AI & Automations
          </Button>
          <Button variant="ghost" className="justify-start text-muted-foreground hover:bg-accent/50">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </Button>
        </div>

        <div className="flex-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account details and public profile.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input defaultValue="Admin" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input defaultValue="User" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input defaultValue="admin@nexuscrm.demo" type="email" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Company Role</label>
                <Input defaultValue="Super Administrator" disabled />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI & Automation Webhooks</CardTitle>
              <CardDescription>Configure external services like n8n, Make, or Zapier.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Primary Automation Webhook URL (n8n)</label>
                <Input defaultValue="http://localhost:5678/webhook/crm-ai" type="url" />
                <p className="text-xs text-muted-foreground">This webhook is triggered when you use "Analyze with AI".</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Notification Webhook URL (Discord/Slack)</label>
                <Input placeholder="https://..." type="url" />
              </div>
              <Button variant="secondary">Update Endpoints</Button>
            </CardContent>
          </Card>

          <Card className="border-destructive/50 bg-destructive/5 dark:bg-destructive/10">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible and destructive actions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Purge CRM Data</p>
                  <p className="text-xs text-muted-foreground">Permanently delete all mock data and reset the workspace.</p>
                </div>
                <Button variant="destructive">Reset Workspace</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
