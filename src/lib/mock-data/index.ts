import { Customer, Lead, Ticket, Deal, Task, Interaction, AIInsight, Contact } from "@/types";

export const mockCustomers: Customer[] = [
  { id: "CUS-001", name: "Acme Corp", email: "contact@acme.com", company: "Acme Corp", status: "ACTIVE", lastContact: "2023-10-15T10:00:00Z", lifetimeValue: 45000 },
  { id: "CUS-002", name: "Globex Inc", email: "info@globex.com", company: "Globex Inc", status: "INACTIVE", lastContact: "2023-09-01T10:00:00Z", lifetimeValue: 12000 },
  { id: "CUS-003", name: "Soylent Corp", email: "sales@soylent.com", company: "Soylent Corp", status: "ACTIVE", lastContact: "2023-10-20T10:00:00Z", lifetimeValue: 85000 },
];

export const mockContacts: Contact[] = [
  { id: "CON-001", name: "Rahul Kumar", email: "rahul@gmail.com", phone: "9876543210", source: "Website", createdAt: new Date(Date.now() - 2 * 60000).toISOString(), updatedAt: new Date(Date.now() - 2 * 60000).toISOString(), status: "New" },
  { id: "CON-002", name: "Priya Sharma", email: "priya@gmail.com", phone: "9988776655", source: "Website", createdAt: new Date(Date.now() - 8 * 60000).toISOString(), updatedAt: new Date(Date.now() - 8 * 60000).toISOString(), status: "New" },
  { id: "CON-003", name: "Arjun Reddy", email: "arjun@gmail.com", phone: "9123456789", source: "Website", createdAt: new Date(Date.now() - 15 * 60000).toISOString(), updatedAt: new Date(Date.now() - 10 * 60000).toISOString(), status: "Contacted" },
];

export const mockLeads: Lead[] = [
  { 
    id: "LD-001", 
    name: "Rahul Sharma", 
    email: "rahul@acmetech.in", 
    company: "Acme Technologies", 
    score: 37, 
    scoreChange: 2,
    intent: "LOW",
    pipelineStage: "ENGAGED",
    dealValue: 100000,
    closeProbability: 10,
    assignedSalesperson: "Arjun",
    lastActivity: "2023-10-22T10:00:00Z",
    recommendedAction: "Monitor for further engagement",
    stalled: false,
    status: "OPEN", 
    source: "Website" 
  },
  { 
    id: "LD-002", 
    name: "Priya Patel", 
    email: "priya@innovate.co", 
    company: "Innovate Solutions", 
    score: 82, 
    scoreChange: 15,
    intent: "HIGH",
    pipelineStage: "DEMO",
    dealValue: 450000,
    closeProbability: 65,
    assignedSalesperson: "Neha",
    lastActivity: "2023-10-23T14:30:00Z",
    recommendedAction: "Immediate salesperson follow-up",
    stalled: false,
    status: "ACTIVE", 
    source: "Referral" 
  },
  { 
    id: "LD-003", 
    name: "Amit Kumar", 
    email: "amit@buildwell.in", 
    company: "BuildWell", 
    score: 55, 
    scoreChange: -5,
    intent: "MEDIUM",
    pipelineStage: "PROPOSAL",
    dealValue: 250000,
    closeProbability: 40,
    assignedSalesperson: "Vikram",
    lastActivity: "2023-10-15T09:15:00Z",
    recommendedAction: "Follow up and re-engage",
    stalled: true,
    status: "PENDING", 
    source: "Campaign" 
  },
];

export const mockTickets: Ticket[] = [
  { id: "TK-1042", title: "Cannot access dashboard", customerName: "Acme Corp", priority: "HIGH", status: "OPEN", createdAt: "2023-10-21T09:30:00Z" },
  { id: "TK-1043", title: "Billing inquiry", customerName: "Globex Inc", priority: "MEDIUM", status: "PENDING", createdAt: "2023-10-20T14:15:00Z" },
];

export const mockDeals: Deal[] = [
  { id: "DL-501", title: "Enterprise License", value: 120000, stage: "Proposal", probability: 75, expectedClose: "2023-11-15T00:00:00Z" },
  { id: "DL-502", title: "Support Upgrade", value: 15000, stage: "Negotiation", probability: 90, expectedClose: "2023-10-30T00:00:00Z" },
];

export const mockTasks: Task[] = [
  { 
    id: "TSK-01", 
    title: "Call Rahul Sharma", 
    dueDate: "2023-10-25T00:00:00Z", 
    priority: "HIGH", 
    status: "PENDING",
    leadName: "Rahul Sharma",
    taskType: "Call",
    description: "Follow up regarding recent pricing page visit.",
    assignedTo: "Arjun"
  },
  { 
    id: "TSK-02", 
    title: "Send Proposal to Priya", 
    dueDate: new Date().toISOString(), 
    priority: "URGENT", 
    status: "OPEN",
    leadName: "Priya Patel",
    taskType: "Email",
    description: "Send requested enterprise proposal.",
    assignedTo: "Neha"
  },
  { 
    id: "TSK-03", 
    title: "Re-engage Amit", 
    dueDate: "2023-10-31T00:00:00Z", 
    priority: "MEDIUM", 
    status: "OPEN",
    leadName: "Amit Kumar",
    taskType: "Follow-up",
    description: "Lead stalled in proposal stage for 10 days.",
    assignedTo: "Vikram"
  }
];

export const mockInteractions: Interaction[] = [
  { id: "INT-01", type: "email", title: "Intro Email Sent", description: "Sent standard product introduction.", timestamp: "2023-10-20T10:00:00Z", status: "SUCCESS" },
  { id: "INT-02", type: "call", title: "Discovery Call", description: "Client interested in enterprise features.", timestamp: "2023-10-21T14:00:00Z", status: "INFO" },
];

export const mockAIInsights: AIInsight[] = [
  {
    id: "AI-001",
    title: "Churn Risk Detected",
    riskLevel: "HIGH",
    reason: "Usage dropped by 60% over the last 14 days. 3 open support tickets.",
    recommendedAction: "Schedule a check-in call with the primary account manager immediately.",
    confidence: 88,
    recordId: "CUS-002",
    recordType: "customer"
  },
  {
    id: "AI-002",
    title: "Upsell Opportunity",
    riskLevel: "LOW",
    reason: "Customer has reached 90% of their API quota for 3 consecutive months.",
    recommendedAction: "Offer the Enterprise Tier upgrade with a 10% discount.",
    confidence: 92,
    recordId: "CUS-001",
    recordType: "customer"
  }
];
