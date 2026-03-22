"use client"

import { motion } from "framer-motion"

export const LoadingScene = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0d14]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="relative w-24 h-24 mb-8">
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-background"
            initial={{ scale: 0.85 }}
            animate={{
              scale: [0.85, 0.9, 0.85],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-blue-500 font-bold text-xl"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            R
          </motion.div>
        </div>
        <motion.p
          className="text-foreground/70 text-lg"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          Loading Emergency Response System...
        </motion.p>

        {/* Loading progress bar */}
        <motion.div className="w-48 h-1 bg-background/30 rounded-full mt-6 overflow-hidden">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>

        <motion.p
          className="text-foreground/50 text-sm mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          Preparing 3D environment...
        </motion.p>
      </motion.div>
    </div>
  )
}
