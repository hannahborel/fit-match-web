"use server";

import { db } from "@/db/db";
import { InsertUser, users } from "@/db/schema";
import { getUserById } from "@/db/utils";

const CreateUser = async (insertUser: InsertUser) => {
  const insertedUserIds = await db
    .insert(users)
    .values(insertUser)
    .returning({ id: users.id });
  return await getUserById(insertedUserIds[0].id);
};

export default CreateUser;
