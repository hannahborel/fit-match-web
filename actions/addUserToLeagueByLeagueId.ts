import { getLeagueBySlug } from "@/db/utils";
import { auth } from "@clerk/nextjs/server";
import { addUserToLeague } from "./addUserToLeague";

export const addUserToLeagueByLeagueId = async (
  userId: string,
  slug: string
) => {
  const { userId: loggedInUserId } = await auth();
  if (!loggedInUserId) {
    throw new Error("You must be signed in");
  }

  const league = await getLeagueBySlug(slug);
  if (!league) {
    throw new Error("League not found");
  }
  await addUserToLeague(userId, league);
};
