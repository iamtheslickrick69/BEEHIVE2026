"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Grid3X3, List, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EquipmentCard } from "@/components/inventory/equipment-card"
import { EquipmentModal } from "@/components/ui/equipment-modal"
import { equipmentData, type Equipment } from "@/lib/equipment-data"
import { aiAssistantEvents } from "@/lib/ai-assistant-events"
import { cn } from "@/lib/utils"

export function InventoryGrid() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCardClick = (equipment: Equipment) => {
    setSelectedEquipment(equipment)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedEquipment(null)
  }

  const handleAskAI = (equipmentName: string) => {
    aiAssistantEvents.emit(`Tell me more about the ${equipmentName}`)
  }

  const handleSelectEquipment = (equipment: Equipment) => {
    setSelectedEquipment(equipment)
  }

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card rounded-xl border border-border p-4">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{equipmentData.length}</span> results
        </div>
        <div className="flex items-center gap-4">
          {/* Sort */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 bg-transparent">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center border border-border rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-2 rounded-md transition-colors",
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-label="Grid view"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-2 rounded-md transition-colors",
                viewMode === "list"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Equipment Grid */}
      <div
        className={cn(
          viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" : "flex flex-col gap-4",
        )}
      >
        {equipmentData.map((equipment, index) => (
          <motion.div
            key={equipment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <EquipmentCard equipment={equipment} viewMode={viewMode} onClick={() => handleCardClick(equipment)} />
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center pt-8">
        <Button variant="outline" size="lg" className="px-8 bg-transparent">
          Load More Equipment
        </Button>
      </div>

      {/* Equipment Detail Modal - with related equipment support */}
      <EquipmentModal
        equipment={selectedEquipment}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAskAI={handleAskAI}
        onSelectEquipment={handleSelectEquipment}
      />
    </div>
  )
}
