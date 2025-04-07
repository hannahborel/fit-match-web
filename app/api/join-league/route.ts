import { addUserToLeagueBySlug } from "@/actions/addUserToLeagueBySlug";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { leagueSlug } = await request.json();
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in");
  }
  await addUserToLeagueBySlug({ leagueSlug });
  return NextResponse.json({ message: "User added to league" });
};
