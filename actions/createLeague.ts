"use server";
import { db } from "@/db/db";
import { insertLeagueFormSchema } from "@/db/formSchema";
import { InsertLeague, leagues, leaguesToUsers } from "@/db/schema";
import { CreateLeagueInput } from "hustle-types";
import { insertMatches } from "@/db/util/insertMatches";
import { getLeagueBySlug } from "@/db/utils";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { generateSlug } from "random-word-slugs";
import { SubmitHandler } from "react-hook-form";
import z from "zod";

const createLeague: SubmitHandler<CreateLeagueInput> = async (data) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in");
  }

  // Check if user already has a league
  const existingLeagueToUser = await db.query.leaguesToUsers.findFirst({
    where: eq(leaguesToUsers.userId, userId),
  });

  if (existingLeagueToUser) {
    throw new Error(
      "You already have a league. Users can only be in one league at a time."
    );
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
  const league = (
    await db
      .insert(leagues)
      .values(insertLeague as InsertLeague)
      .returning()
  )[0];

  if (!league) {
    throw new Error("Leage was not fully created");
  }

  const insertLeagueToUser = {
    userId: userId,
    leagueId: league.id,
    isBot: false,
  };
  await db.insert(leaguesToUsers).values(insertLeagueToUser).returning();
  // const bots = await getBots(league.size - 1);
  // await db.insert(leaguesToUsers).values(
  //   bots.map((bot) => ({
  //     userId: bot.id,
  //     leagueId: league.id,
  //     isBot: true,
  //   }))
  // );

  await insertMatches(league.id);

  revalidatePath("/dev-tools");
  return league;
};

export default createLeague;
