"use server";
import { db } from "@/db/db";
import { League, leaguesToUsers, users } from "@/db/schema";
import { insertMatches } from "@/db/util/insertMatches";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export const addUserToLeague = async (userId: string, league: League) => {
  const { userId: loggedInUserId } = await auth();
  if (!loggedInUserId) {
    throw new Error("You must be signed in");
  }

  if (!league) {
    throw new Error("League not found");
  }
  if (
    league.leaguesToUsers.some(
      (leaguesToUser) => leaguesToUser.userId === userId
    )
  ) {
    throw new Error("User is already in league");
  }

  // Fetch user data to get firstName and lastName
  const [user] = await db.select().from(users).where(eq(users.id, userId));
  if (!user) {
    throw new Error("User not found");
  }

  // Check if league is already full
  if (league.leaguesToUsers.length >= league.size) {
    throw new Error("League is full and cannot be joined");
  }

  // Add the user to the league
  await db.insert(leaguesToUsers).values({
    userId,
    leagueId: league.id,
    firstName: user.firstName,
    lastName: user.lastName,
    isBot: false,
  });

  // Check if this user joining makes the league full
  const newMemberCount = league.leaguesToUsers.length + 1;
  if (newMemberCount === league.size) {
    // League is now full - generate all matches
    await insertMatches(league.id);
  }
};
