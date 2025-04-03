import updateLeague from "@/actions/updateLeague";
import { updateLeagueFormSchema } from "@/db/formSchema";

export const POST = async (req: Request) => {
  const body = await req.json();

  try {
    const parsedBody = updateLeagueFormSchema.parse(body);
    if (!parsedBody.id) {
      return Response.json({ error: "League ID is required" }, { status: 400 });
    } else {
    }

    const league = await updateLeague(parsedBody);

    return Response.json(league);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
};
