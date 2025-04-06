import { db } from "@/db/db";
import {
  League,
  leaguesToUsers,
  loggedActivities,
  matchesToUsers,
} from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { removeUserFromLeague } from "./removeUserFromLeague";

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
  if (league.leaguesToUsers.length == league.size) {
    const botUser = league.leaguesToUsers.find(
      (leaguesToUser) => leaguesToUser.isBot
    );
    if (botUser) {
      await removeUserFromLeague(botUser.userId, league.id);
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
    isBot: false,
  });
};
