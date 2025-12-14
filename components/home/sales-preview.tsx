"use client"

import { useState } from "react"
import Link from "next/link"
import { Phone, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { SalesInquiryModal } from "@/components/sales/sales-inquiry-modal"

const featuredSales = [
  {
    id: "master-6000-generator",
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
    originalPrice: 249,
    condition: "Good",
    description: "Great condition, retail $249",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "quickie-saw-cart",
    name: "Quickie Saw Cart Wacker Brand",
    category: "Saws",
    price: 49,
    originalPrice: 149,
    condition: "Good",
    description: "Retail $149, good condition",
    image: "/placeholder.svg?height=300&width=400",
  },
]

const conditionColors = {
  Excellent: "bg-green-100 text-green-700",
  Good: "bg-blue-100 text-blue-700",
  Fair: "bg-orange-100 text-orange-700",
}

export function SalesPreview() {
  const [inquiryItem, setInquiryItem] = useState<(typeof featuredSales)[0] | null>(null)

  return (
    <section id="sales" className="py-24 bg-muted/80">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollAnimation>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-primary font-semibold text-sm tracking-wider uppercase">Used Equipment</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Quality Equipment For Sale</h2>
              <p className="text-muted-foreground mt-3 max-w-xl">
                Well-maintained rental fleet equipment at competitive prices. Call for pricing on most items.
              </p>
            </div>
            <Button asChild variant="outline" className="shrink-0 bg-transparent">
              <Link href="/sales">
                View All Equipment
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredSales.map((item, index) => (
            <ScrollAnimation key={item.id} delay={index * 0.1}>
              <div className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/50 hover:-translate-y-1 transition-all">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge
                    className={`absolute top-3 right-3 ${conditionColors[item.condition as keyof typeof conditionColors]}`}
                  >
                    {item.condition}
                  </Badge>
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-primary">{item.category}</span>
                  <h3 className="font-semibold text-foreground mt-1 mb-2 line-clamp-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-foreground">${item.price.toLocaleString()}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${item.originalPrice.toLocaleString()}
                        </span>
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
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Call for pricing note */}
        <ScrollAnimation>
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">Many items available - call for current inventory and pricing</p>
            <Button asChild variant="outline" className="bg-transparent">
              <a href="tel:+14356286663">
                <Phone className="w-4 h-4 mr-2" />
                (435) 628-6663
              </a>
            </Button>
          </div>
        </ScrollAnimation>
      </div>
      <SalesInquiryModal isOpen={!!inquiryItem} onClose={() => setInquiryItem(null)} equipment={inquiryItem} />
    </section>
  )
}
