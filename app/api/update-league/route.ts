import updateLeague from "@/actions/updateLeague";
import { updateLeagueFormSchema } from "@/db/formSchema";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body = await req.json();

  try {
    const parsedBody = updateLeagueFormSchema.parse(body);
    if (!parsedBody.id) {
      return NextResponse.json(
        { error: "League ID is required" },
        { status: 400 }
      );
    } else {
    }

    const league = await updateLeague(parsedBody);

    return NextResponse.json(league);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
