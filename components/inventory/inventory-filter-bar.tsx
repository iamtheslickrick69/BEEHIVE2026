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
  { id: "automotive", label: "Automotive", count: 4 },
  { id: "general-tools", label: "General Tools", count: 9 },
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
      {/* Ultra-Compact Single Row Navigation */}
      <div className="bg-background backdrop-blur-xl border-b border-white/10 sticky top-20 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-2.5">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Category Pills with Horizontal Scroll */}
            <div className="flex-1 overflow-x-auto scrollbar-hide">
              <div className="flex gap-2 pb-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex-shrink-0",
                      selectedCategory === category.id
                        ? "bg-[#E8C24A] text-black shadow-md"
                        : "bg-white/5 text-white hover:bg-white/10 border border-white/20 hover:border-white/40",
                    )}
                  >
                    {category.label}
                    <span className={cn(
                      "ml-1.5 text-xs",
                      selectedCategory === category.id ? "opacity-70" : "opacity-60"
                    )}>
                      ({category.count})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Search & Sort */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Search - Compact */}
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
                <Input
                  type="search"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-8 pr-3 h-8 w-40 lg:w-48 bg-white/5 border-white/30 rounded-md text-white placeholder:text-white/40 focus:border-white focus:ring-1 focus:ring-white/20 text-xs"
                />
                {search && (
                  <button
                    onClick={() => {
                      setSearch("")
                      handleSearch("")
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Sort - Compact */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-8 px-3 bg-white/5 border-white/30 hover:bg-white/10 hover:border-white/50 text-xs whitespace-nowrap">
                    <ArrowUpDown className="w-3.5 h-3.5 mr-1.5" />
                    {sortOptions.find((s) => s.id === sortBy)?.label}
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
