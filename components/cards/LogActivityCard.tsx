"use client";
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
  userId: string;
};

const LogActivity: React.FC<LogActivityCardProps> = ({
  leagueId,
  matchId,
  userId,
}) => {
  const form = useForm<z.infer<typeof logActivityFormSchema>>({
    resolver: zodResolver(logActivityFormSchema),
    defaultValues: {
      activityType: "",
      activityKpi1: "",
      activityKpi2: "",
      activityKpi3: "",
      leagueId: leagueId,
      matchId: matchId,
      userId: userId,
    },
  });

  const onSubmit = (data: z.infer<typeof logActivityFormSchema>) => {
    LogActivity(data);
    form.reset();
  };

  const activityType = form.watch("activityType");
  const kpiFieldNames = ["activityKpi1", "activityKpi2", "activityKpi3"];

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
            {activityType
              ? ActivityDefinitions[activityType as ActivityType].kpis.map(
                  (kpi, i) => (
                    <FormField
                      key={i}
                      control={form.control}
                      name={kpiFieldNames[i] as keyof typeof form.watch}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{kpi.name}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            What is the value of {kpi.name}?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )
                )
              : null}
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

export default LogActivity;
