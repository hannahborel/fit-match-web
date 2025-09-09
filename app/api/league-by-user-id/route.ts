import { getCurrentLeague } from "@/db/utils";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export const GET = async (request: Request) => {
  try {
    // Get the authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authorization header missing or invalid" },
        { status: 401 }
      );
    }

    // For API routes that are public but need auth, we need to manually verify the token
    // Since this is a public route, we'll need to handle auth differently
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "You must be signed in" },
        { status: 401 }
      );
    }

    const league = await getCurrentLeague();
    if (league) {
      return NextResponse.json({ league });
    } else {
      console.log("No league found");
      return NextResponse.json(null);
    }
  } catch (error) {
    console.log("Auth Error:", error);
    return NextResponse.json(
      { error: "You must be signed in" },
      { status: 401 }
    );
  }
};
