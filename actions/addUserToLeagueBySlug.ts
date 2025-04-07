"use server";
import { joinLeagueFormSchema } from "@/db/formSchema";
import { getLeagueBySlug } from "@/db/utils";
import { auth } from "@clerk/nextjs/server";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { addUserToLeague } from "./addUserToLeague";
import { revalidatePath } from "next/cache";

export const addUserToLeagueBySlug: SubmitHandler<
  z.infer<typeof joinLeagueFormSchema>
> = async (data) => {
  const { userId: loggedInUserId } = await auth();
  if (!loggedInUserId) {
    throw new Error("You must be signed in");
  }

  const league = await getLeagueBySlug(data.leagueSlug);
  if (!league) {
    throw new Error("League not found");
  }
  await addUserToLeague(loggedInUserId, league);
  revalidatePath("/dev-tools");
};
