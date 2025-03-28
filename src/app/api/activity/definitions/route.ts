import {
  ActivityDefinition,
  ActivityDefinitions,
  ActivityType,
} from "@/types/activityEnum";
import { ApiErrorResponse } from "@/types/types";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<
    Record<ActivityType, ActivityDefinition> | ApiErrorResponse
  >
) => {
  return res.status(200).json(ActivityDefinitions);
};

export default handler;
