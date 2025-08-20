"use server";
import { getLeagueById } from "@/db/utils";
import { addUserToLeague } from "./addUserToLeague";
import { revalidatePath } from "next/cache";

interface AddUserToLeagueByIdParams {
  leagueId: string;
  userId: string;
}

export const addUserToLeagueById = async ({ leagueId, userId }: AddUserToLeagueByIdParams) => {
  // Get the league to validate it exists
  const league = await getLeagueById(leagueId);
  if (!league) {
    throw new Error("League not found");
  }

  // Check if user is already in the league
  const existingUser = league.leaguesToUsers.find(
    (leagueToUser) => leagueToUser.userId === userId
  );
  
  if (existingUser) {
    throw new Error("User is already a member of this league");
  }

  // Check if league is full
  if (league.leaguesToUsers.length >= league.size) {
    throw new Error("League is already full");
  }

  // Add user to league
  await addUserToLeague(userId, league);
  
  // Revalidate relevant paths
  revalidatePath("/dashboard");
  revalidatePath("/dev-tools");
  
  return { success: true, leagueId };
};
