"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Wrench, ShoppingBag, ArrowRight, Phone, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

export function ServicesBento() {
  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollAnimation>
          <div className="text-center mb-10 md:mb-14">
            <span className="text-primary font-semibold text-sm tracking-widest uppercase">Our Services</span>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-3 uppercase tracking-tight"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              More Than Just Rentals
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm md:text-base">
              Expert guides, repairs, and equipment sales - everything you need under one roof.
            </p>
          </div>
        </ScrollAnimation>

        {/* Bento Grid - responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Blog & Resources Card */}
          <ScrollAnimation delay={0}>
            <Link href="/blog/guides" className="group block h-full">
              <motion.div
                whileHover={{ y: -4 }}
                className="relative h-full min-h-[280px] md:min-h-[320px] rounded-xl overflow-hidden border border-border bg-card"
              >
                <div className="absolute inset-0">
                  <img
                    src="/bobcat-skid-steer-loader-yellow-construction.jpg"
                    alt="Equipment Guides"
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                </div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span className="text-primary text-xs font-semibold uppercase tracking-wider">Blog & Resources</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Expert Equipment Guides</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    30 years of rental knowledge. Complete guides for every project.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded">Beginner Tips</span>
                    <span className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded">Project Guides</span>
                    <span className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded">Equipment Specs</span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
                    Read Guides <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            </Link>
          </ScrollAnimation>

          {/* Repair Card */}
          <ScrollAnimation delay={0.1}>
            <Link href="/repair" className="group block h-full">
              <motion.div
                whileHover={{ y: -4 }}
                className="relative h-full min-h-[280px] md:min-h-[320px] rounded-xl overflow-hidden border border-border bg-card"
              >
                <div className="absolute inset-0">
                  <img
                    src="/equipment-repair-mechanic-shop.jpg"
                    alt="Repair"
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                </div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-2">
                    <Wrench className="w-4 h-4 text-primary" />
                    <span className="text-primary text-xs font-semibold uppercase tracking-wider">Repair Services</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Expert Equipment Repair</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    30+ years experience. All makes & models. Fast turnaround.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded">Gas & Diesel</span>
                    <span className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded">Hydraulics</span>
                    <span className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded">Small Engines</span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
                    Request Service <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            </Link>
          </ScrollAnimation>

          {/* Sales Card */}
          <ScrollAnimation delay={0.2}>
            <Link href="/sales" className="group block h-full">
              <motion.div
                whileHover={{ y: -4 }}
                className="relative h-full min-h-[280px] md:min-h-[320px] rounded-xl overflow-hidden border border-border bg-card"
              >
                <div className="absolute inset-0">
                  <img
                    src="/used-construction-equipment-for-sale.jpg"
                    alt="Sales"
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                </div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-2">
                    <ShoppingBag className="w-4 h-4 text-primary" />
                    <span className="text-primary text-xs font-semibold uppercase tracking-wider">Equipment Sales</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Quality Used Equipment</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Well-maintained rental fleet equipment at competitive prices.
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
                    View Inventory <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            </Link>
          </ScrollAnimation>
        </div>

        {/* Quick CTA */}
        <ScrollAnimation delay={0.3}>
          <div className="mt-10 md:mt-14 text-center">
            <p className="text-gray-500 mb-4 text-sm">Need help deciding? Our team is here to assist.</p>
            <Button
              asChild
              variant="outline"
              className="bg-transparent border-border hover:bg-white hover:text-black transition-colors"
            >
              <a href="tel:+14356286663">
                <Phone className="w-4 h-4 mr-2" />
                Call (435) 628-6663
              </a>
            </Button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
