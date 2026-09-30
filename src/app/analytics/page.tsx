"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalyticsChart } from "@/components/charts/analytics-chart";
import { defaultDashboardMetrics } from "@/config/dashboard";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { Users, Ticket, CheckSquare, Zap, Activity, Filter, BarChart3, Target, PieChart, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCrm } from "@/components/crm/crm-context";

export default function AnalyticsPage() {
  const { metrics, leads } = useCrm();
  const intentData = [
    { name: "CRITICAL", total: leads.filter(l => l.intent === "CRITICAL").length },
    { name: "HIGH", total: leads.filter(l => l.intent === "HIGH").length },
    { name: "MEDIUM", total: leads.filter(l => l.intent === "MEDIUM").length },
    { name: "LOW", total: leads.filter(l => l.intent === "LOW").length },
  ];

  const salespersonData = [
    { name: "Arjun", winRate: 72, workload: 85 },
    { name: "Neha", winRate: 68, workload: 60 },
    { name: "Vikram", winRate: 54, workload: 92 },
    { name: "Sneha", winRate: 81, workload: 45 },
  ];

  const sourceData = [
    { name: "Website", score: 65, conversion: 12 },
    { name: "Referral", score: 82, conversion: 28 },
    { name: "Campaign", score: 45, conversion: 8 },
    { name: "Event", score: 71, conversion: 18 },
  ];

  return (
    <DashboardLayout title="Intelligence Analytics">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-muted-foreground">AI-driven analysis of your entire CRM dataset.</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Last 30 Days
            </Button>
            <Button size="sm">Export Report</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((kpi) => (
            <KpiCard key={kpi.id} {...kpi} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Intent Distribution
              </CardTitle>
              <CardDescription>Breakdown of leads by buying intent</CardDescription>
            </CardHeader>
            <CardContent>
              <AnalyticsChart title="Leads" data={intentData} dataKey="total" xAxisKey="name" type="bar" color="#8b5cf6" height={300} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Salesperson Performance
              </CardTitle>
              <CardDescription>Win rate by assigned salesperson</CardDescription>
            </CardHeader>
            <CardContent>
              <AnalyticsChart title="Win Rate (%)" data={salespersonData} dataKey="winRate" xAxisKey="name" color="#10b981" type="bar" height={300} />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Lead Source Quality
              </CardTitle>
              <CardDescription>Average Lead Score by Origin</CardDescription>
            </CardHeader>
            <CardContent>
              <AnalyticsChart title="Avg Score" data={sourceData} dataKey="score" xAxisKey="name" type="area" color="#f59e0b" height={300} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Salesperson Workload
              </CardTitle>
              <CardDescription>Current active deals / max capacity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {salespersonData.map((rep) => (
                  <div key={rep.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{rep.name}</span>
                      <span className={rep.workload > 80 ? "text-red-600 font-semibold" : "text-green-600 font-semibold"}>
                        {rep.workload}%
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div 
                        className={`h-full ${rep.workload > 80 ? 'bg-red-500' : 'bg-green-500'}`} 
                        style={{ width: `${rep.workload}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
