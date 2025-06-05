import { getLeagueById } from "@/db/utils";
import { NextResponse } from "next/server";
export const GET = async (request: Request) => {
  const { leagueId } = await request.json();

  const league = await getLeagueById(leagueId);
  if (league) {
    return NextResponse.json(league);
  } else {
    return NextResponse.json({ message: "League not found" });
  }
};
