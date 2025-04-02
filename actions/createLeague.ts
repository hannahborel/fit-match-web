"use server";
import { db } from "@/db/db";
import { InsertLeague, leagues } from "@/db/schema";
import { getLeagueById } from "@/db/utils";
import { auth } from "@clerk/nextjs/server";

const CreateLeague = async (insertLeague: InsertLeague) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in");
  }
  const insertedLeagueIds = await db
    .insert(leagues)
    .values(insertLeague)
    .returning({ id: leagues.id });
  return await getLeagueById(insertedLeagueIds[0].id);
};

export default CreateLeague;
