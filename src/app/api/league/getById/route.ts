import { League } from "@/db/schema";
import { getLeagueById } from "@/db/utils";
import { ApiErrorResponse } from "@/types/types";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<League | ApiErrorResponse>
) => {
  const { id } = req.body;
  const league = await getLeagueById(id);
  if (league) {
    return res.status(200).json(league);
  }
};

export default handler;
