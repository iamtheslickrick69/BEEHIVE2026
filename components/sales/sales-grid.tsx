"use client"

import { useState } from "react"
import { Phone, Filter, Sparkles, Clock } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { SalesInquiryModal } from "./sales-inquiry-modal"

interface SaleItem {
  id: string
  name: string
  category: string
  price: number | null
  condition: "Excellent" | "Good" | "Fair" | "Non-Running"
  description: string
  image: string
  type: "new" | "used"
}

// New Equipment Data (placeholder names - to be updated)
const newEquipment: SaleItem[] = [
  {
    id: "new-2",
    name: "60lb Air Jackhammer Bit size 1-1/4",
    category: "Demolition",
    price: 1168,
    condition: "Excellent",
    description: "Brand new, in original packaging",
    image: "/sales/new/new-2.jpg",
    type: "new",
  },
  {
    id: "new-3",
    name: "Bosch Roto Hammer Model 1255-VC",
    category: "Power Tools",
    price: 1130,
    condition: "Excellent",
    description: "Brand new, in original packaging",
    image: "/sales/new/new-3.jpg",
    type: "new",
  },
  {
    id: "new-4",
    name: "MQ Plate Compactor GX160 Honda Engine Model 88- 19x20 Plate with Water Kit",
    category: "Compaction",
    price: 2400,
    condition: "Excellent",
    description: "Brand new, in original packaging",
    image: "/sales/new/new-4.jpg",
    type: "new",
  },
  {
    id: "new-5",
    name: "MQ 500gal Water Trailer Side and Rear Spray, 2-5/16in Ball",
    category: "Trailers",
    price: 9700,
    condition: "Excellent",
    description: "Brand new - Used also available, call for pricing",
    image: "/sales/new/new-5.jpg",
    type: "new",
  },
  {
    id: "new-6",
    name: "MQ Plate Compactor, GX160 Honda Engine Model 82-19x20 Plate with Water Kit",
    category: "Compaction",
    price: 2150,
    condition: "Excellent",
    description: "Brand new, in original packaging",
    image: "/sales/new/new-6.jpg",
    type: "new",
  },
  {
    id: "new-8",
    name: "Husqvarna Quickie Saw Model K770 14\"",
    category: "Saws",
    price: 1150,
    condition: "Excellent",
    description: "Brand new - Used also available, call for pricing",
    image: "/sales/new/new-8.jpg",
    type: "new",
  },
  {
    id: "new-9",
    name: "Husqvarna Quickie Saw Model K970 14in",
    category: "Saws",
    price: 1450,
    condition: "Excellent",
    description: "Brand new, in original packaging",
    image: "/sales/new/new-9.jpg",
    type: "new",
  },
  {
    id: "new-1",
    name: "Husqvarna Quickie Saw Battery operated Model K1 Pace Great for Indoor Cutting",
    category: "Saws",
    price: 1600,
    condition: "Excellent",
    description: "Comes with battery and free 14in blade",
    image: "/sales/new/new-1.jpg",
    type: "new",
  },
]

