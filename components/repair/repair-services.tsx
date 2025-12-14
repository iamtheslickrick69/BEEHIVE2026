"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Wrench, Cog, Zap, Droplets, Gauge, ShieldCheck, Plus, Minus } from "lucide-react"
import Image from "next/image"

const services = [
  {
    icon: Wrench,
    title: "General Repairs",
    description: "Comprehensive repair services for all types of construction and landscaping equipment.",
    items: ["Engine repairs", "Transmission service", "Hydraulic system repairs", "Electrical troubleshooting"],
  },
  {
    icon: Cog,
    title: "Preventive Maintenance",
    description: "Scheduled maintenance programs to extend equipment life and prevent costly breakdowns.",
    items: ["Oil & filter changes", "Belt & hose inspection", "Fluid level checks", "Safety inspections"],
  },
  {
    icon: Zap,
    title: "Electrical Systems",
    description: "Expert diagnosis and repair of all electrical components and control systems.",
    items: ["Starter & alternator", "Wiring repairs", "Control panel service", "Battery service"],
  },
  {
    icon: Droplets,
    title: "Hydraulic Service",
    description: "Complete hydraulic system maintenance, repair, and component replacement.",
    items: ["Cylinder rebuilds", "Pump & motor repair", "Hose replacement", "System flush"],
  },
  {
    icon: Gauge,
    title: "Engine Service",
    description: "Full engine service from minor repairs to complete overhauls.",
    items: ["Tune-ups", "Fuel system service", "Cooling system", "Engine rebuilds"],
  },
  {
    icon: ShieldCheck,
    title: "Safety Inspections",
    description: "Comprehensive safety inspections and certifications for your equipment fleet.",
    items: ["OSHA compliance", "Annual inspections", "Pre-rental checks", "Documentation"],
  },
]

