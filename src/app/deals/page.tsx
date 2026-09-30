"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { DataTable } from "@/components/crm/data-table";
import { useCrm } from "@/components/crm/crm-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function PipelinePage() {
  const { leads, interactions } = useCrm();
  const pipelineColumns = [
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
      key: "pipelineStage", 
      label: "Stage & Context", 
      sortable: true,
      render: (row: any) => {
        const latest = interactions.find(i => i.title.includes(row.name));
        return (
          <div className="flex flex-col gap-1">
            <span className="font-bold text-primary">{row.pipelineStage}</span>
            <div className="flex flex-col text-xs text-muted-foreground">
              <span className="line-clamp-1"><b>Why:</b> {row.recommendedAction || "Score meets threshold"}</span>
              {latest && <span className="line-clamp-1"><b>Event:</b> {latest.title.replace(`Event Processed for ${row.name}`, 'Event').replace(row.name, '').trim()}</span>}
            </div>
          </div>
        );
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
    { 
      key: "dealValue", 
      label: "Deal Value", 
      sortable: true,
      render: (row: any) => <span className="font-medium">₹{row.dealValue?.toLocaleString('en-IN') || 0}</span>
    },
    { 
      key: "probability", 
      label: "Probability", 
      sortable: true,
      render: (row: any) => (
        <div className="flex items-center gap-2">
          <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
            <div 
              className={`h-full ${row.closeProbability >= 70 ? 'bg-green-500' : row.closeProbability >= 40 ? 'bg-amber-500' : 'bg-red-500'}`} 
              style={{ width: `${row.closeProbability || 0}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground">{row.closeProbability || 0}%</span>
        </div>
      )
    },
    { 
      key: "expectedValue", 
      label: "Expected Value", 
      sortable: true,
      render: (row: any) => <span className="font-semibold text-primary">₹{Math.round((row.dealValue || 0) * ((row.closeProbability || 0) / 100)).toLocaleString('en-IN')}</span>
    },
    {
      key: "actions",
      label: "",
      render: (row: any) => (
        <Link href={`/leads/${row.id}`}>
          <Button variant="ghost" size="sm">Open</Button>
        </Link>
      )
    }
  ];

  return (
    <DashboardLayout title="Sales Pipeline">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">Track AI-qualified opportunities through the pipeline.</p>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <DataTable 
            columns={pipelineColumns} 
            data={leads.filter(l => l.pipelineStage && l.pipelineStage !== "NEW")} 
            searchable 
            searchKey="name" 
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
