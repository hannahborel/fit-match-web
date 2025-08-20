import { addUserToLeagueById } from "@/actions/addUserToLeagueById";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const { leagueId } = await request.json();
    
    if (!leagueId) {
      return NextResponse.json(
        { error: "League ID is required" },
        { status: 400 }
      );
    }

    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "You must be signed in" },
        { status: 401 }
      );
    }

    await addUserToLeagueById({ leagueId, userId });
    
    return NextResponse.json({ 
      message: "Successfully joined league",
      leagueId 
    });
  } catch (error) {
    console.error("Error joining league:", error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to join league" },
      { status: 500 }
    );
  }
};
