import deleteAccount from "@/actions/deleteAccount";
import { NextResponse } from "next/server";

export const DELETE = async () => {
  try {
    await deleteAccount();
    return NextResponse.json({
      success: true,
      message: "Account deleted successfully"
    });
  } catch (error) {
    console.error("Delete account API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to delete account"
      },
      { status: 500 }
    );
  }
};
