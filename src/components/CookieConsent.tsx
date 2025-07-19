"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { X, Cookie, Settings } from "lucide-react";

interface CookieConsentProps {
  onAccept: () => void;
  onDecline: () => void;
  onCustomize: (preferences: CookiePreferences) => void;
}

// interface CookiePreferences {
//   necessary: boolean;
//   analytics: boolean;
//   marketing: boolean;
//   functional: boolean;
// }

export type CookiePreferences = {
  [key: string]: boolean;
};

// interface CookieConsentProps {
//   onAccept: () => void;
//   onDecline: () => void;
//   onCustomize: (preferences: CookiePreferences) => void;
// }

export default function CookieConsent({
  onAccept,
  onDecline,
  onCustomize,
}: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsent = localStorage.getItem("cookie-consent");
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    localStorage.setItem("cookie-consent", JSON.stringify(allAccepted));
    setIsVisible(false);
    onAccept();
  };

  const handleDeclineAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    localStorage.setItem("cookie-consent", JSON.stringify(onlyNecessary));
    setIsVisible(false);
    onDecline();
  };

  const handleCustomize = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    setIsVisible(false);
    onCustomize(preferences);
  };

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 md:items-center">
      <div className="fixed inset-0 bg-black/50" />
      <Card className="relative w-full max-w-2xl border-[#bf935f]/20 bg-white shadow-2xl">
        <div className="p-6">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center">
              <Cookie className="mr-3 h-6 w-6 text-[#bf935f]" />
              <h2 className="text-xl font-bold text-[#443227]">
                Cookie Preferences
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <p className="mb-6 text-[#171310]">
            We use cookies to enhance your browsing experience, serve
            personalized content, and analyze our traffic. By clicking
            &quot;Accept All&quot;, you consent to our use of cookies.
          </p>

          {!showDetails ? (
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handleAcceptAll}
                className="bg-[#bf935f] hover:bg-[#bf935f]/90"
              >
                Accept All
              </Button>
              <Button
                variant="outline"
                onClick={handleDeclineAll}
                className="border-gray-300 bg-transparent"
              >
                Decline All
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDetails(true)}
                className="border-[#bf935f] text-[#bf935f] hover:bg-[#bf935f]/10"
              >
                <Settings className="mr-2 h-4 w-4" />
                Customize
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-[#443227]">
                      Necessary Cookies
                    </h3>
                    <p className="text-sm text-gray-600">
                      Essential for the website to function properly. Cannot be
                      disabled.
                    </p>
                  </div>
                  <Switch checked={preferences.necessary} disabled />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-[#443227]">
                      Analytics Cookies
                    </h3>
                    <p className="text-sm text-gray-600">
                      Help us understand how visitors interact with our website.
                    </p>
                  </div>
                  <Switch
                    checked={preferences.analytics}
                    onCheckedChange={checked =>
                      updatePreference("analytics", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-[#443227]">
                      Marketing Cookies
                    </h3>
                    <p className="text-sm text-gray-600">
                      Used to deliver personalized advertisements and track
                      campaign effectiveness.
                    </p>
                  </div>
                  <Switch
                    checked={preferences.marketing}
                    onCheckedChange={checked =>
                      updatePreference("marketing", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-[#443227]">
                      Functional Cookies
                    </h3>
                    <p className="text-sm text-gray-600">
                      Enable enhanced functionality like live chat and
                      personalized content.
                    </p>
                  </div>
                  <Switch
                    checked={preferences.functional}
                    onCheckedChange={checked =>
                      updatePreference("functional", checked)
                    }
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleCustomize}
                  className="bg-[#bf935f] hover:bg-[#bf935f]/90"
                >
                  Save Preferences
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowDetails(false)}
                  className="border-gray-300"
                >
                  Back
                </Button>
              </div>
            </div>
          )}

          <p className="mt-4 text-xs text-gray-500">
            For more information, please read our{" "}
            <a
              href="/privacy-policy"
              className="text-[#bf935f] hover:underline"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </Card>
    </div>
  );
}
