import { getLeagueByIdPublic } from "@/db/utils";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ leagueId: string }> }
) => {
  try {
    const { leagueId } = await params;

    if (!leagueId) {
      return NextResponse.json(
        { error: "League ID is required" },
        { status: 400 }
      );
    }

    const league = await getLeagueByIdPublic(leagueId);

    if (!league) {
      return NextResponse.json({ error: "League not found" }, { status: 404 });
    }

    // Return only the information needed for the invitation page
    const leagueInfo = {
      id: league.id,
      name: league.name,
      description: league.description,
      size: league.size,
      weeks: league.weeks,
      startDate: league.startDate,
      currentMemberCount: league.leaguesToUsers.length,
      ownerName: league.ownerName, // We'll add this to the utils function
    };

    return NextResponse.json({ league: leagueInfo });
  } catch (error) {
    console.error("Error fetching league invite info:", error);
    return NextResponse.json(
      { error: "Failed to fetch league information" },
      { status: 500 }
    );
  }
};
