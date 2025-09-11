import { getCurrentLeague } from "@/db/utils";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({
        error: "Authentication required. Please sign in to access your league.",
      });
    }

    const league = await getCurrentLeague();
    if (league) {
      return NextResponse.json({ league });
    } else {
      return NextResponse.json(null);
    }
  } catch (error) {
    console.error(error);
  }
};
