import { api } from "@/convex/_generated/api";
import { fetchMutation } from "convex/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { planId } = await req.json();
    const newPlanId = await fetchMutation(api.plans.duplicatePlan, { planId });
    return NextResponse.json({ success: true, newPlanId });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
