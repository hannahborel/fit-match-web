"use client";
import { addUserToLeagueBySlug } from "@/actions/addUserToLeagueBySlug";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { joinLeagueFormSchema } from "@/db/formSchema";
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

const JoinLeagueCard: React.FC = () => {
  const form = useForm<z.infer<typeof joinLeagueFormSchema>>({
    resolver: zodResolver(joinLeagueFormSchema),
    defaultValues: {
      leagueSlug: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof joinLeagueFormSchema>) => {
    await addUserToLeagueBySlug(data);
    form.reset();
  };

  console.log(form.formState.errors);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Join League</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="leagueSlug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Magic Link</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter a league&apos;s slug to join.
                  </FormDescription>
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
          Fill in the details and click submit to create a new league.
        </p>
      </CardFooter>
    </Card>
  );
};

export default JoinLeagueCard;
