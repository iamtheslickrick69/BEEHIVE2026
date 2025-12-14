"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

export function InventoryHero() {
  return (
    <section className="relative bg-gradient-to-r from-black via-black/95 to-black/90 overflow-hidden border-b border-white/10">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/aerial-yard-view.jpg"
          alt="BeeHive Equipment Yard"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 uppercase tracking-tight" style={{ fontFamily: "var(--font-inter-tight)" }}>
            Equipment Inventory
          </h1>
          <p className="text-white/80 text-base md:text-lg mb-6 max-w-2xl">
            Browse 125+ professional-grade rental items. From heavy equipment to specialized tools.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-white/90">
              <CheckCircle className="w-5 h-5 text-[#E8C24A]" />
              <span>Same-Day Pickup Available</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <CheckCircle className="w-5 h-5 text-[#E8C24A]" />
              <span>Free Delivery on Select Items</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <CheckCircle className="w-5 h-5 text-[#E8C24A]" />
              <span>30+ Years Experience</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
