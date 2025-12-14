"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, Filter, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SalesInquiryModal } from "./sales-inquiry-modal"

interface SaleItem {
  id: string
  name: string
  category: string
  price: number | null
  condition: "Good" | "Fair" | "Non-Running"
  description: string
  image: string
}

const saleItems: SaleItem[] = [
  {
    id: "master-generator",
    name: "Master 6000 Watt Generator",
    category: "Generators",
    price: 4500,
    condition: "Good",
    description: "Runs great, low hours",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "beagle-dolly",
    name: "Beagle Tools 4 Wheel Dolly",
    category: "General Tools",
    price: 99,
    condition: "Good",
    description: "$249 New - Great condition",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "quickie-saw-cart",
    name: "Quickie Saw Cart Wacker Brand",
    category: "Saws",
    price: 49,
    condition: "Good",
    description: "Retail $149 - Good condition",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "55-gallon-barrels",
    name: "Empty 55 Gallon Barrels (Set of 3)",
    category: "General",
    price: 45,
    condition: "Fair",
    description: "Good for Burn Barrel - $45 for 3",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "concrete-saw",
    name: "Concrete Saw",
    category: "Saws",
    price: null,
    condition: "Fair",
    description: "Runs, in fair condition - Call for pricing",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "craftsman-mower",
    name: "Craftsman Mower",
    category: "Landscaping",
    price: null,
    condition: "Non-Running",
    description: "Non-running, needs gas line - Call for pricing",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "kobalt-mower",
    name: "Kobalt Mower Parts",
    category: "Landscaping",
    price: null,
    condition: "Non-Running",
    description: "Non-running, for parts - Call for pricing",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "briggs-mower",
    name: "Briggs and Stratton Mower",
    category: "Landscaping",
    price: null,
    condition: "Fair",
    description: "Runs, needs new gas tank - Call for pricing",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "storage-shelf",
    name: "Two Story Vertical Material Storage Shelf",
    category: "Storage",
    price: null,
    condition: "Good",
    description: "Heavy duty storage - Call for pricing",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "bluebird-hoist",
    name: "Blue Bird Engine Hoist",
    category: "Automotive",
    price: null,
    condition: "Good",
    description: "Working condition - Call for pricing",
    image: "/placeholder.svg?height=300&width=400",
  },
]

const categories = ["All", "Generators", "General Tools", "Saws", "Landscaping", "Storage", "Automotive", "General"]
const conditions = ["All", "Good", "Fair", "Non-Running"]

const conditionColors = {
  Good: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Fair: "bg-white/10 text-white dark:bg-white/10 dark:text-white",
  "Non-Running": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
}

export function SalesGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedCondition, setSelectedCondition] = useState("All")
  const [showFilters, setShowFilters] = useState(false)
  const [inquiryItem, setInquiryItem] = useState<SaleItem | null>(null)

  const filteredItems = saleItems.filter((item) => {
    const categoryMatch = selectedCategory === "All" || item.category === selectedCategory
    const conditionMatch = selectedCondition === "All" || item.condition === selectedCondition
    return categoryMatch && conditionMatch
  })

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Available Equipment</h2>
            <p className="text-muted-foreground">{filteredItems.length} items currently for sale</p>
          </div>

          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="md:hidden">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Filter bar */}
        <motion.div
          initial={false}
          animate={{ height: showFilters ? "auto" : "auto" }}
          className={`bg-muted/50 rounded-xl p-4 mb-8 ${showFilters ? "block" : "hidden md:block"}`}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-background hover:bg-muted text-foreground border border-border"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="md:w-56">
              <label className="text-sm font-medium text-foreground mb-2 block">Condition</label>
              <div className="flex flex-wrap gap-2">
                {conditions.map((cond) => (
                  <button
                    key={cond}
                    onClick={() => setSelectedCondition(cond)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedCondition === cond
                        ? "bg-primary text-primary-foreground"
                        : "bg-background hover:bg-muted text-foreground border border-border"
                    }`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/50 hover:-translate-y-1 transition-all"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Badge className={`absolute top-3 right-3 ${conditionColors[item.condition]}`}>{item.condition}</Badge>
              </div>

              {/* Content */}
              <div className="p-5">
                <span className="text-xs font-medium text-primary">{item.category}</span>
                <h3 className="font-semibold text-foreground mt-1 mb-2 line-clamp-1">{item.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{item.description}</p>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    {item.price ? (
                      <span className="text-2xl font-bold text-foreground">${item.price.toLocaleString()}</span>
                    ) : (
                      <span className="text-lg font-medium text-primary">Call for Price</span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => setInquiryItem(item)}
                  >
                    Inquire
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call for pricing note */}
        <div className="mt-12 text-center bg-muted/50 rounded-xl p-8">
          <h3 className="text-lg font-semibold text-foreground mb-2">Interested in an item?</h3>
          <p className="text-muted-foreground mb-4">
            Give us a call for current availability, pricing, and to schedule a viewing.
          </p>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <a href="tel:+14356286663">
              <Phone className="w-4 h-4 mr-2" />
              (435) 628-6663
            </a>
          </Button>
        </div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No equipment found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your filters to see more results.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory("All")
                setSelectedCondition("All")
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>

      {/* Inquiry Modal */}
      <SalesInquiryModal isOpen={!!inquiryItem} onClose={() => setInquiryItem(null)} equipment={inquiryItem} />
    </section>
  )
}
