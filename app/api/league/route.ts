import { getLeagueById } from "@/db/utils";

export const GET = async (request: Request) => {
  const { leagueId } = await request.json();

  const league = await getLeagueById(leagueId);
  if (league) {
    return Response.json(league);
  } else {
    return Response.json({ message: "League not found" });
  }
};
