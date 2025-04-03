import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { leagues, loggedActivities, matches, users } from "./schema";

export const getUserById = async (id: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in");
  }
  return await db.query.users.findFirst({
    where: eq(users.id, id),
    with: {
      leagues: true,
      loggedActivities: true,
      matches: true,
    },
  });
};

export const getLeagueById = async (id: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in");
  }
  return await db.query.leagues.findFirst({
    where: eq(leagues.id, id),
    with: {
      leaguesToUsers: { with: { user: true } },
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
  const bots = await db.query.users.findMany({
    where: eq(users.isBot, true),
    limit: count,
  });
  if (bots.length < count) {
    bots.push(...(await getBots(count - bots.length)));
  }
  return bots;
};
