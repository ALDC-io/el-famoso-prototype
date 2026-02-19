"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { TrafficSource, StateData } from "@/types/dashboard";
import { formatNumber, formatCurrency, formatPercentage } from "@/lib/utils";
import { Globe, MapPin, ArrowUpDown } from "lucide-react";

interface TrafficTableProps {
  sources: TrafficSource[];
  states: StateData[];
}

type SortField = "sessions" | "conversions" | "conversionRate" | "revenue";

const channelColors: Record<string, string> = {
  "Organic Search": "bg-emerald-100 text-emerald-700",
  "Paid Search": "bg-blue-100 text-blue-700",
  Email: "bg-amber-100 text-amber-700",
  Direct: "bg-slate-100 text-slate-700",
  Social: "bg-purple-100 text-purple-700",
  Referral: "bg-green-100 text-green-700",
};

export function TrafficTable({ sources, states }: TrafficTableProps) {
  const [view, setView] = useState<"channels" | "states">("channels");
  const [sortField, setSortField] = useState<SortField>("sessions");
  const [sortAsc, setSortAsc] = useState(false);

  function handleSort(field: SortField) {
    if (sortField === field) setSortAsc(!sortAsc);
    else { setSortField(field); setSortAsc(false); }
  }

  const sortedSources = [...sources].sort((a, b) => {
    const diff = a[sortField] - b[sortField];
    return sortAsc ? diff : -diff;
  });

  const sortedStates = [...states].sort((a, b) => {
    const diff = a[sortField] - b[sortField];
    return sortAsc ? diff : -diff;
  });

  const SortHeader = ({ field, label }: { field: SortField; label: string }) => (
    <th
      className="text-right py-2.5 px-3 text-xs font-medium text-muted-foreground cursor-pointer hover:text-foreground select-none"
      onClick={() => handleSort(field)}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        <ArrowUpDown className={`h-3 w-3 ${sortField === field ? "text-primary" : ""}`} />
      </span>
    </th>
  );

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Traffic & Acquisition</CardTitle>
            <p className="text-sm text-muted-foreground">Traffic sources and geographic breakdown</p>
          </div>
          <div className="flex gap-1 bg-muted rounded-md p-0.5">
            <button
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                view === "channels" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setView("channels")}
            >
              <Globe className="h-3.5 w-3.5" /> Channels
            </button>
            <button
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                view === "states" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setView("states")}
            >
              <MapPin className="h-3.5 w-3.5" /> Top States
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {view === "channels" ? (
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground">Channel</th>
                  <SortHeader field="sessions" label="Sessions" />
                  <SortHeader field="conversions" label="Conversions" />
                  <SortHeader field="conversionRate" label="Conv. Rate" />
                  <SortHeader field="revenue" label="Revenue" />
                  <th className="text-right py-2.5 px-3 text-xs font-medium text-muted-foreground">MoM</th>
                </tr>
              </thead>
              <tbody>
                {sortedSources.map((source) => (
                  <tr key={source.id} className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="py-2.5 px-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${channelColors[source.channel] || "bg-gray-100 text-gray-700"}`}>
                        {source.channel}
                      </span>
                    </td>
                    <td className="text-right py-2.5 px-3 text-sm font-medium">{formatNumber(source.sessions)}</td>
                    <td className="text-right py-2.5 px-3 text-sm">{formatNumber(source.conversions)}</td>
                    <td className="text-right py-2.5 px-3 text-sm">{formatPercentage(source.conversionRate)}</td>
                    <td className="text-right py-2.5 px-3 text-sm font-medium">{formatCurrency(source.revenue)}</td>
                    <td className="text-right py-2.5 px-3">
                      <span className={`text-xs font-semibold ${source.momChange >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                        {source.momChange >= 0 ? "+" : ""}{source.momChange.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground">State</th>
                  <SortHeader field="sessions" label="Sessions" />
                  <SortHeader field="conversions" label="Conversions" />
                  <SortHeader field="conversionRate" label="Conv. Rate" />
                  <SortHeader field="revenue" label="Revenue" />
                </tr>
              </thead>
              <tbody>
                {sortedStates.map((state) => (
                  <tr key={state.state} className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="py-2.5 px-3"><span className="text-sm font-medium">{state.state}</span></td>
                    <td className="text-right py-2.5 px-3 text-sm font-medium">{formatNumber(state.sessions)}</td>
                    <td className="text-right py-2.5 px-3 text-sm">{formatNumber(state.conversions)}</td>
                    <td className="text-right py-2.5 px-3 text-sm">{formatPercentage(state.conversionRate)}</td>
                    <td className="text-right py-2.5 px-3 text-sm font-medium">{formatCurrency(state.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
