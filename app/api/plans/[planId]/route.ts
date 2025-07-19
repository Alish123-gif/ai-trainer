import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { NextResponse } from "next/server";
import type { Id } from "@/convex/_generated/dataModel";

export async function GET(
  _req: Request,
  { params }: { params: { planId: string } }
) {
  try {
    const plan = await fetchQuery(api.plans.getPlanById, {
      planId: params.planId as Id<"plans">,
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
