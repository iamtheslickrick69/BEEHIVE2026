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
    <section id="about" className="py-12 md:py-16 bg-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E8C24A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: "200px 200px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Top Row - Stunning Sign Photo */}
        <ScrollAnimation>
          <div className="relative rounded-3xl overflow-hidden mb-8 md:mb-12 h-[220px] sm:h-[280px] md:h-[360px] lg:h-[420px] group">
            <img
              src="/beehive-sign-sunset.jpg"
              alt="BeeHive Rental & Sales - Your Local Hometown Rental Yard"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight leading-tight"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                Your Local Hometown Rental Yard
              </motion.h2>
            </div>
          </div>
        </ScrollAnimation>

        {/* Bottom Row - Team Photo + Content */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Team Photo */}
          <ScrollAnimation direction="left">
            <div className="relative rounded-3xl overflow-hidden group">
              <img
                src="/team-photo-checkin.jpg"
                alt="BeeHive Rental & Sales Team - Serving Southern Utah Since 1994"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-[#E8C24A] text-black px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wide shadow-lg">
                Since 1994
              </div>
            </div>
          </ScrollAnimation>

          {/* Content */}
          <ScrollAnimation direction="right">
            <div>
              <span className="text-[#E8C24A] font-semibold text-sm tracking-widest uppercase">About Us</span>
              <h3
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2 mb-3 md:mb-4 leading-[1.1] uppercase tracking-tight"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                Meet the Team Behind the Equipment
              </h3>
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
                      className="w-5 h-5 rounded-full bg-[#E8C24A]/20 flex items-center justify-center shrink-0"
                    >
                      <Check className="w-3 h-3 text-[#E8C24A] stroke-[3]" />
                    </motion.div>
                    <span className="text-gray-300 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  className="bg-[#E8C24A] hover:bg-[#E8C24A]/90 text-black font-bold h-12 px-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#E8C24A]/20 transition-all hover:scale-105"
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
