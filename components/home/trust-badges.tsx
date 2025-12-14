"use client"

import { motion } from "framer-motion"
import { Shield, Award, Clock, Star } from "lucide-react"

const badges = [
  {
    icon: Shield,
    title: "Fully Insured",
    description: "Complete liability coverage",
  },
  {
    icon: Award,
    title: "BBB A+ Rated",
    description: "Better Business Bureau",
  },
  {
    icon: Clock,
    title: "15+ Years",
    description: "Serving Southern Utah",
  },
  {
    icon: Star,
    title: "4.9 Google Rating",
    description: "500+ reviews",
  },
]

export function TrustBadges() {
  return (
    <section className="py-8 bg-muted/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <badge.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm">{badge.title}</div>
                <div className="text-muted-foreground text-xs">{badge.description}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
