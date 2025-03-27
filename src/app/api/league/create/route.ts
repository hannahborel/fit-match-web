import CreateLeague from "@/actions/CreateLeague";
import { insertLeagueFormSchema } from "@/db/formSchema";
import { League } from "@/db/schema";
import { ApiErrorResponse } from "@/types/types";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<League | ApiErrorResponse>
) => {
  const parsedData = insertLeagueFormSchema.parse(req.body);
  const insertedLeague = await CreateLeague(parsedData);
  if (insertedLeague) {
    return res.status(200).json(insertedLeague);
  }
};

export default handler;
