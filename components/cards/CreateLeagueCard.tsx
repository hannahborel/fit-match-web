"use client";
import createLeague from "@/actions/createLeague";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { insertLeagueFormSchema } from "@/db/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormDateField from "../formFields/formDateField";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const CreateLeagueCard: React.FC = () => {
  const form = useForm<z.infer<typeof insertLeagueFormSchema>>({
    resolver: zodResolver(insertLeagueFormSchema),
    defaultValues: {
      name: "",
      description: "",
      weeks: 4,
      size: 8,
    },
  });

  const onSubmit = async (data: z.infer<typeof insertLeagueFormSchema>) => {
    await createLeague(data);
    form.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create League</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>League Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weeks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weeks</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormDateField name={"startDate"} label={"Start Date"} />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">
          Fill in the details and click submit to create a new league.
        </p>
      </CardFooter>
    </Card>
  );
};

export default CreateLeagueCard;
