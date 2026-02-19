"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReactNode } from "react";

interface DashStatCardProps {
  label: string;
  value: number;
  icon?: ReactNode;
}

const DashStatCard = ({ label, value, icon }: DashStatCardProps) => (
  <Card className="relative rounded-lg border border-border bg-gradient-to-br from-card/50 to-card/100 dark:from-card-dark/50 dark:to-card-dark/100 p-6 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow duration-200">
    {icon && (
      <div className="flex-shrink-0 p-3 rounded-xl bg-primary/20 text-primary dark:bg-primary/30 dark:text-primary-foreground flex items-center justify-center">
        {icon}
      </div>
    )}
    <div className="flex-1">
      <CardHeader className="pb-1">
        <CardTitle className="text-sm font-semibold text-muted-foreground">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex items-baseline justify-between">
          <span className="text-3xl font-bold text-foreground">{value}</span>
        </div>
      </CardContent>
    </div>
  </Card>
);

export default DashStatCard;
