"use server";

import { db } from "@/db/db";
import { logActivityFormSchema } from "@/db/formSchema";
import { loggedActivities } from "@/db/schema";
import { getActivityById } from "@/db/utils";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";

const logActivity: SubmitHandler<
  z.infer<typeof logActivityFormSchema>
> = async (data) => {
  const insertActivity = logActivityFormSchema.parse(data);
  const insertedActivityIds = await db
    .insert(loggedActivities)
    .values(insertActivity)
    .returning({ id: loggedActivities.id });
  return await getActivityById(insertedActivityIds[0].id);
};

export { logActivity };
