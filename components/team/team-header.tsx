"use client"

import { motion } from "framer-motion"
import { Users } from "lucide-react"

export function TeamHeader() {
  return (
    <section className="bg-secondary py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23F7B500' fillOpacity='0.3'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-2 hazard-stripe" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full text-primary text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            Our Team
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Meet the BeeHive Family</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Our team of equipment experts, certified technicians, and customer service professionals are dedicated to
            making your rental experience exceptional.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
