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
  // Duplicate brands array for seamless infinite scroll
  const duplicatedBrands = [...brands, ...brands, ...brands]

  return (
    <section className="py-10 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f] border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Brands We Service</h2>
          <p className="text-sm text-white/60">Factory-trained on all major equipment brands</p>
        </motion.div>
      </div>

      {/* Clean Floating Logos */}
      <div className="relative">
        {/* Soft Edge Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Logos */}
        <div className="flex items-center animate-scroll-slow gap-12">
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="flex-shrink-0 group transition-all duration-500 hover:scale-110"
              style={{ width: "224px" }}
            >
              {/* Just the Logo - Clean & Simple */}
              <div className="relative flex items-center justify-center h-32">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={224}
                  height={126}
                  className="max-w-full max-h-full object-contain brightness-125 opacity-90 group-hover:brightness-150 group-hover:opacity-100 transition-all duration-500 rounded-2xl"
                  style={{
                    filter: "drop-shadow(0 6px 18px rgba(255, 255, 255, 0.2))",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll-slow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-224px * 15 - 3rem * 15));
          }
        }

        .animate-scroll-slow {
          animation: scroll-slow 150s linear infinite;
        }

        .animate-scroll-slow:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
