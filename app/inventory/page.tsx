import { Suspense } from "react"
import { InventoryHeader } from "@/components/inventory/inventory-header"
import { InventoryFilters } from "@/components/inventory/inventory-filters"
import { InventoryGrid } from "@/components/inventory/inventory-grid"
import { InventoryLoadingSkeleton } from "@/components/inventory/inventory-loading"

export const metadata = {
  title: "Equipment Inventory | BeeHive Rental & Sales LLC",
  description:
    "Browse our complete inventory of professional-grade rental equipment. Excavators, skid steers, generators, aerial lifts, and more in St. George, Utah.",
}

export default function InventoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <InventoryHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-72 shrink-0">
            <Suspense fallback={<div className="h-96 bg-muted animate-pulse rounded-xl" />}>
              <InventoryFilters />
            </Suspense>
          </aside>
          <main className="flex-1">
            <Suspense fallback={<InventoryLoadingSkeleton />}>
              <InventoryGrid />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}
