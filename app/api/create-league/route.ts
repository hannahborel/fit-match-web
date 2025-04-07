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
    return NextResponse.json({ error }, { status: 500 });
  }
};
