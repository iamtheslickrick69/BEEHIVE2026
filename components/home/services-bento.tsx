"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Wrench, ShoppingBag, ArrowRight, Phone, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

export function ServicesBento() {
  return (
    <section className="py-20 md:py-32 bg-black relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E8C24A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
        }}
      />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/50 to-black pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <ScrollAnimation>
          <div className="text-center mb-16 md:mb-20">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-primary font-semibold text-sm tracking-widest uppercase inline-block mb-4"
            >
              Our Services
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight leading-tight mb-6"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              More Than Just Rentals
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-white/70 max-w-3xl mx-auto text-base md:text-lg leading-relaxed px-4"
            >
              Expert guides, repairs, and equipment sales - everything you need under one roof.
            </motion.p>
          </div>
        </ScrollAnimation>

        {/* Bento Grid - responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Blog & Resources Card */}
          <ScrollAnimation delay={0}>
            <Link href="/blog/guides" className="group block h-full">
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative h-full min-h-[320px] md:min-h-[360px] rounded-2xl overflow-hidden border-2 border-white/10 bg-card hover:border-primary/50 transition-all duration-300"
              >
                <div className="absolute inset-0">
                  <img
                    src="/excavator-operator-action.jpg"
                    alt="Equipment Guides"
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
                </div>
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-primary text-xs font-bold uppercase tracking-wider">Blog & Resources</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    Expert Equipment Guides
                  </h3>
                  <p className="text-white/60 text-sm md:text-base mb-4 leading-relaxed">
                    30 years of rental knowledge. Complete guides for every project.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    <span className="text-xs bg-white/10 text-white/80 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                      Beginner Tips
                    </span>
                    <span className="text-xs bg-white/10 text-white/80 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                      Project Guides
                    </span>
                    <span className="text-xs bg-white/10 text-white/80 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                      Equipment Specs
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-primary text-sm font-bold group-hover:gap-4 transition-all">
                    Read Guides <ArrowRight className="w-5 h-5" />
                  </span>
                </div>
              </motion.div>
            </Link>
          </ScrollAnimation>

          {/* Repair Card */}
          <ScrollAnimation delay={0.1}>
            <Link href="/repair" className="group block h-full">
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative h-full min-h-[320px] md:min-h-[360px] rounded-2xl overflow-hidden border-2 border-white/10 bg-card hover:border-primary/50 transition-all duration-300"
              >
                <div className="absolute inset-0">
                  <img
                    src="/bobcat-skid-steers-dual.jpg"
                    alt="Repair"
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
                </div>
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <Wrench className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-primary text-xs font-bold uppercase tracking-wider">Repair Services</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    Expert Equipment Repair
                  </h3>
                  <p className="text-white/60 text-sm md:text-base mb-4 leading-relaxed">
                    30+ years experience. All makes & models. Fast turnaround.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    <span className="text-xs bg-white/10 text-white/80 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                      Gas & Diesel
                    </span>
                    <span className="text-xs bg-white/10 text-white/80 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                      Hydraulics
                    </span>
                    <span className="text-xs bg-white/10 text-white/80 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                      Small Engines
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-primary text-sm font-bold group-hover:gap-4 transition-all">
                    Request Service <ArrowRight className="w-5 h-5" />
                  </span>
                </div>
              </motion.div>
            </Link>
          </ScrollAnimation>

          {/* Sales Card */}
          <ScrollAnimation delay={0.2}>
            <Link href="/sales" className="group block h-full">
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative h-full min-h-[320px] md:min-h-[360px] rounded-2xl overflow-hidden border-2 border-white/10 bg-card hover:border-primary/50 transition-all duration-300"
              >
                <div className="absolute inset-0">
                  <img
                    src="/yellow-loaders-lineup.jpg"
                    alt="Sales"
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
                </div>
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <ShoppingBag className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-primary text-xs font-bold uppercase tracking-wider">Equipment Sales</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    Quality Used Equipment
                  </h3>
                  <p className="text-white/60 text-sm md:text-base mb-4 leading-relaxed">
                    Well-maintained rental fleet equipment at competitive prices.
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary text-sm font-bold group-hover:gap-4 transition-all">
                    View Inventory <ArrowRight className="w-5 h-5" />
                  </span>
                </div>
              </motion.div>
            </Link>
          </ScrollAnimation>
        </div>

        {/* Quick CTA */}
        <ScrollAnimation delay={0.3}>
          <div className="mt-16 md:mt-20 text-center">
            <p className="text-white/60 mb-6 text-base md:text-lg">Need help deciding? Our team is here to assist.</p>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-black font-bold shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all hover:scale-105"
            >
              <a href="tel:+14356286663" className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                Call (435) 628-6663
              </a>
            </Button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
