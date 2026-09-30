"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { DataTable } from "@/components/crm/data-table";
import { mockTickets } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Plus, BrainCircuit, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function TicketActions({ ticketId }: { ticketId: string }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);
    
    toast.info(`Analyzing ticket ${ticketId} with AI...`);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ record_id: ticketId }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-green-700">Analysis Complete for {ticketId}</span>
            <span className="text-sm">Classification: {data.classification}</span>
            <span className="text-sm">Priority: <span className="font-medium">{data.priority}</span></span>
            <span className="text-sm font-medium mt-1">Action: {data.recommended_action}</span>
          </div>,
          { duration: 6000 }
        );
      } else {
        toast.error(data.error || "AI analysis failed. Please try again.");
      }
    } catch (error) {
      toast.error("AI analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleAnalyze}
        disabled={isAnalyzing}
        className="h-8 border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-900 dark:text-blue-300 dark:hover:bg-blue-950/50"
      >
        {isAnalyzing ? (
          <RefreshCw className="mr-2 h-3.5 w-3.5 animate-spin" />
        ) : (
          <BrainCircuit className="mr-2 h-3.5 w-3.5" />
        )}
        Analyze with AI
      </Button>
      <Button variant="ghost" size="sm">Resolve</Button>
    </div>
  );
}

export default function TicketsPage() {
  const ticketColumns = [
    { key: "id", label: "Ticket ID", sortable: true },
    { key: "title", label: "Issue", sortable: true },
    { key: "customerName", label: "Customer", sortable: true },
    { key: "priority", label: "Priority", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { 
      key: "createdAt", 
      label: "Opened At", 
      sortable: true,
      render: (row: any) => new Date(row.createdAt).toLocaleDateString()
    },
    {
      key: "actions",
      label: "",
      render: (row: any) => (
        <TicketActions ticketId={row.id} />
      )
    }
  ];

  return (
    <DashboardLayout title="Support Tickets">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">Manage customer support inquiries and resolve issues.</p>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Ticket
          </Button>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <DataTable 
            columns={ticketColumns} 
            data={mockTickets} 
            searchable 
            searchKey="title" 
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
