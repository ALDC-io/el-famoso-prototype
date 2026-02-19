"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { RevenueData } from "@/types/dashboard";
import { config } from "@/config/prospect";
import { formatCurrency } from "@/lib/utils";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { format, parseISO } from "date-fns";

interface RevenueChartProps {
  data: RevenueData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const categories = config.dashboard.revenueCategories;
  const totalRevenue = data.reduce((sum, d) => (sum + (typeof d.total === "number" ? d.total : 0)), 0);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Revenue by Category</CardTitle>
            <p className="text-sm text-muted-foreground">Daily revenue breakdown — 30 day trend</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
            <p className="text-xs text-muted-foreground">30-day total</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
              <defs>
                {categories.map((cat) => (
                  <linearGradient key={cat.key} id={`grad-${cat.key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={cat.color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={cat.color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11 }}
                tickFormatter={(val) => format(parseISO(val), "MMM d")}
                interval={6}
              />
              <YAxis
                tick={{ fontSize: 11 }}
                tickFormatter={(val) => `$${(val / 1000).toFixed(0)}K`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div className="bg-white border border-border rounded-lg shadow-lg p-3 text-sm">
                      <p className="font-medium mb-1.5">{format(parseISO(label), "MMM d, yyyy")}</p>
                      {payload.map((p) => (
                        <div key={p.dataKey} className="flex justify-between gap-4">
                          <span style={{ color: p.color }}>{p.name}</span>
                          <span className="font-medium">{formatCurrency(p.value as number)}</span>
                        </div>
                      ))}
                      <div className="border-t mt-1.5 pt-1.5 flex justify-between gap-4 font-semibold">
                        <span>Total</span>
                        <span>{formatCurrency(payload.reduce((s, p) => s + (p.value as number), 0))}</span>
                      </div>
                    </div>
                  );
                }}
              />
              <Legend
                verticalAlign="top"
                height={36}
                formatter={(value: string) => (
                  <span className="text-xs text-muted-foreground">{value}</span>
                )}
              />
              {categories.map((cat) => (
                <Area
                  key={cat.key}
                  type="monotone"
                  dataKey={cat.key}
                  name={cat.label}
                  stackId="1"
                  stroke={cat.color}
                  fill={`url(#grad-${cat.key})`}
                  strokeWidth={2}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
