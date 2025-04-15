import CreateLeagueCard from "@/components/cards/CreateLeagueCard";
import JoinLeagueCard from "@/components/cards/JoinLeagueCard";
import LoggedActivitiesCard from "@/components/cards/LeagueActivitiesTableCard";
import LeagueMemberActionsCard from "@/components/cards/LeagueMemberActionsCard";
import LeagueMembersCard from "@/components/cards/LeagueMembersCard";
import LeagueOwnerActionsCard from "@/components/cards/LeagueOwnerActionsCard";
import LeaguesTableCard from "@/components/cards/LeaguesTableCard";
import LeagueStandingsCard from "@/components/cards/LeagueStandingsCard";
import LogActivityCard from "@/components/cards/LogActivityCard";
import {
  getCurrentLeague,
  getLeagues,
  getMemberUsersForLeague,
  getUsersForLeague,
} from "@/db/utils";
import { FitMatchUser } from "@/types/types";
import { auth } from "@clerk/nextjs/server";

const DevTools = async () => {
  const currentLeague = await getCurrentLeague();
  const { userId } = await auth();
  const leagues = await getLeagues();
  const usersInCurrentLeague: FitMatchUser[] = currentLeague
    ? await getUsersForLeague(currentLeague)
    : [];
  const memberUsersForLeague = currentLeague
    ? await getMemberUsersForLeague(currentLeague)
    : [];
  const leagueMembersMap = new Map<string, FitMatchUser>();
  usersInCurrentLeague.forEach((user) => {
    leagueMembersMap.set(user.id, user);
  });
  return (
    <div className=" flex w-full p-8">
      <div className="grid grid-cols-3 gap-4 flex-grow">
        {currentLeague && (
          <LogActivityCard
            leagueId={currentLeague.id}
            matchId="00000000-0000-0000-0000-000000000000"
          />
        )}
        {!currentLeague && <CreateLeagueCard />}
        {!currentLeague && <JoinLeagueCard />}
        {!currentLeague && <LeaguesTableCard leagues={leagues} />}
        {currentLeague && currentLeague.ownerId == userId && (
          <LeagueOwnerActionsCard
            league={currentLeague}
            leagueMembers={memberUsersForLeague}
          />
        )}
        {currentLeague && currentLeague.ownerId !== userId && (
          <LeagueMemberActionsCard league={currentLeague} />
        )}
        {currentLeague && (
          <LoggedActivitiesCard
            loggedActivities={currentLeague.loggedActivities}
            leagueMembersMap={leagueMembersMap}
          />
        )}
        {currentLeague && (
          <LeagueMembersCard
            league={currentLeague}
            leagueMembers={usersInCurrentLeague}
          />
        )}
        {currentLeague && (
          <LeagueStandingsCard
            league={currentLeague}
            leagueMembers={usersInCurrentLeague}
          />
        )}
      </div>
    </div>
  );
};

export default DevTools;
