export type StatusType = "SUCCESS" | "WARNING" | "DANGER" | "INFO" | "NEUTRAL";
export type CRMStatus = "ACTIVE" | "INACTIVE" | "PENDING" | "OPEN" | "CLOSED" | "HIGH" | "MEDIUM" | "LOW";

export interface DashboardMetric {
  id: string;
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: string;
}

export interface NavigationItem {
  label: string;
  path: string;
  icon: string;
  badge?: number | string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: CRMStatus;
  avatar?: string;
  lastContact?: string;
  lifetimeValue?: number;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}

export type BuyingIntent = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type PipelineStage = "NEW" | "QUALIFIED" | "ENGAGED" | "DEMO" | "PROPOSAL" | "NEGOTIATION" | "WON" | "LOST" | "STALLED";

export interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  score: number;
  scoreChange?: number;
  intent?: BuyingIntent;
  pipelineStage?: PipelineStage;
  dealValue?: number;
  closeProbability?: number;
  assignedSalesperson?: string;
  lastActivity?: string;
  recommendedAction?: string;
  stalled?: boolean;
  status: CRMStatus;
  source: string;
}

export interface Ticket {
  id: string;
  title: string;
  customerName: string;
  priority: CRMStatus;
  status: CRMStatus;
  createdAt: string;
}

export interface Deal {
  id: string;
  title: string;
  value: number;
  stage: string;
  probability: number;
  expectedClose: string;
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  status: CRMStatus;
  assignedTo?: string;
  leadName?: string;
  taskType?: string;
  description?: string;
}

export interface Interaction {
  id: string;
  type: "email" | "call" | "meeting" | "ticket" | "purchase" | "task" | "ai" | "status";
  title: string;
  description: string;
  timestamp: string;
  status?: StatusType;
}

export interface AIInsight {
  id: string;
  title: string;
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  reason: string;
  recommendedAction: string;
  confidence: number;
  recordId: string;
  recordType: "customer" | "lead" | "ticket" | "deal";
}
