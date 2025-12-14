"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Home, Search, HardHat } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center px-4">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center relative z-10"
      >
        {/* Animated 404 */}
        <div className="relative mb-8">
          <motion.div
            animate={{
              rotate: [0, -5, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 3,
            }}
            className="inline-block"
          >
            <HardHat className="w-24 h-24 text-primary mx-auto" />
          </motion.div>
        </div>

        <h1 className="text-8xl md:text-9xl font-black text-white mb-4">
          4<span className="text-primary">0</span>4
        </h1>

        <div className="h-2 w-48 hazard-stripe mx-auto mb-8 rounded-full" />

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Page Under Construction</h2>
        <p className="text-gray-400 text-lg max-w-md mx-auto mb-8">
          Looks like this page wandered off the job site. Let&apos;s get you back to familiar ground.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 bg-transparent"
          >
            <Link href="/inventory">
              <Search className="w-4 h-4 mr-2" />
              Browse Equipment
            </Link>
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-gray-500 text-sm">
            Need help? Call us at{" "}
            <a href="tel:+14356286663" className="text-primary hover:underline">
              (435) 628-6663
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
