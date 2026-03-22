"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface TranscriptItem {
  text: string
  time: string
}

interface TranscriptionDisplayProps {
  transcript: TranscriptItem[]
}

export const TranscriptionDisplay = ({ transcript }: TranscriptionDisplayProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll to bottom when transcript updates
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [transcript])

  return (
    <div ref={containerRef} className="bg-background/50 rounded-md p-3 h-48 overflow-y-auto">
      {transcript.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-3 last:mb-0"
        >
          <div className="flex justify-between items-start">
            <div className="text-sm bg-accent/50 rounded-lg p-2 max-w-[85%] border border-border/50">
              {item.text}
              <div className="mt-1 text-xs text-muted-foreground flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
                {item.time}
              </div>
            </div>
            <span className="text-xs text-muted-foreground">{item.time}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
