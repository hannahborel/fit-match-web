import { NextRequest, NextResponse } from "next/server";
import { syncUserFromClerk } from "@/lib/user-sync";

export async function POST(req: NextRequest) {
  try {
    const { userId, firstName, lastName, email, imageUrl } = await req.json();

    // Test user sync with sample data
    const testUserData = {
      id: userId || "test_user_123",
      first_name: firstName || "Test",
      last_name: lastName || "User",
      email_addresses: [{ email_address: email || "test@example.com" }],
      image_url: imageUrl || null,
    };

    const result = await syncUserFromClerk(testUserData);

    return NextResponse.json({
      message: "User sync test completed",
      result,
      testData: testUserData,
    });
  } catch (error) {
    console.error("Test sync error:", error);
    return NextResponse.json(
      { error: "Test sync failed", details: error },
      { status: 500 }
    );
  }
}
