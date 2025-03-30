import { CreateActivity } from "@/actions/CreateActivity";
import { insertActivityFormSchema } from "@/db/formSchema";

export const POST = async (req: Request) => {
  const body = await req.json();

  try {
    const parsedBody = insertActivityFormSchema.parse(body);

    const activity = await CreateActivity(parsedBody);

    return Response.json(activity);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
};
