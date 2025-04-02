import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const Dashboard = () => (
  <div className=" flex w-full h-screen bg-gray-100">
    <div className="mx-auto my-auto">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Welcome to FitMatch</CardTitle>
          <CardDescription>The new home for fitness.</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-end gap-2">
          <Link href="/sign-in">
            <Button className="cursor-pointer" variant={"outline"}>
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="cursor-pointer" variant={"outline"}>
              Sign Up
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  </div>
);

export default Dashboard;
