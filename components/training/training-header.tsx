"use client"

import { motion } from "framer-motion"
import { GraduationCap, Shield, Clock, Award } from "lucide-react"

const features = [
  { icon: GraduationCap, label: "Free Training" },
  { icon: Shield, label: "Safety Certified" },
  { icon: Clock, label: "Learn Anytime" },
  { icon: Award, label: "Get Certified" },
]

export function TrainingHeader() {
  return (
    <section className="bg-secondary py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-2 hazard-stripe" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full text-primary text-sm font-medium mb-6">
            <GraduationCap className="w-4 h-4" />
            Free Equipment Training
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">BeeHive Training Center</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Master your rental equipment with our comprehensive video training library. From excavators to aerial lifts,
            learn to operate safely and efficiently.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {features.map((feature, index) => (
            <div
              key={feature.label}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10"
            >
              <feature.icon className="w-8 h-8 text-primary mx-auto mb-2" />
              <span className="text-white text-sm font-medium">{feature.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
