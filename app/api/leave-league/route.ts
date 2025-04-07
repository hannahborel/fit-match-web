import { leaveLeague } from "@/actions/leaveLeague";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { leagueId } = await request.json();
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in");
  }

  await leaveLeague({ leagueId });
  return NextResponse.json({ message: "User left league" });
};
