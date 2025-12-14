"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Send, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const footerLinks = {
  equipment: [
    { name: "Skid Steers", href: "/inventory?category=skid-steers" },
    { name: "Mini Excavators", href: "/inventory?category=mini-excavators" },
    { name: "Concrete Equipment", href: "/inventory?category=concrete" },
    { name: "Dump Trailers", href: "/inventory?category=dump-trailers" },
    { name: "Landscaping", href: "/inventory?category=landscaping" },
    { name: "Generators & Welders", href: "/inventory?category=generators" },
  ],
  company: [
    { name: "About Us", href: "/#about" },
    { name: "Meet the Team", href: "/info?tab=team" },
    { name: "Training Center", href: "/training" },
    { name: "Repair Services", href: "/repair" },
    { name: "Used Equipment", href: "/sales" },
  ],
  support: [
    { name: "Rental Policies", href: "/#policies" },
    { name: "FAQs", href: "/#faq" },
    { name: "Delivery Info", href: "/#delivery" },
    { name: "Contact Us", href: "/#contact" },
  ],
}

export function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand Column - Spans 4 columns */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center gap-3">
                <Image
                  src="/beehive-logo-transparent.png"
                  alt="BeeHive Rental & Sales"
                  width={50}
                  height={50}
                  className="h-12 w-auto"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-white text-xl tracking-wide">BEEHIVE</span>
                  <span className="text-yellow-500 text-xs tracking-widest uppercase">Rental & Sales</span>
                </div>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Southern Utah's premier equipment rental company since 1994. Your local hometown rental yard with the
              largest selection of equipment.
            </p>

            {/* Contact Info - Clean list */}
            <div className="space-y-3">
              <a
                href="tel:+14356286663"
                className="flex items-center gap-3 text-gray-300 hover:text-yellow-500 transition-colors group"
              >
                <Phone className="w-4 h-4 text-yellow-500" />
                <span>(435) 628-6663</span>
              </a>
              <a
                href="mailto:beehiverental@infowest.com"
                className="flex items-center gap-3 text-gray-300 hover:text-yellow-500 transition-colors"
              >
                <Mail className="w-4 h-4 text-yellow-500" />
                <span>beehiverental@infowest.com</span>
              </a>
              <a
                href="https://maps.google.com/?q=1175+Highland+Drive,+St.+George,+UT"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-yellow-500 transition-colors"
              >
                <MapPin className="w-4 h-4 text-yellow-500" />
                <span>1175 Highland Drive, St. George, UT</span>
              </a>
              <div className="flex items-center gap-3 text-gray-300">
                <Clock className="w-4 h-4 text-yellow-500" />
                <span>Mon-Fri: 7AM-5PM | Sat: 8AM-12PM</span>
              </div>
            </div>
          </div>

          {/* Equipment Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold uppercase tracking-wider text-sm mb-4">Equipment</h4>
            <ul className="space-y-3">
              {footerLinks.equipment.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold uppercase tracking-wider text-sm mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold uppercase tracking-wider text-sm mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter - Spans 2 columns */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold uppercase tracking-wider text-sm mb-4">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">Get the latest on new equipment and special offers.</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-yellow-500/50 transition-colors text-sm"
                required
              />
              <Button
                type="submit"
                className="w-full bg-yellow-500 text-black hover:bg-yellow-400 font-semibold uppercase tracking-wide text-sm"
                disabled={subscribed}
              >
                {subscribed ? (
                  "Subscribed!"
                ) : (
                  <>
                    Subscribe
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Ready to Rent?</h3>
              <p className="text-gray-400">Get a free quote on any equipment in minutes.</p>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-yellow-500 text-black hover:bg-yellow-400 font-semibold uppercase tracking-wide"
            >
              <Link href="/#contact" className="flex items-center gap-2">
                Get a Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} BeeHive Rental & Sales LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-colors border border-white/10"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-colors border border-white/10"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
