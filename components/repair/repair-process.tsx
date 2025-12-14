"use client"

import { motion } from "framer-motion"
import { Phone, ClipboardCheck, Wrench, Truck } from "lucide-react"

const steps = [
  {
    step: 1,
    icon: Phone,
    title: "Contact Us",
    description: "Call or submit a service request online. Describe the issue and we'll provide an initial assessment.",
  },
  {
    step: 2,
    icon: ClipboardCheck,
    title: "Diagnosis & Quote",
    description: "Our technicians diagnose the problem and provide a detailed repair estimate before any work begins.",
  },
  {
    step: 3,
    icon: Wrench,
    title: "Expert Repair",
    description: "Factory-trained technicians complete the repair using genuine or OEM-quality parts.",
  },
  {
    step: 4,
    icon: Truck,
    title: "Pickup or Delivery",
    description: "Pick up your equipment or schedule delivery. Every repair backed by our 90-day warranty.",
  },
]

export function RepairProcess() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Getting your equipment repaired is simple. Here&apos;s our streamlined process.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-border">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
                </div>
              )}

              <div className="bg-card rounded-xl p-6 border border-border text-center relative z-10">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
