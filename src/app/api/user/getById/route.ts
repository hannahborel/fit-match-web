import { User } from "@/db/schema";
import { getUserById } from "@/db/utils";
import { ApiErrorResponse } from "@/types/types";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<User | ApiErrorResponse>
) => {
  const { id } = req.body;
  const user = await getUserById(id);
  if (user) {
    return res.status(200).json(user);
  }
};

export default handler;
