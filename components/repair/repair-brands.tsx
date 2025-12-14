"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const brands = [
  { name: "Ditch Witch", logo: "/brands/ditch-witch.png" },
  { name: "Craftsman", logo: "/brands/craftsman.png" },
  { name: "Makita", logo: "/brands/makita.png" },
  { name: "Briggs & Stratton", logo: "/brands/briggs-stratton.png" },
  { name: "Tecumseh Power", logo: "/brands/tecumseh.png" },
  { name: "Echo", logo: "/brands/echo.png" },
  { name: "Little Wonder", logo: "/brands/little-wonder.png" },
  { name: "Toro", logo: "/brands/toro.png" },
  { name: "Kohler Engines", logo: "/brands/kohler.png" },
  { name: "Wacker", logo: "/brands/wacker.png" },
  { name: "Bobcat", logo: "/brands/bobcat.png" },
  { name: "Bosch", logo: "/brands/bosch.png" },
  { name: "Honda Power Equipment", logo: "/brands/honda.png" },
  { name: "Troy-Bilt", logo: "/brands/troy-bilt.png" },
  { name: "John Deere", logo: "/brands/john-deere.png" },
]

export function RepairBrands() {
  return (
    <section className="py-20 bg-[#0a0a0a] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Brands We Service
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Factory-trained on all major equipment brands
          </p>
        </motion.div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-[#111] border border-white/10 rounded-xl p-6 h-32 flex items-center justify-center overflow-hidden hover:border-primary/50 hover:bg-[#151515] transition-all duration-300">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/10 group-hover:to-primary/5 transition-all duration-500" />

                {/* Logo */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={200}
                    height={100}
                    className="max-w-full max-h-full object-contain grayscale brightness-0 invert opacity-60 group-hover:grayscale-0 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100 transition-all duration-500"
                    style={{
                      filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0))",
                    }}
                  />
                </div>

                {/* Subtle scan line effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none animate-scan" />
              </div>

              {/* Brand name tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-black/90 border border-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                <span className="text-xs text-white font-medium">{brand.name}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-sm text-white/40">
            And many more professional equipment brands
          </p>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        .animate-scan {
          animation: scan 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
