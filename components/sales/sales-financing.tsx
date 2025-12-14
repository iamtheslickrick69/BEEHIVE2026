"use client"

import { CreditCard, Calculator, FileText, Phone } from "lucide-react"
import { motion } from "framer-motion"

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
    <section className="py-20 bg-gradient-to-b from-black via-black/95 to-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Financing Available</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Don&apos;t let budget constraints hold you back. We offer flexible financing options to help you get the
            equipment you need.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {financingOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-[#E8C24A]/50 hover:bg-white/10 transition-all text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: "spring" }}
                className="w-14 h-14 rounded-xl bg-[#E8C24A]/20 flex items-center justify-center mx-auto mb-4"
              >
                <option.icon className="w-7 h-7 text-[#E8C24A]" />
              </motion.div>
              <h3 className="font-semibold text-white mb-2">{option.title}</h3>
              <p className="text-white/60 text-sm">{option.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 text-center border border-white/10"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to Buy?</h3>
          <p className="text-white/60 mb-6 max-w-xl mx-auto">
            Contact our sales team to schedule a viewing, get more details, or discuss financing options for any of our
            available equipment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="tel:+14356286663"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#E8C24A] hover:bg-[#F0D060] text-black font-bold text-lg rounded-full transition-all shadow-lg shadow-[#E8C24A]/30"
            >
              <Phone className="w-5 h-5" />
              Call (435) 628-6663
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-lg rounded-full transition-all border border-white/20"
            >
              Request Financing Info
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
