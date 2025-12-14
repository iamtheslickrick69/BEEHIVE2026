"use client"

import { motion } from "framer-motion"
import { Wrench, Cog, Zap, Droplets, Gauge, ShieldCheck, Truck, Calendar } from "lucide-react"

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

const customerTypes = [
  {
    icon: Truck,
    title: "Contractors",
    description:
      "Keep your fleet running with priority service and fleet maintenance programs. We understand downtime costs money.",
  },
  {
    icon: Calendar,
    title: "Homeowners",
    description:
      "Get your personal equipment back in working order. From lawn mowers to pressure washers, we fix it all.",
  },
]

export function RepairServices() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        {/* Customer Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Who We Serve</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
            Whether you&apos;re a contractor with a fleet or a homeowner with a single piece of equipment, we&apos;ve
            got you covered.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
            {customerTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl p-8 border border-border hover:border-primary/50 hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <type.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{type.title}</h3>
                <p className="text-muted-foreground">{type.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Services</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive repair and maintenance services for all your equipment needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 hover:shadow-xl transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
