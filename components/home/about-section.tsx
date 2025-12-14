"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Check, ArrowRight, Phone } from "lucide-react"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { Button } from "@/components/ui/button"

const highlights = [
  "Largest equipment selection in Southern Utah",
  "Expert repair & maintenance services",
  "Same-day delivery available",
  "Friendly, knowledgeable staff",
]

export function AboutSection() {
  return (
    <section id="about" className="py-12 md:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        {/* About Content */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Logo */}
          <ScrollAnimation direction="left">
            <div className="relative">
              <img
                src="/whitelogo.png"
                alt="BeeHive Rental & Sales"
                className="w-full h-auto object-contain rounded-3xl"
              />
            </div>
          </ScrollAnimation>

          {/* Content */}
          <ScrollAnimation direction="right">
            <div>
              <span className="text-yellow-300 font-semibold text-sm tracking-widest uppercase">About Us</span>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2 mb-3 md:mb-4 leading-[1.1] uppercase tracking-tight"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                Your local equipment partner since 1994
              </h2>
              <p className="text-gray-400 text-sm md:text-base mb-5 md:mb-6 leading-relaxed">
                Located at 1175 East Highland Dr., St. George, we&apos;re your local hometown rental yard with the
                largest selection of equipment in town. We offer equipment rentals, delivery and pickup, and repair and
                maintenance for both small and large equipment.
              </p>

              {/* Highlights */}
              <div className="grid sm:grid-cols-2 gap-2.5 mb-5 md:mb-6">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2.5"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.2, type: "spring", bounce: 0.5 }}
                      viewport={{ once: true }}
                      className="w-5 h-5 rounded-full bg-yellow-300/20 flex items-center justify-center shrink-0"
                    >
                      <Check className="w-3 h-3 text-yellow-300 stroke-[3]" />
                    </motion.div>
                    <span className="text-gray-300 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold h-12 px-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-yellow-300/20 transition-all hover:scale-105"
                >
                  <Link href="/info?tab=team" className="inline-flex items-center gap-2 uppercase tracking-wide text-sm">
                    Meet our team
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-bold h-12 px-6 rounded-xl border border-white/20 shadow-lg transition-all hover:scale-105"
                >
                  <a href="tel:435-628-6663" className="inline-flex items-center gap-2 uppercase tracking-wide text-sm">
                    <Phone className="w-4 h-4" />
                    (435) 628-6663
                  </a>
                </Button>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
