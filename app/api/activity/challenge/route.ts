import { ActivityDefinitions } from "@/types/activities";

export const POST = async (request: Request) => {
  const { activityId } = await request.json();
  console.log(activityId);

  return Response.json(ActivityDefinitions);
};
