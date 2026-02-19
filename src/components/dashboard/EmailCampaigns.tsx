"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { EmailCampaign } from "@/types/dashboard";
import { formatNumber, formatCurrency, formatPercentage } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { Mail, Send, Clock, FileEdit } from "lucide-react";

interface EmailCampaignsProps {
  campaigns: EmailCampaign[];
}

const statusConfig = {
  sent: { label: "Sent", className: "bg-emerald-50 text-emerald-700", icon: Send },
  scheduled: { label: "Scheduled", className: "bg-blue-50 text-blue-700", icon: Clock },
  draft: { label: "Draft", className: "bg-slate-100 text-slate-600", icon: FileEdit },
};

export function EmailCampaigns({ campaigns }: EmailCampaignsProps) {
  const sentCampaigns = campaigns.filter((c) => c.status === "sent");
  const totalRevenue = sentCampaigns.reduce((s, c) => s + c.revenue, 0);
  const avgOpenRate = sentCampaigns.length > 0
    ? sentCampaigns.reduce((s, c) => s + c.openRate, 0) / sentCampaigns.length
    : 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Email Marketing
            </CardTitle>
            <p className="text-sm text-muted-foreground">Campaign performance &amp; attribution</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>Avg Open: <strong className="text-foreground">{formatPercentage(avgOpenRate)}</strong></span>
              <span>Revenue: <strong className="text-foreground">{formatCurrency(totalRevenue)}</strong></span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground">Campaign</th>
                <th className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground">Date</th>
                <th className="text-right py-2.5 px-3 text-xs font-medium text-muted-foreground">Recipients</th>
                <th className="text-right py-2.5 px-3 text-xs font-medium text-muted-foreground">Open Rate</th>
                <th className="text-right py-2.5 px-3 text-xs font-medium text-muted-foreground">Click Rate</th>
                <th className="text-right py-2.5 px-3 text-xs font-medium text-muted-foreground">Conversions</th>
                <th className="text-right py-2.5 px-3 text-xs font-medium text-muted-foreground">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => {
                const status = statusConfig[campaign.status];
                const StatusIcon = status.icon;
                return (
                  <tr key={campaign.id} className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{campaign.name}</p>
                        <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${status.className}`}>
                          <StatusIcon className="h-2.5 w-2.5" />
                          {status.label}
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-sm text-muted-foreground">{format(parseISO(campaign.sentDate), "MMM d")}</td>
                    <td className="text-right py-2.5 px-3 text-sm">{formatNumber(campaign.recipients)}</td>
                    <td className="text-right py-2.5 px-3 text-sm">
                      {campaign.status === "sent" ? (
                        <span className={campaign.openRate >= 40 ? "text-emerald-600 font-medium" : campaign.openRate >= 25 ? "text-foreground" : "text-amber-600"}>
                          {formatPercentage(campaign.openRate)}
                        </span>
                      ) : <span className="text-muted-foreground">&mdash;</span>}
                    </td>
                    <td className="text-right py-2.5 px-3 text-sm">
                      {campaign.status === "sent" ? formatPercentage(campaign.clickRate) : <span className="text-muted-foreground">&mdash;</span>}
                    </td>
                    <td className="text-right py-2.5 px-3 text-sm font-medium">
                      {campaign.status === "sent" ? formatNumber(campaign.conversions) : <span className="text-muted-foreground">&mdash;</span>}
                    </td>
                    <td className="text-right py-2.5 px-3 text-sm font-medium">
                      {campaign.status === "sent" ? formatCurrency(campaign.revenue) : <span className="text-muted-foreground">&mdash;</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
