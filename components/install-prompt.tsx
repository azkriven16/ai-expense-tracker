"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Download, Share, Plus } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if it's iOS
    const iOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window);
    setIsIOS(iOS);

    // Check if already installed (standalone mode)
    const standalone = window.matchMedia("(display-mode: standalone)").matches;
    setIsStandalone(standalone);

    // Check if user has previously dismissed the prompt
    const dismissed = localStorage.getItem("pwa-install-dismissed");
    const dismissedTime = localStorage.getItem("pwa-install-dismissed-time");

    // If dismissed, check if enough time has passed (e.g., 7 days)
    if (dismissed && dismissedTime) {
      const dismissedDate = new Date(parseInt(dismissedTime));
      const daysSinceDismissal =
        (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);

      // Don't show again for 7 days after dismissal
      if (daysSinceDismissal < 7) {
        return;
      }
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Only show prompt if not recently dismissed
      if (
        !dismissed ||
        (dismissedTime &&
          Date.now() - parseInt(dismissedTime) > 7 * 24 * 60 * 60 * 1000)
      ) {
        // Add a small delay to avoid showing immediately on page load
        setTimeout(() => setShowPrompt(true), 2000);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // For iOS, show prompt if not standalone and not recently dismissed
    if (iOS && !standalone) {
      if (
        !dismissed ||
        (dismissedTime &&
          Date.now() - parseInt(dismissedTime) > 7 * 24 * 60 * 60 * 1000)
      ) {
        // Add delay for iOS too
        setTimeout(() => setShowPrompt(true), 3000);
      }
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // For iOS, we can't trigger the install programmatically
      // Just keep the instructions visible
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
      // Clear dismissal data if user accepts
      localStorage.removeItem("pwa-install-dismissed");
      localStorage.removeItem("pwa-install-dismissed-time");
    } else {
      console.log("User dismissed the install prompt");
      // Remember dismissal
      localStorage.setItem("pwa-install-dismissed", "true");
      localStorage.setItem("pwa-install-dismissed-time", Date.now().toString());
    }

    // Clear the deferredPrompt so it can only be used once
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Remember dismissal for all platforms
    localStorage.setItem("pwa-install-dismissed", "true");
    localStorage.setItem("pwa-install-dismissed-time", Date.now().toString());
  };

  // Don't show if already installed or user hasn't been shown the prompt
  if (isStandalone || !showPrompt) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50"></div>
      <Card className="fixed inset-0 m-auto z-50 shadow-lg border max-w-sm w-full h-fit flex items-center justify-center">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Download className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Install App</h3>
              </div>

              {isIOS ? (
                <div>
                  <p className="text-sm text-muted-foreground mb-3">
                    To install this app on your iOS device, tap the share button
                    <Share className="inline w-4 h-4 mx-1" />
                    and then &ldquo;Add to Home Screen&rdquo;
                    <Plus className="inline w-4 h-4 mx-1" />
                  </p>
                  <Button onClick={handleDismiss} size="sm">
                    Got it
                  </Button>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Install this app for a better experience with offline access
                    and quick launch.
                  </p>
                  <div className="flex gap-2">
                    <Button onClick={handleInstallClick} size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Install App
                    </Button>
                    <Button onClick={handleDismiss} variant="outline" size="sm">
                      Not now
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <Button
              onClick={handleDismiss}
              variant="ghost"
              size="sm"
              className="ml-3 h-8 w-8 p-0"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
