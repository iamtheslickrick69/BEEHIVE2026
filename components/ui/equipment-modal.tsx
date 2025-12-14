"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Phone, MessageCircle, FileText, ChevronLeft, ChevronRight, Heart, Truck, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { equipmentData, type Equipment } from "@/lib/equipment-data"

interface EquipmentModalProps {
  equipment: Equipment | null
  isOpen: boolean
  onClose: () => void
  onAskAI: (equipmentName: string) => void
  onSelectEquipment?: (equipment: Equipment) => void
}

export function EquipmentModal({ equipment, isOpen, onClose, onAskAI, onSelectEquipment }: EquipmentModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  const relatedEquipment = useMemo(() => {
    if (!equipment) return []
    return equipmentData.filter((item) => item.category === equipment.category && item.id !== equipment.id).slice(0, 3)
  }, [equipment])

  // Reset image index when equipment changes
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [equipment?.id])

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEsc)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  if (!equipment) return null

  // Support for multiple images (1 main + optional thumbnails)
  const images = equipment.image ? [equipment.image] : ["/placeholder.svg"]

  const handleAskAI = () => {
    onAskAI(equipment.name)
    onClose()
  }

  const handleRelatedClick = (relatedItem: Equipment) => {
    if (onSelectEquipment) {
      onSelectEquipment(relatedItem)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50"
          />

          {/* Modal - Extra wide centered modal for better image display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[96vw] max-w-[1400px] max-h-[88vh] bg-[#111] rounded-2xl z-50 overflow-hidden border border-white/10 flex flex-col"
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  {equipment.category}
                </span>
                {equipment.available ? (
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-green-500/20 text-green-400 text-sm font-medium rounded-full">
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                    In Stock
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-orange-500/20 text-orange-400 text-sm font-medium rounded-full">
                    <span className="w-2 h-2 bg-orange-400 rounded-full" />
                    Reserved
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={cn(
                    "p-2.5 rounded-full transition-all",
                    isFavorite
                      ? "bg-red-500/20 text-red-400"
                      : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white",
                  )}
                  aria-label="Add to favorites"
                >
                  <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
                </button>
                <button
                  onClick={onClose}
                  className="p-2.5 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Content - scrollable */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid lg:grid-cols-2 gap-0 min-h-full">
                {/* Left: Image Section */}
                <div className="bg-[#0a0a0a] p-6 lg:p-10 flex flex-col items-center justify-center">
                  {/* Main Image - adaptive sizing with better quality */}
                  <div className="relative max-w-[85%] max-h-[60vh] rounded-2xl overflow-hidden bg-[#1a1a1a] flex items-center justify-center">
                    <img
                      src={images[currentImageIndex] || "/placeholder.svg"}
                      alt={equipment.name}
                      className="max-w-full max-h-[60vh] object-contain"
                      style={{ imageRendering: 'high-quality' }}
                    />

                    {/* Image Navigation - only if multiple images */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Strip - only if multiple images */}
                  {images.length > 1 && (
                    <div className="flex gap-2 mt-4 justify-center">
                      {images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={cn(
                            "w-16 h-16 rounded-xl overflow-hidden border-2 transition-all",
                            idx === currentImageIndex
                              ? "border-primary"
                              : "border-transparent opacity-60 hover:opacity-100",
                          )}
                        >
                          <img src={img || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Details Section */}
                <div className="p-6 lg:p-8 flex flex-col">
                  {/* Title */}
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">{equipment.name}</h2>

                  {/* Delivery Badge */}
                  {equipment.delivery && (
                    <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
                      <Truck className="w-4 h-4" />
                      <span>Delivery & Pickup Available</span>
                    </div>
                  )}

                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wide mb-2">Description</h3>
                    <p className="text-white/70 leading-relaxed">{equipment.description}</p>
                  </div>

                  {/* Specifications */}
                  {equipment.specs && equipment.specs.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wide mb-3">Key Specs</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {equipment.specs.map((spec, index) => (
                          <div key={index} className="flex items-center gap-2 bg-[#1a1a1a] px-3 py-2 rounded-lg">
                            <Check className="w-4 h-4 text-primary shrink-0" />
                            <span className="text-sm text-white/80">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA Buttons */}
                  <div className="mt-auto pt-6 border-t border-white/10 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        className="h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                        asChild
                      >
                        <a href="tel:435-628-6663">
                          <Phone className="w-4 h-4 mr-2" />
                          Call Now
                        </a>
                      </Button>
                      <Button
                        className="h-12 bg-white/10 text-white hover:bg-white/20 font-semibold border border-white/20"
                        onClick={() => {
                          onClose()
                          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                        }}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Get Quote
                      </Button>
                    </div>
                    <Button
                      className="w-full h-12 bg-transparent border border-primary/50 text-primary hover:bg-primary/10 font-semibold"
                      onClick={handleAskAI}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Ask AI About This Equipment
                    </Button>
                  </div>
                </div>
              </div>

              {/* Related Equipment Section */}
              {relatedEquipment.length > 0 && (
                <div className="border-t border-white/10 p-6 lg:p-8 bg-[#0a0a0a]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Related Equipment</h3>
                    <span className="text-sm text-white/50">More in {equipment.category}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {relatedEquipment.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleRelatedClick(item)}
                        className="group bg-[#1a1a1a] rounded-xl p-4 border border-white/10 hover:border-primary/50 transition-all text-left"
                      >
                        <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[#111] mb-3">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="font-medium text-white text-sm mb-1 line-clamp-1">{item.name}</h4>
                        <div className="flex items-center justify-end">
                          {item.available ? (
                            <span className="text-xs text-green-400">In Stock</span>
                          ) : (
                            <span className="text-xs text-orange-400">Reserved</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
