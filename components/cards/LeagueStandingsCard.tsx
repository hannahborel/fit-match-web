"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { League } from "@/db/schema";
import { FitMatchUser } from "@/types/types";
import React from "react";
import LeagueStandingsTable from "../tables/LeagueStandingsTable";

export type LeagueStandingsCardProps = {
  league: League;
  leagueMembers: FitMatchUser[];
};

const LeagueStandingsCard: React.FC<LeagueStandingsCardProps> = ({
  league,
  leagueMembers,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>League Standings</CardTitle>
      </CardHeader>
      <CardContent>
        <LeagueStandingsTable league={league} leagueMembers={leagueMembers} />
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">
          Fill in the details to log your activity.
        </p>
      </CardFooter>
    </Card>
  );
};

export default LeagueStandingsCard;
