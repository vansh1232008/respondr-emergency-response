"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Headphones, AlertTriangle } from "lucide-react"
import Link from "next/link"

export function FallbackHero() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900/30 via-slate-900/50 to-slate-950">
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-3/4 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
            Revolutionizing Emergency Response
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-3xl mx-auto">
            Enhancing India's emergency helpline infrastructure through cutting-edge AI and real-time coordination. Save
            lives with faster, smarter emergency response systems.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-background/20 backdrop-blur-lg rounded-xl p-6 border border-white/10"
            >
              <div className="text-5xl font-bold text-blue-400 mb-2">42%</div>
              <div className="text-lg text-foreground/80">Faster Response Time</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-background/20 backdrop-blur-lg rounded-xl p-6 border border-white/10"
            >
              <div className="text-5xl font-bold text-blue-400 mb-2">50,000+</div>
              <div className="text-lg text-foreground/80">Lives Impacted</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-background/20 backdrop-blur-lg rounded-xl p-6 border border-white/10"
            >
              <div className="text-5xl font-bold text-blue-400 mb-2">99.8%</div>
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

        {/* Feature Cards with animations */}
        <div className="w-full max-w-6xl mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-background/20 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Intelligent Call Routing</h3>
            <p className="text-foreground/70">
              Automatically route emergency calls to the nearest available operator with the right language skills.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="bg-background/20 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
              <Headphones className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Transcription</h3>
            <p className="text-foreground/70">
              Convert speech to text instantly with support for multiple Indian languages using advanced AI.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="bg-background/20 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-red-500/50 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Urgency Detection</h3>
            <p className="text-foreground/70">
              AI-powered analysis to detect urgency levels and prioritize critical emergencies.
            </p>
          </motion.div>
        </div>

        {/* Animated elements that simulate the 3D scene */}
        <div className="relative w-full h-64 mt-20">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative">
              {/* Pulse rings */}
              <motion.div
                className="absolute left-1/2 top-1/2 w-32 h-32 rounded-full border-2 border-blue-500/50 transform -translate-x-1/2 -translate-y-1/2"
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute left-1/2 top-1/2 w-48 h-48 rounded-full border-2 border-red-500/50 transform -translate-x-1/2 -translate-y-1/2"
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
              />
              <motion.div
                className="absolute left-1/2 top-1/2 w-64 h-64 rounded-full border-2 border-blue-500/50 transform -translate-x-1/2 -translate-y-1/2"
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
              />

              {/* Emergency vehicle representations */}
              <motion.div
                className="absolute left-1/4 top-1/2 w-12 h-6 bg-white rounded-md transform -translate-y-1/2"
                animate={{ x: [-10, 10], y: [-5, 5] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 flex space-x-1 px-1">
                  <motion.div
                    className="w-2 h-1.5 bg-blue-500 rounded-sm"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <motion.div
                    className="w-2 h-1.5 bg-red-500 rounded-sm"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                  />
                </div>
                <div className="absolute bottom-0 w-full h-1.5 bg-red-500/50 rounded-full blur-sm" />
              </motion.div>

              <motion.div
                className="absolute right-1/4 top-1/3 w-12 h-6 bg-blue-800 rounded-md"
                animate={{ x: [10, -10], y: [5, -5] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 flex space-x-1 px-1">
                  <motion.div
                    className="w-2 h-1.5 bg-blue-500 rounded-sm"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <motion.div
                    className="w-2 h-1.5 bg-red-500 rounded-sm"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                  />
                </div>
                <div className="absolute bottom-0 w-full h-1.5 bg-blue-500/50 rounded-full blur-sm" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
