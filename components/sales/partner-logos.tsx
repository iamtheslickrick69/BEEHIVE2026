"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function PartnerLogos() {
  return (
    <section className="py-12 bg-black border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h3 className="text-sm uppercase tracking-wider text-white/60 mb-2 font-semibold">
            Authorized Dealer For
          </h3>
          <p className="text-white/80 text-base">
            Premium Brands You Can Trust
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Partner Logos Image with white background removed via CSS */}
          <div className="relative w-full max-w-[52rem] mx-auto opacity-90">
            <Image
              src="/partner-logos.png"
              alt="Partner Brands: Authorized dealer for premium equipment brands"
              width={2068}
              height={978}
              className="w-full h-auto rounded-3xl"
              style={{
                mixBlendMode: 'multiply',
                filter: 'brightness(1.2) contrast(1.1)',
              }}
              priority={false}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
