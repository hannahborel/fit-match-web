import { ActivityDefinitions } from "@/types/activities";

export const GET = () => {
  return Response.json(ActivityDefinitions);
};
