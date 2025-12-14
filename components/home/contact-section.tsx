"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import Link from "next/link"

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-card relative overflow-hidden">
      {/* Subtle pattern background */}
      <div className="absolute inset-0 starlink-pattern opacity-20" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* CTA Header */}
        <ScrollAnimation>
          <div className="text-center mb-10 md:mb-14">
            <span className="text-primary font-semibold text-sm tracking-widest uppercase">Get Started</span>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-3 md:mb-4 uppercase tracking-tight"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              Ready to Start Your Project?
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Browse our inventory, request a quote, or reach out - our team is ready to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 h-12 rounded-lg uppercase tracking-wide text-sm"
              >
                <Link href="/inventory">
                  Browse Equipment
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-white hover:text-black font-semibold px-8 h-12 bg-transparent rounded-lg uppercase tracking-wide text-sm"
              >
                <a href="tel:+14356286663">
                  <Phone className="mr-2 w-4 h-4" />
                  (435) 628-6663
                </a>
              </Button>
            </div>
          </div>
        </ScrollAnimation>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <ScrollAnimation direction="left">
            <div className="bg-background rounded-xl p-6 md:p-8 border border-border">
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-6 uppercase tracking-wide">
                Send Us a Message
              </h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-7 h-7 text-green-500" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Message Sent!</h4>
                  <p className="text-muted-foreground text-sm">We&apos;ll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="uppercase text-xs tracking-wider text-muted-foreground">
                        Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        required
                        className="bg-input border-border rounded-lg h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="uppercase text-xs tracking-wider text-muted-foreground">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(435) 555-1234"
                        className="bg-input border-border rounded-lg h-11"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="uppercase text-xs tracking-wider text-muted-foreground">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="bg-input border-border rounded-lg h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="uppercase text-xs tracking-wider text-muted-foreground">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project or rental needs..."
                      rows={3}
                      required
                      className="bg-input border-border rounded-lg"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-white text-black hover:bg-gray-100 h-11 rounded-lg font-semibold uppercase tracking-wide text-sm"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </ScrollAnimation>

          {/* Contact Info */}
          <ScrollAnimation direction="right">
            <div className="space-y-4 md:space-y-6">
              {/* Map */}
              <div className="bg-background rounded-xl h-64 md:h-72 lg:h-80 overflow-hidden border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3177.8!2d-113.564!3d37.108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80ca44e70c0b8d2f%3A0x7d3e2c5f6a8b9c0d!2s1175%20Highland%20Dr%2C%20St.%20George%2C%20UT%2084770!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="BeeHive Rental Location"
                />
              </div>

              {/* Contact Cards - 2x2 grid */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <a
                  href="tel:+14356286663"
                  className="bg-background rounded-xl p-4 md:p-5 border border-border hover:border-primary/50 transition-all group"
                >
                  <Phone className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold text-foreground text-sm md:text-base mb-0.5">Phone</h4>
                  <span className="text-muted-foreground text-sm md:text-base">(435) 628-6663</span>
                </a>
                <a
                  href="mailto:beehiverental@infowest.com"
                  className="bg-background rounded-xl p-4 md:p-5 border border-border hover:border-primary/50 transition-all group"
                >
                  <Mail className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold text-foreground text-sm md:text-base mb-0.5">Email</h4>
                  <span className="text-muted-foreground text-xs md:text-sm break-all">beehiverental@infowest.com</span>
                </a>
                <div className="bg-background rounded-xl p-4 md:p-5 border border-border">
                  <MapPin className="w-6 h-6 text-primary mb-2" />
                  <h4 className="font-semibold text-foreground text-sm md:text-base mb-0.5">Address</h4>
                  <p className="text-muted-foreground text-sm md:text-base">
                    1175 Highland Dr
                    <br />
                    St. George, UT
                  </p>
                </div>
                <div className="bg-background rounded-xl p-4 md:p-5 border border-border">
                  <Clock className="w-6 h-6 text-primary mb-2" />
                  <h4 className="font-semibold text-foreground text-sm md:text-base mb-0.5">Hours</h4>
                  <p className="text-muted-foreground text-sm md:text-base">
                    Mon-Fri: 7AM-5PM
                    <br />
                    Sat: 8AM-12PM
                  </p>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
