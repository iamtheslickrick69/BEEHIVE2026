"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white border-t border-white/10">
      {/* Main Footer - Compact Single Row */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Logo + Connect Button - 4 cols */}
          <div className="lg:col-span-4 flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <Image
                src="/beehive-logo-transparent.png"
                alt="BeeHive Rental & Sales"
                width={48}
                height={48}
                className="h-12 w-auto"
              />
              <div className="flex flex-col">
                <span className="font-bold text-white text-lg tracking-wide">BEEHIVE</span>
                <span className="text-[#E8C24A] text-xs tracking-widest uppercase">Rental & Sales</span>
              </div>
            </Link>
            <div className="hidden lg:block w-px h-10 bg-white/20 flex-shrink-0" />
            <Link
              href="/#contact"
              className="hidden lg:flex items-center gap-2 px-5 py-2 bg-[#E8C24A] hover:bg-[#F0D060] text-black font-semibold text-sm rounded-full transition-all flex-shrink-0"
            >
              <Phone className="w-4 h-4" />
              Connect
            </Link>
          </div>

          {/* Quick Links - 4 cols */}
          <nav className="lg:col-span-4 flex items-center justify-center gap-4 text-base">
            <Link href="/inventory" className="text-gray-400 hover:text-[#E8C24A] transition-colors whitespace-nowrap">
              Equipment
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/#rentals" className="text-gray-400 hover:text-[#E8C24A] transition-colors whitespace-nowrap">
              Rentals
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/sales" className="text-gray-400 hover:text-[#E8C24A] transition-colors whitespace-nowrap">
              Sales
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/repair" className="text-gray-400 hover:text-[#E8C24A] transition-colors whitespace-nowrap">
              Repairs
            </Link>
          </nav>

          {/* Contact Info - 4 cols */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start gap-6 text-sm">
            <a
              href="tel:+14356286663"
              className="flex items-center gap-2 text-gray-300 hover:text-[#E8C24A] transition-colors font-medium whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-[#E8C24A] flex-shrink-0" />
              (435) 628-6663
            </a>
            <a
              href="https://maps.google.com/?q=1175+Highland+Drive,+St.+George,+UT"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-[#E8C24A] transition-colors whitespace-nowrap"
            >
              <MapPin className="w-4 h-4 text-[#E8C24A] flex-shrink-0" />
              1175 Highland Dr, St. George, UT
            </a>
            <div className="flex items-center gap-2 text-gray-400 whitespace-nowrap">
              <Clock className="w-4 h-4 text-[#E8C24A] flex-shrink-0" />
              Mon-Fri: 7AM-5PM | Sat: 8AM-12PM
            </div>
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
              href="https://www.facebook.com/people/Beehive-Rental-and-Sales/100063539650394/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#E8C24A] hover:text-black transition-colors border border-white/10"
              aria-label="Follow us on Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/beehiverental/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#E8C24A] hover:text-black transition-colors border border-white/10"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
