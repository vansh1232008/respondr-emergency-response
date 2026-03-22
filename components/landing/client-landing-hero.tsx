"use client"

import dynamic from "next/dynamic"
import { Suspense, useState, useEffect } from "react"
import { LoadingScene } from "@/components/landing/loading-scene"
import { FallbackHero } from "@/components/landing/fallback-hero"

// Dynamically import the 3D hero to improve initial load time
const LandingHero = dynamic(
  () => import("@/components/landing/landing-hero").then((mod) => ({ default: mod.LandingHero })),
  {
    ssr: false,
    loading: () => <LoadingScene />,
  },
)

export function ClientLandingHero() {
  const [hasError, setHasError] = useState(false)
  const [isWebGLSupported, setIsWebGLSupported] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingTimeout, setLoadingTimeout] = useState(false)

  useEffect(() => {
    // Check WebGL support
    const checkWebGLSupport = () => {
      try {
        const canvas = document.createElement("canvas")
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
        )
      } catch (e) {
        return false
      }
    }

    setIsWebGLSupported(checkWebGLSupport())

    // Add error handling
    const handleError = (event: ErrorEvent) => {
      // Only set error if it's related to WebGL or Three.js
      if (
        event.message &&
        (event.message.includes("WebGL") ||
          event.message.includes("three") ||
          event.message.includes("3D") ||
          event.message.includes("canvas") ||
          event.message.includes("gl") ||
          event.message.includes("shader"))
      ) {
        console.error("3D rendering error:", event.message)
        setHasError(true)
      }
    }

    // Set a timeout to show fallback if loading takes too long
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        setLoadingTimeout(true)
      }
    }, 10000) // 10 seconds timeout

    window.addEventListener("error", handleError)
    window.addEventListener("unhandledrejection", () => setHasError(true))

    return () => {
      window.removeEventListener("error", handleError)
      window.removeEventListener("unhandledrejection", () => setHasError(true))
      clearTimeout(timeoutId)
    }
  }, [isLoading])

  // When 3D scene is loaded
  useEffect(() => {
    const handleSceneLoaded = () => {
      setIsLoading(false)
    }

    window.addEventListener("scene-loaded", handleSceneLoaded)

    return () => {
      window.removeEventListener("scene-loaded", handleSceneLoaded)
    }
  }, [])

  if (hasError || !isWebGLSupported || loadingTimeout) {
    return <FallbackHero />
  }

  return (
    <Suspense fallback={<LoadingScene />}>
      <LandingHero />
    </Suspense>
  )
}
