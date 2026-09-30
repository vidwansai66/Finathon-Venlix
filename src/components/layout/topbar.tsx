"use client";

import React from "react";
import { Menu, Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { quickActions } from "@/config/navigation";

import { ThemeToggle } from "@/components/theme-toggle";
import { SimulateEventModal } from "@/components/crm/simulate-event-modal";
import { Play } from "lucide-react";

export function Topbar({ title = "Dashboard", onMenuClickAction }: { title?: string, onMenuClickAction?: () => void }) {
  const [isSimulateOpen, setIsSimulateOpen] = React.useState(false);
  return (
    <div className="flex h-14 items-center justify-between border-b bg-background px-4 md:px-6 transition-colors">
      <div className="flex items-center gap-2 md:gap-4">
        {onMenuClickAction && (
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClickAction}>
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative hidden w-64 md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search across CRM..."
            className="w-full pl-8 bg-muted border-transparent focus-visible:border-input focus-visible:bg-background transition-colors"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button onClick={() => setIsSimulateOpen(true)} size="sm" className="hidden sm:flex bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
            <Play className="h-4 w-4" />
            Simulate Event
          </Button>
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
          </Button>
        </div>
      </div>
      <SimulateEventModal isOpen={isSimulateOpen} onClose={() => setIsSimulateOpen(false)} />
    </div>
  );
}
