import { CreateActivity } from "@/actions/CreateActivity";
import { insertActivityFormSchema } from "@/db/formSchema";
import { LoggedActivity } from "@/db/schema";
import { ApiErrorResponse } from "@/types/types";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<LoggedActivity | ApiErrorResponse>
) => {
  const parsedData = insertActivityFormSchema.parse(req.body);
  const insertedActivity = await CreateActivity(parsedData);
  if (insertedActivity) {
    return res.status(200).json(insertedActivity);
  }
};

export default handler;
