"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { config } from "@/config/prospect";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { loadWarehouse } from "@/lib/data-loader";
import type { WarehouseData } from "@/lib/eclipse-api";
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
  Legend,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { Database, Loader2 } from "lucide-react";

export function WarehouseDashboard() {
  const [data, setData] = useState<WarehouseData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    loadWarehouse(12)
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
  const totalRevenue = data.revenue.reduce((s, r) => s + r.value, 0);
  const totalExpenses = data.expenses.reduce((s, e) => s + e.value, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Database className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Data Warehouse Explorer</h2>
          <p className="text-sm text-muted-foreground">
            Gold layer — fct_revenue, fct_expenses, fct_time_utilization, fct_accounts_payable
          </p>
        </div>
      </div>

      {/* Revenue + Expenses (top row) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Breakdown (Pie) */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Revenue by Category</CardTitle>
              <span className="text-lg font-bold">{formatCurrency(totalRevenue)}</span>
            </div>
            <p className="text-sm text-muted-foreground">From fct_revenue</p>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.revenue}
                    dataKey="value"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    innerRadius={50}
                    paddingAngle={2}
                    label={({ label, formattedValue }) => `${label}: ${formattedValue}`}
                    labelLine={false}
                  >
                    {data.revenue.map((_, i) => (
                      <Cell key={i} fill={chartColors[i % chartColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const d = payload[0].payload;
                      return (
                        <div className="bg-white border border-border rounded-lg shadow-lg p-3 text-sm">
                          <p className="font-medium">{d.label}</p>
                          <p>{formatCurrency(d.value)}</p>
                        </div>
                      );
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Expense Breakdown (Horizontal Bar) */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Expense Categories</CardTitle>
              <span className="text-lg font-bold">{formatCurrency(totalExpenses)}</span>
            </div>
            <p className="text-sm text-muted-foreground">From fct_expenses</p>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.expenses} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="label" tick={{ fontSize: 11 }} width={80} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const d = payload[0].payload;
                      return (
                        <div className="bg-white border border-border rounded-lg shadow-lg p-3 text-sm">
                          <p className="font-medium">{d.label}</p>
                          <p>{formatCurrency(d.value)}</p>
                        </div>
                      );
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {data.expenses.map((_, i) => (
                      <Cell key={i} fill={chartColors[(i + 2) % chartColors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Utilization + Trend (bottom row) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Time Utilization */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Time Utilization</CardTitle>
            <p className="text-sm text-muted-foreground">From fct_time_utilization</p>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.utilization} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="label" tick={{ fontSize: 11 }} width={100} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const d = payload[0].payload;
                      return (
                        <div className="bg-white border border-border rounded-lg shadow-lg p-3 text-sm">
                          <p className="font-medium">{d.label}</p>
                          <p>{d.formattedValue}</p>
                        </div>
                      );
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} fill={chartColors[0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue vs Expenses Trend */}
        <Card className="lg:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Revenue vs Expenses</CardTitle>
            <p className="text-sm text-muted-foreground">Monthly trend from gold layer</p>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.trends} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartColors[0]} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={chartColors[0]} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="period" tick={{ fontSize: 10 }} interval={2} />
                  <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 11 }} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload?.length) return null;
                      const d = payload[0]?.payload;
                      return (
                        <div className="bg-white border border-border rounded-lg shadow-lg p-3 text-sm">
                          <p className="font-medium mb-1">{label}</p>
                          <p className="text-primary">Revenue: {formatCurrency(d?.revenue ?? 0)}</p>
                          <p className="text-red-500">Expenses: {formatCurrency(d?.expenses ?? 0)}</p>
                          <p className="font-semibold">Net: {formatCurrency(d?.net ?? 0)}</p>
                        </div>
                      );
                    }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Area type="monotone" dataKey="revenue" name="Revenue" stroke={chartColors[0]} strokeWidth={2} fill="url(#revGrad)" dot={false} />
                  <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#ef4444" strokeWidth={2} fill="url(#expGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {data.demo && (
        <p className="text-xs text-center text-muted-foreground">
          Showing demo data. Connect Eclipse to see live warehouse analytics from your gold layer.
        </p>
      )}
    </div>
  );
}
