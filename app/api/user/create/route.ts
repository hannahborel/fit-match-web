import CreateUser from "@/actions/createUserAsdf";
import { insertUserFormSchema } from "@/db/formSchema";

export const POST = async (req: Request) => {
  const body = await req.json();

  try {
    const parsedBody = insertUserFormSchema.parse(body);

    const user = await CreateUser(parsedBody);

    return Response.json(user);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
};
