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
  { id: "general-tools", label: "General Tools", count: 18 },
  { id: "generators-welders", label: "Generators & Welders", count: 8 },
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
    <div className="mb-0">
      {/* Export category state for parent */}
      <div className="hidden" data-category={selectedCategory} />
    </div>
  )
}
