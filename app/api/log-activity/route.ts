import { logActivity } from "@/actions/logActivity";
import { logActivityFormSchema } from "@/db/formSchema";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body = await req.json();

  try {
    const parsedBody = logActivityFormSchema.parse(body);

    const activity = await logActivity(parsedBody);

    return NextResponse.json({ activity });
  } catch (error: any) {
    console.error("[logActivity error]", error);

    return NextResponse.json(
      {
        error: {
          name: error.name,
          message: error.message,
          stack:
            process.env.NODE_ENV === "development" ? error.stack : undefined,
          issues: error?.issues, // if it's a ZodError
        },
      },
      { status: 500 }
    );
  }
};
