import { NextRequest, NextResponse } from "next/server";
import { syncUserFromClerk, deleteUserFromClerk } from "@/lib/user-sync";

export async function POST(req: NextRequest) {
  try {
    // Get the webhook payload
    const payload = await req.json();

    // Basic validation - you can add more security checks here
    if (!payload || !payload.type || !payload.data) {
      return NextResponse.json(
        { error: "Invalid webhook payload" },
        { status: 400 }
      );
    }

    const evt = payload;
    const eventType = evt.type;

    // Handle user creation and updates
    if (eventType === "user.created" || eventType === "user.updated") {
      const result = await syncUserFromClerk(evt.data);
      return NextResponse.json({
        message: `User ${result.action} successfully`,
        action: result.action,
      });
    }

    // Handle user deletion
    if (eventType === "user.deleted") {
      const { id } = evt.data;
      const result = await deleteUserFromClerk(id);
      return NextResponse.json({
        message: `User ${result.action} successfully`,
        action: result.action,
      });
    }

    return NextResponse.json({ message: "Webhook received" });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
