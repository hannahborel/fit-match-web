"use server";

import { db } from "@/db/db";
import { InsertLoggedActivity, loggedActivities } from "@/db/schema";
import { getActivityById } from "@/db/utils";

const CreateActivity = async (insertActivity: InsertLoggedActivity) => {
  insertActivity.score = 0;
  const insertedActivityIds = await db
    .insert(loggedActivities)
    .values(insertActivity)
    .returning({ id: loggedActivities.id });
  return await getActivityById(insertedActivityIds[0].id);
};

export { CreateActivity };
