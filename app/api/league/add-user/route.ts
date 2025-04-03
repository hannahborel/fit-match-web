import { addUserToLeague } from "@/actions/addUserToLeague";

export const GET = async (request: Request) => {
  const { userId, leagueId } = await request.json();

  return addUserToLeague(userId, leagueId);
};
