import { NextResponse } from "next/server";

// Eclipse API proxy — placeholder for future live connection
export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Eclipse API proxy — not yet connected. Using mock data.",
    timestamp: new Date().toISOString(),
  });
}
