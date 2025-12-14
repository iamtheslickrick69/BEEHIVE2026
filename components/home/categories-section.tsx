"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  Tractor,
  Shovel,
  Container,
  Zap,
  Hammer,
  Wind,
  Car,
  Droplets,
  ArrowRight,
  Drill,
  Disc,
  Wrench,
  Layers,
  Search,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { motion, AnimatePresence } from "framer-motion"
import { equipmentData } from "@/lib/equipment-data"
import type { Equipment } from "@/lib/equipment-data"
import { EquipmentCard } from "@/components/inventory/equipment-card"
import { cn } from "@/lib/utils"

const categories = [
  {
    name: "Skid Steers",
    icon: Tractor,
    categoryMatch: "Heavy Equipment",
    subcategory: "skid-steer",
    count: 8,
    image: "/bobcat-skid-steer-loader-yellow-construction.jpg",
  },
  {
    name: "Mini Excavators",
    icon: Shovel,
    categoryMatch: "Heavy Equipment",
    subcategory: "excavator",
    count: 9,
    image: "/mini-excavator-compact-construction-equipment.jpg",
  },
  {
    name: "Concrete Equipment",
    icon: Container,
    categoryMatch: "Concrete & Compaction",
    subcategory: "concrete",
    count: 12,
    image: "/concrete-mixer-buggy-power-trowel-construction.jpg",
  },
  {
    name: "Air Compressors",
    icon: Wind,
    categoryMatch: "Power Tools",
    subcategory: "compressor",
    count: 8,
    image: "/portable-air-compressor-towable-construction.jpg",
  },
  {
    name: "Generators & Welders",
    icon: Zap,
    categoryMatch: "Generators & Welders",
    subcategory: "generator",
    count: 7,
    image: "/portable-generator-welder-construction-equipment.jpg",
  },
  {
    name: "Dump Trailers",
    icon: Car,
    categoryMatch: "Trailers & Transport",
    subcategory: "trailer",
    count: 6,
    image: "/dump-trailer-heavy-duty-construction-hauling.jpg",
  },
  {
    name: "Landscaping",
    icon: Layers,
    categoryMatch: "Landscaping & Garden",
    subcategory: "landscaping",
    count: 10,
    image: "/landscaping-equipment-rototiller-aerator-sod-cutte.jpg",
  },
  {
    name: "Floor & Carpet",
    icon: Disc,
    categoryMatch: "Carpet & Floor Tools",
    subcategory: "floor",
    count: 8,
    image: "/floor-sander-buffer-tile-saw-carpet-equipment.jpg",
  },
]

