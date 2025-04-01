import LogActivity from "@/components/cards/LogActivityCard";

const DevTools = async () => {
  return (
    <div className=" flex w-full p-8">
      <div className="grid grid-cols-3 gap-4 flex-grow">
        <LogActivity leagueId="1" matchId="1" userId="1" />
      </div>
    </div>
  );
};

export default DevTools;
