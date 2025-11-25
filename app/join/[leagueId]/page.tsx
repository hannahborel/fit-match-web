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

interface JoinLeaguePageProps {
  params: Promise<{
    leagueId: string;
  }>;
}

export default function JoinLeaguePage({ params }: JoinLeaguePageProps) {
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
        const response = await fetch(`/api/league-invite/${leagueId}`);
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
      router.push(`/sign-in?redirect=/join/${leagueId}`);
      return;
    }

    setJoining(true);
    try {
      const response = await fetch("/api/join-league-by-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ leagueId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to join league");
      }

      // Successfully joined, redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to join league");
    } finally {
      setJoining(false);
    }
  };

  const DetailCard = ({
    label,
    value,
    subtitle,
    isLast = false,
  }: {
    label: string;
    value: string;
    subtitle?: string;
    isLast?: boolean;
  }) => (
    <div className={`pb-5 mb-5 ${!isLast ? "border-b border-white/10" : ""}`}>
      <div className="flex items-center justify-between">
        <div className="text-m font-medium text-white/60">{label}</div>
        <div className="text-right">
          <div className="text-base font-semibold text-white/95 mb-0">
            {value}
          </div>
          {subtitle && (
            <div className="text-sm font-medium mt-0 text-teal-400">
              {subtitle}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "rgba(41, 49, 66, 1)" }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p className="text-white/80 text-lg font-medium">
            Loading league information...
          </p>
        </div>
      </div>
    );
  }

  if (error || !league) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4 bg-white/5 backdrop-blur-sm border-white/20 text-white">
          <CardHeader>
            <CardTitle className="text-red-400 text-center">
              League Not Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80 mb-6 text-center">
              {error || "This invitation link is invalid or has expired."}
            </p>
            <Button
              onClick={() => router.push("/")}
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const startDate = new Date(league.startDate);
  const formattedDate = startDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const spotsRemaining = league.size - league.currentMemberCount;

  return (
    <div
      className="flex h-screen items-center justify-center"
      style={{ backgroundColor: "rgb(12, 14, 20)" }}
    >
      {/* Smart App Banner */}
      <SmartAppBanner leagueId={leagueId} />

      {/* Main Card */}
      <Card
        className="border-0 outline-none rounded-2xl py-7 px-5 min-w-[350px]"
        style={{
          backgroundColor: "rgb(12, 14, 20)",
          boxShadow:
            "0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Top Gradient Bar */}

        <CardContent className="p-1">
          {/* Header */}
          <div className="text-center mb-15">
            <h1 className="text-2xl font-bold mb-2 leading-tight text-white">
              {league.name} League 2025
            </h1>
            <p className="text-base font-medium text-white/70 mb-4">
              {league.ownerName} invited you
            </p>
          </div>

          {/* Detail Cards */}
          <div className="mb-12">
            <DetailCard label="Start Date" value={formattedDate} />
            <DetailCard label="Duration" value={`${league.weeks} weeks`} />
            <DetailCard
              label="Members"
              value={`${league.currentMemberCount} of ${league.size}`}
              subtitle={`${spotsRemaining} spots open`}
              isLast={true}
            />
          </div>

          {/* Join Button */}
          {spotsRemaining > 0 ? (
            <Button
              onClick={handleJoinLeague}
              disabled={joining}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg py-4 rounded-2xl shadow-lg shadow-blue-500/25 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/30"
              size="lg"
            >
              {joining ? "Joining..." : "Join League"}
            </Button>
          ) : (
            <Button
              disabled
              className="w-full bg-gray-500 cursor-not-allowed text-white font-semibold text-lg py-4 rounded-2xl"
              size="lg"
            >
              League is Full
            </Button>
          )}

          {/* Sign In Prompt */}
          {!isSignedIn && (
            <p className="text-center mt-6 text-sm text-white/70">
              You&apos;ll need to sign in to join this league
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
