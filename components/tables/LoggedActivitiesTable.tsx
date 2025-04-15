import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoggedActivity } from "@/db/schema";
import { FitMatchUser } from "@/types/types";
import React from "react";

export type LoggedActivitiesTableProps = {
  loggedActivities: LoggedActivity[];
  leagueMembersMap: Map<string, FitMatchUser>;
};
const LoggedActivitiesTable: React.FC<LoggedActivitiesTableProps> = ({
  loggedActivities,
  leagueMembersMap,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User ID</TableHead>
          <TableHead>User Name</TableHead>
          <TableHead>Match</TableHead>
          <TableHead>Activity Type</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Sets</TableHead>
          <TableHead>Reps</TableHead>
          <TableHead>Cardio Points</TableHead>
          <TableHead>Strength Points</TableHead>
          <TableHead>Photo</TableHead>
          <TableHead>Activity Note</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loggedActivities.map((activity) => (
          <TableRow key={activity.id}>
            <TableCell>{activity.userId}</TableCell>
            <TableCell>
              {leagueMembersMap.get(activity.userId)?.firstName}{" "}
              {leagueMembersMap.get(activity.userId)?.lastName}
            </TableCell>
            <TableCell>{activity.matchId}</TableCell>
            <TableCell>{activity.activityType}</TableCell>
            <TableCell>{activity.duration}</TableCell>
            <TableCell>{activity.sets}</TableCell>
            <TableCell>{activity.reps}</TableCell>
            <TableCell>{activity.cardioPoints}</TableCell>
            <TableCell>{activity.strengthPoints}</TableCell>
            <TableCell>{activity.photoUrl}</TableCell>
            <TableCell>{activity.activityNote}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LoggedActivitiesTable;
