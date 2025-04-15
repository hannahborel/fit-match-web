import { ActivityDefinitions } from "@/types/activities";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { activityId } = await request.json();
  console.log("Activity ID:", activityId);

  return NextResponse.json(ActivityDefinitions);
};
