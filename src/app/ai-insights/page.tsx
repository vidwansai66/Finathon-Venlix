"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useCrm } from "@/components/crm/crm-context";
import { Button } from "@/components/ui/button";
import { BrainCircuit, RefreshCw, Flame, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AIInsightsPage() {
  const { leads } = useCrm();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

  const highIntentLeads = leads.filter(l => l.intent === "HIGH" || l.intent === "CRITICAL");
  const stalledOpportunities = leads.filter(l => l.stalled);

  return (
    <DashboardLayout title="VENLIX AI Insights">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-6">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
              <BrainCircuit className="h-6 w-6 text-indigo-500" />
              VENLIX Intelligence Engine
            </h2>
            <p className="mt-2 text-muted-foreground">
              Autonomous scoring and intent detection running 24/7.
            </p>
          </div>
          <Button 
            onClick={handleAnalyze} 
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <BrainCircuit className="mr-2 h-4 w-4" />
            )}
            {isAnalyzing ? "Processing Events..." : "Force Global Re-scoring"}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          
          {/* High Intent */}
          <div>
            <h3 className="mb-4 text-lg font-semibold flex items-center gap-2"><Flame className="text-red-500 w-5 h-5"/> High Intent Detected</h3>
            <div className="space-y-4">
              {highIntentLeads.map((lead) => (
                <Card key={lead.id} className="border-l-4 border-l-red-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{lead.company} ({lead.name})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">Strong buying signals detected. Score surged to <span className="font-bold text-red-500">{lead.score}</span>.</p>
                    <div className="bg-muted p-2 rounded text-xs mb-3 font-medium">Recommended: {lead.recommendedAction}</div>
                    <Link href={`/leads/${lead.id}`}>
                      <Button size="sm" variant="outline" className="w-full">Review Intelligence</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
              {highIntentLeads.length === 0 && <p className="text-muted-foreground text-sm">No high intent signals detected right now.</p>}
            </div>
          </div>

          {/* Stalled */}
          <div>
            <h3 className="mb-4 text-lg font-semibold flex items-center gap-2"><AlertCircle className="text-amber-500 w-5 h-5"/> Stalled Opportunities</h3>
            <div className="space-y-4">
              {stalledOpportunities.map((lead) => (
                <Card key={lead.id} className="border-l-4 border-l-amber-500 overflow-hidden">
                  <CardHeader className="pb-2 bg-amber-500/10 border-b border-amber-500/20 mb-3">
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">STALLED OPPORTUNITY</div>
                    <CardTitle className="text-lg">{lead.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{lead.company}</p>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                       <div><span className="text-muted-foreground">Stage:</span> <span className="font-semibold">{lead.pipelineStage}</span></div>
                       <div><span className="text-muted-foreground">Last Activity:</span> <span className="font-semibold">{lead.lastActivity ? new Date(lead.lastActivity).toLocaleDateString() : "Unknown"}</span></div>
                       <div><span className="text-muted-foreground">Missed Follow-up:</span> <span className="font-semibold text-red-500">YES</span></div>
                       <div><span className="text-muted-foreground">Deal Value:</span> <span className="font-semibold">₹{lead.dealValue?.toLocaleString('en-IN') || 0}</span></div>
                    </div>
                    <div className="mt-4 bg-muted/50 p-3 rounded text-sm font-medium border border-border/50">
                       <span className="text-muted-foreground block text-xs mb-1 font-bold">RECOMMENDED:</span>
                       {lead.recommendedAction || "Re-engage immediately"}
                    </div>
                    <Link href={`/leads/${lead.id}`} className="block mt-4">
                      <Button size="sm" className="w-full bg-amber-500 hover:bg-amber-600 text-white">Review Lead</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
              {stalledOpportunities.length === 0 && <p className="text-muted-foreground text-sm">No stalled opportunities right now.</p>}
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
