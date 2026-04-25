import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    service: "BYLDRS GUARDIAN",
    timestamp: new Date().toISOString(),
  });
}
