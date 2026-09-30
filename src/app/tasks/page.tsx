"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { DataTable } from "@/components/crm/data-table";
import { useCrm } from "@/components/crm/crm-context";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function TasksPage() {
  const { tasks } = useCrm();
  const taskColumns = [
    { 
      key: "id", 
      label: "Task ID", 
      sortable: true,
      render: (row: any) => <span className="font-mono text-xs font-semibold text-primary">{row.id}</span>
    },
    { 
      key: "leadName", 
      label: "Lead", 
      sortable: true,
      render: (row: any) => <span className="font-semibold">{row.leadName}</span>
    },
    { 
      key: "taskType", 
      label: "Trigger", 
      sortable: true,
      render: (row: any) => (
        <span className="text-xs bg-muted px-2 py-1 rounded font-medium border">
          {row.taskType === "AI Generated" ? "⚡ AI Analysis" : "Manual"}
        </span>
      )
    },
    { 
      key: "title", 
      label: "Action", 
      sortable: true,
      render: (row: any) => (
        <div className="flex flex-col">
           <span className="font-medium">{row.title}</span>
           {row.description && <span className="text-xs text-muted-foreground line-clamp-1">{row.description}</span>}
        </div>
      )
    },
    { 
      key: "priority", 
      label: "Priority", 
      sortable: true,
      render: (row: any) => {
        let color = "text-slate-600";
        if (row.priority === "URGENT") color = "text-red-600 font-bold";
        else if (row.priority === "HIGH") color = "text-amber-600 font-bold";
        else if (row.priority === "MEDIUM") color = "text-blue-600 font-medium";
        return <span className={color}>{row.priority}</span>;
      }
    },
    { key: "assignedTo", label: "Assigned To", sortable: true },
    { 
      key: "dueDate", 
      label: "Due Date", 
      sortable: true,
      render: (row: any) => {
        const date = new Date(row.dueDate);
        const isPastDue = date < new Date() && row.status !== "CLOSED";
        return (
          <span className={isPastDue ? "text-red-500 font-medium" : ""}>
            {date.toLocaleDateString()}
          </span>
        );
      }
    },
    { key: "status", label: "Status", sortable: true },
    {
      key: "actions",
      label: "",
      render: (row: any) => (
        <Button variant="ghost" size="sm">Complete</Button>
      )
    }
  ];

  return (
    <DashboardLayout title="Tasks & Activities">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">Stay on top of your daily CRM activities and follow-ups.</p>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <DataTable 
            columns={taskColumns} 
            data={tasks} 
            searchable 
            searchKey="title" 
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
