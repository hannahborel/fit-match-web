"use server";
import { db } from "@/db/db";
import { leagues, leaguesToUsers } from "@/db/schema";
import { insertMatches } from "@/db/util/generateMatches";
import { getBots, getLeagueById } from "@/db/utils";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

const startLeague = async (leagueId: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in");
  }
  if (!leagueId) {
    throw new Error("League ID is required");
  }
  const league = await getLeagueById(leagueId);
  if (league?.ownerId !== userId) {
    throw new Error("You are not the owner of this league");
  }
  if (!league) {
    throw new Error("League not found");
  }
  if (league.leaguesToUsers.length < league.size) {
    const bots = await getBots(league.size - league.leaguesToUsers.length);
    await db.insert(leaguesToUsers).values(
      bots.map((bot) => ({
        userId: bot.id,
        leagueId: leagueId,
      }))
    );
  }
  await insertMatches(league);
  league.startDate = new Date(Date.now() + 1000 * 60 * 60 * 24); // Set start date to one day in the future
  await db
    .update(leagues)
    .set({
      startDate: league.startDate,
    })
    .where(eq(leagues.id, leagueId)); // Ensure 'leagues' is imported from the schema
};

export default startLeague;
