import { Dashboard } from "@/components/dashboard/Dashboard";
import { ProfitabilityDashboard } from "@/components/dashboard/ProfitabilityDashboard";
import { WarehouseDashboard } from "@/components/dashboard/WarehouseDashboard";
import { SourceHealthDashboard } from "@/components/dashboard/SourceHealthDashboard";
import { config } from "@/config/prospect";

const variantMap = {
  standard: Dashboard,
  profitability: ProfitabilityDashboard,
  warehouse: WarehouseDashboard,
  sources: SourceHealthDashboard,
} as const;

export default function DashboardPage() {
  const variant = config.dashboardVariant || "standard";
  const DashComponent = variantMap[variant] || Dashboard;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{config.name} Dashboard</h1>
        <p className="text-sm text-muted-foreground">{config.tagline} — powered by Eclipse</p>
      </div>
      <DashComponent />
    </div>
  );
}
