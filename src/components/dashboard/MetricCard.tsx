"use client";

import { Card } from "@/components/ui/card";
import type { KPIMetric } from "@/types/dashboard";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
} from "recharts";
import {
  DollarSign,
  Target,
  Users,
  TrendingUp,
  Mail,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "dollar-sign": DollarSign,
  target: Target,
  users: Users,
  "trending-up": TrendingUp,
  mail: Mail,
  funnel: Target,
  "shopping-cart": ShoppingCart,
};

interface MetricCardProps {
  metric: KPIMetric;
}

export function MetricCard({ metric }: MetricCardProps) {
  const Icon = iconMap[metric.icon] || TrendingUp;
  const isPositive = metric.change >= 0;
  const sparklinePoints = metric.sparklineData.map((v, i) => ({ x: i, value: v }));

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            {metric.label}
          </span>
        </div>
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            isPositive
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {isPositive ? "+" : ""}
          {metric.change.toFixed(1)}%
        </span>
      </div>

      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold tracking-tight">{metric.formattedValue}</p>
        <div className="w-24 h-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparklinePoints}>
              <defs>
                <linearGradient id={`gradient-${metric.icon}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={isPositive ? "#10b981" : "#ef4444"}
                strokeWidth={1.5}
                fill={`url(#gradient-${metric.icon})`}
                dot={false}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-2">Last 30 days</p>
    </Card>
  );
}
