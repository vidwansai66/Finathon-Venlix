import { NavigationItem } from "../types";

export const navigationConfig: NavigationItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: "LayoutDashboard" },
  { label: "Leads", path: "/leads", icon: "Target" },
  { label: "Pipeline", path: "/deals", icon: "Briefcase" },
  { label: "Customers", path: "/customers", icon: "Users" },
  { label: "Contacts", path: "/contacts", icon: "Contact" },
  { label: "Tasks", path: "/tasks", icon: "CheckSquare" },
  { label: "AI Insights", path: "/ai-insights", icon: "BrainCircuit" },
  { label: "Analytics", path: "/analytics", icon: "BarChart3" },
  { label: "Settings", path: "/settings", icon: "Settings" },
];

export const featuresConfig = {
  contacts: true,
  customers: true,
  leads: true,
  tickets: true,
  deals: true,
  tasks: true,
  aiInsights: true,
  analytics: true,
};

export const quickActions = [
  { label: "Add Customer", action: "ADD_CUSTOMER", icon: "UserPlus" },
  { label: "Create Lead", action: "CREATE_LEAD", icon: "Target" },
  { label: "New Ticket", action: "NEW_TICKET", icon: "TicketPlus" },
  { label: "Run AI Analysis", action: "RUN_AI", icon: "Wand2" },
];
