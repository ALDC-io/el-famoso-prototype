// Eclipse API types — placeholder for future live connection
export interface EclipseMetric {
  name: string;
  value: number;
  change: number;
  period: string;
}

export interface EclipseResponse {
  success: boolean;
  data: EclipseMetric[];
  timestamp: string;
}

// Future: Connect to live Eclipse API
// export async function fetchEclipseData(endpoint: string): Promise<EclipseResponse> {
//   const res = await fetch(`/api/eclipse/${endpoint}`);
//   return res.json();
// }
