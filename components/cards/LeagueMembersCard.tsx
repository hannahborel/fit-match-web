"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { League } from "@/db/schema";
import { UserJSON } from "@clerk/nextjs/server";
import React from "react";

export type LeagueMembersCardProps = {
  league: League;
  leagueMembers: UserJSON[];
};

const LeagueMembersCard: React.FC<LeagueMembersCardProps> = ({
  league,
  leagueMembers,
}) => {
  console.log("LeagueMembersCard leagueMembers", leagueMembers);
  return (
    <Card>
      <CardHeader>
        <CardTitle>League Members</CardTitle>
      </CardHeader>
      <CardContent>
        {leagueMembers.map((member, i) => (
          <div key={i} className="">
            <span>
              {member.first_name} {member.last_name}
              {league.ownerId === member.username && " (Owner)"}
            </span>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">
          Fill in the details to log your activity.
        </p>
      </CardFooter>
    </Card>
  );
};

export default LeagueMembersCard;
