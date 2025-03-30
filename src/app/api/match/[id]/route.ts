import { getMatchById } from "@/db/utils";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  const match = await getMatchById(id);
  if (match) {
    return Response.json(match);
  } else {
    return Response.json({ message: "Match not found" });
  }
};
