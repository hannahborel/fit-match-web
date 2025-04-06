"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { League } from "@/db/schema";
import React from "react";
import LeaguesTable from "../tables/LeaguesTable";

export type LeaguesTableCardProps = {
  leagues: League[];
};

const LeaguesTableCard: React.FC<LeaguesTableCardProps> = ({ leagues }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leagues</CardTitle>
      </CardHeader>
      <CardContent>
        <LeaguesTable leagues={leagues} />
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">All Leagues in the system.</p>
      </CardFooter>
    </Card>
  );
};

export default LeaguesTableCard;
