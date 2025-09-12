import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";

export const POST = async (request: NextRequest) => {
  try {
    // Verify authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userIds } = await request.json();

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json(
        { error: "User IDs are required" },
        { status: 400 }
      );
    }

    // Fetch user data from Clerk
    const users = await (
      await clerkClient()
    ).users.getUserList({ userId: userIds });

    const userData = users.data.map((user) => ({
      userId: user.id,
      firstName: user.firstName || "Unknown",
      lastName: user.lastName || "",
      imageUrl: user.imageUrl,
      username: user.username,
      isBot: false,
    }));

    return NextResponse.json({ users: userData });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
};
