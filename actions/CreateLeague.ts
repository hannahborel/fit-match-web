"use server";

import { db } from "@/db/db";
import { InsertLeague, leagues } from "@/db/schema";
import { getLeagueById } from "@/db/utils";

const CreateLeague = async (insertLeague: InsertLeague) => {
  const insertedLeagueIds = await db
    .insert(leagues)
    .values(insertLeague)
    .returning({ id: leagues.id });
  return await getLeagueById(insertedLeagueIds[0].id);
};

export default CreateLeague;
