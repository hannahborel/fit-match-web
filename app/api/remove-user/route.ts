import { leaveLeague } from "@/actions/leaveLeague";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { leagueId } = await request.json();

  await leaveLeague({ leagueId });
  return NextResponse.json({ message: "User removed from league" });
};
