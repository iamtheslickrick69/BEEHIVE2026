import { SalesHeader } from "@/components/sales/sales-header"
import { PartnerLogos } from "@/components/sales/partner-logos"
import { SalesGrid } from "@/components/sales/sales-grid"
import { SalesWarranty } from "@/components/sales/sales-warranty"
import { SalesFinancing } from "@/components/sales/sales-financing"

export const metadata = {
  title: "New & Used Equipment For Sale | BeeHive Rental & Sales LLC",
  description:
    "Shop quality new and used construction and landscaping equipment. Inspected, serviced, and ready to work. Financing available.",
}

export default function SalesPage() {
  return (
    <div className="min-h-screen bg-black">
      <SalesHeader />
      <PartnerLogos />
      <SalesGrid />
      <SalesWarranty />
      <SalesFinancing />
    </div>
  )
}
