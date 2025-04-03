import deleteLeague from "@/actions/deleteLeague";

export const POST = async (request: Request) => {
  const { leagueId } = await request.json();
  return await deleteLeague(leagueId);
};
