"use client";

import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export interface AnalyticsChartProps {
  title: string;
  description?: string;
  data: any[];
  type?: "line" | "bar" | "area";
  dataKey: string;
  xAxisKey: string;
  color?: string;
  height?: number;
}

export function AnalyticsChart({
  title,
  description,
  data,
  type = "line",
  dataKey,
  xAxisKey,
  color = "#2563eb",
  height = 300,
}: AnalyticsChartProps) {
  const renderChart = () => {
    switch (type) {
      case "bar":
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
            <XAxis dataKey={xAxisKey} axisLine={false} tickLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} dx={-10} />
            <Tooltip
              contentStyle={{ borderRadius: "8px", border: "1px solid var(--color-border)", backgroundColor: "var(--color-background)", color: "var(--color-foreground)", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
            />
            <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      case "area":
        return (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
            <XAxis dataKey={xAxisKey} axisLine={false} tickLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} dx={-10} />
            <Tooltip
              contentStyle={{ borderRadius: "8px", border: "1px solid var(--color-border)", backgroundColor: "var(--color-background)", color: "var(--color-foreground)", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
            />
            <Area type="monotone" dataKey={dataKey} stroke={color} fillOpacity={1} fill="url(#colorGradient)" />
          </AreaChart>
        );
      case "line":
      default:
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
            <XAxis dataKey={xAxisKey} axisLine={false} tickLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} dx={-10} />
            <Tooltip
              contentStyle={{ borderRadius: "8px", border: "1px solid var(--color-border)", backgroundColor: "var(--color-background)", color: "var(--color-foreground)", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
            />
            <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
          </LineChart>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div style={{ height }} className="w-full">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
