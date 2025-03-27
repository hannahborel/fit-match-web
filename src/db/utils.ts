import { eq } from "drizzle-orm";
import { db } from "./db";
import { activities, leagues, matches, users } from "./schema";

export const getUserById = async (id: string) => {
  return await db.query.users.findFirst({
    where: eq(users.id, id),
    with: {
      leagues: true,
    },
  });
};

export const getLeagueById = async (id: string) => {
  return await db.query.leagues.findFirst({
    where: eq(leagues.id, id),
  });
};

export const getMatchById = async (id: string) => {
  return await db.query.matches.findFirst({
    where: eq(matches.id, id),
    with: {
      users: true,
      activities: true,
      messages: true,
    },
  });
};

export const getActivityById = async (id: string) => {
  return await db.query.activities.findFirst({
    where: eq(activities.id, id),
  });
};
