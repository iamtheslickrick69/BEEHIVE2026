"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const categories = [
  { id: "heavy-equipment", label: "Heavy Equipment", count: 18 },
  { id: "trailers-transport", label: "Trailers & Transport", count: 18 },
  { id: "concrete-compaction", label: "Concrete & Compaction", count: 16 },
  { id: "power-tools", label: "Power Tools", count: 15 },
  { id: "carpet-floor-tools", label: "Carpet & Floor Tools", count: 12 },
  { id: "water-equipment", label: "Water Equipment", count: 3 },
  { id: "automotive", label: "Automotive", count: 4 },
  { id: "general-tools", label: "General Tools", count: 18 },
  { id: "generators-welders", label: "Generators & Welders", count: 8 },
  { id: "landscaping-garden", label: "Landscaping & Garden", count: 16 },
]

export function InventoryFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("category")?.split(",").filter(Boolean) || [],
  )
  const [isFiltersOpen, setIsFiltersOpen] = useState(true)

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setSelectedCategories((prev) => (checked ? [...prev, categoryId] : prev.filter((id) => id !== categoryId)))
  }

  const clearFilters = () => {
    setSearch("")
    setSelectedCategories([])
    router.push("/inventory")
  }

  const hasActiveFilters = search || selectedCategories.length > 0

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search equipment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 h-12 bg-card"
        />
      </div>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="w-full justify-between bg-transparent"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </span>
          {hasActiveFilters && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
              {selectedCategories.length + (search ? 1 : 0)}
            </span>
          )}
        </Button>
      </div>

      {/* Filters Panel */}
      <motion.div
        initial={false}
        animate={{ height: isFiltersOpen ? "auto" : 0, opacity: isFiltersOpen ? 1 : 0 }}
        className={cn("overflow-hidden lg:!h-auto lg:!opacity-100", !isFiltersOpen && "lg:block")}
      >
        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </h3>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="text-sm text-primary hover:underline flex items-center gap-1">
                <X className="w-3 h-3" />
                Clear all
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Categories</h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={category.id}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                    />
                    <Label htmlFor={category.id} className="text-sm text-muted-foreground cursor-pointer">
                      {category.label}
                    </Label>
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{category.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Availability</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox id="available" defaultChecked />
                <Label htmlFor="available" className="text-sm text-muted-foreground cursor-pointer">
                  In Stock
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="delivery" />
                <Label htmlFor="delivery" className="text-sm text-muted-foreground cursor-pointer">
                  Delivery Available
                </Label>
              </div>
            </div>
          </div>

          {/* Apply Button */}
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Apply Filters</Button>
        </div>
      </motion.div>
    </div>
  )
}
