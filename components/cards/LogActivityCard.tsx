"use client";
import { logActivity } from "@/actions/logActivity";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { logActivityFormSchema } from "@/db/formSchema";
import { ActivityDefinitions, ActivityType } from "@/types/activities";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "../ui/input";

export type LogActivityCardProps = {
  leagueId: string;
  matchId: string;
};

const LogActivityCard: React.FC<LogActivityCardProps> = ({
  leagueId,
  matchId,
}) => {
  const form = useForm<z.infer<typeof logActivityFormSchema>>({
    resolver: zodResolver(logActivityFormSchema),
    defaultValues: {
      activityType: "",
      activityNote: "",
      duration: 0,
      sets: 0,
      reps: 0,
      leagueId: leagueId,
      matchId: matchId,
      photoUrl:
        "https://plus.unsplash.com/premium_photo-1670505062582-fdaa83c23c9e?q=80&w=3871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  });

  const onSubmit = async (data: z.infer<typeof logActivityFormSchema>) => {
    await logActivity(data);
    form.reset();
  };

  const activityType = form.watch("activityType");
  return (
    <Card>
      <CardHeader>
        <CardTitle>Log Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="activityType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activity Type</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an activity type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(ActivityDefinitions).map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                          textValue={
                            ActivityDefinitions[type as ActivityType].name
                          }
                        >
                          {ActivityDefinitions[type as ActivityType].name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    What type of activity are you logging?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {activityType &&
            ActivityDefinitions[activityType as ActivityType].activityFormula ==
              "DURATION" ? (
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (minutes)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      How long did you do this activity?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}
            {activityType &&
            ActivityDefinitions[activityType as ActivityType].activityFormula ==
              "SETSANDREPS" ? (
              <FormField
                control={form.control}
                name="sets"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sets</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>How many sets did you do?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}
            {activityType &&
            ActivityDefinitions[activityType as ActivityType].activityFormula ==
              "SETSANDREPS" ? (
              <FormField
                control={form.control}
                name="reps"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reps</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>How many reps did you do?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}
            <FormField
              control={form.control}
              name="activityNote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormDescription>Any other notes?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
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

export default LogActivityCard;
