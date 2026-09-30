"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Lead, Task, Interaction, DashboardMetric } from "@/types";
import { mockLeads, mockTasks, mockInteractions } from "@/lib/mock-data";
import { defaultDashboardMetrics } from "@/config/dashboard";

interface CrmContextType {
  leads: Lead[];
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  interactions: Interaction[];
  setInteractions: React.Dispatch<React.SetStateAction<Interaction[]>>;
  metrics: DashboardMetric[];
  setMetrics: React.Dispatch<React.SetStateAction<DashboardMetric[]>>;
  lastEventResult: any;
  setLastEventResult: React.Dispatch<React.SetStateAction<any>>;
  updateLead: (leadId: string, updates: Partial<Lead>) => void;
  addInteraction: (interaction: Interaction) => void;
  addTask: (task: Task) => void;
  updateMetric: (metricId: string, updates: Partial<DashboardMetric>) => void;
  processEventResult: (result: any) => void;
}

const CrmContext = createContext<CrmContextType | undefined>(undefined);

export function CrmProvider({ children }: { children: ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [interactions, setInteractions] = useState<Interaction[]>(mockInteractions);
  const [metrics, setMetrics] = useState<DashboardMetric[]>(defaultDashboardMetrics);
  const [lastEventResult, setLastEventResult] = useState<any>(null);

  const updateLead = (leadId: string, updates: Partial<Lead>) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, ...updates } : lead))
    );
  };

  const addInteraction = (interaction: Interaction) => {
    setInteractions((prev) => [interaction, ...prev]);
  };

  const addTask = (task: Task) => {
    setTasks((prev) => [task, ...prev]);
  };

  const updateMetric = (metricId: string, updates: Partial<DashboardMetric>) => {
    setMetrics((prev) =>
      prev.map((metric) => (metric.id === metricId ? { ...metric, ...updates } : metric))
    );
  };

  const processEventResult = (result: any) => {
    if (!result.success) return;
    
    setLastEventResult(result);

    // 1. Update Lead
    updateLead(result.lead_id, {
      score: result.new_score,
      scoreChange: result.score_change,
      intent: result.buying_intent,
      pipelineStage: result.pipeline_stage,
      stalled: result.stalled,
      closeProbability: result.close_probability,
      dealValue: result.expected_deal_value, // Mapped correctly
      recommendedAction: result.recommended_action,
      lastActivity: new Date().toISOString(),
    });

    const lead = leads.find((l) => l.id === result.lead_id);
    const leadName = lead?.name || result.lead_id;

    // 2. Add Interaction
    addInteraction({
      id: result.event_id || `INT-${Date.now()}`,
      type: "ai",
      title: `Event Processed for ${leadName}`,
      description: `Score changed ${result.previous_score} → ${result.new_score}. ${result.recommended_action || ''}`,
      timestamp: new Date().toISOString(),
      status: "SUCCESS",
    });

    // 3. Add Task if task_id provided
    if (result.task_id) {
      addTask({
        id: result.task_id,
        title: result.recommended_action || "Follow up on recent event",
        dueDate: new Date(Date.now() + 86400000).toISOString(), // +1 day
        priority: result.buying_intent === "HIGH" || result.buying_intent === "CRITICAL" ? "URGENT" : "HIGH",
        status: "OPEN",
        leadName: leadName,
        taskType: "AI Generated",
        description: `Automated task from event. Intent: ${result.buying_intent}.`,
        assignedTo: lead?.assignedSalesperson || "Unassigned",
      });
    }

    // 4. Update Metrics (Simplified recalculations for demo)
    setLeads(prevLeads => {
        // Need the updated leads to calculate metrics correctly
        const newLeads = prevLeads.map((l) => (l.id === result.lead_id ? { ...l, 
            score: result.new_score,
            intent: result.buying_intent,
            pipelineStage: result.pipeline_stage,
            dealValue: result.expected_deal_value
        } : l));
        
        const avgScore = Math.round(newLeads.reduce((acc, l) => acc + l.score, 0) / newLeads.length);
        const highIntentCount = newLeads.filter(l => l.intent === 'HIGH' || l.intent === 'CRITICAL').length;
        const totalPipeline = newLeads.reduce((acc, l) => acc + (l.dealValue || 0), 0);

        setMetrics(prevMetrics => prevMetrics.map(m => {
            if(m.id === 'avg_lead_score') return { ...m, value: `${avgScore} / 100` };
            if(m.id === 'high_intent_leads') return { ...m, value: highIntentCount.toString() };
            if(m.id === 'expected_pipeline') return { ...m, value: `₹${(totalPipeline / 1000).toFixed(1)}K` }; // simplified formatting
            return m;
        }));
        
        return newLeads;
    });
  };

  return (
    <CrmContext.Provider
      value={{
        leads,
        setLeads,
        tasks,
        setTasks,
        interactions,
        setInteractions,
        metrics,
        setMetrics,
        lastEventResult,
        setLastEventResult,
        updateLead,
        addInteraction,
        addTask,
        updateMetric,
        processEventResult,
      }}
    >
      {children}
    </CrmContext.Provider>
  );
}

export function useCrm() {
  const context = useContext(CrmContext);
  if (context === undefined) {
    throw new Error("useCrm must be used within a CrmProvider");
  }
  return context;
}
