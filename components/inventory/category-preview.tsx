"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { EquipmentCard } from "@/components/inventory/equipment-card"
import { cn } from "@/lib/utils"

interface Equipment {
  id: string
  name: string
  category: string
  description: string
  dailyRate: number
  weeklyRate: number
  monthlyRate: number
  image: string
  specs: string[]
  available: boolean
  delivery: boolean
  featured?: boolean
}

interface CategoryPreviewProps {
  name: string
  count: number
  equipment: Equipment[]
  defaultExpanded?: boolean
}

export function CategoryPreview({ name, count, equipment, defaultExpanded = false }: CategoryPreviewProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  // Show first 6 items as preview
  const previewItems = equipment.slice(0, 6)
  const displayItems = isExpanded ? equipment : previewItems
  const hasMore = equipment.length > 6

  return (
    <section className="mb-8 bg-white/[0.02] border border-white/10 rounded-2xl p-6">
      {/* Category Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl md:text-3xl font-bold text-white">{name}</h2>
          <span className="text-sm text-white/60 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            {count} items
          </span>
        </div>

        {hasMore && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors group"
          >
            <span>{isExpanded ? "Show Less" : "View All"}</span>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            ) : (
              <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
            )}
          </button>
        )}
      </div>

      {/* Equipment Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {displayItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="border-2 border-white/30 rounded-xl p-1 bg-white/[0.02] hover:border-white/50 transition-all"
            >
              <EquipmentCard equipment={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Expand Hint */}
      {hasMore && !isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-center"
        >
          <button
            onClick={() => setIsExpanded(true)}
            className="text-sm text-white/60 hover:text-primary transition-colors"
          >
            + {equipment.length - 6} more items in this category
          </button>
        </motion.div>
      )}
    </section>
  )
}
