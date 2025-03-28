import { eq } from "drizzle-orm";
import { db } from "./db";
import { leagues, loggedActivities, matches, users } from "./schema";

export const getUserById = async (id: string) => {
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
  return await db.query.leagues.findFirst({
    where: eq(leagues.id, id),
    with: {
      users: true,
      loggedActivities: true,
      matches: true,
      messages: true,
    },
  });
};

export const getMatchById = async (id: string) => {
  return await db.query.matches.findFirst({
    where: eq(matches.id, id),
    with: {
      users: true,
      loggedActivities: true,
      messages: true,
    },
  });
};

export const getActivityById = async (id: string) => {
  return await db.query.loggedActivities.findFirst({
    where: eq(loggedActivities.id, id),
  });
};
