"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { DataTable } from "@/components/crm/data-table";
import { mockContacts } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Plus, Users, UserPlus, Globe, X, Mail, Phone, Calendar, Clock, Contact as ContactIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Contact } from "@/types";

export default function ContactsPage() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const contactColumns = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "phone", label: "Phone", sortable: true },
    { key: "source", label: "Source", sortable: true },
    { 
      key: "createdAt", 
      label: "Created", 
      sortable: true,
      render: (row: any) => {
        const date = new Date(row.createdAt);
        const now = new Date();
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
        if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
        return date.toLocaleDateString();
      }
    },
    { 
      key: "status", 
      label: "Status", 
      sortable: true,
      render: (row: any) => (
        <Badge variant={row.status === "New" ? "default" : "secondary"}>
          {row.status}
        </Badge>
      )
    },
    {
      key: "actions",
      label: "",
      render: (row: any) => (
        <Button variant="ghost" size="sm" onClick={() => setSelectedContact(row)}>View</Button>
      )
    }
  ];

  return (
    <DashboardLayout title="Contacts">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground">Manage customer contacts captured from your website.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Filter</Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Contact
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockContacts.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Today</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockContacts.filter(c => {
                  const today = new Date();
                  const contactDate = new Date(c.createdAt);
                  return today.toDateString() === contactDate.toDateString();
                }).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Website Contacts</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockContacts.filter(c => c.source === "Website").length}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start relative">
          <div className={`rounded-xl border bg-card p-6 shadow-sm flex-1 w-full transition-all duration-300 ${selectedContact ? 'lg:w-2/3' : ''}`}>
            <DataTable 
              columns={contactColumns} 
              data={mockContacts} 
              searchable 
              searchKey="name" 
            />
          </div>

          {selectedContact && (
            <div className="rounded-xl border bg-card p-6 shadow-sm w-full lg:w-1/3 animate-in slide-in-from-right-4 lg:sticky lg:top-4">
              <div className="flex items-start justify-between mb-6 border-b pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                    <ContactIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{selectedContact.name}</h3>
                    <Badge variant={selectedContact.status === "New" ? "default" : "secondary"} className="mt-1">
                      {selectedContact.status}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedContact(null)} className="h-8 w-8 rounded-full">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Email</span>
                      <span className="font-medium">{selectedContact.email}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm">
                    <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Phone</span>
                      <span className="font-medium">{selectedContact.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
                      <Globe className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Source</span>
                      <span className="font-medium">{selectedContact.source}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4 grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" /> Created
                    </div>
                    <span className="text-sm font-medium">
                      {new Date(selectedContact.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> Updated
                    </div>
                    <span className="text-sm font-medium">
                      {new Date(selectedContact.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <Button className="w-full">
                    Create Lead from Contact
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
