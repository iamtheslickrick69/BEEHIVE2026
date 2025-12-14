"use client"

import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, ChevronDown, Tractor, Shovel, Zap, Car, Container, Layers, Wind, Hammer } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"

// Featured equipment categories for the hero
const featuredCategories = [
  {
    name: "Skid Steers",
    description: "Bobcat S450, S250, S62, S64 & more",
    icon: Tractor,
    href: "/inventory?category=skid-steers",
    image: "/bobcat-skid-steer-loader-yellow-construction.jpg",
    popular: true,
  },
  {
    name: "Mini Excavators",
    description: "Bobcat E10-E88, Cat 308 CR",
    icon: Shovel,
    href: "/inventory?category=mini-excavators",
    image: "/mini-excavator-compact-construction-equipment.jpg",
    popular: true,
  },
  {
    name: "Concrete & Masonry",
    description: "Mixers, buggies, trowels, grinders",
    icon: Container,
    href: "/inventory?category=concrete",
    image: "/concrete-mixer-buggy-power-trowel-construction.jpg",
    popular: false,
  },
  {
    name: "Air Compressors",
    description: "AIRMAN 185, Sullair 375 & tools",
    icon: Wind,
    href: "/inventory?category=air-compressors",
    image: "/portable-air-compressor-towable-construction.jpg",
    popular: false,
  },
  {
    name: "Generators & Welders",
    description: "2.5kW-25kW, 250A-400A welders",
    icon: Zap,
    href: "/inventory?category=generators",
    image: "/portable-generator-welder-construction-equipment.jpg",
    popular: false,
  },
  {
    name: "Dump Trailers",
    description: "7K, 10K, 14K capacity",
    icon: Car,
    href: "/inventory?category=dump-trailers",
    image: "/dump-trailer-heavy-duty-construction-hauling.jpg",
    popular: false,
  },
  {
    name: "Landscaping",
    description: "Tillers, aerators, sod cutters",
    icon: Layers,
    href: "/inventory?category=landscaping",
    image: "/landscaping-equipment-rototiller-aerator-sod-cutte.jpg",
    popular: false,
  },
  {
    name: "Floor & Carpet",
    description: "Sanders, buffers, tile saws",
    icon: Hammer,
    href: "/inventory?category=floor-carpet",
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
            backgroundImage: `url('/heavy-equipment-rental-yard-with-excavators-and-lo.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/60" />
        {/* Subtle animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-transparent" />
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
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              Professional Equipment
              <span className="block text-primary">For Every Project</span>
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
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm sm:text-base font-semibold px-6 sm:px-8 h-12 sm:h-14 rounded-xl uppercase tracking-wide shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 hover:scale-105 transition-all duration-300"
              >
                <Link href="/inventory">
                  Browse Equipment
                  <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 text-sm sm:text-base font-semibold px-6 sm:px-8 h-12 sm:h-14 bg-white/5 rounded-xl uppercase tracking-wide hover:scale-105 transition-all duration-300"
              >
                <a href="tel:+14356286663">
                  <Phone className="mr-2 w-4 sm:w-5 h-4 sm:h-5" />
                  (435) 628-6663
                </a>
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
                  className="text-primary text-sm font-medium hover:text-primary/80 transition-colors flex items-center gap-1 group"
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
                      className="group flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/30 transition-all duration-300"
                      onMouseEnter={() => setHoveredCard(category.name)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      {/* Icon */}
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 shrink-0">
                        <category.icon className="w-5 h-5 text-white/70 group-hover:text-primary transition-colors" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold text-sm">{category.name}</span>
                          {category.popular && (
                            <span className="px-1.5 py-0.5 bg-primary text-black text-[10px] font-bold rounded">
                              POPULAR
                            </span>
                          )}
                        </div>
                        <span className="text-white/50 text-xs block truncate">{category.description}</span>
                      </div>

                      {/* Arrow */}
                      <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-white font-bold text-xl">
                    <AnimatedCounter target={30} />+
                  </div>
                  <div className="text-white/50 text-xs">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-bold text-xl">
                    <AnimatedCounter target={100} />+
                  </div>
                  <div className="text-white/50 text-xs">Equipment Units</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-bold text-xl">
                    <AnimatedCounter target={5000} />+
                  </div>
                  <div className="text-white/50 text-xs">Happy Customers</div>
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
            <ArrowRight className="w-5 h-5 text-primary" />
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
