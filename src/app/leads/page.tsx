"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { DataTable } from "@/components/crm/data-table";
import { useCrm } from "@/components/crm/crm-context";
import { Button } from "@/components/ui/button";
import { Plus, ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function LeadsPage() {
  const { leads, interactions } = useCrm();
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
        <div className="flex items-center gap-2">
          <span className={row.score > 80 ? "text-green-600 font-bold" : row.score > 50 ? "text-amber-600 font-bold" : "text-slate-600 font-bold"}>
            {row.score}
          </span>
          {row.scoreChange !== undefined && row.scoreChange !== 0 && (
            <span className={`flex items-center text-xs px-1.5 py-0.5 rounded-full ${row.scoreChange > 0 ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
              {row.scoreChange > 0 ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
              {Math.abs(row.scoreChange)}
            </span>
          )}
        </div>
      )
    },
    {
      key: "latestEvent",
      label: "Latest Event",
      render: (row: any) => {
        const latest = interactions.find(i => i.title.includes(row.name));
        return <span className="text-xs text-muted-foreground line-clamp-1">{latest ? latest.title.replace(`Event Processed for ${row.name}`, 'Event').replace(row.name, '').trim() || 'No recent events' : "No recent events"}</span>
      }
    },
    {
      key: "intent",
      label: "Intent",
      sortable: true,
      render: (row: any) => {
        let color = "bg-slate-100 text-slate-800";
        if (row.intent === "HIGH" || row.intent === "CRITICAL") color = "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
        else if (row.intent === "MEDIUM") color = "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
        return <Badge variant="outline" className={color}>{row.intent || "UNKNOWN"}</Badge>;
      }
    },
    { key: "pipelineStage", label: "Stage", sortable: true },
    { 
      key: "dealValue", 
      label: "Deal Value", 
      sortable: true,
      render: (row: any) => row.dealValue ? `₹${row.dealValue.toLocaleString('en-IN')}` : "N/A"
    },
    { 
      key: "closeProbability", 
      label: "Prob.", 
      sortable: true,
      render: (row: any) => row.closeProbability ? `${row.closeProbability}%` : "N/A"
    },
    { 
      key: "expectedValue", 
      label: "Expected Value", 
      sortable: true,
      render: (row: any) => row.dealValue && row.closeProbability ? `₹${Math.round((row.dealValue * row.closeProbability) / 100).toLocaleString('en-IN')}` : "N/A"
    },
    { key: "assignedSalesperson", label: "Assigned", sortable: true },
    {
      key: "lastActivity",
      label: "Last Activity",
      sortable: true,
      render: (row: any) => <span className="text-xs text-muted-foreground">{row.lastActivity ? new Date(row.lastActivity).toLocaleDateString() : "N/A"}</span>
    },
    {
      key: "recommendedAction",
      label: "Next Action",
      render: (row: any) => (
        <span className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]" title={row.recommendedAction}>
          {row.recommendedAction || "N/A"}
        </span>
      )
    },
    {
      key: "actions",
      label: "",
      render: (row: any) => (
        <Link href={`/leads/${row.id}`}>
          <Button variant="ghost" size="sm">Review</Button>
        </Link>
      )
    }
  ];

  return (
    <DashboardLayout title="Priority Leads">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">Monitor high-intent leads and AI-driven insights.</p>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <DataTable 
            columns={leadColumns} 
            data={leads} 
            searchable 
            searchKey="name" 
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
