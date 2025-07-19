import { NextRequest, NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import type { Id } from "@/convex/_generated/dataModel";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL as string;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId: clerkUserId } = await params;
  try {
    const convex = new ConvexHttpClient(convexUrl);
    // Look up Convex user by Clerk userId
    const user = await convex.query(api.users.getUser, {
      clerkId: clerkUserId,
    });
    if (!user) {
      // No such user in Convex DB
      return NextResponse.json([]);
    }
    // Use Convex user _id to fetch plans
    const plans = await convex.query(api.plans.getPlansByUser, {
      userId: user._id as Id<"users">,
    });
    return NextResponse.json(plans);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch plans" },
      { status: 500 }
    );
  }
}
