"use client"

import { useState, useEffect } from "react"
import CookieConsent from "./CookieConsent"

export default function CookieConsentWrapper() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    const hasConsent = localStorage.getItem("cookie-consent")
    if (!hasConsent) {
      setShowConsent(true)
    }
  }, [])

  const handleAccept = () => {
    console.log("All cookies accepted")
    setShowConsent(false)
  }

  const handleDecline = () => {
    console.log("Only necessary cookies accepted")
    setShowConsent(false)
  }

  type CookiePreferences = Record<string, boolean>;

  const handleCustomize = (preferences: CookiePreferences) => {
    console.log("Custom preferences:", preferences)
    setShowConsent(false)
  }

  if (!showConsent) return null

  return <CookieConsent onAccept={handleAccept} onDecline={handleDecline} onCustomize={handleCustomize} />
}
