"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCrm } from "@/components/crm/crm-context";
import { ArrowUpRight, ArrowDownRight, Bot, Target, Briefcase, Calendar, Zap, Activity } from "lucide-react";
import { Lead } from "@/types";
import { SimulateEventModal } from "@/components/crm/simulate-event-modal";

export default function LeadIntelligencePage() {
  const params = useParams();
  const leadId = params.id as string;
  const { leads, interactions } = useCrm();
  const lead = leads.find(l => l.id === leadId);
  const leadInteractions = interactions.filter(i => i.title.includes(lead?.name || ""));
  const [isSimulateOpen, setIsSimulateOpen] = useState(false);

  if (!lead) return <DashboardLayout title="Loading..."><div className="p-8">Loading...</div></DashboardLayout>;

  return (
    <DashboardLayout title={`Lead Intelligence: ${lead.name}`}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-2xl">{lead.name}</CardTitle>
                <CardDescription className="text-base">{lead.company} • {lead.email}</CardDescription>
              </div>
              <Badge variant="outline" className="text-sm px-3 py-1">
                {lead.pipelineStage || "NEW"}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="flex flex-col border rounded-lg p-4 bg-muted/20">
                  <span className="text-sm text-muted-foreground flex items-center gap-2"><Target className="w-4 h-4" /> Intent</span>
                  <span className="text-xl font-bold mt-1">{lead.intent || "UNKNOWN"}</span>
                </div>
                <div className="flex flex-col border rounded-lg p-4 bg-muted/20">
                  <span className="text-sm text-muted-foreground flex items-center gap-2"><Briefcase className="w-4 h-4" /> Deal Value</span>
                  <span className="text-xl font-bold mt-1">₹{lead.dealValue?.toLocaleString('en-IN') || "N/A"}</span>
                </div>
                <div className="flex flex-col border rounded-lg p-4 bg-muted/20">
                  <span className="text-sm text-muted-foreground flex items-center gap-2"><Calendar className="w-4 h-4" /> Prob.</span>
                  <span className="text-xl font-bold mt-1">{lead.closeProbability ? `${lead.closeProbability}%` : "N/A"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/50 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Bot className="w-5 h-5" /> AI Recommended Action
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium">{lead.recommendedAction || "Monitor for further engagement."}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interaction Timeline</CardTitle>
            </CardHeader>
            <CardContent>
                {leadInteractions.map((log, i) => (
                  <div key={i} className="flex gap-4 items-start border-l-2 border-primary pl-4 ml-2 pb-4">
                    <div className="w-2 h-2 rounded-full bg-primary -ml-[21px] mt-1.5" />
                    <div>
                      <p className="font-semibold text-primary">{log.title}</p>
                      <p className="text-sm text-muted-foreground">{new Date(log.timestamp).toLocaleString()}</p>
                      <p className="text-sm mt-1">{log.description}</p>
                    </div>
                  </div>
                ))}
                {leadInteractions.length === 0 && (
                  <p className="text-muted-foreground text-sm">No recent activity found.</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pipeline Journey</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                {["NEW", "QUALIFIED", "ENGAGED", "DEMO", "PROPOSAL", "NEGOTIATION", "WON"].map((stage, idx) => {
                  const isCurrent = lead.pipelineStage === stage;
                  return (
                    <div key={stage} className={`flex items-center gap-4 p-2 rounded-md ${isCurrent ? 'bg-primary/10 border border-primary/30 font-bold text-primary' : 'text-muted-foreground'}`}>
                       <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${isCurrent ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>{idx + 1}</div>
                       <div className="flex-1">{stage} {isCurrent && "← CURRENT STAGE"}</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Score Journey</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-8 border-primary/20 bg-card z-10">
                <span className="text-4xl font-bold">{lead.score}</span>
              </div>
              {lead.scoreChange !== undefined && lead.scoreChange !== 0 && (
                <div className={`mt-4 flex items-center font-bold px-3 py-1 rounded-full ${lead.scoreChange > 0 ? "bg-green-500/20 text-green-600" : "bg-red-500/20 text-red-600"}`}>
                  {lead.scoreChange > 0 ? <ArrowUpRight className="mr-1 h-5 w-5" /> : <ArrowDownRight className="mr-1 h-5 w-5" />}
                  {Math.abs(lead.scoreChange)} since last event
                </div>
              )}
              {lead.recommendedAction && (
                <div className="mt-6 p-4 bg-muted rounded-lg w-full border text-left">
                  <p className="text-xs font-bold text-muted-foreground mb-2 flex items-center gap-1 uppercase"><Zap className="w-3 h-3 text-primary" /> Why is this lead at {lead.score}?</p>
                  <p className="text-sm">{lead.recommendedAction}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Assignment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                    {lead.assignedSalesperson ? lead.assignedSalesperson.charAt(0) : "?"}
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{lead.assignedSalesperson || "Unassigned"}</p>
                    <p className="text-xs font-medium text-primary">✓ Best match found</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm bg-muted/30 p-3 rounded-lg border">
                  <div>
                    <span className="text-xs text-muted-foreground">Skills</span>
                    <p className="font-medium">SaaS, Tech</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Territory</span>
                    <p className="font-medium">Hyderabad</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Workload</span>
                    <p className="font-medium text-green-600">4 / 10</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Win Rate</span>
                    <p className="font-medium text-green-600">72%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-500/50">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Activity className="w-4 h-4" /> Demo Mode Simulator
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Button onClick={() => setIsSimulateOpen(true)} className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                Simulate Event for this Lead
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <SimulateEventModal isOpen={isSimulateOpen} onClose={() => setIsSimulateOpen(false)} />
    </DashboardLayout>
  );
}
