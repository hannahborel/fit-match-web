import { getUserById } from "@/db/utils";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  const user = await getUserById(id);
  if (user) {
    return Response.json(user);
  } else {
    return Response.json({ message: "User not found" });
  }
};