export function CategoriesSection() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterInStock, setFilterInStock] = useState(false)
  const [filterDelivery, setFilterDelivery] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  // Get equipment for a specific category
  const getCategoryEquipment = (category: typeof categories[0]): Equipment[] => {
    let filtered = equipmentData.filter((item) => {
      const matchesCategory = item.category === category.categoryMatch
      const matchesSubcategory = item.name.toLowerCase().includes(category.subcategory)
      return matchesCategory || matchesSubcategory
    })

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply in-stock filter
    if (filterInStock) {
      filtered = filtered.filter((item) => item.available)
    }

    // Apply delivery filter
    if (filterDelivery) {
      filtered = filtered.filter((item) => item.delivery)
    }

    // Show max 6 items
    return filtered.slice(0, 6)
  }

  // Filter categories based on search and filters
  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      if (!searchQuery && !filterInStock && !filterDelivery) return true
      const equipment = getCategoryEquipment(category)
      return equipment.length > 0
    })
  }, [searchQuery, filterInStock, filterDelivery])

  const handleCategoryClick = (categoryName: string) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName)
  }

  const activeFiltersCount = [filterInStock, filterDelivery].filter(Boolean).length

  return (
    <section id="equipment" className="py-24 bg-background dark:bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollAnimation>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-primary font-semibold text-sm tracking-wider uppercase">Our Inventory</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Equipment Categories</h2>
              <p className="text-muted-foreground mt-3 max-w-xl">
                The largest selection of rental equipment in Southern Utah. Click any category to explore equipment.
              </p>
            </div>
            <Button asChild variant="outline" className="shrink-0 bg-transparent">
              <Link href="/inventory">
                View All Equipment
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </ScrollAnimation>

        {/* Search and Filters */}
        <ScrollAnimation delay={0.1}>
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search equipment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-12 bg-card border-2 border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "bg-transparent",
                  activeFiltersCount > 0 && "border-primary text-primary"
                )}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="ml-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>

              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-wrap gap-2"
                  >
                    <Button
                      variant={filterInStock ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterInStock(!filterInStock)}
                      className={!filterInStock ? "bg-transparent" : ""}
                    >
                      In Stock Only
                    </Button>
                    <Button
                      variant={filterDelivery ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterDelivery(!filterDelivery)}
                      className={!filterDelivery ? "bg-transparent" : ""}
                    >
                      Delivery Available
                    </Button>
                    {(filterInStock || filterDelivery) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setFilterInStock(false)
                          setFilterDelivery(false)
                        }}
                        className="text-muted-foreground"
                      >
                        Clear filters
                      </Button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </ScrollAnimation>

        {/* Category Cards Grid */}
        <div className="space-y-6">
          {filteredCategories.map((category, index) => {
            const isExpanded = expandedCategory === category.name
            const categoryEquipment = getCategoryEquipment(category)
            const hasEquipment = categoryEquipment.length > 0

            return (
              <ScrollAnimation key={category.name} delay={index * 0.05}>
                <div className="border-2 border-border rounded-2xl overflow-hidden bg-card">
                  {/* Category Header Card */}
                  <button
                    onClick={() => hasEquipment && handleCategoryClick(category.name)}
                    className={cn(
                      "w-full group transition-all",
                      hasEquipment && "cursor-pointer hover:bg-card/50"
                    )}
                    disabled={!hasEquipment}
                  >
                    <div className="relative h-48 md:h-56 overflow-hidden">
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        className={cn(
                          "w-full h-full object-cover transition-transform duration-500",
                          hasEquipment && "group-hover:scale-110"
                        )}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl bg-primary/90 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary transition-colors">
                              <category.icon className="w-7 h-7 text-primary-foreground" />
                            </div>
                            <div className="text-left">
                              <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                                {category.name}
                              </h3>
                              <span className="inline-flex items-center gap-2 text-white/80 text-sm">
                                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full font-medium">
                                  {categoryEquipment.length} available
                                </span>
                                {hasEquipment && (
                                  <span className="text-white/60">
                                    Click to explore
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>
                          {hasEquipment && (
                            <div className="hidden md:flex items-center gap-2 text-white">
                              <span className="text-sm font-medium">
                                {isExpanded ? "Hide" : "Show"} Equipment
                              </span>
                              {isExpanded ? (
                                <ChevronUp className="w-6 h-6" />
                              ) : (
                                <ChevronDown className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Expandable Equipment Grid */}
                  <AnimatePresence>
                    {isExpanded && hasEquipment && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-card border-t-2 border-border">
                          <div className="flex items-center justify-between mb-6">
                            <h4 className="text-lg font-semibold text-foreground">
                              Available Equipment
                            </h4>
                            <Link
                              href="/inventory"
                              className="text-sm text-primary hover:underline font-medium flex items-center gap-1"
                            >
                              View all in inventory
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {categoryEquipment.map((equipment) => (
                              <motion.div
                                key={equipment.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <EquipmentCard equipment={equipment} />
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollAnimation>
            )
          })}
        </div>

        {/* No Results State */}
        {filteredCategories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No equipment found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filters
            </p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setFilterInStock(false)
                setFilterDelivery(false)
              }}
              variant="outline"
            >
              Clear all filters
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
