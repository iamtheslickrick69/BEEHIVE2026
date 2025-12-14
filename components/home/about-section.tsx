"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Check, ArrowRight } from "lucide-react"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

const highlights = [
  "Largest equipment selection in Southern Utah",
  "Expert repair & maintenance services",
  "Same-day delivery available",
  "Friendly, knowledgeable staff",
]

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        {/* About Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image */}
          <ScrollAnimation direction="left">
            <div className="relative">
              <div className="rounded-xl overflow-hidden border border-border">
                <img
                  src="/equipment-rental-yard-southern-utah.jpg"
                  alt="BeeHive Equipment Yard"
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Floating stat card - hidden on mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -right-6 bg-white text-black p-4 md:p-6 rounded-xl shadow-xl hidden md:block"
              >
                <div className="text-3xl md:text-4xl font-bold">30+</div>
                <div className="text-xs md:text-sm text-gray-600">Years Serving Southern Utah</div>
              </motion.div>
            </div>
          </ScrollAnimation>

          {/* Content */}
          <ScrollAnimation direction="right">
            <div>
              <span className="text-primary font-semibold text-sm tracking-widest uppercase">About Us</span>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 mb-4 md:mb-6 leading-[1.1] uppercase tracking-tight"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                Your local equipment partner since 1994
              </h2>
              <p className="text-gray-400 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
                Located at 1175 East Highland Dr., St. George, we&apos;re your local hometown rental yard with the
                largest selection of equipment in town. We offer equipment rentals, delivery and pickup, and repair and
                maintenance for both small and large equipment.
              </p>

              {/* Highlights */}
              <div className="grid sm:grid-cols-2 gap-3 mb-6 md:mb-8">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-gray-300 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>

              <Link
                href="/info?tab=team"
                className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all font-semibold uppercase tracking-wide text-sm"
              >
                Meet our team
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
