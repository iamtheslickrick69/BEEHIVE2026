"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Phone, Mail, Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface SalesInquiryModalProps {
  isOpen: boolean
  onClose: () => void
  equipment: {
    name: string
    price: number
    image: string
  } | null
}

export function SalesInquiryModal({ isOpen, onClose, equipment }: SalesInquiryModalProps) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      onClose()
    }, 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && equipment && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-card rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header with equipment preview */}
            <div className="relative h-32 bg-secondary overflow-hidden">
              <img
                src={equipment.image || "/placeholder.svg"}
                alt={equipment.name}
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-primary text-sm font-medium">Inquiring About</p>
                <h3 className="text-white font-bold truncate">{equipment.name}</h3>
                <p className="text-white/80 font-semibold">${equipment.price.toLocaleString()}</p>
              </div>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6">
              {submitted ? (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-2">Inquiry Sent!</h4>
                  <p className="text-muted-foreground">Our team will contact you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Name</label>
                      <Input placeholder="Your name" required className="bg-muted/50" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                      <Input type="tel" placeholder="(435) 555-0000" required className="bg-muted/50" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                    <Input type="email" placeholder="you@example.com" required className="bg-muted/50" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
                    <Textarea
                      placeholder="I'm interested in this equipment. Is it still available? Can I schedule a viewing?"
                      rows={3}
                      className="bg-muted/50 resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <Button type="submit" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                      <Send className="w-4 h-4 mr-2" />
                      Send Inquiry
                    </Button>
                  </div>

                  <div className="flex items-center justify-center gap-6 pt-2 text-sm text-muted-foreground">
                    <a
                      href="tel:+14355551234"
                      className="flex items-center gap-1.5 hover:text-primary transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      Call Us
                    </a>
                    <a
                      href="mailto:sales@beehiverental.com"
                      className="flex items-center gap-1.5 hover:text-primary transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      Email
                    </a>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
