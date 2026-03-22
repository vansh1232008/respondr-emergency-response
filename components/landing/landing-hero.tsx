"use client"

import { useRef, useEffect, useState, Suspense } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Headphones, MapPin } from "lucide-react"
import Link from "next/link"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Environment, Text3D, Float, Sparkles, CameraShake, Preload } from "@react-three/drei"
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing"
import * as THREE from "three"
import gsap from "gsap"

// Create window pattern texture
function windowPattern() {
  // Create a dummy texture for SSR
  if (typeof window === "undefined") {
    return new THREE.Texture()
  }

  try {
    const size = 32
    const canvas = document.createElement("canvas")
    canvas.width = size
    canvas.height = size
    const context = canvas.getContext("2d")

    if (context) {
      context.fillStyle = "#000000"
      context.fillRect(0, 0, size, size)

      context.fillStyle = "#ffffff"
      const windowSize = 2
      const gap = 2
      const rows = 8
      const cols = 4

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (Math.random() > 0.4) {
            // Some windows are lit
            context.fillRect(j * (windowSize + gap) + gap, i * (windowSize + gap) + gap, windowSize, windowSize)
          }
        }
      }
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(10, 10)

    return texture
  } catch (error) {
    console.error("Error creating window pattern:", error)
    return new THREE.Texture()
  }
}

// City model component
function City() {
  const cityRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (cityRef.current) {
      // Subtle floating animation
      cityRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.05 - 2.5
    }
  })

  return (
    <group ref={cityRef} position={[0, -2.5, 0]} scale={0.1}>
      {/* City grid */}
      <group>
        {/* Buildings - reduced count for better performance */}
        {Array.from({ length: 30 }).map((_, i) => {
          const x = (Math.random() - 0.5) * 200
          const z = (Math.random() - 0.5) * 200
          const height = Math.random() * 15 + 5
          const width = Math.random() * 5 + 2
          const depth = Math.random() * 5 + 2

          return (
            <mesh key={i} position={[x, height / 2, z]} castShadow receiveShadow>
              <boxGeometry args={[width, height, depth]} />
              <meshStandardMaterial
                color={new THREE.Color().setHSL(Math.random() * 0.1 + 0.6, 0.5, Math.random() * 0.3 + 0.1)}
                roughness={0.7}
                metalness={0.2}
              />
              {/* Windows - only add to some buildings for performance */}
              {Math.random() > 0.6 && (
                <mesh position={[0, 0, depth / 2 + 0.01]}>
                  <planeGeometry args={[width * 0.8, height * 0.8]} />
                  <meshBasicMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.1}
                    side={THREE.DoubleSide}
                    map={windowPattern()}
                  />
                </mesh>
              )}
            </mesh>
          )
        })}

        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[300, 300]} />
          <meshStandardMaterial color="#0a0d14" roughness={0.8} />
        </mesh>

        {/* Roads */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
          <planeGeometry args={[20, 300]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0, 0.01, 0]} receiveShadow>
          <planeGeometry args={[20, 300]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>
      </group>
    </group>
  )
}

// Emergency Vehicle
function EmergencyVehicle({ position = [0, 0, 0], vehicleType = "police" }) {
  const vehicleRef = useRef<THREE.Group>(null)
  const lightRef = useRef<THREE.PointLight>(null)
  const [lightColor, setLightColor] = useState("#3b82f6")

  // Vehicle colors based on type
  const colors = {
    ambulance: "#ffffff",
    police: "#0c4a6e",
    fire: "#b91c1c",
  }

  const vehicleColor = colors[vehicleType as keyof typeof colors] || colors.police

  useEffect(() => {
    // Flashing emergency lights
    const interval = setInterval(() => {
      setLightColor((prev) => (prev === "#3b82f6" ? "#ef4444" : "#3b82f6"))
    }, 500)

    return () => clearInterval(interval)
  }, [])

  useFrame(({ clock }) => {
    if (vehicleRef.current) {
      // Add subtle movement
      vehicleRef.current.position.y = Math.sin(clock.getElapsedTime() * 2) * 0.05 + position[1]

      // Update light intensity for flashing effect
      if (lightRef.current) {
        lightRef.current.intensity = 1 + Math.sin(clock.getElapsedTime() * 10) * 0.5
      }
    }
  })

  return (
    <group ref={vehicleRef} position={position}>
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
        {/* Vehicle Body */}
        <mesh castShadow position={[0, 0.5, 0]}>
          <boxGeometry args={[2, 0.75, 4]} />
          <meshStandardMaterial color={vehicleColor} metalness={0.6} roughness={0.2} />
        </mesh>

        {/* Vehicle Cabin */}
        <mesh castShadow position={[0, 1.1, -0.5]}>
          <boxGeometry args={[1.8, 0.6, 1.5]} />
          <meshStandardMaterial color={vehicleColor} metalness={0.6} roughness={0.2} />
        </mesh>

        {/* Wheels */}
        {[
          [-1, 1.2],
          [1, 1.2],
          [-1, -1.2],
          [1, -1.2],
        ].map(([x, z], i) => (
          <mesh key={i} castShadow position={[x, 0, z]}>
            <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.2} />
          </mesh>
        ))}

        {/* Emergency Lights */}
        <mesh castShadow position={[0, 1.5, -0.5]}>
          <boxGeometry args={[1.6, 0.2, 1]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Light bar with emissive materials */}
        <mesh castShadow position={[-0.6, 1.7, -0.5]}>
          <boxGeometry args={[0.3, 0.2, 0.8]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive={lightColor === "#3b82f6" ? "#3b82f6" : "#000000"}
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>
        <mesh castShadow position={[0.6, 1.7, -0.5]}>
          <boxGeometry args={[0.3, 0.2, 0.8]} />
          <meshStandardMaterial
            color="#ef4444"
            emissive={lightColor === "#ef4444" ? "#ef4444" : "#000000"}
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>

        {/* Add point light for the glow effect */}
        <pointLight ref={lightRef} position={[0, 2, -0.5]} color={lightColor} intensity={1.5} distance={10} />

        {/* Vehicle details based on type */}
        {vehicleType === "ambulance" && (
          <mesh position={[0, 0.9, 0.5]}>
            <boxGeometry args={[1.5, 0.4, 2]} />
            <meshStandardMaterial color="#ffffff" />
            {/* Red cross */}
            <mesh position={[0, 0.21, 0]}>
              <boxGeometry args={[0.2, 0.1, 1]} />
              <meshStandardMaterial color="#ef4444" />
            </mesh>
            <mesh position={[0, 0.21, 0]}>
              <boxGeometry args={[1, 0.1, 0.2]} />
              <meshStandardMaterial color="#ef4444" />
            </mesh>
          </mesh>
        )}

        {vehicleType === "police" && (
          <group position={[0, 1.5, 0]} scale={0.2}>
            <Text3D font="/fonts/Geist_Bold.json" size={1} height={0.1} position={[-2, 0, 0]}>
              POLICE
              <meshStandardMaterial color="#ffffff" />
            </Text3D>
          </group>
        )}

        {vehicleType === "fire" && (
          <mesh position={[0, 0.9, 0.5]}>
            <boxGeometry args={[1.5, 1, 2]} />
            <meshStandardMaterial color="#b91c1c" />
          </mesh>
        )}
      </Float>
    </group>
  )
}

