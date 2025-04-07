import { ActivityDefinitions } from "@/types/activities";
import { NextResponse } from "next/server";
export const GET = () => {
  return NextResponse.json(ActivityDefinitions);
};
