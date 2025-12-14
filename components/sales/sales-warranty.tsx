"use client"

import { motion } from "framer-motion"
import { Shield, CheckCircle, Wrench, Clock } from "lucide-react"

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
    <section className="py-16 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">Buy with Confidence</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every piece of equipment we sell is backed by our commitment to quality and customer satisfaction.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {warranties.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
