"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Clock, Truck, Info, Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Equipment } from "@/lib/equipment-data"

interface EquipmentCardProps {
  equipment: Equipment
  viewMode: "grid" | "list"
  onClick?: () => void
}

export function EquipmentCard({ equipment, viewMode, onClick }: EquipmentCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("[data-favorite-button]")) {
      return
    }
    onClick?.()
  }

  if (viewMode === "list") {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        onClick={handleCardClick}
        className="bg-card rounded-xl border border-white/10 overflow-hidden hover:border-white/20 hover:shadow-lg hover:shadow-black/20 transition-all cursor-pointer"
      >
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-72 h-48 md:h-auto shrink-0">
            <img
              src={equipment.image || "/placeholder.svg"}
              alt={equipment.name}
              className="w-full h-full object-cover"
            />
            {equipment.featured && (
              <span className="absolute top-3 left-3 bg-white text-black text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                Featured
              </span>
            )}
            <button
              data-favorite-button
              onClick={(e) => {
                e.stopPropagation()
                setIsFavorite(!isFavorite)
              }}
              className={cn(
                "absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center transition-colors border border-white/10",
                isFavorite ? "text-red-500" : "text-white hover:text-red-500",
              )}
              aria-label="Add to favorites"
            >
              <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
            </button>
          </div>

          <div className="flex-1 p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {equipment.category}
                </span>
                <h3 className="text-xl font-semibold text-foreground">{equipment.name}</h3>
                <p className="text-muted-foreground text-sm line-clamp-2">{equipment.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {equipment.specs.slice(0, 3).map((spec, i) => (
                    <span key={i} className="flex items-center gap-1">
                      <Info className="w-3 h-3" />
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end gap-3">
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground">${equipment.dailyRate}</div>
                  <div className="text-sm text-muted-foreground">per day</div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {equipment.available ? (
                    <span className="flex items-center gap-1 text-green-500">
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                      In Stock
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-orange-500">
                      <Clock className="w-3 h-3" />
                      Reserved
                    </span>
                  )}
                  {equipment.delivery && (
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Truck className="w-3 h-3" />
                      Delivery
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={handleCardClick}
      className="bg-card rounded-xl border border-white/10 overflow-hidden hover:border-white/20 hover:shadow-xl hover:shadow-black/20 transition-all duration-300 cursor-pointer group"
    >
      {/* Image - clean with subtle zoom on hover */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={equipment.image || "/placeholder.svg"}
          alt={equipment.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {equipment.featured && (
          <span className="absolute top-3 left-3 bg-white text-black text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
            Featured
          </span>
        )}
        <button
          data-favorite-button
          onClick={(e) => {
            e.stopPropagation()
            setIsFavorite(!isFavorite)
          }}
          className={cn(
            "absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center transition-colors border border-white/10",
            isFavorite ? "text-red-500" : "text-white hover:text-red-500",
          )}
          aria-label="Add to favorites"
        >
          <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{equipment.category}</span>
        <h3 className="font-semibold text-foreground mt-1 mb-2 line-clamp-1">{equipment.name}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{equipment.description}</p>

        {/* Status & Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs">
            {equipment.available ? (
              <span className="flex items-center gap-1 text-green-500">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                In Stock
              </span>
            ) : (
              <span className="flex items-center gap-1 text-orange-500">
                <Clock className="w-3 h-3" />
                Reserved
              </span>
            )}
            {equipment.delivery && (
              <span className="flex items-center gap-1 text-muted-foreground">
                <Truck className="w-3 h-3" />
              </span>
            )}
          </div>
          <div className="text-right">
            <span className="text-xl font-bold text-foreground">${equipment.dailyRate}</span>
            <span className="text-muted-foreground text-xs">/day</span>
          </div>
        </div>

        {/* Weekly/Monthly Rates */}
        <div className="flex gap-2 text-xs text-muted-foreground border-t border-white/10 pt-3">
          <span className="bg-white/5 px-2 py-1 rounded-md">${equipment.weeklyRate}/week</span>
          <span className="bg-white/5 px-2 py-1 rounded-md">${equipment.monthlyRate}/month</span>
        </div>
      </div>
    </motion.div>
  )
}
