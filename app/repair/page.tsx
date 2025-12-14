import { RepairHeader } from "@/components/repair/repair-header"
import { RepairServices } from "@/components/repair/repair-services"
import { RepairWhyChoose } from "@/components/repair/repair-why-choose"
import { RepairBrands } from "@/components/repair/repair-brands"
import { RepairTestimonials } from "@/components/repair/repair-testimonials"
import { RepairCTA } from "@/components/repair/repair-cta"

export const metadata = {
  title: "Equipment Repair Services | BeeHive Rental & Sales LLC",
  description:
    "Professional equipment repair and maintenance services for construction, landscaping, and power equipment. Factory-trained technicians serving Southern Utah.",
}

export default function RepairPage() {
  return (
    <div className="min-h-screen bg-black">
      <RepairHeader />
      <RepairWhyChoose />
      <RepairServices />
      <RepairBrands />
      <RepairTestimonials />
      <RepairCTA />
    </div>
  )
}
