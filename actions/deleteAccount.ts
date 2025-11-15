"use server";
import { db } from "@/db/db";
import {
  users,
  leaguesToUsers,
  loggedActivities,
  leagueMessages,
  matchMessages,
  activityChallenges,
  matchesToUsers,
  leagues,
  matches,
} from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, inArray } from "drizzle-orm";

/**
 * Deletes a user account completely, including:
 * - All user-related data from the database
 * - User account from Clerk
 * - All leagues owned by the user (with all their related data)
 */
const deleteAccount = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in");
  }

  try {
    // Step 1: Get all leagues owned by this user
    const ownedLeagues = await db
      .select({ id: leagues.id })
      .from(leagues)
      .where(eq(leagues.ownerId, userId));

    const ownedLeagueIds = ownedLeagues.map((league) => league.id);

    // Step 2: Delete all leagues owned by this user (includes all league-related data)
    for (const leagueId of ownedLeagueIds) {
      // Get all match IDs for this league
      const leagueMatches = await db
        .select({ id: matches.id })
        .from(matches)
        .where(eq(matches.leagueId, leagueId));

      const matchIds = leagueMatches.map((match) => match.id);

      // Delete in correct order to maintain referential integrity:

      // 1. Delete activity challenges
      await db
        .delete(activityChallenges)
        .where(eq(activityChallenges.leagueId, leagueId));

      // 2. Delete match messages
      if (matchIds.length > 0) {
        await db
          .delete(matchMessages)
          .where(inArray(matchMessages.matchId, matchIds));
      }

      // 3. Delete league messages
      await db.delete(leagueMessages).where(eq(leagueMessages.leagueId, leagueId));

      // 4. Delete logged activities
      await db
        .delete(loggedActivities)
        .where(eq(loggedActivities.leagueId, leagueId));

      // 5. Delete matchesToUsers
      if (matchIds.length > 0) {
        await db
          .delete(matchesToUsers)
          .where(inArray(matchesToUsers.matchId, matchIds));
      }

      // 6. Delete matches
      await db.delete(matches).where(eq(matches.leagueId, leagueId));

      // 7. Delete leaguesToUsers
      await db.delete(leaguesToUsers).where(eq(leaguesToUsers.leagueId, leagueId));

      // 8. Delete the league itself
      await db.delete(leagues).where(eq(leagues.id, leagueId));
    }

    // Step 3: Delete user's participation in leagues they don't own
    // This includes their logged activities, messages, challenges, etc.

    // Delete user's activity challenges in other leagues
    await db
      .delete(activityChallenges)
      .where(eq(activityChallenges.userId, userId));

    // Delete user's league messages
    await db.delete(leagueMessages).where(eq(leagueMessages.senderId, userId));

    // Delete user's match messages
    await db.delete(matchMessages).where(eq(matchMessages.senderId, userId));

    // Delete user's logged activities
    await db.delete(loggedActivities).where(eq(loggedActivities.userId, userId));

    // Delete user's match participations
    await db.delete(matchesToUsers).where(eq(matchesToUsers.userId, userId));

    // Delete user's league memberships
    await db.delete(leaguesToUsers).where(eq(leaguesToUsers.userId, userId));

    // Step 4: Delete user from database
    await db.delete(users).where(eq(users.id, userId));

    // Step 5: Delete user from Clerk
    const { clerkClient } = await import("@clerk/nextjs/server");
    const clerk = await clerkClient();
    await clerk.users.deleteUser(userId);

    return { success: true, message: "Account deleted successfully" };
  } catch (error) {
    console.error("Delete account error:", error);
    throw new Error("Failed to delete account. Please try again.");
  }
};

export default deleteAccount;
