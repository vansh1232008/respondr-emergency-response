import { LandingNavbar } from "@/components/landing/landing-navbar"
import { Features } from "@/components/landing/features"
import { TechStack } from "@/components/landing/tech-stack"
import { Footer } from "@/components/landing/footer"
import { CustomCursor } from "@/components/ui/custom-cursor"
import { AnimatedHero } from "@/components/landing/animated-hero"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0d14] overflow-hidden">
      <CustomCursor />
      <LandingNavbar />
      <AnimatedHero />
      <Features />
      <TechStack />
      <Footer />
    </main>
  )
}
