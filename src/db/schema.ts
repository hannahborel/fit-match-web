import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// Entities
export const leagues = pgTable("leagues", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  description: text().notNull(),
  ownerId: uuid().notNull(),
  size: integer().notNull(),
  weeks: integer().notNull(),
  start_date: timestamp().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export type League = typeof leagues.$inferSelect;
export type InsertLeague = typeof leagues.$inferInsert;

export const leaguesRelations = relations(leagues, ({ many }) => ({
  users: many(leaguesToUsers),
  activities: many(activities),
  messages: many(leagueMessages),
  matches: many(matches),
}));

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  email: text().notNull(),
  profilePic: text().notNull(),
  password: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  leagues: many(leaguesToUsers),
}));

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const matches = pgTable("matches", {
  id: uuid().primaryKey().defaultRandom(),
  leagueId: uuid().notNull(),
  week: integer().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export type Match = typeof matches.$inferSelect;
export type InsertMatch = typeof matches.$inferInsert;

export const matchesRelations = relations(matches, ({ one, many }) => ({
  league: one(leagues, {
    fields: [matches.leagueId],
    references: [leagues.id],
  }),
  users: many(matchesToUsers),
  activities: many(activities),
  messages: many(matchMessages),
}));

export const matchesToUsers = pgTable("matchesToUsers", {
  id: uuid().primaryKey().defaultRandom(),
  matchId: uuid().notNull(),
  userId: uuid().notNull(),
});

export type MatchToUser = typeof matchesToUsers.$inferSelect;
export type InsertMatchToUser = typeof matchesToUsers.$inferInsert;

export const matchesToUsersRelations = relations(matchesToUsers, ({ one }) => ({
  match: one(matches, {
    fields: [matchesToUsers.matchId],
    references: [matches.id],
  }),
  user: one(users, {
    fields: [matchesToUsers.userId],
    references: [users.id],
  }),
}));

export const leaguesToUsers = pgTable("leaguesToUsers", {
  id: uuid().primaryKey().defaultRandom(),
  leagueId: uuid().notNull(),
  userId: uuid().notNull(),
});

export type LeagueToUser = typeof leaguesToUsers.$inferSelect;
export type InsertLeagueToUser = typeof leaguesToUsers.$inferInsert;

export const leaguesToUsersRelations = relations(leaguesToUsers, ({ one }) => ({
  league: one(leagues, {
    fields: [leaguesToUsers.leagueId],
    references: [leagues.id],
  }),
  user: one(users, {
    fields: [leaguesToUsers.userId],
    references: [users.id],
  }),
}));

export const activities = pgTable("activities", {
  id: uuid().primaryKey().defaultRandom(),
  leagueId: uuid().notNull(),
  matchId: uuid().notNull(),
  userId: uuid().notNull(),
  activityType: text().notNull(),
  activityKpi1: text().notNull(),
  activityKpi2: text().notNull(),
  activityKpi3: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export type Activity = typeof activities.$inferSelect;
export type InsertActivity = typeof activities.$inferInsert;

export const activitiesRelations = relations(activities, ({ one }) => ({
  league: one(leagues, {
    fields: [activities.leagueId],
    references: [leagues.id],
  }),
  match: one(matches, {
    fields: [activities.matchId],
    references: [matches.id],
  }),
  user: one(users, {
    fields: [activities.userId],
    references: [users.id],
  }),
}));

export const leagueMessages = pgTable("leagueMessages", {
  id: uuid().primaryKey().defaultRandom(),
  senderId: uuid().notNull(),
  leagueId: uuid().notNull(),
  text: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export type LeagueMessage = typeof leagueMessages.$inferSelect;
export type InsertLeagueMessage = typeof leagueMessages.$inferInsert;

export const leagueMessagesRelations = relations(leagueMessages, ({ one }) => ({
  sender: one(users, {
    fields: [leagueMessages.senderId],
    references: [users.id],
  }),
  league: one(leagues, {
    fields: [leagueMessages.leagueId],
    references: [leagues.id],
  }),
}));

export const matchMessages = pgTable("matchMessages", {
  id: uuid().primaryKey().defaultRandom(),
  senderId: uuid().notNull(),
  matchId: uuid().notNull(),
  text: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export type MatchMessage = typeof matchMessages.$inferSelect;
export type InsertMatchMessage = typeof matchMessages.$inferInsert;

export const matchMessagesRelations = relations(matchMessages, ({ one }) => ({
  sender: one(users, {
    fields: [matchMessages.senderId],
    references: [users.id],
  }),
  league: one(leagues, {
    fields: [matchMessages.matchId],
    references: [leagues.id],
  }),
}));
