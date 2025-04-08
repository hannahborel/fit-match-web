"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoggedActivity } from "@/db/schema";
import React from "react";
import LoggedActivitiesTable from "../tables/LoggedActivitiesTable";
import { UserJSON } from "@clerk/nextjs/server";

export type LoggedActivitiesCardProps = {
  loggedActivities: LoggedActivity[];
  leagueMembersMap: Map<string, UserJSON>;
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
