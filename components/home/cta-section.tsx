"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Clock, MapPin } from "lucide-react"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

export function CTASection() {
  return (
    <section className="py-24 bg-card relative overflow-hidden">
      {/* Hazard stripes accent */}
      <div className="absolute top-0 left-0 right-0 h-1 hazard-stripe" />

      <div className="absolute inset-0 starlink-pattern opacity-30" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollAnimation direction="left">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 uppercase tracking-tight"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                Ready to Get Started?
              </motion.h2>
              <p className="text-gray-400 text-lg md:text-xl mb-8">
                Browse our inventory, request a quote, or call us today. Our team is ready to help you find the right
                equipment for your project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100 text-base font-semibold px-8 h-14 rounded-lg uppercase tracking-wide"
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
                  className="border-border text-white hover:bg-white/10 text-base font-semibold px-8 h-14 bg-transparent rounded-lg uppercase tracking-wide"
                >
                  <a href="tel:+14356286663">
                    <Phone className="mr-2 w-5 h-5" />
                    Call (435) 628-6663
                  </a>
                </Button>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation direction="right">
            <div className="bg-secondary/50 backdrop-blur-sm rounded-xl p-8 border border-border">
              <h3 className="text-xl font-semibold text-white mb-6 uppercase tracking-wide">Visit Our Location</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-border">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-white font-medium">1175 E Highland Dr</p>
                    <p className="text-gray-500">St. George, UT 84770</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-border">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Mon-Fri: 7AM-5PM</p>
                    <p className="text-gray-500">Sat: 8AM-12PM | Sun: Closed</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-border">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-white font-medium">(435) 628-6663</p>
                    <p className="text-gray-500">Call for immediate assistance</p>
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
