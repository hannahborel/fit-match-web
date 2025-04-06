"use server";
import { db } from "@/db/db";
import { deleteLeagueFormSchema } from "@/db/formSchema";
import { leagues, leaguesToUsers } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { SubmitHandler } from "react-hook-form";
import z from "zod";

const deleteLeague: SubmitHandler<
  z.infer<typeof deleteLeagueFormSchema>
> = async (data) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in");
  }
  await db.delete(leaguesToUsers).where(eq(leaguesToUsers.leagueId, data.id));
  await db.delete(leagues).where(eq(leagues.id, data.id));
  revalidatePath("/dev-tools");
};

export default deleteLeague;
