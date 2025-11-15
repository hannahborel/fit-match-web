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
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      const errorMessage = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 } // Bad Request
      );
    }

    // Handle specific error cases
    if (error instanceof Error) {
      if (error.message.includes("already have a league")) {
        return NextResponse.json(
          { error: error.message },
          { status: 409 } // Conflict status code
        );
      }
      if (error.message.includes("must be signed in")) {
        return NextResponse.json(
          { error: error.message },
          { status: 401 } // Unauthorized status code
        );
      }

      // Return the error message for any other Error instances
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Fallback for unknown error types
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
};
