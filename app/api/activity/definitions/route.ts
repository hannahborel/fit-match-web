import { ActivityDefinitions } from "@/types/activityEnum";

export const GET = () => {
  return Response.json(ActivityDefinitions);
};
