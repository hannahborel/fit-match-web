import CreateLeague from "@/actions/createLeague";
import { insertLeagueFormSchema } from "@/db/formSchema";

import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const POST = async (req: Request) => {
  const body = await req.json();

  try {
    const parsedBody = insertLeagueFormSchema.parse(body);

    const league = await CreateLeague(parsedBody);

    return NextResponse.json(league);
  } catch (error: any) {
    console.error("[createLeague error]", error);

    // Handle Zod validation errors
    if (error instanceof ZodError) {
      const errorMessage = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
      return NextResponse.json(
        {
          error: {
            name: error.name,
            message: errorMessage,
            issues: error.issues,
          }
        },
        { status: 400 } // Bad Request
      );
    }

    // Handle specific error cases
    if (error?.message?.includes("already have a league")) {
      return NextResponse.json(
        {
          error: {
            name: error.name,
            message: error.message,
          }
        },
        { status: 409 } // Conflict status code
      );
    }

    if (error?.message?.includes("must be signed in")) {
      return NextResponse.json(
        {
          error: {
            name: error.name,
            message: error.message,
          }
        },
        { status: 401 } // Unauthorized status code
      );
    }

    // Return detailed error for debugging
    return NextResponse.json(
      {
        error: {
          name: error?.name || 'UnknownError',
          message: error?.message || 'An unexpected error occurred',
          stack: process.env.NODE_ENV === "development" ? error?.stack : undefined,
        },
      },
      { status: 500 }
    );
  }
};
