import { Lightbulb, Star, Info, AlertCircle, CheckCircle, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ProTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 p-4 bg-primary/10 border-l-4 border-primary rounded-r-lg flex gap-3">
      <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
      <div className="flex-1">
        <div className="font-semibold text-primary mb-1">PRO TIP</div>
        <div className="text-muted-foreground text-sm">{children}</div>
      </div>
    </div>
  )
}

export function KeyTakeaway({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 p-4 bg-[#E8C24A]/10 border-l-4 border-[#E8C24A] rounded-r-lg flex gap-3">
      <Star className="w-5 h-5 text-[#E8C24A] shrink-0 mt-0.5" />
      <div className="flex-1">
        <div className="font-semibold text-[#E8C24A] mb-1">KEY TAKEAWAY</div>
        <div className="text-muted-foreground text-sm">{children}</div>
      </div>
    </div>
  )
}

export function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 p-4 bg-blue-500/10 border-l-4 border-blue-500 rounded-r-lg flex gap-3">
      <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
      <div className="flex-1">
        <div className="font-semibold text-blue-500 mb-1">GOOD TO KNOW</div>
        <div className="text-muted-foreground text-sm">{children}</div>
      </div>
    </div>
  )
}

export function WarningBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 p-4 bg-white/10 border-l-4 border-white rounded-r-lg flex gap-3">
      <AlertCircle className="w-5 h-5 text-white shrink-0 mt-0.5" />
      <div className="flex-1">
        <div className="font-semibold text-white mb-1">IMPORTANT</div>
        <div className="text-muted-foreground text-sm">{children}</div>
      </div>
    </div>
  )
}

export function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="inline-block p-6 bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-xl text-center min-w-[140px] mx-2 my-4">
      <div className="text-4xl font-bold text-primary">{value}</div>
      <div className="text-sm text-muted-foreground mt-1 uppercase tracking-wide">{label}</div>
    </div>
  )
}

export function ContactCTA() {
  return (
    <div className="my-8 p-6 bg-gradient-to-r from-primary/10 to-[#E8C24A]/10 border border-primary/20 rounded-xl">
      <h3 className="text-xl font-semibold text-foreground mb-3">Need Equipment Advice?</h3>
      <p className="text-muted-foreground mb-4">
        BeeHive's team can help you choose the right equipment for your project. 30 years of local expertise.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <a href="tel:+14356286663">
            <Phone className="w-4 h-4 mr-2" />
            Call 435-628-6663
          </a>
        </Button>
        <Button asChild variant="outline">
          <a href="mailto:beehiverental@infowest.com">
            <Mail className="w-4 h-4 mr-2" />
            Email Us
          </a>
        </Button>
        <Button asChild variant="outline">
          <Link href="/inventory">View Equipment</Link>
        </Button>
      </div>
    </div>
  )
}

export function EquipmentCard({ name, image, specs }: { name: string; image: string; specs: string }) {
  return (
    <div className="my-4 p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-all">
      <div className="flex items-center gap-4">
        <img src={image} alt={name} className="w-20 h-20 object-cover rounded-lg" />
        <div className="flex-1">
          <h4 className="font-semibold text-foreground">{name}</h4>
          <p className="text-sm text-muted-foreground">{specs}</p>
        </div>
        <CheckCircle className="w-5 h-5 text-primary shrink-0" />
      </div>
    </div>
  )
}
