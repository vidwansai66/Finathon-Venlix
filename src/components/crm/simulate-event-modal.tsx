"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCrm } from "./crm-context";
import { X, Play, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SimulateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EVENT_TYPES = [
  "Website Visit",
  "Pricing Page Visit",
  "Email Reply",
  "Content Download",
  "Demo Request",
  "Meeting Request",
  "Proposal Request",
  "Missed Meeting",
  "Call",
  "Unsubscribe"
];

const SOURCES = ["Website", "Email", "Sales", "Campaign", "Referral", "Other"];

export function SimulateEventModal({ isOpen, onClose }: SimulateEventModalProps) {
  const { leads, processEventResult } = useCrm();
  const [selectedLead, setSelectedLead] = useState(leads[0]?.id || "");
  const [eventType, setEventType] = useState(EVENT_TYPES[4]); // Demo Request default
  const [description, setDescription] = useState("Lead requested a product demo");
  const [source, setSource] = useState(SOURCES[0]);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const lead = leads.find(l => l.id === selectedLead);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_id: selectedLead,
          event_id: `E${Math.floor(Math.random() * 10000)}`,
          event_type: eventType.toLowerCase().replace(/ /g, "_"),
          source: source.toLowerCase(),
          description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with n8n webhook");
      }

      const data = await response.json();
      
      if (!data.success) {
         throw new Error(data.error || "Event processing failed");
      }

      setResult(data);
      processEventResult(data);
    } catch (err: any) {
      setError(err.message || "Failed to process event");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEventTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setEventType(val);
    setDescription(`Lead performed: ${val}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-xl border bg-card p-6 shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Simulate Event</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {result ? (
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-green-600 bg-green-500/10 p-4 rounded-lg">
              <CheckCircle2 className="h-6 w-6" />
              <span className="font-semibold text-lg">EVENT PROCESSED ✓</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div>
                 <p className="text-sm text-muted-foreground">Lead</p>
                 <p className="font-semibold">{lead?.name}</p>
                 <p className="text-sm">{lead?.company}</p>
               </div>
               <div>
                 <p className="text-sm text-muted-foreground">Event</p>
                 <p className="font-semibold">{eventType}</p>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg border">
               <div>
                 <p className="text-sm text-muted-foreground mb-1">Score</p>
                 <div className="flex items-center gap-2">
                   <span className="line-through opacity-70">{result.previous_score}</span>
                   <ArrowRight className="h-4 w-4" />
                   <span className="font-bold text-lg text-primary">{result.new_score}</span>
                   <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20 ml-2">
                     +{result.score_change}
                   </Badge>
                 </div>
               </div>
               <div>
                 <p className="text-sm text-muted-foreground mb-1">Intent</p>
                 <div className="flex items-center gap-2">
                   <span className="font-bold text-primary">{result.buying_intent}</span>
                 </div>
               </div>
               <div>
                 <p className="text-sm text-muted-foreground mb-1">Pipeline</p>
                 <div className="flex items-center gap-2">
                   <span className="font-bold text-primary">{result.pipeline_stage}</span>
                 </div>
               </div>
               <div>
                 <p className="text-sm text-muted-foreground mb-1">Close Probability</p>
                 <div className="flex items-center gap-2">
                   <span className="font-bold text-primary">{result.close_probability}%</span>
                 </div>
               </div>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-sm text-muted-foreground">WHY DID SCORE CHANGE?</p>
              <div className="bg-muted/50 p-4 rounded-lg text-sm">
                <p><strong>AI Explanation:</strong></p>
                <p className="mt-1">{result.recommended_action || "Event triggered an automatic score recalculation based on lead engagement model."}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-sm text-muted-foreground">NEXT BEST ACTION</p>
              <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <span className="text-xl">🔥</span>
                  <div>
                    <p className="font-semibold">{result.recommended_action}</p>
                    {result.task_id && (
                       <p className="text-xs text-muted-foreground mt-2">TASK CREATED: {result.task_id}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Button className="w-full" onClick={onClose}>Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Lead</label>
              <select 
                className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                value={selectedLead}
                onChange={(e) => setSelectedLead(e.target.value)}
                required
              >
                {leads.map(l => (
                  <option key={l.id} value={l.id}>
                    {l.name} ({l.company}) - Score: {l.score}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Event Type</label>
                <select 
                  className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={eventType}
                  onChange={handleEventTypeChange}
                  required
                >
                  {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Source</label>
                <select 
                  className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  required
                >
                  {SOURCES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 text-red-500 text-sm rounded-md">
                {error}
                <p className="text-xs mt-1">Check that the n8n workflow is running.</p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing event...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Process Event
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
