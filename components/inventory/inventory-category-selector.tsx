"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const categories = [
  { id: "all", label: "All Equipment", count: 125 },
  { id: "heavy-equipment", label: "Heavy Equipment", count: 20 },
  { id: "trailers-transport", label: "Trailers & Transport", count: 18 },
  { id: "concrete-compaction", label: "Concrete & Compaction", count: 16 },
  { id: "power-tools", label: "Power Tools", count: 15 },
  { id: "carpet-floor-tools", label: "Carpet & Floor", count: 12 },
  { id: "automotive", label: "Automotive", count: 4 },
  { id: "general-tools", label: "General Tools", count: 18 },
  { id: "generators-welders", label: "Generators & Welders", count: 8 },
  { id: "landscaping-garden", label: "Landscaping & Garden", count: 16 },
]

interface InventoryCategorySelectorProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  searchQuery: string
  onSearchChange: (search: string) => void
}

export function InventoryCategorySelector({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: InventoryCategorySelectorProps) {
  return (
    <div className="md:sticky md:top-20 z-40 bg-black/95 backdrop-blur-xl border-2 border-white/10 hover:border-[#E8C24A]/20 rounded-2xl p-4 md:p-6 mb-8 shadow-2xl shadow-[#E8C24A]/10 relative transition-all duration-300">
      {/* Bottom gradient fade - minimalistic line */}
      <div className="absolute -bottom-4 left-0 right-0 h-4 bg-gradient-to-b from-transparent to-white/5 pointer-events-none" />
      {/* Mobile Layout: Dropdown + Search */}
      <div className="flex lg:hidden items-center gap-4">
        {/* Category Dropdown for Mobile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-11 px-4 bg-white/5 border-white/30 hover:bg-white/10 hover:border-white/50 text-sm justify-between min-w-[140px] rounded-full flex items-center">
              <span className="truncate text-left flex-1">
                {categories.find((c) => c.id === selectedCategory)?.label || "All Equipment"}
              </span>
              <span className="ml-2 text-white/60 flex-shrink-0 text-xs">
                ({categories.find((c) => c.id === selectedCategory)?.count || 125})
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-[#0a0a0a]/95 backdrop-blur-xl border-white/20 w-[calc(100vw-2rem)] max-w-[320px]">
            {categories.map((category) => (
              <DropdownMenuItem
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={cn(
                  "cursor-pointer py-3 px-4",
                  selectedCategory === category.id && "bg-white/20 text-white",
                )}
              >
                <span className="flex-1">{category.label}</span>
                <span className="text-white/60 text-xs ml-3">({category.count})</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Search - Mobile */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
          <Input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-10 h-11 w-full bg-white/5 border border-white/30 hover:border-white/40 rounded-full text-white placeholder:text-white/40 focus:border-white focus:ring-1 focus:ring-white/20 text-sm transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Desktop Layout: Category Pills */}
      <div className="hidden lg:flex flex-col gap-3">
        {/* First Row: 5 Categories + Search */}
        <div className="flex items-center gap-2">
          {categories.slice(0, 5).map((category) => (
            <motion.button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                selectedCategory === category.id
                  ? "bg-[#E8C24A] text-black shadow-md"
                  : "bg-white/5 text-white hover:bg-white/10 border border-white/20 hover:border-white/40",
              )}
            >
              {category.label}
              <span className={cn(
                "ml-2 text-sm",
                selectedCategory === category.id ? "opacity-70" : "opacity-60"
              )}>
                ({category.count})
              </span>
            </motion.button>
          ))}

          {/* Search - Styled like a tab */}
          <div className="relative ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
            <Input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-10 h-10 w-48 bg-white/5 border border-white/20 hover:border-white/40 rounded-full text-white placeholder:text-white/40 focus:border-white focus:ring-1 focus:ring-white/20 text-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Second Row: Remaining 5 Categories */}
        <div className="flex items-center gap-2">
          {categories.slice(5).map((category) => (
            <motion.button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                selectedCategory === category.id
                  ? "bg-[#E8C24A] text-black shadow-md"
                  : "bg-white/5 text-white hover:bg-white/10 border border-white/20 hover:border-white/40",
              )}
            >
              {category.label}
              <span className={cn(
                "ml-2 text-sm",
                selectedCategory === category.id ? "opacity-70" : "opacity-60"
              )}>
                ({category.count})
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
