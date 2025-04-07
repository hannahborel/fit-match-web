import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { League } from "@/db/schema";
import React from "react";

export type LeaguesTableProps = {
  leagues: League[];
};
const LeaguesTable: React.FC<LeaguesTableProps> = ({ leagues }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Weeks</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>Magic Link</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leagues.map((league) => (
          <TableRow key={league.id}>
            <TableCell>{league.name}</TableCell>
            <TableCell>{league.description}</TableCell>
            <TableCell>{league.ownerId}</TableCell>
            <TableCell>{league.weeks}</TableCell>
            <TableCell>{league.size}</TableCell>
            <TableCell>
              {league.startDate
                ? league.startDate.toISOString().split("T")[0]
                : "-"}
            </TableCell>
            <TableCell>{league.slug}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LeaguesTable;
