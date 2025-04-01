import { logActivity } from "@/actions/logActivity";
import { logActivityFormSchema } from "@/db/formSchema";

export const POST = async (req: Request) => {
  const body = await req.json();

  try {
    const parsedBody = logActivityFormSchema.parse(body);

    const activity = await logActivity(parsedBody);

    return Response.json(activity);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
};
