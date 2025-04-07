import { getMatchById } from "@/db/utils";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { matchId } = await request.json();

  const match = await getMatchById(matchId);
  if (match) {
    return NextResponse.json(match);
  } else {
    return NextResponse.json({ message: "Match not found" });
  }
};
