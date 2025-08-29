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

    // Mock league data for testing deep linking
    const mockLeague = {
      id: leagueId,
      name: `Test League ${leagueId}`,
      description:
        "This is a test league for testing the deep linking system. Join us for some fitness fun!",
      size: 8,
      weeks: 12,
      startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
      currentMemberCount: 3,
      ownerName: "Test League Owner",
    };

    return NextResponse.json({ league: mockLeague });
  } catch (error) {
    console.error("Error in test league endpoint:", error);
    return NextResponse.json(
      { error: "Failed to fetch test league information" },
      { status: 500 }
    );
  }
};
