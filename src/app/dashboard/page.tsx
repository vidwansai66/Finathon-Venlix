"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { defaultDashboardMetrics } from "@/config/dashboard";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { AnalyticsChart } from "@/components/charts/analytics-chart";
import { useCrm } from "@/components/crm/crm-context";
import { DataTable } from "@/components/crm/data-table";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Target, Briefcase, Bot } from "lucide-react";

export default function DashboardPage() {
  const { leads, metrics, interactions, lastEventResult } = useCrm();
  const chartData = [
    { name: "Jan", expected: 4000, value: 2400 },
    { name: "Feb", expected: 3000, value: 1398 },
    { name: "Mar", expected: 2000, value: 9800 },
    { name: "Apr", expected: 2780, value: 3908 },
    { name: "May", expected: 1890, value: 4800 },
    { name: "Jun", expected: 2390, value: 3800 },
    { name: "Jul", expected: 3490, value: 4300 },
  ];

  const leadColumns = [
    { 
      key: "name", 
      label: "Lead", 
      sortable: true,
      render: (row: any) => (
        <div className="flex flex-col">
          <span className="font-semibold">{row.name}</span>
          <span className="text-xs text-muted-foreground">{row.company}</span>
        </div>
      )
    },
    { 
      key: "score", 
      label: "Score", 
      sortable: true,
      render: (row: any) => (
        <span className={row.score > 80 ? "text-green-600 font-bold" : row.score > 50 ? "text-amber-600 font-bold" : "text-slate-600 font-bold"}>
          {row.score}
        </span>
      )
    },
    { key: "intent", label: "Intent", sortable: true },
    { key: "assignedSalesperson", label: "Assigned", sortable: true },
  ];

  return (
    <DashboardLayout title="Autonomous Command Center">
      <div className="flex flex-col gap-6">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="font-semibold text-lg text-foreground flex items-center gap-2">
               <Zap className="h-5 w-5 text-primary" /> VENLIX Intelligence Engine
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Autonomous CRM that continuously evaluates every lead event to generate intelligent sales decisions.</p>
          </div>
        </div>

        {/* LIVE LEAD INTELLIGENCE PANEL */}
        <div className="rounded-xl border bg-card p-6 shadow-sm border-primary/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
          <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            LIVE EVENT INTELLIGENCE
          </h3>
          
          {lastEventResult ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between">
                 <div>
                   <h4 className="text-xl font-bold">{leads.find(l => l.id === lastEventResult.lead_id)?.name || lastEventResult.lead_id}</h4>
                   <p className="text-muted-foreground">{leads.find(l => l.id === lastEventResult.lead_id)?.company}</p>
                   <Badge variant="outline" className="mt-2 bg-muted">{lastEventResult.event_type.replace(/_/g, ' ').toUpperCase()}</Badge>
                 </div>
                 
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 flex-1 md:ml-12">
                   <div className="flex flex-col">
                     <span className="text-xs text-muted-foreground font-semibold mb-1">SCORE</span>
                     <div className="flex items-center gap-2">
                       <span className="text-muted-foreground line-through">{lastEventResult.previous_score}</span>
                       <ArrowRight className="h-4 w-4" />
                       <span className="font-bold text-xl text-primary">{lastEventResult.new_score}</span>
                     </div>
                     <span className="text-xs text-green-500 font-bold mt-1">+{lastEventResult.score_change}</span>
                   </div>
                   <div className="flex flex-col">
                     <span className="text-xs text-muted-foreground font-semibold mb-1">BUYING INTENT</span>
                     <div className="flex items-center gap-2 font-bold text-lg">
                       {lastEventResult.buying_intent}
                     </div>
                   </div>
                   <div className="flex flex-col">
                     <span className="text-xs text-muted-foreground font-semibold mb-1">PIPELINE</span>
                     <div className="flex items-center gap-2 font-bold text-lg">
                       {lastEventResult.pipeline_stage}
                     </div>
                   </div>
                   <div className="flex flex-col">
                     <span className="text-xs text-muted-foreground font-semibold mb-1">EXPECTED VALUE</span>
                     <div className="flex items-center gap-2 font-bold text-lg">
                       ₹{lastEventResult.expected_deal_value?.toLocaleString('en-IN') || 0}
                     </div>
                   </div>
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                 <div className="space-y-2">
                   <h5 className="text-sm font-bold text-muted-foreground">WHY DID THE SCORE CHANGE?</h5>
                   <p className="text-sm font-medium">{lastEventResult.recommended_action || "Event triggered score recalculation based on lead engagement model."}</p>
                 </div>
                 <div className="space-y-2">
                   <h5 className="text-sm font-bold text-muted-foreground flex items-center gap-1"><Bot className="w-4 h-4"/> AI NEXT BEST ACTION</h5>
                   <div className="bg-primary/10 border border-primary/20 p-3 rounded-md">
                     <p className="text-sm font-semibold text-primary">{lastEventResult.recommended_action}</p>
                     {lastEventResult.task_id && (
                       <p className="text-xs text-muted-foreground mt-1">Task Auto-Assigned: {leads.find(l => l.id === lastEventResult.lead_id)?.assignedSalesperson || 'Arjun'}</p>
                     )}
                   </div>
                 </div>
               </div>
            </div>
          ) : (
            <div className="py-8 text-center border-2 border-dashed rounded-lg border-muted">
              <p className="text-muted-foreground">No recent events processed.</p>
              <p className="text-xs text-muted-foreground mt-1">Use "Simulate Event" to trigger the intelligence flow.</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric) => (
            <KpiCard key={metric.id} {...metric} />
          ))}
        </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AnalyticsChart
          title="Pipeline Value vs Expected"
          description="Pipeline value vs AI expected close value"
          data={chartData}
          dataKey="expected"
          xAxisKey="name"
          type="area"
        />
        <AnalyticsChart
          title="Lead Score Distribution"
          description="Distribution of lead scores over time"
          data={chartData}
          dataKey="value"
          xAxisKey="name"
          type="bar"
          color="#10b981"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-xl border bg-card p-6 shadow-sm h-full">
            <h3 className="mb-4 text-lg font-semibold">Priority Leads</h3>
            <DataTable columns={leadColumns} data={leads.slice(0, 5)} />
          </div>
        </div>
        <div>
          <div className="space-y-4 rounded-xl border bg-card p-6 shadow-sm h-full">
            <h3 className="text-lg font-semibold mb-4">Automation Activity</h3>
            <div className="space-y-4">
              {interactions.slice(0, 5).map((interaction: any, i: number) => (
                <div key={interaction.id} className="flex gap-3 text-sm items-start">
                  <div className="text-green-500 mt-0.5">✓</div>
                  <div>
                    <p className="font-medium">{interaction.title}</p>
                    <p className="text-xs text-muted-foreground">{new Date(interaction.timestamp).toLocaleString()}</p>
                    <p className="text-muted-foreground mt-1 line-clamp-2">{interaction.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
