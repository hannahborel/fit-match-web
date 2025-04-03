import { getUserById } from "@/db/utils";

export const GET = async (request: Request) => {
  const { userId } = await request.json();

  const user = await getUserById(userId);
  if (user) {
    return Response.json(user);
  } else {
    return Response.json({ message: "User not found" });
  }
};
