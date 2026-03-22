"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Headphones, MapPin } from "lucide-react"
import Link from "next/link"

// Animated emergency vehicle component
const EmergencyVehicle = ({ type = "ambulance", className = "", delay = 0 }) => {
  const colors = {
    ambulance: "bg-white",
    police: "bg-blue-800",
    fire: "bg-red-700",
  }

  const vehicleColor = colors[type as keyof typeof colors] || colors.ambulance

  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.div
        className={`relative w-16 h-8 ${vehicleColor} rounded-md shadow-lg`}
        animate={{ y: [0, -5, 0], x: [0, 5, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      >
        {/* Light bar */}
        <div className="absolute -top-1 left-0 right-0 h-2 flex justify-center space-x-1">
          <motion.div
            className="w-2 h-2 bg-blue-500 rounded-full"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
          <motion.div
            className="w-2 h-2 bg-red-500 rounded-full"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
        </div>

        {/* Windows */}
        <div className="absolute top-2 left-2 right-2 h-2 bg-blue-900/50 rounded-sm"></div>

        {/* Wheels */}
        <div className="absolute -bottom-1 left-2 w-2 h-2 bg-gray-800 rounded-full"></div>
        <div className="absolute -bottom-1 right-2 w-2 h-2 bg-gray-800 rounded-full"></div>

        {/* Light reflection */}
        <motion.div
          className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-t from-blue-500/50 to-red-500/50 blur-sm rounded-full"
          animate={{ opacity: [0.7, 0.3, 0.7] }}
          transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
        />
      </motion.div>
    </motion.div>
  )
}

// Pulse ring component
const PulseRing = ({ size = 200, delay = 0, color = "border-blue-500/30" }) => {
  return (
    <motion.div
      className={`absolute rounded-full ${color} border-2`}
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.5, 0.8] }}
      transition={{
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        delay,
        ease: "easeInOut",
      }}
    />
  )
}

// City grid component
const CityGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-slate-900/30" />

      {/* Horizontal grid lines */}
      <div className="absolute inset-0 flex flex-col justify-between">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={`h-${i}`} className="w-full h-px bg-blue-500/10" />
        ))}
      </div>

      {/* Vertical grid lines */}
      <div className="absolute inset-0 flex flex-row justify-between">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={`v-${i}`} className="h-full w-px bg-blue-500/10" />
        ))}
      </div>

      {/* Main roads */}
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-blue-500/20 transform -translate-y-1/2" />
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-blue-500/20 transform -translate-x-1/2" />
    </div>
  )
}

// Floating particles
const Particles = ({ count = 50 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const size = Math.random() * 3 + 1
        const duration = Math.random() * 15 + 10
        const initialX = Math.random() * 100
        const initialY = Math.random() * 100
        const delay = Math.random() * 5

        return (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-30"
            style={{
              width: size,
              height: size,
              left: `${initialX}%`,
              top: `${initialY}%`,
            }}
            animate={{
              y: [0, -100],
              x: [0, Math.random() * 50 - 25],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration,
              repeat: Number.POSITIVE_INFINITY,
              delay,
              ease: "linear",
            }}
          />
        )
      })}
    </div>
  )
}

