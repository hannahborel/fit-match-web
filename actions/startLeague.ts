"use server";
import { db } from "@/db/db";
import { leaguesToUsers } from "@/db/schema";
import { insertMatches } from "@/db/util/generateMatches";
import { getBots, getLeagueById } from "@/db/utils";
import { auth } from "@clerk/nextjs/server";

const startLeague = async (leagueId: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in");
  }
  if (!leagueId) {
    throw new Error("League ID is required");
  }
  const league = await getLeagueById(leagueId);
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
};

export default startLeague;
