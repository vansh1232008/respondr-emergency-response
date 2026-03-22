"use client"

import { useEffect, useState, useRef } from "react"

export const AudioWaveform = () => {
  const [waveform, setWaveform] = useState<number[]>([])
  const animationRef = useRef<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Generate initial waveform
    const initialWaveform = Array.from({ length: 100 }, () => Math.floor(Math.random() * 40) + 10)
    setWaveform(initialWaveform)

    // Animate waveform
    const animateWaveform = () => {
      setWaveform((prev) => {
        const newWaveform = [...prev]
        for (let i = 0; i < newWaveform.length; i++) {
          // Add some randomness to the waveform
          const change = Math.floor(Math.random() * 10) - 5
          let newHeight = newWaveform[i] + change

          // Keep within bounds
          if (newHeight < 5) newHeight = 5
          if (newHeight > 50) newHeight = 50

          newWaveform[i] = newHeight
        }
        return newWaveform
      })

      animationRef.current = requestAnimationFrame(animateWaveform)
    }

    animationRef.current = requestAnimationFrame(animateWaveform)

    // Draw canvas waveform
    const drawCanvas = () => {
      if (!canvasRef.current) return

      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Set canvas dimensions
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw waveform
      const barWidth = canvas.width / waveform.length
      const centerY = canvas.height / 2

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "rgba(59, 130, 246, 0.8)")
      gradient.addColorStop(0.5, "rgba(59, 130, 246, 1)")
      gradient.addColorStop(1, "rgba(59, 130, 246, 0.8)")

      ctx.fillStyle = gradient

      for (let i = 0; i < waveform.length; i++) {
        const x = i * barWidth
        const height = waveform[i]

        // Draw bar
        ctx.beginPath()
        ctx.roundRect(x, centerY - height / 2, barWidth - 1, height, 2)
        ctx.fill()
      }

      // Add time markers
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "left"
      ctx.fillText("0:00", 10, canvas.height - 5)
      ctx.textAlign = "right"
      ctx.fillText("0:30", canvas.width - 10, canvas.height - 5)

      requestAnimationFrame(drawCanvas)
    }

    drawCanvas()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="relative h-16 w-full">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
        <div className="h-full w-px bg-red-500/50 animate-pulse"></div>
      </div>
    </div>
  )
}
