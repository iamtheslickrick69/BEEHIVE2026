"use client"

import { useState, useEffect } from "react"
import { CategoryPreview } from "@/components/inventory/category-preview"
import { InventoryFilterBar } from "@/components/inventory/inventory-filter-bar"
import { equipmentData } from "@/lib/equipment-data"
import { EquipmentCard } from "@/components/inventory/equipment-card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"

// Group equipment by category
const groupByCategory = () => {
  const categories: Record<string, typeof equipmentData> = {}

  equipmentData.forEach((item) => {
    if (!categories[item.category]) {
      categories[item.category] = []
    }
    categories[item.category].push(item)
  })

  return categories
}

const categoryOrder = [
  "Heavy Equipment",
  "Trailers & Transport",
  "Concrete & Compaction",
  "Power Tools",
  "Carpet & Floor Tools",
  "Water Equipment",
  "Automotive",
  "General Tools",
  "Generators & Welders",
  "Scaffolding & Ladders",
  "Landscaping & Garden",
]

const categoryIdMap: Record<string, string> = {
  "all": "All Equipment",
  "heavy-equipment": "Heavy Equipment",
  "trailers-transport": "Trailers & Transport",
  "concrete-compaction": "Concrete & Compaction",
  "power-tools": "Power Tools",
  "carpet-floor-tools": "Carpet & Floor Tools",
  "water-equipment": "Water Equipment",
  "automotive": "Automotive",
  "general-tools": "General Tools",
  "generators-welders": "Generators & Welders",
  "scaffolding-ladders": "Scaffolding & Ladders",
  "landscaping-garden": "Landscaping & Garden",
}

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

