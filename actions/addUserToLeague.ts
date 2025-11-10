"use server";
import { db } from "@/db/db";
import {
  League,
  leaguesToUsers,
  loggedActivities,
  matchesToUsers,
  users,
} from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

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

  if (league.leaguesToUsers.length == league.size) {
    const botUser = league.leaguesToUsers.find(
      (leaguesToUser) => leaguesToUser.isBot
    );
    if (botUser) {
      await db
        .delete(leaguesToUsers)
        .where(
          and(
            eq(leaguesToUsers.userId, botUser.userId),
            eq(leaguesToUsers.leagueId, league.id)
          )
        );
      await db
        .update(matchesToUsers)
        .set({
          userId,
        })
        .where(eq(matchesToUsers.userId, botUser.userId));
      await db
        .update(loggedActivities)
        .set({
          userId,
        })
        .where(eq(loggedActivities.userId, botUser.userId));
    } else {
      throw new Error("League is full and cannot be joined");
    }
  }
  await db.insert(leaguesToUsers).values({
    userId,
    leagueId: league.id,
    firstName: user.firstName,
    lastName: user.lastName,
    isBot: false,
  });
};
