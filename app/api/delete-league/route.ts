import deleteLeague from "@/actions/deleteLeague";
import { NextResponse } from "next/server";
export const POST = async (request: Request) => {
  const { leagueId } = await request.json();
  await deleteLeague(leagueId);
  return NextResponse.json({ message: "League deleted" });
};
