"use client";
import deleteLeague from "@/actions/deleteLeague";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteLeagueFormSchema } from "@/db/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import { League } from "@/db/schema";

export type LeagueOwnerActionsCardProps = {
  league: League;
};

const LeagueOwnerActionsCard: React.FC<LeagueOwnerActionsCardProps> = ({
  league,
}) => {
  const deleteForm = useForm<z.infer<typeof deleteLeagueFormSchema>>({
    resolver: zodResolver(deleteLeagueFormSchema),
    defaultValues: {
      id: league.id,
    },
  });

  const onSubmitDelete = async (
    data: z.infer<typeof deleteLeagueFormSchema>
  ) => {
    await deleteLeague(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>League Actions (Owner)</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...deleteForm}>
          <form
            onSubmit={deleteForm.handleSubmit(onSubmitDelete)}
            className="space-y-4"
          >
            <Button variant={"destructive"} type="submit">
              Delete
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

export default LeagueOwnerActionsCard;