// Pulse Rings
function PulseRing({ radius = 5, color = "#3b82f6", speed = 2, delay = 0 }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    if (!meshRef.current) return

    const startAnimation = () => {
      if (!meshRef.current) return
      meshRef.current.scale.set(0.1, 0.1, 0.1)
      meshRef.current.material.opacity = 0.8

      gsap.to(meshRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: speed,
        ease: "power2.out",
        onComplete: () => {
          if (meshRef.current) {
            meshRef.current.scale.set(0.1, 0.1, 0.1)
            startAnimation()
          }
        },
      })

      gsap.to(meshRef.current.material, {
        opacity: 0,
        duration: speed,
        ease: "power2.out",
      })
    }

    const timer = setTimeout(() => {
      startAnimation()
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [speed, delay])

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <ringGeometry args={[radius - 0.1, radius, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </mesh>
  )
}

// Respondr Text with enhanced effects
function RespondrText() {
  return (
    <group position={[0, 3, 0]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text3D
          font="/fonts/Geist_Bold.json"
          size={0.8}
          height={0.1}
          bevelEnabled
          bevelThickness={0.05}
          bevelSize={0.02}
          bevelSegments={5}
        >
          RESPONDR
          <meshStandardMaterial
            color="#3b82f6"
            metalness={0.9}
            roughness={0.1}
            emissive="#3b82f6"
            emissiveIntensity={0.5}
          />
        </Text3D>

        {/* Glow effect */}
        <pointLight color="#3b82f6" intensity={1} distance={5} position={[0, 0, 1]} />
      </Float>
    </group>
  )
}

// Simplified Scene for better performance
function Scene() {
  const { camera } = useThree()

  useEffect(() => {
    // Set initial camera position
    camera.position.set(0, 5, 12)
  }, [camera])

  return (
    <>
      <color attach="background" args={["#0a0d14"]} />
      <fog attach="fog" args={["#0a0d14", 10, 50]} />

      {/* Lighting - simplified */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow shadow-mapSize={1024} />

      {/* City environment */}
      <City />

      {/* Emergency vehicles - reduced for performance */}
      <EmergencyVehicle position={[-4, -1.5, -2]} vehicleType="ambulance" />
      <EmergencyVehicle position={[4, -1.5, -4]} vehicleType="police" />

      {/* Pulse rings */}
      <group position={[0, -1.9, 0]}>
        <PulseRing radius={3} color="#3b82f6" speed={1.5} />
        <PulseRing radius={6} color="#ef4444" speed={2} delay={0.5} />
        <PulseRing radius={9} color="#3b82f6" speed={2.5} delay={1} />
      </group>

      {/* Respondr Text */}
      <RespondrText />

      {/* Particle effects - reduced count */}
      <Sparkles count={100} scale={20} size={2} speed={0.3} opacity={0.2} />

      {/* Environment */}
      <Environment preset="night" />

      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.2}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
      />

      {/* Camera effects */}
      <CameraShake
        maxYaw={0.01}
        maxPitch={0.01}
        maxRoll={0.01}
        yawFrequency={0.5}
        pitchFrequency={0.5}
        rollFrequency={0.5}
      />

      {/* Post-processing - simplified */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
        <ChromaticAberration offset={[0.0005, 0.0005]} />
      </EffectComposer>

      {/* Preload assets */}
      <Preload all />
    </>
  )
}

// Loading component for the 3D scene
function SceneLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="bg-background/80 backdrop-blur-md p-8 rounded-lg flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium">Loading 3D Scene...</p>
        <p className="text-sm text-muted-foreground mt-2">This may take a moment</p>
      </div>
    </div>
  )
}

export const LandingHero = () => {
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
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<SceneLoader />}>
          <Canvas shadows gl={{ antialias: false, powerPreference: "high-performance" }}>
            <Scene />
          </Canvas>
        </Suspense>
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
    </div>
  )
}
