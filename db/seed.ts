import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

import * as dotenv from "dotenv";
import { bots } from "./schema";
dotenv.config({ path: "./.env" });

const main = async () => {
  const db = drizzle({ client: sql });

  console.log("Clearing old data");

  console.log("Seed start");

  const botsData = [
    {
      id: "bot-1",
      firstName: "Flex",
      lastName: "Fury",
      imageUrl: "https://example.com/flex-fury.png",
      username: "FLEXFURY",
      activityAlgorithm: "DEFAULT",
    },
    {
      id: "bot-2",
      firstName: "Cardio",
      lastName: "Crusher",
      imageUrl: "https://example.com/cardio-crusher.png",
      username: "CARDIOCRUSHER",
      activityAlgorithm: "DEFAULT",
    },
    {
      id: "bot-3",
      firstName: "Iron",
      lastName: "Inferno",
      imageUrl: "https://example.com/iron-inferno.png",
      username: "IRONINFERNO",
      activityAlgorithm: "DEFAULT",
    },
    {
      id: "bot-4",
      firstName: "Run",
      lastName: "Ranger",
      imageUrl: "https://example.com/run-ranger.png",
      username: "RUNRANGER",
      activityAlgorithm: "DEFAULT",
    },
    {
      id: "bot-5",
      firstName: "Spin",
      lastName: "Storm",
      imageUrl: "https://example.com/spin-storm.png",
      username: "SPINSTORM",
      activityAlgorithm: "DEFAULT",
    },
    {
      id: "bot-6",
      firstName: "Lift",
      lastName: "Legend",
      imageUrl: "https://example.com/lift-legend.png",
      username: "LIFTLEGEND",
      activityAlgorithm: "DEFAULT",
    },
    {
      id: "bot-7",
      firstName: "Dash",
      lastName: "Dynamo",
      imageUrl: "https://example.com/dash-dynamo.png",
      username: "DASHDYNAMO",
      activityAlgorithm: "DEFAULT",
    },
    {
      id: "bot-8",
      firstName: "Core",
      lastName: "Commander",
      imageUrl: "https://example.com/core-commander.png",
      username: "CORECOMMANDER",
      activityAlgorithm: "DEFAULT",
    },
  ];
  await db.insert(bots).values(botsData);
  console.log("Seed done");
};

main();
