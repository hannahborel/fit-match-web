import { db } from "@/db/db";
import { leaguesToUsers } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

export const removeUserFromLeague = async (
  userId: string,
  leagueId: string
) => {
  const { userId: loggedInUserId } = await auth();
  if (!loggedInUserId) {
    throw new Error("You must be signed in");
  }
  await db
    .delete(leaguesToUsers)
    .where(
      and(
        eq(leaguesToUsers.userId, userId),
        eq(leaguesToUsers.leagueId, leagueId)
      )
    );
};
