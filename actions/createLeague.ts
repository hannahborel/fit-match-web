"use server";
import { db } from "@/db/db";
import { insertLeagueFormSchema } from "@/db/formSchema";
import { InsertLeague, leagues, leaguesToUsers } from "@/db/schema";
import { getLeagueById, getLeagueBySlug } from "@/db/utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateSlug } from "random-word-slugs";
import { SubmitHandler } from "react-hook-form";
import z from "zod";

const createLeague: SubmitHandler<
  z.infer<typeof insertLeagueFormSchema>
> = async (data) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in");
  }

  const insertLeague = insertLeagueFormSchema.parse(data);

  insertLeague.ownerId = userId;
  let slug = generateSlug();
  let existingLeague = await getLeagueBySlug(slug);
  while (existingLeague) {
    slug = generateSlug();
    existingLeague = await getLeagueBySlug(slug);
  }
  insertLeague.slug = slug;
  const insertedLeagueIds = await db
    .insert(leagues)
    .values(insertLeague as InsertLeague)
    .returning({ id: leagues.id });

  const insertLeagueToUser = {
    userId: userId,
    leagueId: insertedLeagueIds[0].id,
    isBot: false,
  };
  await db.insert(leaguesToUsers).values(insertLeagueToUser);

  revalidatePath("/dev-tools");
  return await getLeagueById(insertedLeagueIds[0].id);
};

export default createLeague;
