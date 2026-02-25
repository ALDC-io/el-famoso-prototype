"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { loadSourceHealth } from "@/lib/data-loader";
import type { SourceHealthData } from "@/lib/eclipse-api";
import { config } from "@/config/prospect";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  Database,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Loader2,
  Plug,
} from "lucide-react";
import { formatDistanceToNow, parseISO } from "date-fns";

const statusConfig = {
  connected: { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50", label: "Connected" },
  pending: { icon: Clock, color: "text-amber-600", bg: "bg-amber-50", label: "Pending" },
  error: { icon: XCircle, color: "text-red-600", bg: "bg-red-50", label: "Error" },
} as const;

const freshnessConfig = {
  fresh: { color: "text-emerald-600", bg: "bg-emerald-50", label: "Fresh" },
  stale: { color: "text-amber-600", bg: "bg-amber-50", label: "Stale" },
  offline: { color: "text-red-600", bg: "bg-red-50", label: "Offline" },
  unknown: { color: "text-gray-500", bg: "bg-gray-50", label: "Unknown" },
} as const;

export function SourceHealthDashboard() {
  const [data, setData] = useState<SourceHealthData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    loadSourceHealth()
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

  const healthColor = data.healthScore >= 90 ? "#10b981" : data.healthScore >= 70 ? "#f59e0b" : "#ef4444";
  const chartColors = config.colors.chartColors;
  const connectedCount = data.sources.filter((s) => s.status === "connected").length;
  const healthData = [
    { name: "Healthy", value: data.healthScore },
    { name: "Issues", value: 100 - data.healthScore },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Health Score Donut */}
        <Card className="p-4 flex items-center gap-4">
          <div className="w-20 h-20">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={healthData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={35}
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={0}
                >
                  <Cell fill={healthColor} />
                  <Cell fill="#e5e7eb" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div>
            <p className="text-2xl font-bold" style={{ color: healthColor }}>
              {data.healthScore.toFixed(0)}%
            </p>
            <p className="text-sm text-muted-foreground">System Health</p>
          </div>
        </Card>

        {/* Connected Sources */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Plug className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Sources Connected</span>
          </div>
          <p className="text-2xl font-bold">
            {connectedCount} <span className="text-base font-normal text-muted-foreground">/ {data.sources.length}</span>
          </p>
        </Card>

        {/* Total Records */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Database className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Records Ingested</span>
          </div>
          <p className="text-2xl font-bold">{formatNumber(data.totalRecords)}</p>
        </Card>
      </div>

      {/* Source Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.sources.map((source, i) => {
          const statusCfg = statusConfig[source.status as keyof typeof statusConfig] || statusConfig.pending;
          const freshCfg = freshnessConfig[source.freshness as keyof typeof freshnessConfig] || freshnessConfig.unknown;
          const StatusIcon = statusCfg.icon;

          return (
            <Card key={i} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: chartColors[i % chartColors.length] }} />
                  <span className="text-sm font-semibold">{source.name}</span>
                </div>
                <span className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${statusCfg.bg} ${statusCfg.color}`}>
                  <StatusIcon className="h-3 w-3" />
                  {statusCfg.label}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-mono text-xs">{source.connectorType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Records</span>
                  <span className="font-medium">{source.records > 0 ? formatNumber(source.records) : "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Freshness</span>
                  <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${freshCfg.bg} ${freshCfg.color}`}>
                    {freshCfg.label}
                  </span>
                </div>
                {source.lastSync && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Sync</span>
                    <span className="text-xs">{formatDistanceToNow(parseISO(source.lastSync), { addSuffix: true })}</span>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {data.demo && (
        <p className="text-xs text-center text-muted-foreground">
          Showing demo data. Connect Eclipse to see live connector health from your data warehouse.
        </p>
      )}
    </div>
  );
}
