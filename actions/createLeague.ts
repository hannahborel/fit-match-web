"use server";
import { db } from "@/db/db";
import { insertLeagueFormSchema } from "@/db/formSchema";
import { InsertLeague, leagues, leaguesToUsers, users } from "@/db/schema";
import { getLeagueBySlug } from "@/db/utils";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { generateSlug } from "random-word-slugs";
import { z } from "zod";

type CreateLeagueInput = z.infer<typeof insertLeagueFormSchema>;

const createLeague = async (data: CreateLeagueInput) => {
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

  // Fetch user data to get firstName and lastName
  let [user] = await db.select().from(users).where(eq(users.id, userId));

  // If user doesn't exist in DB, sync from Clerk
  if (!user) {
    const { clerkClient } = await import("@clerk/nextjs/server");
    const clerk = await clerkClient();
    const clerkUser = await clerk.users.getUser(userId);

    // Insert user into database
    const [newUser] = await db.insert(users).values({
      id: userId,
      firstName: clerkUser.firstName || "Unknown",
      lastName: clerkUser.lastName || null,
      email: clerkUser.emailAddresses[0]?.emailAddress || null,
      thumbnailUrl: clerkUser.imageUrl || null,
    }).returning();

    user = newUser;
  }

  const insertLeagueToUser = {
    userId: userId,
    leagueId: league.id,
    firstName: user.firstName,
    lastName: user.lastName,
    isBot: false,
  };
  await db.insert(leaguesToUsers).values(insertLeagueToUser).returning();

  // Matches will be generated when the league fills up or starts
  // No longer generating matches at creation time

  revalidatePath("/dev-tools");
  return league;
};

export default createLeague;
