"use client";
import { leaveLeague } from "@/actions/leaveLeague";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { leaveLeagueFormSchema } from "@/db/formSchema";
import { League } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";

export type LeagueMemberActionsCardProps = {
  league: League;
};

const LeagueMemberActionsCard: React.FC<LeagueMemberActionsCardProps> = ({
  league,
}) => {
  const leaveForm = useForm<z.infer<typeof leaveLeagueFormSchema>>({
    resolver: zodResolver(leaveLeagueFormSchema),
    defaultValues: {
      leagueId: league.id,
    },
  });

  const onSubmitDelete = async (
    data: z.infer<typeof leaveLeagueFormSchema>
  ) => {
    await leaveLeague(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>League Actions (Member)</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...leaveForm}>
          <form
            onSubmit={leaveForm.handleSubmit(onSubmitDelete)}
            className="space-y-4"
          >
            <Button variant={"destructive"} type="submit">
              Leave League
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">
          Fill in the details to log your activity.
        </p>
      </CardFooter>
    </Card>
  );
};

export default LeagueMemberActionsCard;
