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

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show the install prompt
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // For iOS, show prompt if not standalone and not already dismissed
    if (iOS && !standalone) {
      const dismissed = localStorage.getItem("ios-install-dismissed");
      if (!dismissed) {
        setShowPrompt(true);
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
    } else {
      console.log("User dismissed the install prompt");
    }

    // Clear the deferredPrompt so it can only be used once
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    if (isIOS) {
      // Remember that iOS user dismissed the prompt
      localStorage.setItem("ios-install-dismissed", "true");
    }
  };

  // Don't show if already installed or user hasn't been shown the prompt
  if (isStandalone || !showPrompt) {
    return null;
  }

  return (
    <Card className="fixed bottom-5 left-5 right-5 z-50 shadow-lg border">
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
  );
}
