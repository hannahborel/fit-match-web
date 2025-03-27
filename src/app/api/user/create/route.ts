import CreateUser from "@/actions/CreateUser";
import { insertUserFormSchema } from "@/db/formSchema";
import { User } from "@/db/schema";
import { ApiErrorResponse } from "@/types/types";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<User | ApiErrorResponse>
) => {
  const parsedData = insertUserFormSchema.parse(req.body);
  const insertedUser = await CreateUser(parsedData);
  if (insertedUser) {
    return res.status(200).json(insertedUser);
  }
};

export default handler;
