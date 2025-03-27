import { Match } from "@/db/schema";
import { getMatchById } from "@/db/utils";
import { ApiErrorResponse } from "@/types/types";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Match | ApiErrorResponse>
) => {
  const { id } = req.body;
  const match = await getMatchById(id);
  if (match) {
    return res.status(200).json(match);
  }
};

export default handler;
