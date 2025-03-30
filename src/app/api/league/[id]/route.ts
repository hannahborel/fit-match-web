import { getLeagueById } from "@/db/utils";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  const league = await getLeagueById(id);
  if (league) {
    return Response.json(league);
  } else {
    return Response.json({ message: "League not found" });
  }
};
