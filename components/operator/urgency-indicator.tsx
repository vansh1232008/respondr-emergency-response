"use client"

import { useEffect, useState } from "react"

interface UrgencyIndicatorProps {
  level: "low" | "medium" | "high" | number
  size?: "sm" | "md" | "lg"
}

export const UrgencyIndicator = ({ level, size = "md" }: UrgencyIndicatorProps) => {
  const [isPulsing, setIsPulsing] = useState(level === "high" || (typeof level === "number" && level > 70))
  const [urgencyLevel, setUrgencyLevel] = useState<"low" | "medium" | "high">("low")

  useEffect(() => {
    if (typeof level === "string") {
      setUrgencyLevel(level)
      setIsPulsing(level === "high")
    } else {
      // Convert numeric level to string category
      if (level > 70) {
        setUrgencyLevel("high")
        setIsPulsing(true)
      } else if (level > 40) {
        setUrgencyLevel("medium")
        setIsPulsing(false)
      } else {
        setUrgencyLevel("low")
        setIsPulsing(false)
      }
    }
  }, [level])

  const sizeClass = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  }[size]

  return (
    <span
      className={`${sizeClass} rounded-full mr-2 ${
        urgencyLevel === "low"
          ? "bg-emergency-low"
          : urgencyLevel === "medium"
            ? "bg-emergency-medium"
            : "bg-emergency-high"
      } ${isPulsing ? "animate-pulse" : ""}`}
      style={{
        boxShadow:
          urgencyLevel === "high"
            ? "0 0 10px hsl(var(--emergency-high))"
            : urgencyLevel === "medium"
              ? "0 0 8px hsl(var(--emergency-medium))"
              : "0 0 6px hsl(var(--emergency-low))",
      }}
    />
  )
}
