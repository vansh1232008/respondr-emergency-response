"use client"

import { OperatorDashboard } from "@/components/operator/operator-dashboard"
import { LandingNavbar } from "@/components/landing/landing-navbar"
import { CustomCursor } from "@/components/ui/custom-cursor"

export default function OperatorPortal() {
  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <LandingNavbar />
      <OperatorDashboard />
    </div>
  )
}
