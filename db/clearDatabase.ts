import "dotenv/config";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "drizzle-orm";
import { createPool } from "@vercel/postgres";

/**
 * Script to clear all data from Neon database without dropping tables
 * This will truncate all tables and reset sequences
 */

async function clearDatabase() {
  console.log("🚀 Starting database clear process...\n");

  // Create connection pool
  const pool = createPool({
    connectionString: process.env.POSTGRES_URL!,
  });

  const db = drizzle({ client: pool });

  try {
    console.log("📊 Clearing all tables...\n");

    // Disable foreign key checks temporarily and truncate all tables
    // Order matters due to foreign key constraints - we use CASCADE to handle it
    await db.execute(sql`
      TRUNCATE TABLE
        "activityChallenges",
        "matchMessages",
        "leagueMessages",
        "loggedActivities",
        "matchesToUsers",
        "matches",
        "leaguesToUsers",
        "leagues",
        "users",
        "bots"
      RESTART IDENTITY CASCADE;
    `);

    console.log("✅ All tables cleared successfully!");
    console.log("\n📋 Summary:");
    console.log("  - All data removed from tables");
    console.log("  - Table structures preserved");
    console.log("  - Auto-increment sequences reset");
    console.log("  - Foreign key constraints maintained\n");

  } catch (error) {
    console.error("❌ Error clearing database:", error);
    throw error;
  } finally {
    await pool.end();
    console.log("🔌 Database connection closed");
  }
}

// Run the script
clearDatabase()
  .then(() => {
    console.log("\n✨ Database clear completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Database clear failed:", error);
    process.exit(1);
  });
