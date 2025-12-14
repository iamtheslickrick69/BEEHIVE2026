"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Phone,
  Menu,
  X,
  ChevronDown,
  Truck,
  Wrench,
  ShoppingBag,
  Shovel,
  TreeDeciduous,
  Zap,
  Hammer,
  Tractor,
  Container,
  Home,
  Users,
  Building,
  Mail,
  MapPin,
  Clock,
  Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { aiAssistantEvents } from "@/lib/ai-assistant-events"

const equipmentCategories = [
  {
    name: "Skid Steers",
    icon: Tractor,
    href: "/inventory?category=skid-steers",
    description: "Bobcat S450, S250, S62, S64 & more",
  },
  {
    name: "Mini Excavators",
    icon: Shovel,
    href: "/inventory?category=mini-excavators",
    description: "Bobcat E10-E88, Cat 308 CR",
  },
  {
    name: "Concrete & Masonry",
    icon: Container,
    href: "/inventory?category=concrete",
    description: "Mixers, buggies, trowels, grinders",
  },
  {
    name: "Air Compressors",
    icon: Zap,
    href: "/inventory?category=air-compressors",
    description: "AIRMAN 185, Sullair 375 & tools",
  },
  {
    name: "Generators & Welders",
    icon: Zap,
    href: "/inventory?category=generators",
    description: "2.5kW-25kW, 250A-400A welders",
  },
  {
    name: "Dump Trailers",
    icon: Truck,
    href: "/inventory?category=trailers",
    description: "7K, 10K, 14K capacity",
  },
  {
    name: "Landscaping",
    icon: TreeDeciduous,
    href: "/inventory?category=landscaping",
    description: "Tillers, aerators, sod cutters",
  },
  {
    name: "Floor & Carpet",
    icon: Hammer,
    href: "/inventory?category=floor",
    description: "Sanders, buffers, tile saws",
  },
]

