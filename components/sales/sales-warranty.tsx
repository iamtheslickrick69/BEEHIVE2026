"use client"

import { Shield, CheckCircle, Wrench, Clock } from "lucide-react"
import { motion } from "framer-motion"

const warranties = [
  {
    icon: Shield,
    title: "30-Day Warranty",
    description: "All equipment comes with a 30-day powertrain warranty covering major mechanical components.",
  },
  {
    icon: Wrench,
    title: "Pre-Sale Inspection",
    description: "Every piece of equipment undergoes a thorough multi-point inspection before listing.",
  },
  {
    icon: CheckCircle,
    title: "Service Records",
    description: "Complete maintenance history available for all equipment from our rental fleet.",
  },
  {
    icon: Clock,
    title: "Extended Coverage",
    description: "Optional extended warranty packages available for up to 12 months of additional protection.",
  },
]

export function SalesWarranty() {
  return (
    <section className="py-16 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Buy with Confidence</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Every piece of equipment we sell is backed by our commitment to quality and customer satisfaction.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {warranties.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#E8C24A] rounded-2xl p-6 text-center hover:bg-[#F0D060] transition-all group shadow-lg hover:shadow-2xl hover:shadow-[#E8C24A]/20"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.2, type: "spring" }}
                className="w-14 h-14 rounded-xl bg-black/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-black/20 transition-colors"
              >
                <item.icon className="w-7 h-7 text-black" />
              </motion.div>
              <h3 className="font-bold text-black mb-2">{item.title}</h3>
              <p className="text-black/70 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
