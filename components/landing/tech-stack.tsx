"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

const technologies = [
  {
    name: "OpenAI Whisper",
    description: "Advanced speech-to-text for multilingual transcription",
    image: "/openai-whisper-logo.png",
  },
  {
    name: "Hume AI",
    description: "Emotion detection and sentiment analysis",
    image: "/hume-ai-logo.png",
  },
  {
    name: "Twilio",
    description: "Reliable communication infrastructure",
    image: "/twilio-logo.png",
  },
  {
    name: "Google Maps",
    description: "Precise location tracking and routing",
    image: "/google-maps-logo.png",
  },
  {
    name: "Firebase",
    description: "Real-time database and authentication",
    image: "/firebase-logo.png",
  },
  {
    name: "React & Next.js",
    description: "High-performance frontend framework",
    image: "/react-nextjs-logo.png",
  },
]

export const TechStack = () => {
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
    <section id="technology" className="py-20 bg-muted/30 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Powered by Cutting-Edge Technology
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-foreground/70 max-w-3xl mx-auto"
          >
            Respondr integrates the best technologies to create a seamless emergency response system
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-background/80 backdrop-blur-sm rounded-xl p-6 border border-border flex items-center tech-card"
            >
              <div className="mr-4 flex-shrink-0">
                <Image
                  src={tech.image || "/placeholder.svg"}
                  alt={tech.name}
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">{tech.name}</h3>
                <p className="text-sm text-foreground/70">{tech.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
