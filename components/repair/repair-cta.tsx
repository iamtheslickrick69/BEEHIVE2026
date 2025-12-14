"use client"

import { Phone, Shield, Clock, Award } from "lucide-react"

export function RepairCTA() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-black via-black/95 to-black">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 sm:p-12 md:p-16 border border-white/10 shadow-2xl text-center">
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            How can we help?
          </h2>

          {/* Subtext */}
          <p className="text-white/70 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto">
            Our factory-trained technicians are standing by. Call us for a free diagnostic quote.
          </p>

          {/* Large CTA Button */}
          <a
            href="tel:+14356286663"
            className="inline-flex items-center gap-3 px-8 sm:px-12 py-4 sm:py-5 bg-[#E8C24A] hover:bg-[#F0D060] text-black font-bold text-lg sm:text-xl rounded-full transition-all shadow-xl hover:shadow-2xl mb-10 sm:mb-12"
          >
            <Phone className="w-6 h-6" />
            Call (435) 628-6663
          </a>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-white/60 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#E8C24A]" />
              <span>90-Day Warranty</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/20" />
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#E8C24A]" />
              <span>Same-Day Service Available</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/20" />
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#E8C24A]" />
              <span>15+ Brands Serviced</span>
            </div>
          </div>

          {/* Hours */}
          <p className="text-white/50 text-sm mt-6 sm:mt-8">
            Mon-Fri: 7AM-5PM | Sat: 8AM-12PM
          </p>
        </div>
      </div>
    </section>
  )
}
