"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Campaign } from "@/types/dashboard";
import { formatCurrency } from "@/lib/utils";
import { DollarSign, TrendingUp, Pause, CheckCircle } from "lucide-react";

interface CampaignROIProps {
  campaigns: Campaign[];
}

const statusConfig = {
  active: { label: "Active", className: "bg-emerald-50 text-emerald-700", icon: TrendingUp },
  paused: { label: "Paused", className: "bg-amber-50 text-amber-700", icon: Pause },
  completed: { label: "Done", className: "bg-slate-100 text-slate-600", icon: CheckCircle },
};

function getRoiColor(roi: number): string {
  if (roi >= 300) return "text-emerald-600";
  if (roi >= 200) return "text-emerald-500";
  if (roi >= 100) return "text-amber-600";
  return "text-red-600";
}

function getRoiBarWidth(roi: number, maxRoi: number): string {
  return `${Math.min((roi / maxRoi) * 100, 100)}%`;
}

export function CampaignROI({ campaigns }: CampaignROIProps) {
  const maxRoi = Math.max(...campaigns.map((c) => c.roi));
  const totalSpend = campaigns.reduce((sum, c) => sum + c.spend, 0);
  const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0);
  const avgRoi = Math.round(((totalRevenue - totalSpend) / totalSpend) * 100);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Campaign ROI</CardTitle>
            <p className="text-sm text-muted-foreground">Spend vs. revenue across channels</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span>Total Spend: {formatCurrency(totalSpend)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Revenue: {formatCurrency(totalRevenue)} &middot; Avg ROI:{" "}
              <span className={getRoiColor(avgRoi)}>{avgRoi}%</span>
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {campaigns.map((campaign) => {
            const status = statusConfig[campaign.status];
            const StatusIcon = status.icon;
            return (
              <div key={campaign.id} className="flex items-center gap-4 py-2 border-b border-border/30 last:border-0">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium truncate">{campaign.name}</p>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${status.className}`}>
                      <StatusIcon className="h-2.5 w-2.5" />
                      {status.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{campaign.channel}</p>
                  <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: getRoiBarWidth(campaign.roi, maxRoi),
                        backgroundColor: campaign.roi >= 300 ? "#10b981" : campaign.roi >= 200 ? "#34d399" : campaign.roi >= 100 ? "#f59e0b" : "#ef4444",
                      }}
                    />
                  </div>
                </div>
                <div className="text-right shrink-0 w-28">
                  <p className={`text-lg font-bold ${getRoiColor(campaign.roi)}`}>{campaign.roi}%</p>
                  <p className="text-[10px] text-muted-foreground">
                    {formatCurrency(campaign.spend)} &rarr; {formatCurrency(campaign.revenue)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
