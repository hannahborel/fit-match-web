//import { sql } from "@vercel/postgres";
//import { drizzle } from "drizzle-orm/vercel-postgres";

import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const main = async () => {
  //const db = drizzle({ client: sql });

  console.log("Clearing old data");

  console.log("Seed start");

  console.log("Seed done");
};

main();
