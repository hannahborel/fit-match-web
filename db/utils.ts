import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { leagues, leaguesToUsers, loggedActivities, matches } from "./schema";

export const getCurrentLeague = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in");
  }
  const leagueToUser = await db.query.leaguesToUsers.findFirst({
    where: eq(leaguesToUsers.userId, userId),
  });
  if (!leagueToUser) {
    return null;
  }
  return getLeagueById(leagueToUser.leagueId);
};

export const getLeagueById = async (id: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in");
  }
  return await db.query.leagues.findFirst({
    where: eq(leagues.id, id),
    with: {
      leaguesToUsers: true,
      loggedActivities: true,
      matches: true,
      messages: true,
    },
  });
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
      matches: true,
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
      matches: true,
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
  bots.slice(0, count);
  return bots;
};
