"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { config } from "@/config/prospect";
import { formatCurrency } from "@/lib/utils";
import { loadProfitabilitySummary } from "@/lib/data-loader";
import type { ProfitabilitySummaryData } from "@/lib/eclipse-api";
import {
  Bar,
  BarChart,
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  ReferenceLine,
} from "recharts";
import { DollarSign, TrendingUp, Percent, Loader2 } from "lucide-react";

export function ProfitabilityDashboard() {
  const [data, setData] = useState<ProfitabilitySummaryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    loadProfitabilitySummary(12)
      .then((d) => { if (!cancelled) setData(d); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const chartColors = config.colors.chartColors;
  const isPositiveMargin = data.summary.margin >= 0;

  // Waterfall bar data — running total for positioning
  const waterfallData = data.waterfall.map((item) => ({
    label: item.label,
    value: Math.abs(item.value),
    isNegative: item.isNegative,
    isTotal: item.isTotal,
    formatted: item.formattedValue,
  }));

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Revenue</span>
          </div>
          <p className="text-2xl font-bold">{formatCurrency(data.summary.revenue)}</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Gross Profit</span>
          </div>
          <p className="text-2xl font-bold">{formatCurrency(data.summary.grossProfit)}</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className={`p-2 rounded-lg ${isPositiveMargin ? "bg-emerald-500/10" : "bg-red-500/10"}`}>
              <Percent className={`h-4 w-4 ${isPositiveMargin ? "text-emerald-600" : "text-red-600"}`} />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Net Margin</span>
          </div>
          <p className={`text-2xl font-bold ${isPositiveMargin ? "text-emerald-600" : "text-red-600"}`}>
            {data.summary.margin.toFixed(1)}%
          </p>
        </Card>
      </div>

      {/* Waterfall + Margin Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Waterfall Chart */}
        <Card className="lg:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Profitability Waterfall</CardTitle>
            <p className="text-sm text-muted-foreground">Revenue to net profit breakdown</p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={waterfallData} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                  <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 11 }} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const item = payload[0].payload;
                      return (
                        <div className="bg-white border border-border rounded-lg shadow-lg p-3 text-sm">
                          <p className="font-medium">{item.label}</p>
                          <p className={item.isNegative ? "text-red-600" : "text-emerald-600"}>
                            {item.formatted}
                          </p>
                        </div>
                      );
                    }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {waterfallData.map((entry, i) => (
                      <Cell
                        key={i}
                        fill={entry.isTotal ? chartColors[0] : entry.isNegative ? "#ef4444" : "#10b981"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Margin Trend */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Margin Trend</CardTitle>
            <p className="text-sm text-muted-foreground">Monthly gross margin %</p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.marginTrend} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="marginGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="period"
                    tick={{ fontSize: 10 }}
                    interval={2}
                  />
                  <YAxis
                    tickFormatter={(v) => `${v}%`}
                    tick={{ fontSize: 11 }}
                    domain={["auto", "auto"]}
                  />
                  <ReferenceLine y={30} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: "Target", fontSize: 10, fill: "#f59e0b" }} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload?.length) return null;
                      const pt = payload[0].payload;
                      return (
                        <div className="bg-white border border-border rounded-lg shadow-lg p-3 text-sm">
                          <p className="font-medium mb-1">{label}</p>
                          <p>Margin: <span className="font-medium">{pt.margin}%</span></p>
                          <p>Revenue: {formatCurrency(pt.revenue)}</p>
                          <p>Expense: {formatCurrency(pt.expense)}</p>
                        </div>
                      );
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="margin"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="url(#marginGrad)"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {data.demo && (
        <p className="text-xs text-center text-muted-foreground">
          Showing demo data. Connect Eclipse to see live profitability from your data warehouse.
        </p>
      )}
    </div>
  );
}
