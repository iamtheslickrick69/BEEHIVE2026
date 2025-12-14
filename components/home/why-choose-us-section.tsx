"use client"

import { motion } from "framer-motion"
import { Truck, Clock, Shield, Headphones, Award, Wrench } from "lucide-react"

const features = [
  {
    icon: Truck,
    title: "Free Local Delivery",
    description: "Complimentary delivery within St. George city limits on orders over $200",
  },
  {
    icon: Clock,
    title: "Flexible Rental Terms",
    description: "Daily, weekly, and monthly rates with no hidden fees or surprise charges",
  },
  {
    icon: Shield,
    title: "Damage Protection",
    description: "Optional damage waiver plans for peace of mind on every rental",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Emergency support line for after-hours equipment issues",
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    description: "Well-maintained, professional-grade equipment inspected before every rental",
  },
  {
    icon: Wrench,
    title: "Expert Training",
    description: "Free equipment orientation and safety training for all rentals",
  },
]

export function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Southern Utah
              <span className="text-primary block">Trusts BeeHive</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              For over 15 years, contractors, homeowners, and event planners have relied on BeeHive Rental for quality
              equipment and exceptional service.
            </p>
            <div className="relative rounded-2xl overflow-hidden">
              <img src="/equipment-rental-yard-professional-staff-helping-c.jpg" alt="BeeHive Rental Team" className="w-full h-80 object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white font-medium text-lg">&quot;Your project is our priority&quot;</p>
                <p className="text-white/70 text-sm">— The BeeHive Team</p>
              </div>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
