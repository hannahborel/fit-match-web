import CreateLeagueCard from "@/components/cards/CreateLeagueCard";
import LeagueActionsCard from "@/components/cards/LeagueActionsCard";
import LoggedActivitiesCard from "@/components/cards/LeagueActivitiesTableCard";
import LogActivityCard from "@/components/cards/LogActivityCard";
import { getCurrentLeague } from "@/db/utils";

const DevTools = async () => {
  const currentLeague = await getCurrentLeague();
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
        {currentLeague && <LeagueActionsCard league={currentLeague} />}
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
