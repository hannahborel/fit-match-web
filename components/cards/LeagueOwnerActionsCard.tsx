"use client";
import deleteLeague from "@/actions/deleteLeague";
import kickUserFromLeague from "@/actions/kickUserFromLeague";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  deleteLeagueFormSchema,
  kickUserFromLeagueFormSchema,
} from "@/db/formSchema";
import { League } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

export type LeagueOwnerActionsCardProps = {
  league: League;
};

const LeagueOwnerActionsCard: React.FC<LeagueOwnerActionsCardProps> = ({
  league,
}) => {
  const kickForm = useForm<z.infer<typeof kickUserFromLeagueFormSchema>>({
    resolver: zodResolver(kickUserFromLeagueFormSchema),
    defaultValues: {
      leagueId: league.id,
      userId: "",
    },
  });
  const deleteForm = useForm<z.infer<typeof deleteLeagueFormSchema>>({
    resolver: zodResolver(deleteLeagueFormSchema),
    defaultValues: {
      id: league.id,
    },
  });

  const onSubmitKick = async (
    data: z.infer<typeof kickUserFromLeagueFormSchema>
  ) => {
    await kickUserFromLeague(data);
  };

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
        <Form {...kickForm}>
          <form
            onSubmit={kickForm.handleSubmit(onSubmitKick)}
            className="space-y-4"
          >
            <FormField
              control={kickForm.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kick User</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a user to kick from the league" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m@example.com">
                        m@example.com
                      </SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">
                        m@support.com
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select a user to kick from the league.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant={"destructive"} type="submit">
              Kick
            </Button>
          </form>
        </Form>
        <hr />
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
