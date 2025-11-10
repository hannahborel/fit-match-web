-- Add firstName and lastName to leaguesToUsers table
ALTER TABLE "leaguesToUsers" ADD COLUMN "firstName" text NOT NULL DEFAULT '';
--> statement-breakpoint
ALTER TABLE "leaguesToUsers" ADD COLUMN "lastName" text;
--> statement-breakpoint
-- Remove the default after adding the column
ALTER TABLE "leaguesToUsers" ALTER COLUMN "firstName" DROP DEFAULT;
