"use client"

import { motion } from "framer-motion"
import { Wrench, CheckCircle, Clock, Shield } from "lucide-react"
import Image from "next/image"

const highlights = [
  { icon: CheckCircle, label: "Factory-Trained Techs" },
  { icon: Clock, label: "Fast Turnaround" },
  { icon: Shield, label: "90-Day Warranty" },
]

export function RepairHeader() {
  return (
    <section className="bg-black py-12 sm:py-16 md:py-20 relative overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/repair-hero-bg.jpg"
          alt="BeeHive Equipment Repair"
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Bottom gradient fade to black */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-black pointer-events-none z-[1]" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/30 mb-6">
            <Wrench className="w-4 h-4" />
            Professional Repair Services
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">Equipment Repair & Service</h1>
          <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto drop-shadow-md">
            Keep your equipment running at peak performance with our professional repair and maintenance services.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-3xl mx-auto"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              className="bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-full px-5 sm:px-6 py-3 sm:py-3.5 flex items-center gap-2 sm:gap-3 hover:bg-white/20 hover:border-white/50 transition-all"
            >
              <item.icon className="w-5 h-5 text-[#E8C24A] flex-shrink-0" />
              <span className="text-white text-sm font-semibold whitespace-nowrap">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