export function AnimatedHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 400])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 600])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // State for animated stats
  const [stats, setStats] = useState({
    responseTime: 0,
    livesImpacted: 0,
    accuracy: 0,
  })

  // Animate stats on load
  useEffect(() => {
    const duration = 2000 // 2 seconds
    const startTime = Date.now()

    const targetStats = {
      responseTime: 42,
      livesImpacted: 50000,
      accuracy: 99.8,
    }

    const animateStats = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smoother animation
      const easeOutQuart = (x: number) => 1 - Math.pow(1 - x, 4)
      const easedProgress = easeOutQuart(progress)

      setStats({
        responseTime: Math.floor(easedProgress * targetStats.responseTime),
        livesImpacted: Math.floor(easedProgress * targetStats.livesImpacted),
        accuracy: Number.parseFloat((easedProgress * targetStats.accuracy).toFixed(1)),
      })

      if (progress < 1) {
        requestAnimationFrame(animateStats)
      }
    }

    animateStats()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 bg-[#0a0d14]">
        {/* City grid background */}
        <CityGrid />

        {/* Floating particles */}
        <Particles count={100} />

        {/* Central emergency hub */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {/* Pulse rings */}
          <PulseRing size={100} color="border-blue-500/40" />
          <PulseRing size={200} delay={1} color="border-red-500/30" />
          <PulseRing size={300} delay={2} color="border-blue-500/20" />

          {/* Emergency vehicles */}
          <EmergencyVehicle type="ambulance" className="top-20 -left-40" delay={0.5} />
          <EmergencyVehicle type="police" className="-top-20 right-20" delay={0.8} />
          <EmergencyVehicle type="fire" className="top-40 right-10" delay={1.2} />

          {/* Central hub */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="absolute inset-2 rounded-full bg-[#0a0d14]"
              animate={{ scale: [1, 0.9, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center text-blue-400 font-bold text-xl"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              R
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="container relative z-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
            Revolutionizing Emergency Response
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-3xl mx-auto">
            Enhancing India's emergency helpline infrastructure through cutting-edge AI and real-time coordination. Save
            lives with faster, smarter emergency response systems.
          </p>

          {/* Animated stats section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-background/20 backdrop-blur-lg rounded-xl p-6 border border-white/10"
            >
              <div className="text-5xl font-bold text-blue-400 mb-2">{stats.responseTime}%</div>
              <div className="text-lg text-foreground/80">Faster Response Time</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-background/20 backdrop-blur-lg rounded-xl p-6 border border-white/10"
            >
              <div className="text-5xl font-bold text-blue-400 mb-2">{stats.livesImpacted.toLocaleString()}</div>
              <div className="text-lg text-foreground/80">Lives Impacted</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-background/20 backdrop-blur-lg rounded-xl p-6 border border-white/10"
            >
              <div className="text-5xl font-bold text-blue-400 mb-2">{stats.accuracy}%</div>
              <div className="text-lg text-foreground/80">AI Accuracy</div>
            </motion.div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6 glow-effect group relative overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              <Link href="/operator" className="flex items-center gap-2 relative z-10">
                Operator Portal <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 group">
              <Link href="/field-station" className="flex items-center gap-2">
                Field Station <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <div className="w-full max-w-6xl mt-20 relative h-[300px] md:h-[400px]">
          <motion.div
            style={{ y: y1 }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute top-0 left-[10%] w-64 h-64 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-2xl backdrop-blur-sm p-6 transform rotate-6 border border-white/20 shadow-lg hover:shadow-blue-500/20 transition-shadow duration-300"
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/40 flex items-center justify-center mr-3">
                <Phone className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-sm font-medium">Incoming Call</div>
            </div>
            <div className="waveform-container my-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="waveform-bar"
                  style={{
                    height: `${Math.sin(i * 0.5) * 20 + 30}px`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              ))}
            </div>
            <div className="text-sm mt-4">
              <span className="flex items-center">
                <span className="urgency-indicator urgency-high"></span>
                High Priority
              </span>
              <p className="text-xs text-foreground/70 mt-1">Location: Mumbai, Maharashtra</p>
            </div>
          </motion.div>

          <motion.div
            style={{ y: y2 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute top-20 right-[15%] w-72 h-64 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-2xl backdrop-blur-sm p-6 transform -rotate-3 border border-white/20 shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300"
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-500/40 flex items-center justify-center mr-3">
                <Headphones className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-sm font-medium">AI Transcription</div>
            </div>
            <div className="text-xs space-y-2">
              <p className="bg-background/60 p-2 rounded">
                "I need an ambulance quickly. There's been an accident on Highway 8."
              </p>
              <div className="flex justify-between text-[10px] text-foreground/80">
                <span>Urgency: High</span>
                <span>Emotion: Distressed</span>
              </div>
              <p className="bg-background/60 p-2 rounded mt-2">
                "One person is unconscious. We need medical help immediately."
              </p>
            </div>
          </motion.div>

          <motion.div
            style={{ y: y3 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute bottom-0 left-[25%] w-64 h-56 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-2xl backdrop-blur-sm p-6 transform rotate-[-8deg] border border-white/20 shadow-lg hover:shadow-green-500/20 transition-shadow duration-300"
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-green-500/40 flex items-center justify-center mr-3">
                <MapPin className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-sm font-medium">Dispatch Status</div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs">Ambulance #42</span>
                <span className="text-xs bg-green-500/30 text-green-400 px-2 py-0.5 rounded-full">En Route</span>
              </div>
              <div className="h-20 bg-background/60 rounded-lg flex items-center justify-center">
                <div className="text-xs text-center">
                  <p>ETA: 8 minutes</p>
                  <p className="text-foreground/80 mt-1">Distance: 3.2 km</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-foreground/60 animate-bounce" />
        </div>
      </motion.div>

      {/* Feature Cards */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a0d14] to-transparent z-10" />
    </div>
  )
}
