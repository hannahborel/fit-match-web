import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { League } from "@/db/schema";
import { FitMatchUser } from "@/types/types";
import React from "react";

export type LoggedActivitiesTableProps = {
  league: League;
  leagueMembers: FitMatchUser[];
};
const LoggedActivitiesTable: React.FC<LoggedActivitiesTableProps> = ({
  league,
  leagueMembers,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Ranking</TableHead>
          <TableHead>User Name</TableHead>
          <TableHead>Cardio Points</TableHead>
          <TableHead>Strength Points</TableHead>
          <TableHead>Wins</TableHead>
          <TableHead>Losses</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leagueMembers.map((user, i) => (
          <TableRow key={user.username}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>
              {user.firstName} {user.lastName}
            </TableCell>
            <TableCell>
              {league.loggedActivities
                .filter((activity) => activity.userId === user.id)
                .reduce((sum, activity) => sum + activity.cardioPoints, 0)}
            </TableCell>
            <TableCell>
              {league.loggedActivities
                .filter((activity) => activity.userId === user.id)
                .reduce((sum, activity) => sum + activity.strengthPoints, 0)}
            </TableCell>
            <TableCell>
              {league.leaguesToUsers.find(
                (leagueToUser) => leagueToUser.userId === user.id
              )?.wins ?? 0}
            </TableCell>
            <TableCell>
              {league.leaguesToUsers.find(
                (leagueToUser) => leagueToUser.userId === user.id
              )?.losses ?? 0}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LoggedActivitiesTable;
