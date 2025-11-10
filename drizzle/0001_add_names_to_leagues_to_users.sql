-- Add firstName and lastName to leaguesToUsers table
ALTER TABLE "leaguesToUsers" ADD COLUMN "firstName" text NOT NULL DEFAULT '';
--> statement-breakpoint
ALTER TABLE "leaguesToUsers" ADD COLUMN "lastName" text;
--> statement-breakpoint
-- Backfill existing data from users table
UPDATE "leaguesToUsers" AS ltu
SET
  "firstName" = COALESCE(u."firstName", ''),
  "lastName" = u."lastName"
FROM "users" AS u
WHERE ltu."userId" = u."id"
AND ltu."firstName" = '';
--> statement-breakpoint
-- Backfill existing data from bots table for bot users
UPDATE "leaguesToUsers" AS ltu
SET
  "firstName" = COALESCE(b."firstName", 'Bot'),
  "lastName" = b."lastName"
FROM "bots" AS b
WHERE ltu."userId" = b."id"
AND ltu."isBot" = true
AND ltu."firstName" = '';
--> statement-breakpoint
-- Remove the default after adding the column
ALTER TABLE "leaguesToUsers" ALTER COLUMN "firstName" DROP DEFAULT;