export function RepairServices() {
  const [expandedService, setExpandedService] = useState<number | null>(null)

  const toggleService = (index: number) => {
    setExpandedService(expandedService === index ? null : index)
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-black via-black/95 to-black relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Our Services - Moved to Top */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Our Services</h2>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
            Comprehensive repair and maintenance services for all your equipment needs.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4 mb-12">
          {services.map((service, index) => {
            const isExpanded = expandedService === index
            const ServiceIcon = service.icon
            const ToggleIcon = isExpanded ? Minus : Plus

            return (
              <div
                key={service.title}
                className="overflow-hidden"
              >
                <motion.button
                  onClick={() => toggleService(index)}
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-left hover:bg-white/15 hover:border-white/30 transition-all duration-300 group relative"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-[#E8C24A]/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:bg-[#E8C24A]/30 transition-colors">
                        <ServiceIcon className="w-6 h-6 text-[#E8C24A] stroke-[1.5]" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{service.title}</h3>
                        <p className="text-white/60 text-sm">{service.description}</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                      className="flex-shrink-0"
                    >
                      <ToggleIcon className="w-6 h-6 text-[#E8C24A]" />
                    </motion.div>
                  </div>
                </motion.button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.4, type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.3 }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 mt-2">
                        <div className="space-y-3 mb-6">
                          <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wide mb-4">
                            What We Do
                          </h4>
                          <ul className="space-y-3">
                            {service.items.map((item, itemIndex) => (
                              <motion.li
                                key={item}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: itemIndex * 0.05 }}
                                className="flex items-start gap-3"
                              >
                                <div className="w-5 h-5 rounded-full bg-[#E8C24A]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <div className="w-2 h-2 rounded-full bg-[#E8C24A]" />
                                </div>
                                <span className="text-white/70 text-base">{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                        <motion.a
                          href="tel:+14356286663"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#E8C24A] hover:bg-[#F0D060] text-black font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
                        >
                          <Wrench className="w-5 h-5" />
                          Call for Quote: (435) 628-6663
                        </motion.a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.a
            href="tel:+14356286663"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#E8C24A] hover:bg-[#F0D060] text-black font-semibold text-lg rounded-full transition-all shadow-lg hover:shadow-xl hover:shadow-[#E8C24A]/30"
          >
            <Wrench className="w-5 h-5" />
            Call Today for a Quote: (435) 628-6663
          </motion.a>
        </motion.div>

        {/* We Service All Equipment Types */}
        <div className="max-w-5xl mx-auto mb-20 relative">
          {/* Utah Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <Image
              src="/utah.png"
              alt=""
              width={1600}
              height={1600}
              className="opacity-[0.05] select-none"
              priority={false}
            />
          </div>

          <div className="border-t border-white/10 pt-16 pb-16 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 text-center">We Service All Equipment Types</h2>
              <p className="text-white/60 text-base sm:text-lg text-center mb-12 max-w-3xl mx-auto">
                From homeowner lawn equipment to heavy construction machinery, our technicians repair it all.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8 mb-10"
            >
              {/* Homeowners */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="pb-8 border-b border-white/10"
              >
                <h3 className="text-white font-bold text-lg mb-3">Homeowners</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
                  <p className="text-white/60 text-sm sm:text-base">Lawn Mowers</p>
                  <p className="text-white/60 text-sm sm:text-base">Leaf Blowers</p>
                  <p className="text-white/60 text-sm sm:text-base">Generators</p>
                  <p className="text-white/60 text-sm sm:text-base">Aerators</p>
                  <p className="text-white/60 text-sm sm:text-base">Rototillers</p>
                  <p className="text-white/60 text-sm sm:text-base">Lawn Edgers</p>
                </div>
              </motion.div>

              {/* General Contractors */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="pb-8 border-b border-white/10"
              >
                <h3 className="text-white font-bold text-lg mb-3">General Contractors</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
                  <p className="text-white/60 text-sm sm:text-base">Concrete Buggies</p>
                  <p className="text-white/60 text-sm sm:text-base">Air Compressors</p>
                  <p className="text-white/60 text-sm sm:text-base">Lifts</p>
                  <p className="text-white/60 text-sm sm:text-base">Cement Mixers</p>
                  <p className="text-white/60 text-sm sm:text-base">Cutoff Saws</p>
                  <p className="text-white/60 text-sm sm:text-base">Sanders & Grinders</p>
                  <p className="text-white/60 text-sm sm:text-base">Hydraulic Cylinders</p>
                  <p className="text-white/60 text-sm sm:text-base">Roofing Equipment</p>
                </div>
              </motion.div>

              {/* Landscape & Construction */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="pb-8 border-b border-white/10"
              >
                <h3 className="text-white font-bold text-lg mb-3">Landscape & Construction</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
                  <p className="text-white/60 text-sm sm:text-base">Backhoes</p>
                  <p className="text-white/60 text-sm sm:text-base">Skid Steers</p>
                  <p className="text-white/60 text-sm sm:text-base">Excavators</p>
                  <p className="text-white/60 text-sm sm:text-base">Trenchers</p>
                  <p className="text-white/60 text-sm sm:text-base">Pressure Washers</p>
                  <p className="text-white/60 text-sm sm:text-base">Stump Grinders</p>
                  <p className="text-white/60 text-sm sm:text-base">Brush Cutters</p>
                  <p className="text-white/60 text-sm sm:text-base">Log Splitters</p>
                  <p className="text-white/60 text-sm sm:text-base">Paving Rollers</p>
                </div>
              </motion.div>

              {/* Floor & Carpet Care */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-white font-bold text-lg mb-3">Floor & Carpet Care</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
                  <p className="text-white/60 text-sm sm:text-base">Floor Sanders</p>
                  <p className="text-white/60 text-sm sm:text-base">Tile Strippers</p>
                  <p className="text-white/60 text-sm sm:text-base">Tile Saws</p>
                  <p className="text-white/60 text-sm sm:text-base">Floor Buffers</p>
                  <p className="text-white/60 text-sm sm:text-base">Grinders</p>
                  <p className="text-white/60 text-sm sm:text-base">Industrial Vacuums</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mt-10"
            >
              <motion.a
                href="/inventory"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 text-[#E8C24A] hover:text-[#F0D060] font-medium transition-colors"
              >
                View Full Equipment List
                <span className="text-xl">→</span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
