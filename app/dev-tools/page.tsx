import LogActivityCard from "@/components/cards/LogActivityCard";

const DevTools = async () => {
  return (
    <div className=" flex w-full p-8">
      <div className="grid grid-cols-3 gap-4 flex-grow">
        <LogActivityCard
          leagueId="00000000-0000-0000-0000-000000000000"
          matchId="00000000-0000-0000-0000-000000000000"
          userId="00000000-0000-0000-0000-000000000000"
        />
      </div>
    </div>
  );
};

export default DevTools;
