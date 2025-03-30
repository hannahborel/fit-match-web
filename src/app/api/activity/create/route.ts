import { CreateActivity } from "@/actions/CreateActivity";
import { insertActivityFormSchema } from "@/db/formSchema";
import { Activity } from "@/db/schema";
import { ApiErrorResponse } from "@/types/types";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Activity | ApiErrorResponse>
) => {
  const parsedData = insertActivityFormSchema.parse(req.body);
  const insertedActivity = await CreateActivity(parsedData);
  if (insertedActivity) {
    return res.status(200).json(insertedActivity);
  }
};

export default handler;
