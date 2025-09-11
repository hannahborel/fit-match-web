import { FitMatchUser } from "@/types/types";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { eq, inArray } from "drizzle-orm";
import { db } from "./db";
import {
  bots,
  League,
  leagues,
  leaguesToUsers,
  loggedActivities,
  matches,
} from "./schema";

export const getUsersForLeague = async (league: League) => {
  const userIds = league.leaguesToUsers
    .filter((leagueToUser) => !leagueToUser.isBot)
    .map((user) => user.userId);
  const userResponse = (
    await (
      await clerkClient()
    ).users.getUserList({
      userId: userIds,
    })
  ).data.map(
    (user) =>
      ({
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
        imageUrl: user.imageUrl,
        username: user.username,
        isBot: false,
      } as FitMatchUser)
  );
  const botIds = league.leaguesToUsers
    .filter((leagueToUser) => leagueToUser.isBot)
    .map((user) => user.userId);
  const botsResponse = await db.query.bots.findMany({
    where: inArray(bots.id, botIds),
  });
  return userResponse.concat(
    botsResponse.map((bot) => ({ ...bot, isBot: true }))
  );
};

export const getMemberUsersForLeague = async (league: League) => {
  const userIds = league.leaguesToUsers
    .filter((leagueToUser) => !leagueToUser.isBot)
    .filter((leagueToUser) => leagueToUser.userId !== league.ownerId)
    .map((user) => user.userId);
  if (userIds.length === 0) {
    return [];
  }
  const userResponse = (
    await (
      await clerkClient()
    ).users.getUserList({
      userId: userIds,
    })
  ).data.map(
    (user) =>
      ({
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
        imageUrl: user.imageUrl,
        username: user.username,
      } as FitMatchUser)
  );
  return userResponse;
};

export const getCurrentLeague = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in");
  }
  const leagueToUser = await db.query.leaguesToUsers.findFirst({
    where: eq(leaguesToUsers.userId, userId),
  });
  if (!leagueToUser) {
    console.log(`ℹ️ No leaguesToUsers record found for user: ${userId}`);
    return null;
  }

  console.log(
    `🔍 Found leaguesToUsers record for user: ${userId}, leagueId: ${leagueToUser.leagueId}`
  );
  try {
    return await getLeagueById(leagueToUser.leagueId);
  } catch (error) {
    console.error(
      `❌ Error fetching league ${leagueToUser.leagueId} for user ${userId}:`,
      error
    );
    throw error;
  }
};

export const getLeagueById = async (id: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in");
  }
  const league = await db.query.leagues.findFirst({
    where: eq(leagues.id, id),
    with: {
      leaguesToUsers: true,
      loggedActivities: true,
      matches: { with: { matchesToUsers: true } },
      messages: true,
    },
  });
  if (!league) {
    // Enhanced error message for debugging data integrity issues
    console.error(`❌ League not found with ID: ${id} for user: ${userId}`);
    console.error(
      "This may indicate a data integrity issue where leaguesToUsers references a non-existent league"
    );
    throw new Error(`League not found with this ID: ${id}`);
  }
  return league;
};

export const getLeagueByIdPublic = async (id: string) => {
  const league = await db.query.leagues.findFirst({
    where: eq(leagues.id, id),
    with: {
      leaguesToUsers: true,
    },
  });

  if (!league) {
    return null;
  }

  // Get the owner's name from Clerk
  let ownerName = "League Manager";
  try {
    const owner = await (await clerkClient()).users.getUser(league.ownerId);
    ownerName = owner.firstName || ownerName;
  } catch (error) {
    console.error("Error fetching owner name:", error);
  }

  return {
    ...league,
    ownerName,
  };
};

export const getLeagueBySlug = async (slug: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in");
  }
  return await db.query.leagues.findFirst({
    where: eq(leagues.slug, slug),
    with: {
      leaguesToUsers: true,
      loggedActivities: true,
      matches: { with: { matchesToUsers: true } },
      messages: true,
    },
  });
};

export const getLeagues = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in");
  }
  return await db.query.leagues.findMany({
    with: {
      leaguesToUsers: true,
      loggedActivities: true,
      matches: { with: { matchesToUsers: true } },
      messages: true,
    },
  });
};

export const getMatchById = async (id: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in");
  }
  return await db.query.matches.findFirst({
    where: eq(matches.id, id),
    with: {
      matchesToUsers: true,
      loggedActivities: true,
      messages: true,
    },
  });
};

export const getActivityById = async (id: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in");
  }
  return await db.query.loggedActivities.findFirst({
    where: eq(loggedActivities.id, id),
  });
};

export const getBots = async (count: number) => {
  //make this get a random selection of bots from the database
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in");
  }
  const bots = await db.query.bots.findMany();
  if (bots.length < count) {
    bots.push(...(await getBots(count - bots.length)));
  }
  for (let i = bots.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bots[i], bots[j]] = [bots[j], bots[i]];
  }
  return bots.slice(0, count);
};
