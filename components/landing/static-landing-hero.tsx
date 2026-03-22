"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Headphones, MapPin, Shield, Clock, AlertTriangle } from "lucide-react"
import Link from "next/link"

export function StaticLandingHero() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900/30 via-slate-900/50 to-slate-950">
      <div className="container px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
            Welcome to our platform
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

        {/* Feature Cards */}
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

        {/* Additional Feature Cards */}
        <div className="w-full max-w-6xl mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="bg-background/20 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-green-500/50 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Precision Location Tracking</h3>
            <p className="text-foreground/70">
              Pinpoint caller locations even with poor signal using advanced triangulation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.6 }}
            className="bg-background/20 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-amber-500/50 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Reduced Response Time</h3>
            <p className="text-foreground/70">
              Cut emergency response times by up to 50% through AI-assisted coordination.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.8 }}
            className="bg-background/20 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Seamless Integration</h3>
            <p className="text-foreground/70">
              Integrate with existing emergency services infrastructure with minimal disruption.
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="mt-20 mb-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-foreground/30 flex justify-center pt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-foreground/60 animate-bounce" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
