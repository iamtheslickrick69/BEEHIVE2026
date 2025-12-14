"use client"

import Link from "next/link"
import {
  Tractor,
  Shovel,
  Container,
  Zap,
  Hammer,
  Wind,
  Car,
  Droplets,
  ArrowRight,
  Drill,
  Disc,
  Wrench,
  Layers,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

const categories = [
  {
    name: "Skid Steers",
    icon: Tractor,
    href: "/inventory?category=skid-steers",
    count: 8,
    image: "/bobcat-skid-steer-loader-yellow-construction.jpg",
  },
  {
    name: "Mini Excavators",
    icon: Shovel,
    href: "/inventory?category=mini-excavators",
    count: 9,
    image: "/mini-excavator-compact-construction-equipment.jpg",
  },
  {
    name: "Concrete Equipment",
    icon: Container,
    href: "/inventory?category=concrete",
    count: 12,
    image: "/concrete-mixer-buggy-power-trowel-construction.jpg",
  },
  {
    name: "Air Compressors",
    icon: Wind,
    href: "/inventory?category=air-compressors",
    count: 8,
    image: "/portable-air-compressor-towable-construction.jpg",
  },
  {
    name: "Generators & Welders",
    icon: Zap,
    href: "/inventory?category=generators",
    count: 7,
    image: "/portable-generator-welder-construction-equipment.jpg",
  },
  {
    name: "Dump Trailers",
    icon: Car,
    href: "/inventory?category=dump-trailers",
    count: 6,
    image: "/dump-trailer-heavy-duty-construction-hauling.jpg",
  },
  {
    name: "Landscaping",
    icon: Layers,
    href: "/inventory?category=landscaping",
    count: 10,
    image: "/landscaping-equipment-rototiller-aerator-sod-cutte.jpg",
  },
  {
    name: "Floor & Carpet",
    icon: Disc,
    href: "/inventory?category=floor-carpet",
    count: 8,
    image: "/floor-sander-buffer-tile-saw-carpet-equipment.jpg",
  },
  {
    name: "Saws & Cutting",
    icon: Drill,
    href: "/inventory?category=saws",
    count: 6,
    image: "/concrete-saw-husqvarna-cutting-equipment.jpg",
  },
  {
    name: "Compaction",
    icon: Hammer,
    href: "/inventory?category=compaction",
    count: 4,
    image: "/plate-compactor-jumping-jack-roller-construction.jpg",
  },
  {
    name: "Scaffolding & Lifts",
    icon: Wrench,
    href: "/inventory?category=scaffolding",
    count: 6,
    image: "/scaffolding-scissor-lift-aerial-work-platform.jpg",
  },
  {
    name: "Water Equipment",
    icon: Droplets,
    href: "/inventory?category=water",
    count: 5,
    image: "/trash-pump-pressure-washer-water-equipment.jpg",
  },
]

export function CategoriesSection() {
  return (
    <section id="equipment" className="py-24 bg-background dark:bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollAnimation>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-primary font-semibold text-sm tracking-wider uppercase">Our Inventory</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Equipment Categories</h2>
              <p className="text-muted-foreground mt-3 max-w-xl">
                The largest selection of rental equipment in Southern Utah. From skid steers to concrete tools, we have
                everything you need.
              </p>
            </div>
            <Button asChild variant="outline" className="shrink-0 bg-transparent">
              <Link href="/inventory">
                View All Equipment
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <ScrollAnimation key={category.name} delay={index * 0.05}>
              <Link
                href={category.href}
                className="group block bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/50 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-white font-semibold">{category.name}</span>
                    <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">
                      {category.count}+ items
                    </span>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <category.icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm text-muted-foreground">Browse category</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
