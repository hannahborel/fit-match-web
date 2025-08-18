// /app/api/join-league/route.ts
import { addUserToLeagueBySlug } from "@/actions/addUserToLeagueBySlug";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { leagueSlug } = await request.json();
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("You must be signed in", { status: 401 });
  }
  await addUserToLeagueBySlug({ leagueSlug });
  return NextResponse.json({ message: "User added to league" });
};
