import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({ message: "Test API route is working!" });
};
