"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Phone, FileText, MessageCircle, CheckCircle, Truck } from "lucide-react"
import Image from "next/image"

interface SalesInquiryModalProps {
  isOpen: boolean
  onClose: () => void
  equipment: {
    id: string
    name: string
    category: string
    price: number | null
    condition: string
    description: string
    image: string
    type: "new" | "used"
  } | null
}

export function SalesInquiryModal({ isOpen, onClose, equipment }: SalesInquiryModalProps) {
  if (!equipment) return null

  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd < -150) {
      // Swipe down to close
      onClose()
    }
  }

  // Mock specs - you can expand this later with real data
  const specs = [
    { label: "Condition", value: equipment.condition },
    { label: "Category", value: equipment.category },
    { label: "Type", value: equipment.type === "new" ? "Brand New" : "Pre-Owned" },
    { label: "Availability", value: "In Stock" },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="fixed bg-black shadow-2xl z-50 overflow-hidden border border-white/10 overflow-y-auto
                       max-md:inset-0 max-md:rounded-none
                       md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-5xl md:rounded-3xl md:max-h-[90vh]"
          >
            {/* Close Button - Sticky on mobile */}
            <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-md border-b border-white/10 md:bg-transparent md:border-0">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 md:w-10 md:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors shadow-lg"
              >
                <X className="w-6 h-6 md:w-5 md:h-5 text-white" />
              </button>
              {/* Swipe indicator for mobile */}
              <div className="md:hidden flex justify-center py-3">
                <div className="w-12 h-1 bg-white/30 rounded-full"></div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 md:gap-8 p-6 md:p-8 lg:p-12">
              {/* Left: Image */}
              <div className="relative aspect-video md:aspect-square lg:aspect-auto rounded-2xl overflow-hidden bg-white/5">
                <Image
                  src={equipment.image}
                  alt={equipment.name}
                  fill
                  className="object-contain md:object-cover"
                />
              </div>

              {/* Right: Details */}
              <div className="flex flex-col">
                {/* Title */}
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                  {equipment.name}
                </h2>

                {/* Delivery Badge */}
                <div className="flex items-center gap-2 text-white/70 mb-6">
                  <Truck className="w-5 h-5" />
                  <span className="text-sm font-medium">Delivery & Pickup Available</span>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-2">Description</h3>
                  <p className="text-white/70 leading-relaxed">{equipment.description}</p>
                </div>

                {/* Key Specs */}
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-4">Key Specs</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {specs.map((spec, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#E8C24A] flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-white/60 text-sm">{spec.label}: </span>
                          <span className="text-white font-medium text-sm">{spec.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price */}
                {equipment.price && (
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">${equipment.price.toLocaleString()}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3 mt-auto">
                  <a
                    href="tel:+14356286663"
                    className="flex items-center justify-center gap-2 px-6 py-4 bg-[#E8C24A] hover:bg-[#F0D060] text-black font-bold rounded-full transition-all w-full"
                  >
                    <Phone className="w-5 h-5" />
                    Call (435) 628-6663
                  </a>
                  <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 text-[#E8C24A] font-medium rounded-full transition-all border border-white/10">
                    <MessageCircle className="w-5 h-5" />
                    Ask AI About This Equipment
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
