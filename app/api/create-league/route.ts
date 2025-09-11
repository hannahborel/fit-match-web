import CreateLeague from "@/actions/createLeague";
import { insertLeagueFormSchema } from "@/db/formSchema";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body = await req.json();

  try {
    const parsedBody = insertLeagueFormSchema.parse(body);

    const league = await CreateLeague(parsedBody);

    return NextResponse.json(league);
  } catch (error) {
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
    }

    return NextResponse.json({ error }, { status: 500 });
  }
};
