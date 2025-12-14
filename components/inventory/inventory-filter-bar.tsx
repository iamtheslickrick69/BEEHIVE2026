"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, ArrowUpDown, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const categories = [
  { id: "all", label: "All Equipment", count: 125 },
  { id: "heavy-equipment", label: "Heavy Equipment", count: 20 },
  { id: "trailers-transport", label: "Trailers & Transport", count: 18 },
  { id: "concrete-compaction", label: "Concrete & Compaction", count: 16 },
  { id: "power-tools", label: "Power Tools", count: 15 },
  { id: "carpet-floor-tools", label: "Carpet & Floor", count: 12 },
  { id: "water-equipment", label: "Water Equipment", count: 3 },
  { id: "automotive", label: "Automotive", count: 4 },
  { id: "general-tools", label: "General Tools", count: 6 },
  { id: "generators-welders", label: "Generators & Welders", count: 8 },
  { id: "scaffolding-ladders", label: "Scaffolding & Ladders", count: 9 },
  { id: "landscaping-garden", label: "Landscaping & Garden", count: 16 },
]

const sortOptions = [
  { id: "featured", label: "Featured" },
  { id: "popular", label: "Most Popular" },
  { id: "price-low", label: "Price: Low to High" },
  { id: "price-high", label: "Price: High to Low" },
  { id: "name-asc", label: "Name: A-Z" },
  { id: "name-desc", label: "Name: Z-A" },
]

interface InventoryFilterBarProps {
  onCategoryChange?: (category: string) => void
  onSearchChange?: (search: string) => void
  onSortChange?: (sort: string) => void
  onFiltersChange?: (filters: { inStock: boolean; delivery: boolean }) => void
}

export function InventoryFilterBar({
  onCategoryChange,
  onSearchChange,
  onSortChange,
  onFiltersChange,
}: InventoryFilterBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("featured")
  const [inStockOnly, setInStockOnly] = useState(true)
  const [deliveryOnly, setDeliveryOnly] = useState(false)

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    onCategoryChange?.(categoryId)
  }

  const handleSearch = (value: string) => {
    setSearch(value)
    onSearchChange?.(value)
  }

  const handleSortChange = (sortId: string) => {
    setSortBy(sortId)
    onSortChange?.(sortId)
  }

  const handleFiltersChange = (key: 'inStock' | 'delivery', value: boolean) => {
    const newFilters = {
      inStock: key === 'inStock' ? value : inStockOnly,
      delivery: key === 'delivery' ? value : deliveryOnly,
    }
    if (key === 'inStock') setInStockOnly(value)
    if (key === 'delivery') setDeliveryOnly(value)
    onFiltersChange?.(newFilters)
  }

  return (
    <div>
      {/* Top Bar - Page Title & Search/Sort */}
      <div className="bg-background/95 backdrop-blur-xl border-b border-white/10 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Title */}
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">Equipment Inventory</h1>
              <p className="text-white/60 text-xs md:text-sm">
                Browse our complete selection of professional-grade rental equipment
              </p>
            </div>

            {/* Search & Sort */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <Input
                  type="search"
                  placeholder="Search equipment..."
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 pr-4 h-10 w-48 md:w-56 lg:w-64 bg-white/5 border-white/30 rounded-lg text-white placeholder:text-white/40 focus:border-white focus:ring-2 focus:ring-white/20 text-sm"
                />
                {search && (
                  <button
                    onClick={() => {
                      setSearch("")
                      handleSearch("")
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10 px-4 bg-white/5 border-white/30 hover:bg-white/10 hover:border-white/50 text-sm">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    Sort: {sortOptions.find((s) => s.id === sortBy)?.label}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-[#0a0a0a] border-white/10">
                  {sortOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.id}
                      onClick={() => handleSortChange(option.id)}
                      className={cn(
                        "cursor-pointer",
                        sortBy === option.id && "bg-white/20 text-white",
                      )}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Container - Stores state for parent to use */}
      <div className="hidden" data-filters={JSON.stringify({ inStockOnly, deliveryOnly })} data-category={selectedCategory}>
        {/* Hidden - just for state management */}
      </div>
    </div>
  )
}
