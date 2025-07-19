import { getCurrentLeague } from "@/db/utils";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const league = await getCurrentLeague();
    if (league) {
      return NextResponse.json({ league });
    } else {
      console.log("No league found");
      return NextResponse.json(null);
    }
  } catch (error) {
    console.log("Auth Error:", error);
    return NextResponse.json(
      { error: "You must be signed in" },
      { status: 401 }
    );
  }
};