const mainNavItems = [
  { name: "HOME", href: "/", hasDropdown: false, sectionId: null },
  { name: "INVENTORY", href: "/inventory", hasMegaMenu: true, sectionId: "equipment" },
  { name: "REPAIR", href: "/repair", icon: Wrench, sectionId: "repair" },
  { name: "SALES", href: "/sales", icon: ShoppingBag, sectionId: "sales" },
  { name: "INFO", href: "/info", icon: Building, sectionId: null },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (item: (typeof mainNavItems)[0]) => {
    // Exact match for home
    if (item.href === "/" && pathname === "/") return true
    // For inventory, check if path starts with /inventory
    if (item.href === "/inventory" && pathname.startsWith("/inventory")) return true
    // For other pages, exact match only (excluding home and inventory)
    if (item.href !== "/" && item.href !== "/inventory") {
      const basePath = item.href.split("?")[0].split("#")[0]
      if (basePath && basePath !== "/" && pathname === basePath) return true
    }
    return false
  }

  const handleNavClick = (sectionId: string | null, href: string) => {
    if (pathname === "/" && sectionId) {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        setIsMobileMenuOpen(false)
        return true
      }
    }
    if (pathname === "/" && href.startsWith("/#")) {
      const id = href.replace("/#", "")
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        setIsMobileMenuOpen(false)
        return true
      }
    }
    return false
  }

  const [isContactOpen, setIsContactOpen] = useState(false)

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
        isScrolled ? "bg-[#0a0a0a]/95 backdrop-blur-xl" : "bg-[#0a0a0a]/90 backdrop-blur-md",
      )}
    >
      {/* Yellow accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4">
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-500 ease-out",
            isScrolled ? "h-20" : "h-28",
          )}
        >
          {/* Logo - Enlarged */}
          <Link href="/" className="flex items-center gap-4 group">
            <Image
              src="/beehive-logo-transparent.png"
              alt="BeeHive Rental & Sales"
              width={96}
              height={96}
              className={cn(
                "w-auto transition-all duration-500 ease-out group-hover:scale-105 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]",
                isScrolled ? "h-14" : "h-20",
              )}
              priority
            />
            <div className="flex flex-col">
              <span className={cn(
                "font-bold text-white tracking-wide transition-all duration-500",
                isScrolled ? "text-lg" : "text-2xl"
              )}>BEEHIVE</span>
              <span className={cn(
                "text-yellow-500 tracking-widest uppercase transition-all duration-500",
                isScrolled ? "text-xs" : "text-sm"
              )}>Rental & Sales</span>
            </div>
          </Link>

          {/* Desktop Nav - Unified Container */}
          <nav className="hidden lg:flex items-center">
            <div className="flex items-center bg-white/5 backdrop-blur-sm rounded-2xl px-2 py-2 border border-white/10 gap-1">
              {/* Nav Items */}
              {mainNavItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => {
                    if (item.hasMegaMenu) setIsMegaMenuOpen(true)
                  }}
                  onMouseLeave={() => {
                    if (item.hasMegaMenu) setIsMegaMenuOpen(false)
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      setIsMegaMenuOpen(false)
                      if (!item.hasMegaMenu && handleNavClick(item.sectionId, item.href)) {
                        e.preventDefault()
                      }
                    }}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-1 hover:scale-105",
                      isActive(item)
                        ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/25"
                        : "text-white hover:bg-white/10",
                    )}
                  >
                    {item.name}
                    {item.hasMegaMenu && (
                      <ChevronDown className={cn("w-3 h-3 transition-transform", isActive(item) ? "text-black" : "text-white/60")} />
                    )}
                  </Link>

                  {/* Mega Menu for Inventory */}
                  {item.hasMegaMenu && (
                    <AnimatePresence>
                      {isMegaMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 w-[700px] bg-[#0a0a0a]/95 backdrop-blur-xl rounded-xl shadow-2xl shadow-black/50 border border-white/10 p-6 mt-2"
                        >
                          <div className="grid grid-cols-2 gap-4">
                            {equipmentCategories.map((cat) => (
                              <Link
                                key={cat.name}
                                href={cat.href}
                                className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/10 transition-colors group/item"
                              >
                                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover/item:bg-yellow-500 group-hover/item:text-black transition-colors">
                                  <cat.icon className="w-5 h-5" />
                                </div>
                                <div>
                                  <span className="font-medium text-white block">{cat.name}</span>
                                  <span className="text-sm text-white/60">{cat.description}</span>
                                </div>
                              </Link>
                            ))}
                          </div>
                          <div className="mt-4 pt-4 border-t border-white/10">
                            <Link
                              href="/inventory"
                              className="text-white hover:text-yellow-500 font-medium text-sm flex items-center gap-2 transition-colors"
                            >
                              <Truck className="w-4 h-4" />
                              View All Equipment
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}

              {/* Divider */}
              <div className="w-px h-6 bg-white/20 mx-1" />

              {/* Contact Info Widget */}
              <div
                className="relative"
                onMouseEnter={() => setIsContactOpen(true)}
                onMouseLeave={() => setIsContactOpen(false)}
              >
                <button
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 hover:scale-105"
                  aria-label="Contact Information"
                >
                  <Info className="w-5 h-5" />
                </button>

                <AnimatePresence>
                  {isContactOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-72 bg-[#0a0a0a]/95 backdrop-blur-xl rounded-xl shadow-2xl shadow-black/50 border border-white/10 p-4"
                    >
                      <div className="space-y-3">
                        <h4 className="text-white font-semibold text-sm border-b border-white/10 pb-2">Contact Us</h4>

                        <a href="tel:+14355551234" className="flex items-center gap-3 text-white/80 hover:text-yellow-500 transition-colors group">
                          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                            <Phone className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs text-white/50 block">Call Us</span>
                            <span className="text-sm font-medium">(435) 555-1234</span>
                          </div>
                        </a>

                        <a href="mailto:info@beehiverental.com" className="flex items-center gap-3 text-white/80 hover:text-yellow-500 transition-colors group">
                          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                            <Mail className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs text-white/50 block">Email</span>
                            <span className="text-sm font-medium">info@beehiverental.com</span>
                          </div>
                        </a>

                        <a href="https://maps.google.com/?q=St+George+Utah" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/80 hover:text-yellow-500 transition-colors group">
                          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs text-white/50 block">Location</span>
                            <span className="text-sm font-medium">St. George, Utah</span>
                          </div>
                        </a>

                        <div className="flex items-center gap-3 text-white/80">
                          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                            <Clock className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs text-white/50 block">Hours</span>
                            <span className="text-sm font-medium">Mon-Fri 7AM-5PM</span>
                            <span className="text-xs text-white/50 block">Sat 8AM-12PM</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* AI Assistant Button */}
              <button
                onClick={() => aiAssistantEvents.emit("Hello! I need help finding equipment.")}
                className="w-10 h-10 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-200 group relative hover:bg-white/10"
                aria-label="Open AI Assistant"
              >
                <svg viewBox="0 0 200 200" className="w-8 h-8">
                  <defs>
                    <linearGradient id="hexGradientHeader" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#e0e0e0', stopOpacity: 1 }} />
                      <stop offset="50%" style={{ stopColor: '#f5f5f5', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#d0d0d0', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="innerGradientHeader" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#4a4a4a', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#2a2a2a', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <polygon
                    points="100,20 170,60 170,140 100,180 30,140 30,60"
                    fill="url(#hexGradientHeader)"
                    stroke="#ffffff"
                    strokeWidth="3"
                    className="group-hover:stroke-yellow-500 transition-colors"
                  />
                  <polygon
                    points="100,45 150,72.5 150,127.5 100,155 50,127.5 50,72.5"
                    fill="url(#innerGradientHeader)"
                  />
                  <text
                    x="100"
                    y="115"
                    fontFamily="Arial, sans-serif"
                    fontSize="60"
                    fontWeight="bold"
                    fill="#ffffff"
                    textAnchor="middle"
                    className="group-hover:fill-yellow-500 transition-colors"
                  >
                    AI
                  </text>
                </svg>
                <span className="absolute top-full mt-2 px-3 py-1.5 bg-[#111] text-white text-xs rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
                  Chat with AI
                </span>
              </button>

              {/* Divider */}
              <div className="w-px h-6 bg-white/20 mx-1" />

              {/* Get Quote Button */}
              <Button
                asChild
                size="lg"
                className="bg-yellow-500 text-black hover:bg-yellow-400 font-semibold uppercase tracking-wide text-sm hover:scale-105 transition-all duration-200 rounded-xl shadow-lg shadow-yellow-500/20"
              >
                <Link href="/#contact">Get Quote</Link>
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2">
              {mainNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    if (handleNavClick(item.sectionId, item.href)) {
                      e.preventDefault()
                    }
                    setIsMobileMenuOpen(false)
                  }}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive(item) ? "bg-yellow-500 text-black" : "text-white hover:bg-white/10",
                  )}
                >
                  {item.icon && <item.icon className="w-5 h-5" />}
                  {!item.icon && item.name === "HOME" && <Home className="w-5 h-5" />}
                  {!item.icon && item.name === "INVENTORY" && <Truck className="w-5 h-5" />}
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}

              <div className="pt-4 border-t border-white/10 mt-4">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    aiAssistantEvents.emit("Hello! I need help finding equipment.")
                  }}
                  className="flex items-center gap-3 px-4 py-3 text-white hover:text-yellow-500 transition-colors w-full group"
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <defs>
                        <linearGradient id="hexGradientMobile" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{ stopColor: '#e0e0e0', stopOpacity: 1 }} />
                          <stop offset="50%" style={{ stopColor: '#f5f5f5', stopOpacity: 1 }} />
                          <stop offset="100%" style={{ stopColor: '#d0d0d0', stopOpacity: 1 }} />
                        </linearGradient>
                        <linearGradient id="innerGradientMobile" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{ stopColor: '#4a4a4a', stopOpacity: 1 }} />
                          <stop offset="100%" style={{ stopColor: '#2a2a2a', stopOpacity: 1 }} />
                        </linearGradient>
                      </defs>
                      <polygon
                        points="100,20 170,60 170,140 100,180 30,140 30,60"
                        fill="url(#hexGradientMobile)"
                        stroke="#ffffff"
                        strokeWidth="3"
                        className="group-hover:stroke-yellow-500 transition-colors"
                      />
                      <polygon
                        points="100,45 150,72.5 150,127.5 100,155 50,127.5 50,72.5"
                        fill="url(#innerGradientMobile)"
                      />
                      <text
                        x="100"
                        y="115"
                        fontFamily="Arial, sans-serif"
                        fontSize="60"
                        fontWeight="bold"
                        fill="#ffffff"
                        textAnchor="middle"
                        className="group-hover:fill-yellow-500 transition-colors"
                      >
                        AI
                      </text>
                    </svg>
                  </div>
                  <span className="font-medium">Chat with AI</span>
                </button>
              </div>

              <div className="pt-4">
                <Button
                  asChild
                  className="w-full bg-yellow-500 text-black hover:bg-yellow-400 font-semibold uppercase tracking-wide"
                >
                  <Link href="/#contact">Get Quote</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
