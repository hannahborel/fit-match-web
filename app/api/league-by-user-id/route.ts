import { getCurrentLeague } from "@/db/utils";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    console.log("🔍 Starting league-by-user-id request");
    const { userId } = await auth();
    console.log("Current userId:", userId);

    if (!userId) {
      console.log("❌ No userId found - user not authenticated");
      console.log("Auth object:", { userId });
      return NextResponse.json(
        {
          error:
            "Authentication required. Please sign in to access your league.",
        },
        { status: 401 }
      );
    }

    console.log("🔍 Fetching league for user:", userId);
    const league = await getCurrentLeague();
    if (league) {
      console.log("✅ League found:", { id: league.id, name: league.name });
      return NextResponse.json({ league });
    } else {
      console.log("❌ No league found for user:", userId);

      // Let's check if there are any leaguesToUsers records at all
      const allLeagueToUsers = await db.query.leaguesToUsers.findMany();
      console.log("📊 All leaguesToUsers records:", allLeagueToUsers.length);
      console.log("📊 Sample records:", allLeagueToUsers.slice(0, 3));

      return NextResponse.json(null);
    }
  } catch (error) {
    console.error("Server Error Details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : "Unknown",
      error: error,
    });

    // Provide more specific error messages based on the error type
    if (error instanceof Error) {
      if (
        error.message.includes("database") ||
        error.message.includes("connection")
      ) {
        return NextResponse.json(
          { error: "Database connection error. Please try again later." },
          { status: 500 }
        );
      }
      if (error.message.includes("timeout")) {
        return NextResponse.json(
          { error: "Request timed out. Please try again." },
          { status: 408 }
        );
      }
    }

    return NextResponse.json(
      { error: "Unable to fetch league data. Please try again later." },
      { status: 500 }
    );
  }
};
