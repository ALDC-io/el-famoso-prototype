import { useState, useEffect } from "react";
import type { DashboardData } from "@/types/dashboard";
import { mockDashboardData } from "@/lib/mock-data";

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(mockDashboardData);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return { data, loading };
}
