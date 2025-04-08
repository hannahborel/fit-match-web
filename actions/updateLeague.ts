"use server";
import { db } from "@/db/db";
import { UpdateLeague, leagues } from "@/db/schema";
import { getLeagueById } from "@/db/utils";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

const updateLeague = async (updatedLeague: UpdateLeague) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in");
  }
  if (!updatedLeague.id) {
    throw new Error("League ID is required");
  }
  const league = await getLeagueById(updatedLeague.id);
  if (league?.ownerId !== userId) {
    throw new Error("You are not the owner of this league");
  }
  return await db
    .update(leagues)
    .set(updatedLeague)
    .where(eq(leagues.id, updatedLeague.id!))
    .returning();
};

export default updateLeague;