// Used Equipment Data
const usedEquipment: SaleItem[] = [
  {
    id: "master-generator",
    name: "Master 6000 Watt Generator",
    category: "Generators",
    price: 4500,
    condition: "Good",
    description: "Runs great, low hours",
    image: "/sales/used/master-generator.jpg",
    type: "used",
  },
  {
    id: "beagle-dolly",
    name: "Beagle Tools 4 Wheel Dolly",
    category: "General Tools",
    price: 99,
    condition: "Good",
    description: "$249 New - Great condition",
    image: "/sales/used/beagle-dolly.jpg",
    type: "used",
  },
  {
    id: "quickie-saw-cart",
    name: "Quickie Saw Cart Wacker Brand",
    category: "Saws",
    price: 49,
    condition: "Good",
    description: "Retail $149 - Good condition",
    image: "/sales/used/quickie-saw-cart.jpg",
    type: "used",
  },
  {
    id: "55-gallon-barrels",
    name: "Empty 55 Gallon Barrels (Set of 3)",
    category: "General",
    price: 45,
    condition: "Fair",
    description: "Good for Burn Barrel - $45 for 3",
    image: "/sales/used/55-gallon-barrels.jpg",
    type: "used",
  },
  {
    id: "concrete-saw",
    name: "Concrete Saw",
    category: "Saws",
    price: null,
    condition: "Fair",
    description: "Runs, in fair condition - Call for pricing",
    image: "/sales/used/concrete-saw.jpg",
    type: "used",
  },
  {
    id: "craftsman-mower",
    name: "Craftsman Mower",
    category: "Landscaping",
    price: null,
    condition: "Non-Running",
    description: "Non-running, needs gas line - Call for pricing",
    image: "/sales/used/craftsman-mower.jpg",
    type: "used",
  },
  {
    id: "kobalt-mower",
    name: "Kobalt Mower Parts",
    category: "Landscaping",
    price: null,
    condition: "Non-Running",
    description: "Non-running, for parts - Call for pricing",
    image: "/sales/used/kobalt-mower.jpg",
    type: "used",
  },
  {
    id: "briggs-mower",
    name: "Briggs and Stratton Mower",
    category: "Landscaping",
    price: null,
    condition: "Fair",
    description: "Runs, needs new gas tank - Call for pricing",
    image: "/sales/used/briggs-mower.jpg",
    type: "used",
  },
  {
    id: "storage-shelf",
    name: "Two Story Vertical Material Storage Shelf",
    category: "Storage",
    price: null,
    condition: "Good",
    description: "Heavy duty storage - Call for pricing",
    image: "/sales/used/storage-shelf.jpg",
    type: "used",
  },
  {
    id: "bluebird-hoist",
    name: "Blue Bird Engine Hoist",
    category: "Automotive",
    price: null,
    condition: "Good",
    description: "Working condition - Call for pricing",
    image: "/sales/used/bluebird-hoist.jpg",
    type: "used",
  },
]

const conditionColors = {
  Excellent: "bg-[#E8C24A] text-black",
  Good: "bg-green-500/20 text-green-400 border border-green-500/30",
  Fair: "bg-white/10 text-white/70 border border-white/20",
  "Non-Running": "bg-red-500/20 text-red-400 border border-red-500/30",
}

