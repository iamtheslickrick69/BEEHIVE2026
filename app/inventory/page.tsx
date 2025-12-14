import { Suspense } from "react"
import { InventoryCategories } from "@/components/inventory/inventory-categories"
import { InventoryLoadingSkeleton } from "@/components/inventory/inventory-loading"
import { InventoryHero } from "@/components/inventory/inventory-hero"

export const metadata = {
  title: "Equipment Inventory | BeeHive Rental & Sales LLC",
  description:
    "Browse our complete inventory of professional-grade rental equipment. Excavators, skid steers, generators, aerial lifts, and more in St. George, Utah.",
}

export default function InventoryPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <InventoryHero />
      <Suspense fallback={<InventoryLoadingSkeleton />}>
        <InventoryCategories />
      </Suspense>
    </div>
  )
}
