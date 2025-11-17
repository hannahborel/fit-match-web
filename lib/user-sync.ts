import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export interface ClerkUserData {
  id: string;
  first_name?: string;
  last_name?: string;
  email_addresses?: Array<{ email_address: string }>;
  image_url?: string;
}

export async function syncUserFromClerk(clerkUserData: ClerkUserData) {
  try {
    const { id, first_name, last_name, email_addresses, image_url } =
      clerkUserData;

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    const userData = {
      id: id,
      firstName: first_name || "Unknown",
      lastName: last_name || undefined,
      email: email_addresses?.[0]?.email_address || "",
      thumbnailUrl: image_url || undefined,
      points: 0,
      isLeagueManager: false,
      lastSyncedAt: new Date(),
    };

    if (existingUser.length > 0) {
      // Update existing user
      await db
        .update(users)
        .set({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          thumbnailUrl: userData.thumbnailUrl,
          lastSyncedAt: userData.lastSyncedAt,
        })
        .where(eq(users.id, id));

      console.log(`User ${id} updated successfully`);
      return { success: true, action: "updated" };
    } else {
      // Create new user
      await db.insert(users).values(userData);
      console.log(`User ${id} created successfully`);
      return { success: true, action: "created" };
    }
  } catch (error) {
    console.error("Error syncing user:", error);
    throw error;
  }
}

export async function deleteUserFromClerk(userId: string) {
  try {
    await db.delete(users).where(eq(users.id, userId));
    console.log(`User ${userId} deleted successfully`);
    return { success: true, action: "deleted" };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}
