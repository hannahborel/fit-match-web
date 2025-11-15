"use server";
import { db } from "@/db/db";
import { deleteLeagueFormSchema } from "@/db/formSchema";
import {
  leagues,
  leaguesToUsers,
  matches,
  matchesToUsers,
  loggedActivities,
  leagueMessages,
  matchMessages,
  activityChallenges,
} from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { SubmitHandler } from "react-hook-form";
import z from "zod";

const deleteLeague: SubmitHandler<
  z.infer<typeof deleteLeagueFormSchema>
> = async (data) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in");
  }

  // Get all match IDs for this league to delete related match data
  const leagueMatches = await db
    .select({ id: matches.id })
    .from(matches)
    .where(eq(matches.leagueId, data.id));

  const matchIds = leagueMatches.map((match) => match.id);

  // Delete in the correct order to maintain referential integrity:
  // 1. Delete activity challenges (references loggedActivities and leagues)
  await db
    .delete(activityChallenges)
    .where(eq(activityChallenges.leagueId, data.id));

  // 2. Delete match messages (references matches)
  if (matchIds.length > 0) {
    await db
      .delete(matchMessages)
      .where(inArray(matchMessages.matchId, matchIds));
  }

  // 3. Delete league messages (references leagues)
  await db.delete(leagueMessages).where(eq(leagueMessages.leagueId, data.id));

  // 4. Delete logged activities (references leagues and matches)
  await db
    .delete(loggedActivities)
    .where(eq(loggedActivities.leagueId, data.id));

  // 5. Delete matchesToUsers (references matches)
  if (matchIds.length > 0) {
    await db
      .delete(matchesToUsers)
      .where(inArray(matchesToUsers.matchId, matchIds));
  }

  // 6. Delete matches (references leagues)
  await db.delete(matches).where(eq(matches.leagueId, data.id));

  // 7. Delete leaguesToUsers (references leagues)
  await db.delete(leaguesToUsers).where(eq(leaguesToUsers.leagueId, data.id));

  // 8. Finally, delete the league itself
  await db.delete(leagues).where(eq(leagues.id, data.id));

  revalidatePath("/dev-tools");
};

export default deleteLeague;
