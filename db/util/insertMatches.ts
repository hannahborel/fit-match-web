import { db } from "../db";
import {
  InsertMatch,
  InsertMatchToUser,
  matches,
  matchesToUsers,
} from "../schema";
import { getLeagueById } from "../utils";

export const insertMatches = async (leagueId: string) => {
  const league = await getLeagueById(leagueId);
  const teamsPerMatch = 2;
  const usersPerMatch = 4;
  for (let i = 0; i < league.weeks; i++) {
    const insertMatches: InsertMatch[] = [];
    const shuffledUsers = [...league.leaguesToUsers].sort(
      () => Math.random() - 0.5
    );
    for (let j = 0; j < shuffledUsers.length; j += usersPerMatch) {
      insertMatches.push({
        leagueId: league.id,
        week: i,
      });
    }
    const insertedMatches = await db
      .insert(matches)
      .values(insertMatches)
      .returning();
    const insertMatchesToUsers: InsertMatchToUser[] = [];
    for (let j = 0; j < shuffledUsers.length; j += usersPerMatch) {
      const matchUsers = shuffledUsers
        .slice(j, j + usersPerMatch)
        .map((user, index) => ({
          matchId: insertedMatches[Math.floor(j / usersPerMatch)].id,
          userId: user.userId,
          teamIndex: index % teamsPerMatch, // Alternate users between teams
        }));
      insertMatchesToUsers.push(...matchUsers);
    }
    await db.insert(matchesToUsers).values(insertMatchesToUsers);
  }
};
