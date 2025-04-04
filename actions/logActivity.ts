"use server";

import { db } from "@/db/db";
import { logActivityFormSchema } from "@/db/formSchema";
import { loggedActivities } from "@/db/schema";
import { getActivityById } from "@/db/utils";
import { ActivityDefinitions } from "@/types/activities";
import { auth } from "@clerk/nextjs/server";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";

const logActivity: SubmitHandler<
  z.infer<typeof logActivityFormSchema>
> = async (data) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in");
  }
  const insertActivity = logActivityFormSchema.parse(data);
  const activityDefinition =
    ActivityDefinitions[
      insertActivity.activityType as keyof typeof ActivityDefinitions
    ];
  if (activityDefinition.activityFormula === "DURATION") {
    insertActivity.cardioPoints = Math.round(
      insertActivity.duration * activityDefinition.cardioMultipilier
    );
    insertActivity.strengthPoints = Math.round(
      insertActivity.duration * activityDefinition.strengthMultipilier
    );
  }
  if (activityDefinition.activityFormula === "SETSANDREPS") {
    insertActivity.strengthPoints = Math.round(
      insertActivity.sets *
        insertActivity.reps *
        activityDefinition.strengthMultipilier
    );
  }
  const insertedActivityIds = await db
    .insert(loggedActivities)
    .values(insertActivity)
    .returning({ id: loggedActivities.id });
  return await getActivityById(insertedActivityIds[0].id);
};

export { logActivity };
