"use client"

import Link from "next/link"
import { Wrench, Cog, Tractor, Home, ArrowRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

const customerTypes = [
  {
    icon: Home,
    title: "Homeowners",
    equipment: "Lawn Mowers, Leaf Blowers, Lawn Edgers, Generators, Aerators, Rototillers",
  },
  {
    icon: Wrench,
    title: "General Contractors",
    equipment: "Floor Sanders, Tile Saws, Buffers, Grinders, Air Compressors, Mixers, Lifts",
  },
  {
    icon: Tractor,
    title: "Landscape Contractors",
    equipment: "Skid Steers, Excavators, Trenchers, Plate Compactors, Pressure Washers, Pumps",
  },
  {
    icon: Cog,
    title: "All Equipment Types",
    equipment: "Gas, Diesel, Hydraulics, V-Belts, Chain Drives, Pulley Systems",
  },
]

export function RepairPreview() {
  return (
    <section id="repair" className="py-24 bg-background dark:bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <ScrollAnimation direction="left">
              <span className="text-primary font-semibold text-sm tracking-wider uppercase">Repair Services</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">Expert Equipment Repair</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Even the best professional equipment can break down. At Beehive Rental and Sales, we repair all types of
                equipment for all kinds of customers. Our skilled technicians treat every repair like it&apos;s their
                own—diagnosing issues thoroughly and making quality repairs you can trust.
              </p>
            </ScrollAnimation>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {customerTypes.map((type, index) => (
                <ScrollAnimation key={type.title} delay={index * 0.1}>
                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <type.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">{type.title}</h3>
                      <p className="text-muted-foreground text-xs mt-1">{type.equipment}</p>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>

            <ScrollAnimation delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/repair">
                    Request Service
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <a href="tel:+14356286663">
                    <Phone className="w-4 h-4 mr-2" />
                    (435) 628-6663
                  </a>
                </Button>
              </div>
            </ScrollAnimation>
          </div>

          {/* Image & Stats */}
          <ScrollAnimation direction="right">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="/placeholder.svg?height=500&width=700"
                  alt="Equipment Repair Shop"
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Stats overlay */}
              <div className="absolute -bottom-6 left-6 right-6 bg-card rounded-xl shadow-xl p-6 border border-border">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">30+</div>
                    <div className="text-xs text-muted-foreground">Years Experience</div>
                  </div>
                  <div className="border-l border-border">
                    <div className="text-2xl font-bold text-primary">All</div>
                    <div className="text-xs text-muted-foreground">Makes & Models</div>
                  </div>
                  <div className="border-l border-border">
                    <div className="text-2xl font-bold text-primary">Fast</div>
                    <div className="text-xs text-muted-foreground">Turnaround</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
