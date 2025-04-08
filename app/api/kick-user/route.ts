import kickUserFromLeague from "@/actions/kickUserFromLeague";
import { NextResponse } from "next/server";

// api rout e to kick a user from a league
export async function POST(request: Request) {
  const { userId, leagueId } = await request.json();

  if (!userId || !leagueId) {
    return NextResponse.json(
      { error: "Missing userId or leagueId" },
      { status: 400 }
    );
  }
  await kickUserFromLeague({ userId, leagueId });
}
