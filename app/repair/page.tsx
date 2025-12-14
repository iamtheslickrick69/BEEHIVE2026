import { RepairHeader } from "@/components/repair/repair-header"
import { RepairServices } from "@/components/repair/repair-services"
import { RepairProcess } from "@/components/repair/repair-process"
import { RepairBrands } from "@/components/repair/repair-brands"
import { RepairCTA } from "@/components/repair/repair-cta"

export const metadata = {
  title: "Equipment Repair Services | BeeHive Rental & Sales LLC",
  description:
    "Professional equipment repair and maintenance services for construction, landscaping, and power equipment. Factory-trained technicians serving Southern Utah.",
}

export default function RepairPage() {
  return (
    <div className="min-h-screen bg-background">
      <RepairHeader />
      <RepairServices />
      <RepairProcess />
      <RepairBrands />
      <RepairCTA />
    </div>
  )
}
