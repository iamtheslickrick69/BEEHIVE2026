"use client"

import { useState } from "react"
import { Shovel, Tractor, Zap, Hammer, TreeDeciduous, PartyPopper } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = [
  { id: "all", label: "All Videos", icon: null, count: 18 },
  { id: "excavation", label: "Excavation", icon: Shovel, count: 5 },
  { id: "aerial", label: "Aerial Lifts", icon: Tractor, count: 4 },
  { id: "power", label: "Power Equipment", icon: Zap, count: 3 },
  { id: "tools", label: "Power Tools", icon: Hammer, count: 3 },
  { id: "landscaping", label: "Landscaping", icon: TreeDeciduous, count: 2 },
  { id: "event", label: "Event Setup", icon: PartyPopper, count: 1 },
]

export function TrainingCategories() {
  const [activeCategory, setActiveCategory] = useState("all")

  return (
    <section className="py-8 border-b border-border bg-card sticky top-20 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
              )}
            >
              {category.icon && <category.icon className="w-4 h-4" />}
              {category.label}
              <span
                className={cn(
                  "text-xs px-1.5 py-0.5 rounded-full",
                  activeCategory === category.id
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-background text-muted-foreground",
                )}
              >
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
