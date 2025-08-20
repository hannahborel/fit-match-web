"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import SmartAppBanner from "@/components/SmartAppBanner";

interface LeagueInfo {
  id: string;
  name: string;
  description: string;
  size: number;
  weeks: number;
  startDate: string;
  currentMemberCount: number;
  ownerName: string;
}

interface TestJoinLeaguePageProps {
  params: Promise<{
    leagueId: string;
  }>;
}

export default function TestJoinLeaguePage({
  params,
}: TestJoinLeaguePageProps) {
  const { leagueId } = use(params);
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [league, setLeague] = useState<LeagueInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeagueInfo = async () => {
      try {
        // Use the test endpoint for mock data
        const response = await fetch(`/api/test-league/${leagueId}`);
        if (!response.ok) {
          throw new Error("League not found");
        }
        const data = await response.json();
        setLeague(data.league);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load league");
      } finally {
        setLoading(false);
      }
    };

    fetchLeagueInfo();
  }, [leagueId]);

  const handleJoinLeague = async () => {
    if (!isSignedIn) {
      // Redirect to sign in with return URL
      router.push(`/sign-in?redirect=/test-join/${leagueId}`);
      return;
    }

    setJoining(true);
    try {
      // Simulate joining (this is just for testing)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Successfully joined, redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to join league");
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading league information...</p>
        </div>
      </div>
    );
  }

  if (error || !league) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader>
            <CardTitle className="text-red-600">League Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              {error || "This invitation link is invalid or has expired."}
            </p>
            <Button onClick={() => router.push("/")} className="w-full">
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const startDate = new Date(league.startDate);
  const formattedDate = startDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const spotsRemaining = league.size - league.currentMemberCount;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Smart App Banner */}
        <SmartAppBanner leagueId={leagueId} />

        {/* Test Mode Notice */}
        <Card className="mb-4 border-yellow-200 bg-yellow-50">
          <CardContent className="p-3">
            <p className="text-sm text-yellow-800 text-center">
              🧪 <strong>TEST MODE</strong> - This is a test league for testing
              deep linking
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-green-600">
              You&apos;re Invited!
            </CardTitle>
            <p className="text-gray-600">
              {league.ownerName} wants you to join their league
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* League Information */}
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  {league.name}
                </h2>
                <p className="text-gray-600 mt-1">{league.description}</p>
              </div>

              {/* League Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold text-gray-900">
                    {formattedDate}
                  </div>
                  <div className="text-gray-600">Start Date</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold text-gray-900">
                    {league.weeks}
                  </div>
                  <div className="text-gray-600">Weeks</div>
                </div>
              </div>

              {/* Member Count */}
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">League Status</div>
                <div className="font-semibold text-blue-900">
                  {league.currentMemberCount} of {league.size} members
                </div>
                {spotsRemaining > 0 ? (
                  <div className="text-sm text-blue-600 mt-1">
                    {spotsRemaining} spot{spotsRemaining !== 1 ? "s" : ""}{" "}
                    remaining
                  </div>
                ) : (
                  <div className="text-sm text-red-600 mt-1">
                    League is full
                  </div>
                )}
              </div>
            </div>

            {/* Join Button */}
            {spotsRemaining > 0 ? (
              <Button
                onClick={handleJoinLeague}
                disabled={joining}
                className="w-full bg-green-600 hover:bg-green-700"
                size="lg"
              >
                {joining ? "Joining..." : "Join This League (Test)"}
              </Button>
            ) : (
              <Button
                disabled
                className="w-full bg-gray-400 cursor-not-allowed"
                size="lg"
              >
                League is Full
              </Button>
            )}

            {/* Sign In Prompt */}
            {!isSignedIn && (
              <p className="text-center text-sm text-gray-500">
                You&apos;ll need to sign in to join this league
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
