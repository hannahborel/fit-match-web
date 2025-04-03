"use server";
import { db } from "@/db/db";
import { leagues } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

const deleteLeague = async (leagueId: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in");
  }
  return await db.delete(leagues).where(eq(leagues.id, leagueId));
};

export default deleteLeague;
