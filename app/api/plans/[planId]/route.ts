import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { NextResponse } from "next/server";
import type { Id } from "@/convex/_generated/dataModel";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    // Extract planId from the pathname: /api/plans/[planId]
    const match = url.pathname.match(/\/api\/plans\/([^/]+)/);
    const planId = match ? match[1] : null;
    if (!planId) {
      return NextResponse.json({ error: "Missing planId" }, { status: 400 });
    }
    const plan = await fetchQuery(api.plans.getPlanById, {
      planId: planId as Id<"plans">,
    });
    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }
    return NextResponse.json(plan);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
