"use client";

import { useDashboardData } from "@/hooks/useDashboardData";
import { MetricCard } from "./MetricCard";
import { RevenueChart } from "./RevenueChart";
import { FunnelChart } from "./FunnelChart";
import { TrafficTable } from "./TrafficTable";
import { EmailCampaigns } from "./EmailCampaigns";
import { CampaignROI } from "./CampaignROI";
import { Loader2 } from "lucide-react";

export function Dashboard() {
  const { data, loading } = useDashboardData();

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.kpis.map((metric) => (
          <MetricCard key={metric.icon} metric={metric} />
        ))}
      </div>

      {/* Revenue + Campaign ROI */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <RevenueChart data={data.revenueData} />
        </div>
        <div className="lg:col-span-2">
          <CampaignROI campaigns={data.campaigns} />
        </div>
      </div>

      {/* Conversion Funnel */}
      <FunnelChart steps={data.funnelSteps} />

      {/* Traffic & Acquisition */}
      <TrafficTable sources={data.trafficSources} states={data.topStates} />

      {/* Email Marketing */}
      <EmailCampaigns campaigns={data.emailCampaigns} />
    </div>
  );
}
