import { Card } from "@/components/ui/card";

const Dashboard = () => (
  <div className=" flex w-full h-screen  p-8">
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 flex-grow">
      <Card className="md:col-span-6">This week in the league...</Card>
      <Card className="md:col-span-3">Your Current Match</Card>
      <Card className="md:col-span-3">Log an activity</Card>
    </div>
  </div>
);

export default Dashboard;
