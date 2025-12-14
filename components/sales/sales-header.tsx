"use client"

import { motion } from "framer-motion"
import { ShoppingBag, CheckCircle, Shield, CreditCard } from "lucide-react"

const features = [
  { icon: CheckCircle, label: "Inspected & Serviced" },
  { icon: Shield, label: "Warranty Available" },
  { icon: CreditCard, label: "Financing Options" },
]

export function SalesHeader() {
  return (
    <section className="bg-secondary py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-2 hazard-stripe" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full text-primary text-sm font-medium mb-6">
            <ShoppingBag className="w-4 h-4" />
            Used Equipment Sales
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Quality Used Equipment</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Browse our selection of pre-owned construction and landscaping equipment. Every item is inspected, serviced,
            and ready to work. Save money without sacrificing quality.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {features.map((feature) => (
            <div
              key={feature.label}
              className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10"
            >
              <feature.icon className="w-5 h-5 text-primary" />
              <span className="text-white text-sm font-medium">{feature.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
