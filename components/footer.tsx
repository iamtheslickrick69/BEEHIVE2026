"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, ArrowRight } from "lucide-react"
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
    { name: "Repair Services", href: "/repair" },
    { name: "Used Equipment", href: "/sales" },
  ],
  support: [
    { name: "Equipment Guides", href: "/blog/guides" },
    { name: "Equipment Catalog", href: "/inventory" },
    { name: "Repair Services", href: "/repair" },
    { name: "Contact Us", href: "/#contact" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-12">
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
                  <span className="text-[#E8C24A] text-xs tracking-widest uppercase">Rental & Sales</span>
                </div>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Southern Utah's premier equipment rental company. Your local hometown rental yard with the
              largest selection of equipment.
            </p>

            {/* Trust Signals */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1.5 bg-[#E8C24A]/10 border border-[#E8C24A]/20 rounded-full text-[#E8C24A] text-xs font-semibold uppercase tracking-wide">
                Since 1994
              </span>
              <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white text-xs font-semibold uppercase tracking-wide">
                Family Owned
              </span>
              <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white text-xs font-semibold uppercase tracking-wide">
                30+ Years
              </span>
            </div>

            {/* Contact Info - Clean list */}
            <div className="space-y-3">
              <a
                href="tel:+14356286663"
                className="flex items-center gap-3 text-gray-300 hover:text-[#E8C24A] transition-colors group"
              >
                <Phone className="w-4 h-4 text-[#E8C24A]" />
                <span>(435) 628-6663</span>
              </a>
              <a
                href="mailto:beehiverental@infowest.com"
                className="flex items-center gap-3 text-gray-300 hover:text-[#E8C24A] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#E8C24A]" />
                <span>beehiverental@infowest.com</span>
              </a>
              <a
                href="https://maps.google.com/?q=1175+Highland+Drive,+St.+George,+UT"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-[#E8C24A] transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#E8C24A]" />
                <span>1175 Highland Drive, St. George, UT</span>
              </a>
              <div className="flex items-center gap-3 text-gray-300">
                <Clock className="w-4 h-4 text-[#E8C24A]" />
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
                  <Link href={link.href} className="text-gray-400 hover:text-[#E8C24A] transition-colors text-sm">
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
                  <Link href={link.href} className="text-gray-400 hover:text-[#E8C24A] transition-colors text-sm">
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
                  <Link href={link.href} className="text-gray-400 hover:text-[#E8C24A] transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Quick Stats */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-[#E8C24A] mb-2">30+</div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">Years in Business</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#E8C24A] mb-2">100+</div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">Equipment Items</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#E8C24A] mb-2">Family</div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">Owned & Operated</div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#E8C24A]/10 to-[#E8C24A]/5 border border-[#E8C24A]/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Ready to Start Your Project?</h3>
              <p className="text-gray-400">Get a free quote on any equipment in minutes.</p>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-[#E8C24A] text-black hover:bg-[#E8C24A]/90 font-semibold uppercase tracking-wide"
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
            {/* TODO: Update with actual BeeHive social media URLs */}
            <a
              href="https://www.facebook.com/people/Beehive-Rental-and-Sales/100063539650394/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#E8C24A] hover:text-black transition-colors border border-white/10"
              aria-label="Follow us on Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/beehiverental/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#E8C24A] hover:text-black transition-colors border border-white/10"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
