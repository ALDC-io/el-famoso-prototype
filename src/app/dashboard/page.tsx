import { Dashboard } from "@/components/dashboard/Dashboard";
import { config } from "@/config/prospect";

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{config.name} Dashboard</h1>
        <p className="text-sm text-muted-foreground">{config.tagline} — powered by Eclipse</p>
      </div>
      <Dashboard />
    </div>
  );
}
