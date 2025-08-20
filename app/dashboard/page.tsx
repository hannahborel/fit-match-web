"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  hasPendingInvitation,
  getPendingLeagueId,
  handlePendingInvitation,
} from "@/lib/invitationContext";
import { Users, ArrowRight } from "lucide-react";

const Dashboard = () => {
  const router = useRouter();
  const [pendingInvitation, setPendingInvitation] = useState<string | null>(
    null
  );

  useEffect(() => {
    // Check for pending invitations when dashboard loads
    if (hasPendingInvitation()) {
      const leagueId = getPendingLeagueId();
      setPendingInvitation(leagueId);
    }
  }, []);

  const handlePendingInvitationClick = () => {
    if (pendingInvitation) {
      const leagueId = handlePendingInvitation();
      if (leagueId) {
        setPendingInvitation(null);
        router.push(`/join/${leagueId}`);
      }
    }
  };

  return (
    <div className="flex w-full h-screen p-8">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 flex-grow">
        {/* Pending Invitation Banner */}
        {pendingInvitation && (
          <Card className="md:col-span-6 border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">
                      Pending League Invitation
                    </p>
                    <p className="text-sm text-blue-700">
                      You have an invitation to join a league. Click below to
                      view it.
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handlePendingInvitationClick}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  View Invitation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="md:col-span-6">This week in the league...</Card>
        <Card className="md:col-span-3">Your Current Match</Card>
        <Card className="md:col-span-3">Log an activity</Card>
      </div>
    </div>
  );
};

export default Dashboard;
