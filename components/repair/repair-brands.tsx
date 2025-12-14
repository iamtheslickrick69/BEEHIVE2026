"use client"

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
    <section className="py-16 sm:py-20 bg-gradient-to-b from-black via-[#0f0f0f] to-black overflow-hidden relative">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-30" />

      {/* Bottom gradient border */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-30" />

      <div className="max-w-7xl mx-auto px-4 mb-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Brands We Service</h2>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">Factory-trained technicians certified on all major equipment brands. Hover over any logo to learn more.</p>
        </div>
      </div>

      {/* Clean Floating Logos */}
      <div className="relative">
        {/* Soft Edge Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-black via-black/60 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-black via-black/60 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Logos */}
        <div className="flex items-center animate-scroll-slow gap-12">
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="flex-shrink-0 group transition-all duration-500 hover:scale-110 relative"
              style={{ width: "224px" }}
            >
              {/* Hover Tooltip */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-[#E8C24A] text-black px-4 py-2 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-30 shadow-xl">
                {brand.name}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#E8C24A]" />
              </div>

              {/* Logo Card with Glow */}
              <div className="relative flex items-center justify-center h-32 bg-white/[0.02] rounded-2xl border border-white/10 group-hover:border-[#E8C24A] group-hover:shadow-2xl group-hover:shadow-[#E8C24A]/30 transition-all duration-500 p-4">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={224}
                  height={126}
                  className="max-w-full max-h-full object-contain brightness-125 opacity-90 group-hover:brightness-150 group-hover:opacity-100 transition-all duration-500"
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
          animation: scroll-slow 60s linear infinite;
        }

        .animate-scroll-slow:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
