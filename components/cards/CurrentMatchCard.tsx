"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Match } from "@/db/schema";
import { FitMatchUser } from "@/types/types";
import React from "react";

export type CurrentMatchCardProps = {
  match: Match;
  leagueMembersMap: Map<string, FitMatchUser>;
};

const CurrentMatchCard: React.FC<CurrentMatchCardProps> = ({
  match,
  leagueMembersMap,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Match</CardTitle>
      </CardHeader>
      <CardContent>
        <span>Participants</span>
        {match.matchesToUsers.map((matchToUser) => {
          const user = leagueMembersMap.get(matchToUser.userId);
          if (!user) {
            return <span key={matchToUser.userId}>User not found</span>;
          }
          return (
            <span key={matchToUser.userId}>
              {user.firstName} {user.lastName} - Team{" "}
              {matchToUser.teamIndex + 1}
            </span>
          );
        })}
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">
          Fill in the details to log your activity.
        </p>
      </CardFooter>
    </Card>
  );
};

export default CurrentMatchCard;