export function InventoryCategories() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("featured")
  const [filters, setFilters] = useState({ inStock: true, delivery: false })
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [featuredCount, setFeaturedCount] = useState(3)

  // Responsive featured items count
  useEffect(() => {
    const updateFeaturedCount = () => {
      setFeaturedCount(window.innerWidth >= 1024 ? 3 : 2)
    }
    updateFeaturedCount()
    window.addEventListener("resize", updateFeaturedCount)
    return () => window.removeEventListener("resize", updateFeaturedCount)
  }, [])

  const categorizedEquipment = groupByCategory()

  // Filter equipment based on search, category, and filters
  const filterEquipment = (items: typeof equipmentData) => {
    let filtered = [...items]

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.specs.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Apply stock filter
    if (filters.inStock) {
      filtered = filtered.filter((item) => item.available)
    }

    // Apply delivery filter
    if (filters.delivery) {
      filtered = filtered.filter((item) => item.delivery)
    }

    // Apply sorting
    switch (sortBy) {
      case "featured":
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return 0
        })
        break
      case "price-low":
        filtered.sort((a, b) => a.dailyRate - b.dailyRate)
        break
      case "price-high":
        filtered.sort((a, b) => b.dailyRate - a.dailyRate)
        break
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name))
        break
    }

    return filtered
  }

  // Get filtered equipment for display
  const getDisplayEquipment = () => {
    if (selectedCategory === "all") {
      return filterEquipment(equipmentData)
    } else {
      const categoryName = categoryIdMap[selectedCategory]
      const items = categorizedEquipment[categoryName] || []
      return filterEquipment(items)
    }
  }

  const displayEquipment = getDisplayEquipment()

  return (
    <>
      <InventoryFilterBar
        onCategoryChange={setSelectedCategory}
        onSearchChange={setSearchQuery}
        onSortChange={setSortBy}
        onFiltersChange={setFilters}
      />

      {/* Mobile Filter Button */}
      <div className="lg:hidden max-w-7xl mx-auto px-4 py-4">
        <Button
          onClick={() => setIsMobileFilterOpen(true)}
          className="w-full h-12 bg-white/5 border-2 border-white/20 hover:bg-white/10 hover:border-white/30 text-white font-semibold"
        >
          <SlidersHorizontal className="w-5 h-5 mr-2" />
          Filters & Categories
        </Button>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-[85vw] max-w-sm bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] border-r-2 border-white/20 z-50 overflow-y-auto lg:hidden"
            >
              {/* Drawer Header */}
              <div className="sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/20 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Filters & Categories</h2>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="p-6">
                {/* Filters Section */}
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Filters</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="in-stock-mobile"
                        checked={filters.inStock}
                        onCheckedChange={(checked) => {
                          setFilters({ ...filters, inStock: checked as boolean })
                          setIsMobileFilterOpen(false)
                        }}
                        className="border-white/40 data-[state=checked]:bg-white data-[state=checked]:border-white"
                      />
                      <Label htmlFor="in-stock-mobile" className="text-white/80 cursor-pointer font-normal text-sm">
                        In Stock Only
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="delivery-mobile"
                        checked={filters.delivery}
                        onCheckedChange={(checked) => {
                          setFilters({ ...filters, delivery: checked as boolean })
                          setIsMobileFilterOpen(false)
                        }}
                        className="border-white/40 data-[state=checked]:bg-white data-[state=checked]:border-white"
                      />
                      <Label htmlFor="delivery-mobile" className="text-white/80 cursor-pointer font-normal text-sm">
                        Delivery Available
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-6" />

                {/* Categories Section */}
                <div>
                  <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <motion.button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id)
                          setIsMobileFilterOpen(false)
                        }}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "w-full flex items-center justify-between gap-2 px-4 py-3 rounded-lg font-medium transition-all text-sm",
                          selectedCategory === category.id
                            ? "bg-white text-black shadow-lg shadow-white/20"
                            : "bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-white/30",
                        )}
                      >
                        <span className="truncate text-left">{category.label}</span>
                        <span
                          className={cn(
                            "rounded-full shrink-0 font-semibold text-xs px-2 py-0.5",
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
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Layout with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Left Sidebar - Filters & Categories (Desktop Only) */}
          <aside className="w-64 shrink-0 hidden lg:block">
            <div className="sticky top-36 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] border-2 border-white/20 rounded-2xl p-6 shadow-2xl shadow-white/10">
              {/* Filters Section */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Filters</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="in-stock-sidebar"
                      checked={filters.inStock}
                      onCheckedChange={(checked) => setFilters({ ...filters, inStock: checked as boolean })}
                      className="border-white/40 data-[state=checked]:bg-white data-[state=checked]:border-white"
                    />
                    <Label htmlFor="in-stock-sidebar" className="text-white/80 cursor-pointer font-normal text-sm">
                      In Stock Only
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="delivery-sidebar"
                      checked={filters.delivery}
                      onCheckedChange={(checked) => setFilters({ ...filters, delivery: checked as boolean })}
                      className="border-white/40 data-[state=checked]:bg-white data-[state=checked]:border-white"
                    />
                    <Label htmlFor="delivery-sidebar" className="text-white/80 cursor-pointer font-normal text-sm">
                      Delivery Available
                    </Label>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-6" />

              {/* Categories Section */}
              <div>
                <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg font-medium transition-all text-sm",
                        selectedCategory === category.id
                          ? "bg-white text-black shadow-lg shadow-white/20"
                          : "bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-white/30",
                      )}
                    >
                      <span className="truncate text-left">{category.label}</span>
                      <span
                        className={cn(
                          "rounded-full shrink-0 font-semibold text-xs px-2 py-0.5",
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
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Active Filters Display */}
            {(searchQuery || selectedCategory !== "all" || !filters.inStock || filters.delivery) && (
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="text-sm text-white/60">Active filters:</span>
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 text-white text-sm rounded-full border border-white/20">
                    Search: "{searchQuery}"
                    <button
                      onClick={() => setSearchQuery("")}
                      className="ml-1 hover:text-white/60 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedCategory !== "all" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 text-white text-sm rounded-full border border-white/20">
                    {categoryIdMap[selectedCategory]}
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className="ml-1 hover:text-white/60 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {!filters.inStock && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 text-white text-sm rounded-full border border-white/20">
                    Show All Stock
                  </span>
                )}
                {filters.delivery && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 text-white text-sm rounded-full border border-white/20">
                    Delivery Available
                    <button
                      onClick={() => setFilters({ ...filters, delivery: false })}
                      className="ml-1 hover:text-white/60 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                    setFilters({ inStock: true, delivery: false })
                  }}
                  className="text-sm text-white/60 hover:text-white underline transition-colors"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Search Results or Single Category View */}
            {searchQuery || selectedCategory !== "all" ? (
              <section className="mb-8 bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    {searchQuery ? `Search Results` : categoryIdMap[selectedCategory]}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white/60">
                      Showing {displayEquipment.length} {displayEquipment.length === 1 ? 'item' : 'items'}
                    </span>
                    <span className="text-sm text-white/60 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                      {displayEquipment.length}
                    </span>
                  </div>
                </div>

                {displayEquipment.length === 0 ? (
                  <div className="text-center py-16 px-4">
                    <div className="max-w-md mx-auto">
                      <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <SlidersHorizontal className="w-8 h-8 text-white/40" />
                      </div>
                      <p className="text-white/80 text-lg font-semibold mb-2">No equipment found</p>
                      <p className="text-white/50 text-sm mb-6">
                        We couldn't find any equipment matching your current filters.
                      </p>
                      <Button
                        onClick={() => {
                          setSearchQuery("")
                          setSelectedCategory("all")
                          setFilters({ inStock: true, delivery: false })
                        }}
                        className="bg-white/10 hover:bg-white/20 border border-white/20"
                      >
                        Clear all filters
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayEquipment.map((item) => (
                      <div key={item.id} className="border-2 border-white/30 rounded-xl p-1 bg-white/[0.02] hover:border-white/50 transition-all">
                        <EquipmentCard equipment={item} />
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ) : (
              <>
                {/* Featured Section */}
                <section className="mb-8 bg-white/[0.02] border border-white/20 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">Featured Equipment</h2>
                    <span className="text-sm text-white/80 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                      Top Picks
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filterEquipment(equipmentData.filter((item) => item.featured))
                      .slice(0, featuredCount)
                      .map((item) => (
                        <div key={item.id} className="border-2 border-white/30 rounded-xl p-1 bg-white/[0.02] hover:border-white/50 transition-all">
                          <EquipmentCard equipment={item} />
                        </div>
                      ))}
                  </div>
                </section>

                {/* Category Previews */}
                {categoryOrder.map((categoryName) => {
                  const items = categorizedEquipment[categoryName]
                  if (!items || items.length === 0) return null

                  const filteredItems = filterEquipment(items)
                  if (filteredItems.length === 0) return null

                  return (
                    <CategoryPreview
                      key={categoryName}
                      name={categoryName}
                      count={filteredItems.length}
                      equipment={filteredItems}
                    />
                  )
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
