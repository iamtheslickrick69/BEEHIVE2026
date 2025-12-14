"use client"

import { motion } from "framer-motion"
import { CreditCard, Calculator, FileText, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

const financingOptions = [
  {
    icon: CreditCard,
    title: "Equipment Financing",
    description: "Low monthly payments with competitive rates. Finance up to 100% of the purchase price.",
  },
  {
    icon: Calculator,
    title: "Lease-to-Own",
    description: "Start using your equipment immediately with flexible lease terms and buyout options.",
  },
  {
    icon: FileText,
    title: "Quick Approval",
    description: "Get pre-approved in minutes. Simple application process with fast funding.",
  },
]

export function SalesFinancing() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Financing Available</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don&apos;t let budget constraints hold you back. We offer flexible financing options to help you get the
            equipment you need.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {financingOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <option.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{option.title}</h3>
              <p className="text-muted-foreground text-sm">{option.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-secondary text-white rounded-2xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Buy?</h3>
          <p className="text-gray-300 mb-6 max-w-xl mx-auto">
            Contact our sales team to schedule a viewing, get more details, or discuss financing options for any of our
            available equipment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Phone className="w-4 h-4 mr-2" />
              Call (435) 555-1234
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
              Request Financing Info
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
