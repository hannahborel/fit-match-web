"use server";

import { db } from "@/db/db";
import { InsertActivity, activities } from "@/db/schema";
import { getActivityById } from "@/db/utils";

const CreateActivity = async (insertActivity: InsertActivity) => {
  insertActivity.score = 0;
  const insertedActivityIds = await db
    .insert(activities)
    .values(insertActivity)
    .returning({ id: activities.id });
  return await getActivityById(insertedActivityIds[0].id);
};

export { CreateActivity };
