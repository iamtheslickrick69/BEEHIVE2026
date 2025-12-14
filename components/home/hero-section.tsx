"use client"

import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, ChevronDown, Tractor, Shovel, Zap, Car, Container, Layers, Wind, Hammer, Truck, Calendar } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"

// Featured equipment categories for the hero
const featuredCategories = [
  {
    name: "Heavy Equipment",
    description: "Skid steers, excavators & more",
    icon: Tractor,
    href: "/inventory#heavy-equipment",
    image: "/bobcat-skid-steer-loader-yellow-construction.jpg",
    popular: true,
  },
  {
    name: "Compact Equipment",
    description: "Mini excavators, compact loaders",
    icon: Shovel,
    href: "/inventory#heavy-equipment",
    image: "/mini-excavator-compact-construction-equipment.jpg",
    popular: true,
  },
  {
    name: "Concrete & Compaction",
    description: "Mixers, buggies, trowels, grinders",
    icon: Container,
    href: "/inventory#concrete-compaction",
    image: "/concrete-mixer-buggy-power-trowel-construction.jpg",
    popular: false,
  },
  {
    name: "Power Tools",
    description: "Compressors, drills & tools",
    icon: Wind,
    href: "/inventory#power-tools",
    image: "/portable-air-compressor-towable-construction.jpg",
    popular: false,
  },
  {
    name: "Generators & Welders",
    description: "2.5kW-25kW, 250A-400A welders",
    icon: Zap,
    href: "/inventory#generators-welders",
    image: "/portable-generator-welder-construction-equipment.jpg",
    popular: false,
  },
  {
    name: "Trailers & Transport",
    description: "Dump trailers, 7K-14K capacity",
    icon: Car,
    href: "/inventory#trailers-transport",
    image: "/dump-trailer-heavy-duty-construction-hauling.jpg",
    popular: false,
  },
  {
    name: "Landscaping & Garden",
    description: "Tillers, aerators, sod cutters",
    icon: Layers,
    href: "/inventory#landscaping-garden",
    image: "/landscaping-equipment-rototiller-aerator-sod-cutte.jpg",
    popular: false,
  },
  {
    name: "Carpet & Floor Tools",
    description: "Sanders, buffers, tile saws",
    icon: Hammer,
    href: "/inventory#carpet-floor-tools",
    image: "/floor-sander-buffer-tile-saw-carpet-equipment.jpg",
    popular: false,
  },
]

// Animated counter component
function AnimatedCounter({ target, duration = 2 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [isInView, target, duration])

  return <span ref={ref}>{count}</span>
}

export function HeroSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const scrollToNext = () => {
    document.getElementById("stats")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/aerial-yard-view.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/50" />
        {/* Subtle animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 md:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Text Content */}
          <div className="text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 border border-white/20">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Serving Southern Utah Since 1994
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[0.95] mb-6 uppercase tracking-tight"
              style={{
                fontFamily: "var(--font-inter-tight)",
                textShadow: "0 2px 10px rgba(255, 255, 255, 0.3)"
              }}
            >
              Professional Equipment
              <span className="block text-white">For Every Project</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base md:text-lg lg:text-xl text-gray-300 mb-8 max-w-xl leading-relaxed"
            >
              Southern Utah's premier equipment rental. Local expertise. Contractor-ready equipment.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-white text-black hover:bg-white/90 text-base font-semibold px-6 sm:px-8 h-14 rounded-xl uppercase tracking-wide shadow-lg shadow-white/20 hover:shadow-white/40 hover:scale-105 transition-all duration-300"
              >
                <Link href="/inventory">
                  Browse Equipment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 text-base font-semibold px-6 sm:px-8 h-14 bg-white/5 rounded-xl uppercase tracking-wide hover:scale-105 transition-all duration-300"
              >
                <Link href="/repair">
                  Get Repairs
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>

          </div>

          {/* Right Side - Equipment Categories Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-white font-semibold text-lg">Equipment Categories</h3>
                  <p className="text-white/60 text-sm">
                    8 categories • <AnimatedCounter target={100} />+ items
                  </p>
                </div>
                <Link
                  href="/inventory"
                  className="text-white text-sm font-medium hover:text-white/80 transition-colors flex items-center gap-1 group"
                >
                  View All
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Category Grid - 4x2 for 8 categories */}
              <div className="grid grid-cols-2 gap-2">
                {featuredCategories.map((category, index) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  >
                    <Link
                      href={category.href}
                      className="group flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all duration-300"
                      onMouseEnter={() => setHoveredCard(category.name)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      {/* Icon */}
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 shrink-0">
                        <category.icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold text-sm">{category.name}</span>
                        </div>
                        <span className="text-white/50 text-xs block truncate">{category.description}</span>
                      </div>

                      {/* Arrow */}
                      <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Who We Serve */}
              <div className="mt-5 pt-4 border-t border-white/10">
                <h4 className="text-white font-semibold text-sm mb-3">Who We Serve</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Contractors */}
                  <div className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/10 flex items-center justify-center mb-2 sm:mb-3 group-hover:bg-white/20 transition-colors">
                      <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h5 className="text-white font-semibold text-sm mb-1">Contractors</h5>
                    <p className="text-white/60 text-xs leading-relaxed">
                      Keep your fleet running with priority service and fleet maintenance programs. We understand downtime costs money.
                    </p>
                  </div>

                  {/* Homeowners */}
                  <div className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/10 flex items-center justify-center mb-2 sm:mb-3 group-hover:bg-white/20 transition-colors">
                      <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h5 className="text-white font-semibold text-sm mb-1">Homeowners</h5>
                    <p className="text-white/60 text-xs leading-relaxed">
                      Get your personal equipment back in working order. From lawn mowers to pressure washers, we fix it all.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Equipment Preview */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="lg:hidden absolute bottom-24 left-4 right-4 z-10"
      >
        <Link href="/inventory" className="block bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {featuredCategories.slice(0, 3).map((cat, i) => (
                  <div key={cat.name} className="w-10 h-10 rounded-lg overflow-hidden border-2 border-black/50" style={{ zIndex: 3 - i }}>
                    <Image src={cat.image} alt={cat.name} width={40} height={40} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <span className="text-white font-medium text-sm">8 Categories Available</span>
                <span className="text-white/60 text-xs block">100+ equipment items</span>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
        </Link>
      </motion.div>

      {/* Scroll indicator - hidden on mobile */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={scrollToNext}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-500 hover:text-white transition-colors z-10 hidden md:block"
        aria-label="Scroll to next section"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.button>

    </section>
  )
}
