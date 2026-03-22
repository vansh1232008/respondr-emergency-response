import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="relative w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
                <div className="absolute w-4 h-4 bg-background rounded-full"></div>
              </div>
              <span className="text-xl font-bold tracking-tight">Respondr</span>
            </Link>
            <p className="text-foreground/70 mb-4 max-w-md">
              Revolutionizing emergency response systems in India through cutting-edge AI and real-time coordination.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                  Operator Portal
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                  Field Station
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/60">&copy; {new Date().getFullYear()} Respondr. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <Button variant="link" size="sm" className="text-foreground/60 hover:text-foreground">
              Terms of Service
            </Button>
            <Button variant="link" size="sm" className="text-foreground/60 hover:text-foreground">
              Privacy Policy
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
