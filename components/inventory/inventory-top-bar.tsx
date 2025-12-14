"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Search, Grid3x3, List, ArrowUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const categories = [
  { id: "all", label: "All Equipment", count: 125 },
  { id: "heavy-equipment", label: "Heavy Equipment", count: 18 },
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
  { id: "popular", label: "Most Popular" },
  { id: "price-low", label: "Price: Low to High" },
  { id: "price-high", label: "Price: High to Low" },
  { id: "name-asc", label: "Name: A-Z" },
  { id: "name-desc", label: "Name: Z-A" },
]

export function InventoryTopBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all")
  const [sortBy, setSortBy] = useState("popular")
  const [inStockOnly, setInStockOnly] = useState(true)
  const [deliveryOnly, setDeliveryOnly] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    // Update URL params
  }

  const handleSearch = (value: string) => {
    setSearch(value)
    // Implement search logic
  }

  return (
    <div className="bg-background border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
        {/* Search Bar & Controls */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <Input
              type="search"
              placeholder="Search equipment by name..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-12 h-12 bg-white/5 border-2 border-white/20 rounded-xl text-white placeholder:text-white/40 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* View Toggle & Sort */}
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-xl p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("grid")}
                className={cn(
                  "h-10 px-3",
                  viewMode === "grid" && "bg-primary text-black hover:bg-primary/90 hover:text-black",
                )}
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("list")}
                className={cn(
                  "h-10 px-3",
                  viewMode === "list" && "bg-primary text-black hover:bg-primary/90 hover:text-black",
                )}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-12 px-4 bg-white/5 border-white/20 hover:bg-white/10">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  Sort: {sortOptions.find((s) => s.id === sortBy)?.label}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#0a0a0a] border-white/10">
                {sortOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.id}
                    onClick={() => setSortBy(option.id)}
                    className={cn(
                      "cursor-pointer",
                      sortBy === option.id && "bg-primary/20 text-primary",
                    )}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="relative">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-2 pb-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all shrink-0",
                    selectedCategory === category.id
                      ? "bg-primary text-black shadow-lg shadow-primary/20"
                      : "bg-white/5 text-white hover:bg-white/10 border border-white/10",
                  )}
                >
                  {category.label}
                  <span
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      selectedCategory === category.id
                        ? "bg-black/20 text-black"
                        : "bg-white/10 text-white/60",
                    )}
                  >
                    {category.count}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Gradient fade on right for scroll indicator */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>

        {/* Quick Filters */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Checkbox
              id="in-stock"
              checked={inStockOnly}
              onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
              className="border-white/20"
            />
            <Label htmlFor="in-stock" className="text-white/70 cursor-pointer font-normal">
              In Stock Only
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="delivery"
              checked={deliveryOnly}
              onCheckedChange={(checked) => setDeliveryOnly(checked as boolean)}
              className="border-white/20"
            />
            <Label htmlFor="delivery" className="text-white/70 cursor-pointer font-normal">
              Delivery Available
            </Label>
          </div>
        </div>
      </div>
    </div>
  )
}
