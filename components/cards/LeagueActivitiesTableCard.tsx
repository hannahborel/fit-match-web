"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoggedActivity } from "@/db/schema";
import { FitMatchUser } from "@/types/types";
import React from "react";
import LoggedActivitiesTable from "../tables/LoggedActivitiesTable";

export type LoggedActivitiesCardProps = {
  loggedActivities: LoggedActivity[];
  leagueMembersMap: Map<string, FitMatchUser>;
};

const LoggedActivitiesCard: React.FC<LoggedActivitiesCardProps> = ({
  loggedActivities,
  leagueMembersMap,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>League Activity Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <LoggedActivitiesTable
          loggedActivities={loggedActivities}
          leagueMembersMap={leagueMembersMap}
        />
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">All Leagues in the system.</p>
      </CardFooter>
    </Card>
  );
};

export default LoggedActivitiesCard;
