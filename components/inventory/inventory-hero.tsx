"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

export function InventoryHero() {
  return (
    <section className="relative bg-gradient-to-r from-black via-black/95 to-black/90 overflow-hidden mb-0 pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/inventory-hero.jpg"
          alt="BeeHive Equipment Yard"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 sm:py-16 md:py-20 pb-6 sm:pb-8 md:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 uppercase tracking-tight" style={{ fontFamily: "var(--font-inter-tight)" }}>
            Equipment Inventory
          </h1>
          <p className="text-white/80 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 max-w-2xl">
            Browse 125+ professional-grade rental items. From heavy equipment to specialized tools.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 sm:gap-2 text-white/90">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#E8C24A] flex-shrink-0" />
              <span className="whitespace-nowrap">Same-Day Pickup</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-white/90">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#E8C24A] flex-shrink-0" />
              <span className="whitespace-nowrap">Free Delivery</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-white/90">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#E8C24A] flex-shrink-0" />
              <span className="whitespace-nowrap">30+ Years</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
