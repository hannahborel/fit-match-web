"use client";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SmartAppBannerProps {
  leagueId: string;
  className?: string;
}

interface AppDetectionResult {
  isInstalled: boolean;
  platform: "ios" | "android" | "unknown";
}

export default function SmartAppBanner({
  leagueId,
  className,
}: SmartAppBannerProps) {
  const [appDetection, setAppDetection] = useState<AppDetectionResult | null>(
    null
  );
  const [isVisible, setIsVisible] = useState(true);
  const [isDetecting, setIsDetecting] = useState(true);

  const detectAppInstallation = useCallback(async () => {
    setIsDetecting(true);

    try {
      // Check if we're on mobile
      const isMobile =
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      if (!isMobile) {
        setAppDetection({ isInstalled: false, platform: "unknown" });
        setIsDetecting(false);
        return;
      }

      // Detect platform
      const platform = /iPhone|iPad|iPod/i.test(navigator.userAgent)
        ? "ios"
        : "android";

      // Try to detect if app is installed using various methods
      let isInstalled = false;

      if (platform === "ios") {
        // iOS: Try to open app with custom scheme
        isInstalled = await checkIOSAppInstallation();
      } else {
        // Android: Try to open app with intent
        isInstalled = await checkAndroidAppInstallation();
      }

      setAppDetection({ isInstalled, platform });
    } catch (error) {
      console.error("App detection failed:", error);
      setAppDetection({ isInstalled: false, platform: "unknown" });
    } finally {
      setIsDetecting(false);
    }
  }, [leagueId]);

  useEffect(() => {
    detectAppInstallation();
  }, [detectAppInstallation]);

  const checkIOSAppInstallation = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      const startTime = Date.now();
      const timeout = 2000; // 2 second timeout

      // Try to open the app
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = "fit-match-web://join/" + leagueId;

      const handleVisibilityChange = () => {
        const timeElapsed = Date.now() - startTime;

        if (timeElapsed < timeout) {
          // App opened quickly, likely installed
          resolve(true);
        } else {
          // Took too long, likely not installed
          resolve(false);
        }

        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
        document.body.removeChild(iframe);
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);
      document.body.appendChild(iframe);

      // Fallback timeout
      setTimeout(() => {
        resolve(false);
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, timeout);
    });
  };

  const checkAndroidAppInstallation = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      const startTime = Date.now();
      const timeout = 2000; // 2 second timeout

      // Try to open the app with intent
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src =
        "intent://join/" +
        leagueId +
        "#Intent;scheme=fit-match-web;package=com.fitmatch.app;end";

      const handleVisibilityChange = () => {
        const timeElapsed = Date.now() - startTime;

        if (timeElapsed < timeout) {
          // App opened quickly, likely installed
          resolve(true);
        } else {
          // Took too long, likely not installed
          resolve(false);
        }

        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
        document.body.removeChild(iframe);
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);
      document.body.appendChild(iframe);

      // Fallback timeout
      setTimeout(() => {
        resolve(false);
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, timeout);
    });
  };

  const handleOpenApp = () => {
    if (appDetection?.platform === "ios") {
      window.location.href = `fit-match-web://join/${leagueId}`;
    } else if (appDetection?.platform === "android") {
      window.location.href = `intent://join/${leagueId}#Intent;scheme=fit-match-web;package=com.fitmatch.app;end`;
    }
  };

  const handleDownloadApp = () => {
    if (appDetection?.platform === "ios") {
      window.open("https://apps.apple.com/app/fitmatch", "_blank");
    } else if (appDetection?.platform === "android") {
      window.open(
        "https://play.google.com/store/apps/details?id=com.fitmatch.app",
        "_blank"
      );
    }
  };

  const handleContinueOnWeb = () => {
    // Store invitation context for when they install the app later
    if (typeof window !== "undefined") {
      try {
        const invitationContext = {
          leagueId,
          timestamp: Date.now(),
          source: "web_fallback" as const,
        };

        // Store in localStorage (will be synced to app when installed)
        localStorage.setItem(
          "fitmatch_invitation",
          JSON.stringify(invitationContext)
        );

        // Also set a cookie for server-side access
        document.cookie = `fitmatch_invitation=${JSON.stringify(
          invitationContext
        )}; path=/; max-age=${24 * 60 * 60}`; // 24 hours

        console.log("Stored invitation context for deferred deep linking");
      } catch (error) {
        console.error("Failed to store invitation context:", error);
      }
    }

    // Hide the banner
    setIsVisible(false);
  };

  if (!isVisible || isDetecting) {
    return null;
  }

  if (appDetection?.isInstalled) {
    // App is installed, show "Open in App" option
    return (
      <Card className={cn("mb-4 border-blue-200 bg-blue-50", className)}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">
                  Open in FitMatch App
                </p>
                <p className="text-sm text-blue-700">
                  Get the best experience with our mobile app
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={handleOpenApp}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                Open App
              </Button>
              <Button
                onClick={handleContinueOnWeb}
                variant="outline"
                size="sm"
                className="border-blue-300 text-blue-700 hover:bg-blue-100"
              >
                Continue on Web
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // App not installed, show download prompt
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-row justify-between items-center px-4 py-4 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex flex-row items-center justify-between">
        <Button
          onClick={() => setIsVisible(false)}
          variant="ghost"
          size="sm"
          className="text-green-600 hover:bg-green-100  h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="flex items-center space-x-2">
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-sm">
            <Smartphone className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <p className="font-bold text-md text-green-900">Hustle</p>
            <p className="text-sm text-green-700">Fitness Challenge App</p>
          </div>
        </div>
      </div>
      <Button
        onClick={handleDownloadApp}
        size="sm"
        className="bg-green-600 hover:bg-green-700"
      >
        Download
      </Button>
    </div>
  );
}