export function SalesGrid() {
  const [activeTab, setActiveTab] = useState<"new" | "used">("new")
  const [inquiryItem, setInquiryItem] = useState<SaleItem | null>(null)
  const [conditionFilter, setConditionFilter] = useState<string>("all")

  const items = activeTab === "new" ? newEquipment : usedEquipment

  // Filter used equipment by condition
  const filteredItems = activeTab === "used" && conditionFilter !== "all"
    ? items.filter(item => item.condition === conditionFilter)
    : items

  // Count items per condition for used equipment
  const conditionCounts = {
    all: usedEquipment.length,
    Excellent: usedEquipment.filter(i => i.condition === "Excellent").length,
    Good: usedEquipment.filter(i => i.condition === "Good").length,
    Fair: usedEquipment.filter(i => i.condition === "Fair").length,
    "Non-Running": usedEquipment.filter(i => i.condition === "Non-Running").length,
  }

  return (
    <section className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white/5 backdrop-blur-md rounded-full p-2 border border-white/10 shadow-lg">
            <motion.button
              onClick={() => {
                setActiveTab("new")
                setConditionFilter("all")
              }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-8 sm:px-10 py-3.5 rounded-full font-semibold text-base transition-all ${
                activeTab === "new"
                  ? "bg-[#E8C24A] text-black shadow-lg shadow-[#E8C24A]/30"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <Sparkles className="w-5 h-5" />
              New Equipment
            </motion.button>
            <motion.button
              onClick={() => {
                setActiveTab("used")
                setConditionFilter("all")
              }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-8 sm:px-10 py-3.5 rounded-full font-semibold text-base transition-all ${
                activeTab === "used"
                  ? "bg-[#E8C24A] text-black shadow-lg shadow-[#E8C24A]/30"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <Clock className="w-5 h-5" />
              Used Equipment
            </motion.button>
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {activeTab === "new" ? "New Equipment" : "Used Equipment"}
            </h2>
            <p className="text-white/60">{filteredItems.length} items currently for sale</p>
          </div>
        </div>

        {/* Condition Filter - Only for Used Equipment */}
        {activeTab === "used" && (
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setConditionFilter("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                conditionFilter === "all"
                  ? "bg-[#E8C24A] text-black shadow-lg"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              All ({conditionCounts.all})
            </button>
            {conditionCounts.Excellent > 0 && (
              <button
                onClick={() => setConditionFilter("Excellent")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  conditionFilter === "Excellent"
                    ? "bg-[#E8C24A] text-black shadow-lg"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                Excellent ({conditionCounts.Excellent})
              </button>
            )}
            {conditionCounts.Good > 0 && (
              <button
                onClick={() => setConditionFilter("Good")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  conditionFilter === "Good"
                    ? "bg-[#E8C24A] text-black shadow-lg"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                Good ({conditionCounts.Good})
              </button>
            )}
            {conditionCounts.Fair > 0 && (
              <button
                onClick={() => setConditionFilter("Fair")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  conditionFilter === "Fair"
                    ? "bg-[#E8C24A] text-black shadow-lg"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                Fair ({conditionCounts.Fair})
              </button>
            )}
            {conditionCounts["Non-Running"] > 0 && (
              <button
                onClick={() => setConditionFilter("Non-Running")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  conditionFilter === "Non-Running"
                    ? "bg-[#E8C24A] text-black shadow-lg"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                Non-Running ({conditionCounts["Non-Running"]})
              </button>
            )}
          </div>
        )}

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + conditionFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setInquiryItem(item)}
                className="group bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden hover:border-[#E8C24A]/50 hover:bg-white/10 transition-all cursor-pointer active:bg-white/20"
              >
              {/* Image */}
              <div className="relative h-52 overflow-hidden bg-black/50">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${conditionColors[item.condition]}`}>
                  {item.condition}
                </span>
                {item.type === "new" && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-[#E8C24A] text-black animate-pulse shadow-lg shadow-[#E8C24A]/50">
                    NEW
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <span className="text-xs font-medium text-[#E8C24A]">{item.category}</span>
                <h3 className="font-semibold text-white mt-1 mb-2 line-clamp-1">{item.name}</h3>
                <p className="text-sm text-white/60 mb-4">{item.description}</p>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div>
                    {item.price ? (
                      <span className="text-2xl font-bold text-white">${item.price.toLocaleString()}</span>
                    ) : (
                      <span className="text-lg font-medium text-[#E8C24A]">Call for Price</span>
                    )}
                  </div>
                  <div className="px-4 py-2.5 bg-[#E8C24A] group-hover:bg-[#F0D060] text-black font-semibold text-sm rounded-full transition-all text-center">
                    View Details
                  </div>
                </div>
              </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Call for pricing note */}
        <div className="mt-12 text-center bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-2">Interested in an item?</h3>
          <p className="text-white/60 mb-4">
            Give us a call for current availability, pricing, and to schedule a viewing.
          </p>
          <a
            href="tel:+14356286663"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#E8C24A] hover:bg-[#F0D060] text-black font-semibold rounded-full transition-all"
          >
            <Phone className="w-4 h-4" />
            (435) 628-6663
          </a>
        </div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <Filter className="w-12 h-12 text-white/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No equipment found</h3>
            <p className="text-white/60 mb-4">Check back soon for new inventory.</p>
          </div>
        )}
      </div>

      {/* Inquiry Modal */}
      <SalesInquiryModal isOpen={!!inquiryItem} onClose={() => setInquiryItem(null)} equipment={inquiryItem} />
    </section>
  )
}
