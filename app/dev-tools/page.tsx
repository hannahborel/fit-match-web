import CreateLeagueCard from "@/components/cards/CreateLeagueCard";
import JoinLeagueCard from "@/components/cards/JoinLeagueCard";
import LoggedActivitiesCard from "@/components/cards/LeagueActivitiesTableCard";
import LeagueMemberActionsCard from "@/components/cards/LeagueMemberActionsCard";
import LeagueOwnerActionsCard from "@/components/cards/LeagueOwnerActionsCard";
import LeaguesTableCard from "@/components/cards/LeaguesTableCard";
import LogActivityCard from "@/components/cards/LogActivityCard";
import { getCurrentLeague, getLeagues } from "@/db/utils";
import { auth } from "@clerk/nextjs/server";

const DevTools = async () => {
  const currentLeague = await getCurrentLeague();
  const { userId } = await auth();
  const leagues = await getLeagues();
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
          <LeagueOwnerActionsCard league={currentLeague} />
        )}
        {currentLeague && currentLeague.ownerId !== userId && (
          <LeagueMemberActionsCard league={currentLeague} />
        )}
        {currentLeague && (
          <LoggedActivitiesCard
            loggedActivities={currentLeague.loggedActivities}
          />
        )}
      </div>
    </div>
  );
};

export default DevTools;
