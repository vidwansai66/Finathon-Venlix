"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navigationConfig, featuresConfig } from "@/config/navigation";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-background transition-colors">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-foreground">
          <Icons.Hexagon className="h-6 w-6 text-primary" />
          <span>VENLIX</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {navigationConfig.map((item) => {
            const IconComponent = (Icons as any)[item.icon] as LucideIcon | undefined;
            const isActive = pathname === item.path || (item.path !== "/dashboard" && pathname.startsWith(item.path));
            
            // Filter out disabled features based on feature flags
            const featureKey = item.label.toLowerCase().replace(" ", "") as keyof typeof featuresConfig;
            if (featuresConfig[featureKey] === false) return null;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {IconComponent && <IconComponent className="h-4 w-4" />}
                {item.label}
                {item.badge && (
                  <span className="ml-auto rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
            <span className="text-xs font-medium text-secondary-foreground">U</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">User</span>
            <span className="text-xs text-muted-foreground">user@example.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
