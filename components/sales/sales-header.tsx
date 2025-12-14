"use client"

import { ShoppingBag, CheckCircle, Shield, CreditCard } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

const features = [
  { icon: CheckCircle, label: "Inspected & Serviced" },
  { icon: Shield, label: "Warranty Available" },
  { icon: CreditCard, label: "Financing Options" },
]

export function SalesHeader() {
  return (
    <section className="bg-black py-12 sm:py-16 md:py-20 relative overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/sales-hero-bg.jpg"
          alt="BeeHive Equipment Sales"
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
        <div className="text-center mb-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/30 mb-6"
          >
            <ShoppingBag className="w-4 h-4" />
            Equipment Sales
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-lg"
          >
            New & Used Equipment
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto drop-shadow-md"
          >
            Browse our selection of quality construction and landscaping equipment. Every item is inspected, serviced, and ready to work.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-3xl mx-auto"
        >
          {features.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-full px-5 sm:px-6 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3 hover:bg-white/20 hover:border-white/50 transition-all"
            >
              <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#E8C24A] flex-shrink-0" />
              <span className="text-white text-xs sm:text-sm font-semibold whitespace-nowrap">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
