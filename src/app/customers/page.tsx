"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { DataTable } from "@/components/crm/data-table";
import { mockCustomers } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function CustomersPage() {
  const customerColumns = [
    { key: "name", label: "Name", sortable: true },
    { key: "company", label: "Company", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { 
      key: "lastContact", 
      label: "Last Contact", 
      sortable: true,
      render: (row: any) => new Date(row.lastContact).toLocaleDateString()
    },
    { 
      key: "lifetimeValue", 
      label: "LTV", 
      sortable: true,
      render: (row: any) => `$${row.lifetimeValue.toLocaleString()}`
    },
    {
      key: "actions",
      label: "",
      render: (row: any) => (
        <Button variant="ghost" size="sm">View</Button>
      )
    }
  ];

  return (
    <DashboardLayout title="Customers">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">Manage your customer relationships and track key metrics.</p>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <DataTable 
            columns={customerColumns} 
            data={mockCustomers} 
            searchable 
            searchKey="name" 
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
