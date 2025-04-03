import { removeUserFromLeague } from "@/actions/removeUserFromLeague";

export const GET = async (request: Request) => {
  const { userId, leagueId } = await request.json();

  return removeUserFromLeague(userId, leagueId);
};
