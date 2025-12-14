"use client"

import { Shield, Clock, Award, Wrench, CheckCircle, Users } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Users,
    title: "Factory-Trained Technicians",
    description: "Certified on all major equipment brands with ongoing training",
  },
  {
    icon: Shield,
    title: "90-Day Parts & Labor Warranty",
    description: "If the same issue recurs, we'll fix it at no additional charge",
  },
  {
    icon: Clock,
    title: "Same-Day Service Available",
    description: "Emergency repairs with priority scheduling for urgent situations",
  },
  {
    icon: Award,
    title: "All Major Brands",
    description: "Authorized service for 15+ equipment manufacturers",
  },
  {
    icon: Wrench,
    title: "30+ Years Experience",
    description: "Over 2,500 successful repairs since 1994",
  },
  {
    icon: CheckCircle,
    title: "Free Diagnostics",
    description: "No-obligation assessment before we quote any work",
  },
]

export function RepairWhyChoose() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-black via-black/95 to-black">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose BeeHive for Repairs?
          </h2>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
            Three decades of experience, factory training, and a commitment to quality repairs you can trust.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#E8C24A] rounded-2xl p-6 border border-[#E8C24A] hover:bg-[#F0D060] transition-all group shadow-lg hover:shadow-2xl hover:shadow-[#E8C24A]/30"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: "spring", bounce: 0.5 }}
                className="w-14 h-14 rounded-xl bg-black/10 flex items-center justify-center mb-4 group-hover:bg-black/20 transition-colors"
              >
                <feature.icon className="w-7 h-7 text-black" />
              </motion.div>
              <h3 className="font-bold text-black text-lg mb-2">{feature.title}</h3>
              <p className="text-black/70 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
