"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Clock, Truck, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Equipment } from "@/lib/equipment-data"
import { EquipmentModal } from "@/components/ui/equipment-modal"

interface EquipmentCardProps {
  equipment: Equipment
  viewMode?: "grid" | "list"
}

export function EquipmentCard({ equipment, viewMode = "grid" }: EquipmentCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (viewMode === "list") {
    return (
      <>
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => setIsModalOpen(true)}
          className="bg-card rounded-xl border border-white/10 overflow-hidden hover:border-white/20 hover:shadow-lg hover:shadow-black/20 transition-all cursor-pointer"
        >
          <div className="flex flex-col md:flex-row">
            <div className="relative w-full md:w-72 h-48 md:h-auto shrink-0 overflow-hidden md:rounded-l-2xl rounded-t-2xl md:rounded-t-xl">
              <img
                src={equipment.image || "/placeholder.svg"}
                alt={equipment.name}
                className="w-full h-full object-cover"
              />
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
        <EquipmentModal
        equipment={equipment}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAskAI={() => {}}
      />
      </>
    )
  }

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        onClick={() => setIsModalOpen(true)}
        className="bg-card rounded-xl border border-white/10 overflow-hidden hover:border-white/20 hover:shadow-xl hover:shadow-black/20 transition-all duration-300 cursor-pointer group"
      >
        {/* Image - clean with subtle zoom on hover */}
        <div className="relative h-48 overflow-hidden rounded-t-2xl">
          <img
            src={equipment.image || "/placeholder.svg"}
            alt={equipment.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{equipment.category}</span>
          <h3 className="font-semibold text-foreground mt-1 mb-2 line-clamp-1">{equipment.name}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{equipment.description}</p>

          {/* Status */}
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
                Delivery Available
              </span>
            )}
          </div>
        </div>
      </motion.div>
      <EquipmentModal
        equipment={equipment}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAskAI={() => {}}
      />
    </>
  )
}
