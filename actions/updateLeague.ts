"use server";
import { db } from "@/db/db";
import { UpdateLeague, leagues } from "@/db/schema";
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
  return await db
    .update(leagues)
    .set(updatedLeague)
    .where(eq(leagues.id, updatedLeague.id!))
    .returning();
};

export default updateLeague;
