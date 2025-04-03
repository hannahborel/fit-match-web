import { getMatchById } from "@/db/utils";

export const GET = async (request: Request) => {
  const { matchId } = await request.json();

  const match = await getMatchById(matchId);
  if (match) {
    return Response.json(match);
  } else {
    return Response.json({ message: "Match not found" });
  }
};
