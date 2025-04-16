"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { League, Match } from "@/db/schema";
import { FitMatchUser } from "@/types/types";
import React from "react";

export type MatchScheduleCardProps = {
  league: League;
  leagueMembersMap: Map<string, FitMatchUser>;
};

const buildMatchString = (
  match: Match,
  leagueMembersMap: Map<string, FitMatchUser>
) => {
  let matchString = "Match Week " + (match.week + 1) + ": ";
  const teams = new Map<number, FitMatchUser[]>();
  match.matchesToUsers.forEach((matchToUser) => {
    if (!teams.get(matchToUser.teamIndex)) {
      teams.set(matchToUser.teamIndex, []);
    }
    teams
      .get(matchToUser.teamIndex)
      ?.push(leagueMembersMap.get(matchToUser.userId)!);
  });
  matchString += teams
    .keys()
    .map((key) =>
      teams
        .get(key)!
        .map(
          (user) =>
            user.firstName + " " + user.lastName + (user.isBot ? " (Bot)" : "")
        )
        .join(",")
    )
    .toArray()
    .join(" vs ");
  return matchString;
};

const MatchScheduleCard: React.FC<MatchScheduleCardProps> = ({
  league,
  leagueMembersMap,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Match Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        {league.matches.map((match) => (
          <p key={match.id}>{buildMatchString(match, leagueMembersMap)}</p>
        ))}
      </CardContent>
    </Card>
  );
};

export default MatchScheduleCard;
