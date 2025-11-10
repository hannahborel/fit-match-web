import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { syncUserFromClerk } from "@/lib/user-sync";
import { db } from "@/db/db";
import { leaguesToUsers } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST() {
  try {
    // Get the authenticated user
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user data from Clerk
    const { clerkClient } = await import("@clerk/nextjs/server");
    const clerk = await clerkClient();
    const clerkUser = await clerk.users.getUser(userId);

    // Sync user data to database
    const result = await syncUserFromClerk({
      id: clerkUser.id,
      first_name: clerkUser.firstName || undefined,
      last_name: clerkUser.lastName || undefined,
      email_addresses: clerkUser.emailAddresses.map((email) => ({
        email_address: email.emailAddress,
      })),
      image_url: clerkUser.imageUrl,
    });

    // Also update leaguesToUsers table with the new name
    await db
      .update(leaguesToUsers)
      .set({
        firstName: clerkUser.firstName || "Unknown",
        lastName: clerkUser.lastName || null,
      })
      .where(eq(leaguesToUsers.userId, userId));

    return NextResponse.json({
      message: "User synced successfully",
      action: result.action,
      user: {
        clerkId: clerkUser.id,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        email: clerkUser.emailAddresses[0]?.emailAddress,
        thumbnailUrl: clerkUser.imageUrl,
      },
    });
  } catch (error) {
    console.error("Sync user error:", error);
    return NextResponse.json({ error: "Failed to sync user" }, { status: 500 });
  }
}
// Trigger deployment
