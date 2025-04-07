"use server";
import { db } from "@/db/db";
import { leaguesToUsers } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { leaveLeagueFormSchema } from "@/db/formSchema";
import { revalidatePath } from "next/cache";
export const leaveLeague: SubmitHandler<
  z.infer<typeof leaveLeagueFormSchema>
> = async (data) => {
  const { userId: loggedInUserId } = await auth();
  if (!loggedInUserId) {
    throw new Error("You must be signed in");
  }
  await db
    .delete(leaguesToUsers)
    .where(
      and(
        eq(leaguesToUsers.userId, loggedInUserId),
        eq(leaguesToUsers.leagueId, data.leagueId)
      )
    );
  revalidatePath("/dev-tools");
};
