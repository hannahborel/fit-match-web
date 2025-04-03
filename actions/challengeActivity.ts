"use server";

import { db } from "@/db/db";
import { challengeActivityFormSchema } from "@/db/formSchema";
import { activityChallenges } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";

const challengeActivity: SubmitHandler<
  z.infer<typeof challengeActivityFormSchema>
> = async (data) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in");
  }
  const parsedData = challengeActivityFormSchema.parse(data);
  const insertChallenge = {
    ...parsedData,
    challengeEndTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
    createdOn: new Date(Date.now()),
  };
  const challenge = await db
    .insert(activityChallenges)
    .values(insertChallenge)
    .returning();
  return challenge;
};

export { challengeActivity };
