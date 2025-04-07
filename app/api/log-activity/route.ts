import { logActivity } from "@/actions/logActivity";
import { logActivityFormSchema } from "@/db/formSchema";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body = await req.json();

  try {
    const parsedBody = logActivityFormSchema.parse(body);

    const activity = await logActivity(parsedBody);

    return NextResponse.json(activity);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
