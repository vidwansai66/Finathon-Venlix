import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardMetric } from "@/types";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import * as Icons from "lucide-react";

export function KpiCard({ title, value, change, trend, icon }: DashboardMetric) {
  const IconComponent = icon ? ((Icons as any)[icon] as React.ElementType) : null;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="mt-2 text-3xl font-bold text-foreground">{value}</h3>
          </div>
          {IconComponent && (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
              <IconComponent className="h-6 w-6 text-blue-600 dark:text-blue-500" />
            </div>
          )}
        </div>
        {change && (
          <div className="mt-4 flex items-center text-sm">
            {trend === "up" && <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />}
            {trend === "down" && <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />}
            {trend === "neutral" && <Minus className="mr-1 h-4 w-4 text-muted-foreground" />}
            
            <span
              className={`font-medium ${
                trend === "up" ? "text-green-600 dark:text-green-400" : trend === "down" ? "text-red-600 dark:text-red-400" : "text-muted-foreground"
              }`}
            >
              {change}
            </span>
            <span className="ml-2 text-muted-foreground">vs last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
