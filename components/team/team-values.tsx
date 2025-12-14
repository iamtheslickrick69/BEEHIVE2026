"use client"

import { motion } from "framer-motion"
import { Heart, Target, Users, Zap, Shield, Award } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Customer First",
    description: "Every decision we make starts with our customers in mind. Your success is our success.",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We maintain the highest standards in equipment quality, service, and professionalism.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We're proud to be part of the Southern Utah community and support local businesses.",
  },
  {
    icon: Zap,
    title: "Efficiency",
    description: "We value your time. Fast service, quick turnarounds, and streamlined processes.",
  },
  {
    icon: Shield,
    title: "Safety",
    description: "Safety is non-negotiable. We ensure every piece of equipment meets strict safety standards.",
  },
  {
    icon: Award,
    title: "Integrity",
    description: "Honest pricing, transparent policies, and always doing the right thing.",
  },
]

export function TeamValues() {
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Values</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The principles that guide everything we do at BeeHive Rental
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
              <p className="text-muted-foreground text-sm">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
