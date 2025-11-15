-- SQL Verification Script for League Deletion
-- Replace '<league-id>' with the actual UUID of a deleted league to verify cleanup

-- This script helps verify that all league-related data has been properly deleted

-- 1. Check if the league itself was deleted
SELECT
  'leagues' as table_name,
  COUNT(*) as remaining_records
FROM leagues
WHERE id = '<league-id>';

-- 2. Check if league-to-user relationships were deleted
SELECT
  'leaguesToUsers' as table_name,
  COUNT(*) as remaining_records
FROM "leaguesToUsers"
WHERE "leagueId" = '<league-id>';

-- 3. Check if matches were deleted
SELECT
  'matches' as table_name,
  COUNT(*) as remaining_records
FROM matches
WHERE "leagueId" = '<league-id>';

-- 4. Check if logged activities were deleted
SELECT
  'loggedActivities' as table_name,
  COUNT(*) as remaining_records
FROM "loggedActivities"
WHERE "leagueId" = '<league-id>';

-- 5. Check if league messages were deleted
SELECT
  'leagueMessages' as table_name,
  COUNT(*) as remaining_records
FROM "leagueMessages"
WHERE "leagueId" = '<league-id>';

-- 6. Check if activity challenges were deleted
SELECT
  'activityChallenges' as table_name,
  COUNT(*) as remaining_records
FROM "activityChallenges"
WHERE "leagueId" = '<league-id>';

-- 7. Check if match-to-user relationships were deleted (for all matches in the deleted league)
-- Note: This requires joining with matches, but if matches are deleted, this will show 0
SELECT
  'matchesToUsers' as table_name,
  COUNT(*) as remaining_records
FROM "matchesToUsers" mtu
WHERE mtu."matchId" IN (
  SELECT id FROM matches WHERE "leagueId" = '<league-id>'
);

-- 8. Check if match messages were deleted (for all matches in the deleted league)
-- Note: This requires joining with matches, but if matches are deleted, this will show 0
SELECT
  'matchMessages' as table_name,
  COUNT(*) as remaining_records
FROM "matchMessages" mm
WHERE mm."matchId" IN (
  SELECT id FROM matches WHERE "leagueId" = '<league-id>'
);

-- SUMMARY VIEW: All tables in one query
-- Expected result: All counts should be 0 after successful deletion
SELECT
  'Summary - All Tables' as description,
  (SELECT COUNT(*) FROM leagues WHERE id = '<league-id>') as leagues,
  (SELECT COUNT(*) FROM "leaguesToUsers" WHERE "leagueId" = '<league-id>') as leaguesToUsers,
  (SELECT COUNT(*) FROM matches WHERE "leagueId" = '<league-id>') as matches,
  (SELECT COUNT(*) FROM "loggedActivities" WHERE "leagueId" = '<league-id>') as loggedActivities,
  (SELECT COUNT(*) FROM "leagueMessages" WHERE "leagueId" = '<league-id>') as leagueMessages,
  (SELECT COUNT(*) FROM "activityChallenges" WHERE "leagueId" = '<league-id>') as activityChallenges,
  (SELECT COUNT(*) FROM "matchesToUsers" WHERE "matchId" IN (SELECT id FROM matches WHERE "leagueId" = '<league-id>')) as matchesToUsers,
  (SELECT COUNT(*) FROM "matchMessages" WHERE "matchId" IN (SELECT id FROM matches WHERE "leagueId" = '<league-id>')) as matchMessages;

-- ALL EXPECTED VALUES SHOULD BE 0 IF DELETION WAS SUCCESSFUL
