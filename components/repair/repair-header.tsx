"use client"

import { motion } from "framer-motion"
import { Wrench, CheckCircle, Clock, Shield } from "lucide-react"
import Image from "next/image"

const highlights = [
  { icon: CheckCircle, label: "Factory-Trained Techs" },
  { icon: Clock, label: "Fast Turnaround" },
  { icon: Shield, label: "90-Day Warranty" },
  { icon: Wrench, label: "All Brands Serviced" },
]

export function RepairHeader() {
  return (
    <section className="bg-secondary py-20 relative overflow-hidden">
      {/* Main Hexagon Background - Large, top-right */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] md:w-[800px] lg:w-[1000px] h-[600px] md:h-[800px] lg:h-[1000px] opacity-[0.05] pointer-events-none"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Image
          src="/utah.png"
          alt=""
          fill
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Secondary Hexagon - Medium, left side */}
      <motion.div
        className="absolute top-1/4 -left-32 w-[300px] md:w-[400px] h-[300px] md:h-[400px] opacity-[0.03] pointer-events-none"
        animate={{
          rotate: [360, 0],
        }}
        transition={{
          duration: 150,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Image
          src="/utah.png"
          alt=""
          fill
          className="object-contain"
        />
      </motion.div>

      {/* Tertiary Hexagon - Small, bottom center */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[200px] md:w-[300px] h-[200px] md:h-[300px] opacity-[0.04] pointer-events-none"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 100,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/utah.png"
          alt=""
          fill
          className="object-contain"
        />
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-2 hazard-stripe" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full text-primary text-sm font-medium mb-6">
            <Wrench className="w-4 h-4" />
            Professional Repair Services
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Equipment Repair & Service</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Keep your equipment running at peak performance with our professional repair and maintenance services.
            Factory-trained technicians, genuine parts, and fast turnaround times.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {highlights.map((item) => (
            <div
              key={item.label}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10"
            >
              <item.icon className="w-8 h-8 text-primary mx-auto mb-2" />
              <span className="text-white text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
