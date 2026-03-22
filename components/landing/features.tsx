"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Phone, Headphones, MapPin, AlertTriangle, Clock, BarChart4, Languages, Zap } from "lucide-react"

const features = [
  {
    icon: Phone,
    title: "Intelligent Call Routing",
    description:
      "Automatically route emergency calls to the nearest available operator with the right language skills.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Headphones,
    title: "Real-time Transcription",
    description: "Convert speech to text instantly with support for multiple Indian languages using OpenAI Whisper.",
    color: "from-purple-500 to-blue-500",
  },
  {
    icon: AlertTriangle,
    title: "Urgency Detection",
    description: "AI-powered analysis to detect urgency levels and prioritize critical emergencies.",
    color: "from-red-500 to-orange-500",
  },
  {
    icon: Languages,
    title: "Multilingual Support",
    description: "Support for 15+ Indian languages to serve diverse populations across the country.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: MapPin,
    title: "Precision Location Tracking",
    description: "Pinpoint caller locations even with poor signal using advanced triangulation.",
    color: "from-amber-500 to-yellow-500",
  },
  {
    icon: Clock,
    title: "Reduced Response Time",
    description: "Cut emergency response times by up to 50% through AI-assisted coordination.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: BarChart4,
    title: "Analytics Dashboard",
    description: "Comprehensive analytics to identify patterns and improve emergency response.",
    color: "from-indigo-500 to-violet-500",
  },
  {
    icon: Zap,
    title: "Seamless Integration",
    description: "Integrate with existing emergency services infrastructure with minimal disruption.",
    color: "from-teal-500 to-cyan-500",
  },
]

export const Features = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="features" className="py-20 bg-background relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Revolutionary Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-foreground/70 max-w-3xl mx-auto"
          >
            Respondr combines cutting-edge AI with real-time coordination to transform emergency response systems
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-accent/50 rounded-xl p-6 backdrop-blur-sm border border-accent hover:border-accent/80 transition-all duration-300 tech-card"
            >
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
