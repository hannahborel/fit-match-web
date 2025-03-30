import CreateLeague from "@/actions/CreateLeague";
import { insertLeagueFormSchema } from "@/db/formSchema";

export const POST = async (req: Request) => {
  const body = await req.json();

  try {
    const parsedBody = insertLeagueFormSchema.parse(body);

    const league = await CreateLeague(parsedBody);

    return Response.json(league);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
};
