import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// Entities
export const leagues = pgTable("leagues", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  description: text().notNull(),
  size: integer().notNull(),
  weeks: integer().notNull(),
  start_date: timestamp().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  email: text().notNull(),
  profilePic: text().notNull(),
  password: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const leaguesToUsers = pgTable("leaguesToUsers", {
  id: uuid().primaryKey().defaultRandom(),
  leagueId: uuid().notNull(),
  userId: uuid().notNull(),
});
