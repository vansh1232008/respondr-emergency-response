"use client"

import { useEffect, useRef, useState } from "react"

interface LiveMapProps {
  location: {
    lat: number
    lng: number
  }
}

export const LiveMap = ({ location }: LiveMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // This is a placeholder for a real map implementation
    // In a real application, you would use Google Maps or another mapping library
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="h-full w-full bg-slate-800 rounded-lg flex items-center justify-center relative overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mb-4"></div>
            <p className="text-sm text-muted-foreground">Loading map data...</p>
          </div>
        </div>
      )}

      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full grid grid-cols-10 grid-rows-10">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="border border-slate-700/30" />
          ))}
        </div>

        {/* Main roads */}
        <div className="absolute top-1/2 left-0 right-0 h-4 bg-slate-700 transform -translate-y-1/2" />
        <div className="absolute top-0 bottom-0 left-1/2 w-4 bg-slate-700 transform -translate-x-1/2" />

        {/* Location marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-6 h-6 bg-red-500 rounded-full animate-pulse" />
          <div className="w-16 h-16 bg-red-500/20 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping" />
        </div>

        {/* Emergency units */}
        <div className="absolute top-[60%] left-[40%]">
          <div className="w-4 h-4 bg-blue-500 rounded-full" />
        </div>
        <div className="absolute top-[30%] left-[60%]">
          <div className="w-4 h-4 bg-green-500 rounded-full" />
        </div>
      </div>

      <div className="bg-slate-900/80 px-3 py-1 rounded text-xs z-10">
        Location: {location.lat.toFixed(3)}, {location.lng.toFixed(3)}
      </div>
    </div>
  )
}
