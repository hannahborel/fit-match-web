"use server";
import { db } from "@/db/db";
import { kickUserFromLeagueFormSchema } from "@/db/formSchema";
import { leaguesToUsers } from "@/db/schema";
import { getLeagueById } from "@/db/utils";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { SubmitHandler } from "react-hook-form";
import z from "zod";

const kickUserFromLeague: SubmitHandler<
  z.infer<typeof kickUserFromLeagueFormSchema>
> = async (data) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in");
  }
  const league = await getLeagueById(data.leagueId);
  if (!league) {
    throw new Error("League not found");
  }
  if (league.ownerId !== userId) {
    throw new Error("You are not the owner of this league");
  }

  await db
    .delete(leaguesToUsers)
    .where(
      and(
        eq(leaguesToUsers.userId, data.userId),
        eq(leaguesToUsers.leagueId, data.leagueId)
      )
    );
  revalidatePath("/dev-tools");
};

export default kickUserFromLeague;
