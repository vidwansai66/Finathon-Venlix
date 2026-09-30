import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { AIInsight } from "@/types";

export function AIInsightCard({ insight, onAction, onDismiss }: { insight: AIInsight; onAction?: () => void; onDismiss?: () => void }) {
  const getRiskIcon = () => {
    switch (insight.riskLevel) {
      case "CRITICAL":
      case "HIGH":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "MEDIUM":
        return <Info className="h-5 w-5 text-amber-500" />;
      case "LOW":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const getRiskColor = () => {
    switch (insight.riskLevel) {
      case "CRITICAL":
        return "destructive";
      case "HIGH":
        return "destructive";
      case "MEDIUM":
        return "warning";
      case "LOW":
        return "success";
    }
  };

  return (
    <Card className="border-blue-100 bg-blue-50/50 shadow-sm dark:border-blue-900/50 dark:bg-blue-950/20">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-sm font-semibold text-blue-900 dark:text-blue-400">AI INSIGHT</CardTitle>
          </div>
          <Badge variant={getRiskColor()}>{insight.riskLevel} RISK</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold">{insight.title}</h4>
          <p className="mt-1 text-sm text-muted-foreground">{insight.reason}</p>
        </div>
        <div className="rounded-md bg-background p-3 text-sm">
          <span className="font-medium">Recommended Action: </span>
          {insight.recommendedAction}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex-1">
            <div className="h-1.5 w-full rounded-full bg-secondary">
              <div
                className="h-1.5 rounded-full bg-blue-600"
                style={{ width: `${insight.confidence}%` }}
              />
            </div>
          </div>
          <span>{insight.confidence}% Confidence</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-0">
        {onDismiss && (
          <Button variant="ghost" size="sm" onClick={onDismiss}>
            Dismiss
          </Button>
        )}
        {onAction && (
          <Button size="sm" onClick={onAction}>
            Take Action
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
