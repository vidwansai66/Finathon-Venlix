import { DashboardMetric } from "../types";

export const defaultDashboardMetrics: DashboardMetric[] = [
  {
    id: "total_leads",
    title: "Total Leads",
    value: "1,248",
    change: "+12.5%",
    trend: "up",
    icon: "Users",
  },
  {
    id: "high_intent_leads",
    title: "High Intent Leads",
    value: "142",
    change: "+24.2%",
    trend: "up",
    icon: "Target",
  },
  {
    id: "stalled_opportunities",
    title: "Stalled Opportunities",
    value: "35",
    change: "-12.5%",
    trend: "down",
    icon: "AlertCircle",
  },
  {
    id: "expected_pipeline",
    title: "Expected Pipeline Value",
    value: "₹8.4M",
    change: "+18.1%",
    trend: "up",
    icon: "Briefcase",
  },
  {
    id: "avg_lead_score",
    title: "Average Lead Score",
    value: "68 / 100",
    change: "+4.5",
    trend: "up",
    icon: "Activity",
  },
  {
    id: "conversion_rate",
    title: "Conversion Rate",
    value: "14.2%",
    change: "+1.2%",
    trend: "up",
    icon: "Zap",
  },
];
