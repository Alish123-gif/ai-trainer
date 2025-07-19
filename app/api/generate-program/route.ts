import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    // Replace with your actual Convex deployment URL or use env variable
    const convexUrl =
      process.env.NEXT_PUBLIC_CONVEX_URL || "http://localhost:4000";

    console.log("Making request to:", `${convexUrl}/api/http/generate-program`);

    const res = await fetch(`${convexUrl}/http/generate-program`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // Check if the response is ok
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Convex server error:", res.status, errorText);
      return NextResponse.json(
        {
          success: false,
          error: `Convex server error: ${res.status} - ${errorText}`,
        },
        { status: 500 }
      );
    }

    // Try to parse JSON response
    let data;
    try {
      data = await res.json();
    } catch {
      const responseText = await res.text();
      console.error("Failed to parse JSON response:", responseText);
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON response from Convex server",
          details: responseText,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Error in generate-program route:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
