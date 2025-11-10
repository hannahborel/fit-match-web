CREATE TABLE "activityChallenges" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"leagueId" uuid NOT NULL,
	"activityId" uuid NOT NULL,
	"userId" text NOT NULL,
	"challengeReason" text NOT NULL,
	"challengeEndTime" timestamp NOT NULL,
	"challengeVotesFor" integer DEFAULT 0 NOT NULL,
	"challengeVotesAgainst" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bots" (
	"id" text PRIMARY KEY NOT NULL,
	"firstName" text NOT NULL,
	"lastName" text NOT NULL,
	"imageUrl" text NOT NULL,
	"username" text NOT NULL,
	"activityAlgorithm" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leagueMessages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"senderId" text NOT NULL,
	"leagueId" uuid NOT NULL,
	"text" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leagues" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"ownerId" text NOT NULL,
	"size" integer NOT NULL,
	"weeks" integer NOT NULL,
	"startDate" timestamp NOT NULL,
	"slug" text DEFAULT '' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leaguesToUsers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"leagueId" uuid NOT NULL,
	"userId" text NOT NULL,
	"firstName" text NOT NULL,
	"lastName" text,
	"isBot" boolean DEFAULT false NOT NULL,
	"wins" integer DEFAULT 0 NOT NULL,
	"losses" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "loggedActivities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"leagueId" uuid NOT NULL,
	"matchId" uuid NOT NULL,
	"userId" text NOT NULL,
	"activityType" text NOT NULL,
	"duration" integer DEFAULT 0 NOT NULL,
	"sets" integer DEFAULT 0 NOT NULL,
	"reps" integer DEFAULT 0 NOT NULL,
	"cardioPoints" integer DEFAULT 0 NOT NULL,
	"strengthPoints" integer DEFAULT 0 NOT NULL,
	"photoUrl" text,
	"activityNote" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "matchMessages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"senderId" text NOT NULL,
	"matchId" uuid NOT NULL,
	"text" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "matches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"leagueId" uuid NOT NULL,
	"week" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "matchesToUsers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"matchId" uuid NOT NULL,
	"userId" text NOT NULL,
	"teamIndex" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"firstName" text NOT NULL,
	"lastName" text,
	"email" text NOT NULL,
	"thumbnailUrl" text,
	"points" integer DEFAULT 0 NOT NULL,
	"isLeagueManager" boolean DEFAULT false NOT NULL,
	"lastSyncedAt" timestamp DEFAULT now() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
