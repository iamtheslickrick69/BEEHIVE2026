"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Users,
  Building2,
  Award,
  FileText,
  DollarSign,
  Timer,
  Droplets,
  Truck,
  CheckCircle2,
  Heart,
  Target,
  Zap,
  Shield,
  Compass,
} from "lucide-react"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"

const companyStats = [
  { label: "Family Owned", value: "Since 1994", icon: Users },
  { label: "Employees", value: "14+ Team Members", icon: Building2 },
  { label: "Location", value: "St. George, Utah", icon: MapPin },
  { label: "Service Area", value: "Southern Utah", icon: Truck },
]

const quickReference = [
  { label: "Half-Day", value: "4 Hours", icon: Timer },
  { label: "Full-Day", value: "24 Hours", icon: Clock },
  { label: "Fuel Charge", value: "$7/gallon", icon: Droplets },
  { label: "Cash Deposit", value: "2.5x Rental", icon: DollarSign },
]

const serviceTerms = [
  {
    id: "deposit",
    title: "Deposit Requirements",
    icon: DollarSign,
    description: "A deposit is required before any equipment can be leased. Choose from the following options:",
    details: [
      "Leave an open check with our office",
      "Authorize a hold on a major credit card",
      "Provide a cash deposit equal to 2.5 times the rental amount",
    ],
  },
  {
    id: "timing",
    title: "Rental Timing & Charges",
    icon: Timer,
    description: "Understanding rental timing helps you plan and budget effectively:",
    details: [
      "Rental time begins when equipment leaves the yard",
      "Minimum rental times vary: 2 hours to full day depending on equipment",
      "Half-day rental = 4 hours from pickup time",
      "Full-day rental = 24 hours with max 8 hours on meter",
      "Additional meter hours billed at hourly rate",
      "Overnight rentals minimum half-day charge",
      "Weekend special: Saturday to Monday 8AM = 1 day (if ≤8 hours use)",
    ],
    note: "Time is charged based on rental duration, not actual usage hours",
  },
  {
    id: "contract",
    title: "Contract Agreement",
    icon: FileText,
    description: "Before leaving or loading any equipment, you must sign a rental contract agreeing to our Conditions of Contract. This protects both you and BeeHive Rental & Sales.",
  },
  {
    id: "cleaning",
    title: "Cleaning & Fuel Policy",
    icon: Droplets,
    description: "Proper equipment care ensures availability for all customers:",
    details: [
      "Equipment must be returned reasonably clean (free from excessive dirt or mud)",
      "Cleaning fee will be applied for excessively dirty equipment (varies by size)",
      "All equipment must be returned with full fuel tank",
      "$7 per gallon charge for unreturned fuel",
    ],
  },
  {
    id: "trailer",
    title: "Trailer Rental Policy",
    icon: Truck,
    description: "Special safety and insurance requirements for trailer rentals:",
    details: [
      "10,000+ lb trailers require ¾-ton truck minimum",
      "Valid insurance verification required",
      "In-state use only (no out-of-state travel)",
      "Proper hitch and brake controller required",
    ],
  },
  {
    id: "closure",
    title: "Contract Closure",
    icon: CheckCircle2,
    description: "Rental contracts must be properly closed upon equipment return. Charges continue to accrue until an authorized employee confirms return and closes the contract. Always ensure you receive a receipt.",
  },
]

const departmentColors: Record<string, string> = {
  Leadership: "text-purple-500 bg-purple-500/10",
  Sales: "text-blue-500 bg-blue-500/10",
  "Customer Service": "text-green-500 bg-green-500/10",
  Service: "text-red-500 bg-red-500/10",
  Operations: "text-[#E8C24A] bg-[#E8C24A]/10",
}

const teamMembers = [
  {
    id: "julie-campbell",
    name: "Julie Campbell",
    role: "Member",
    department: "Leadership",
    image: "/team-juliecampbell.jpg",
  },
  {
    id: "jenny-baker",
    name: "Jenny Baker",
    role: "Customer Service & Sales",
    department: "Sales",
    image: "/team-jennybaker.jpg",
  },
  {
    id: "nicole-souders",
    name: "Nicole Souders",
    role: "Counter",
    department: "Customer Service",
    image: "/team-nicolesouders.jpg",
  },
  {
    id: "taunya-somerville",
    name: "Taunya Somerville",
    role: "Counter",
    department: "Customer Service",
    image: "/team-taunyasomerville.jpg",
  },
  {
    id: "rickelle-limb",
    name: "Rickelle Limb",
    role: "Equipment Repair Coordinator",
    department: "Service",
    image: "/team-rickellelimb.jpg",
  },
  {
    id: "ben-campbell",
    name: "Ben Campbell",
    role: "Mechanic",
    department: "Service",
    image: "/team-bencampbell.jpg",
  },
  {
    id: "terry-lee",
    name: "Terry Lee",
    role: "Mechanic",
    department: "Service",
    image: "/team-terrylee.jpg",
  },
  {
    id: "jody-brinkerhoff",
    name: "Jody Brinkerhoff",
    role: "Mechanic",
    department: "Service",
    image: "/team-jodybrinkerhoff.jpg",
  },
  {
    id: "jeremy-stratman",
    name: "Jeremy Stratman",
    role: "Delivery Driver",
    department: "Operations",
    image: "/team-jeremystratman.jpg",
  },
  {
    id: "delano-gonzales",
    name: "Delano Gonzales",
    role: "Yard Tech",
    department: "Operations",
    image: "/team-delanogonzales.jpg",
  },
  {
    id: "hunter-jones",
    name: "Hunter Jones",
    role: "Yard Tech",
    department: "Operations",
    image: "/team-hunterjones.jpg",
  },
  {
    id: "jake-ryan",
    name: "Jake Ryan",
    role: "Yard Tech",
    department: "Operations",
    image: "/team-jakeryan.jpg",
  },
  {
    id: "terron-meadows",
    name: "Terron Meadows",
    role: "Yard Tech",
    department: "Operations",
    image: "/team-terronmeadows.jpg",
  },
  {
    id: "brayden-jensen",
    name: "Brayden Jensen",
    role: "Yard Tech",
    department: "Operations",
    image: "/team-braydenjensen.jpg",
  },
]

const values = [
  {
    icon: Heart,
    title: "Customer First",
    description: "Every decision we make starts with our customers in mind. Your success is our success.",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We maintain the highest standards in equipment quality, service, and professionalism.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We're proud to be part of the Southern Utah community and support local businesses.",
  },
  {
    icon: Zap,
    title: "Efficiency",
    description: "We value your time. Fast service, quick turnarounds, and streamlined processes.",
  },
  {
    icon: Shield,
    title: "Safety",
    description: "Safety is non-negotiable. We ensure every piece of equipment meets strict safety standards.",
  },
  {
    icon: Award,
    title: "Integrity",
    description: "Honest pricing, transparent policies, and always doing the right thing.",
  },
]

const tabs = [
  { id: "team", label: "TEAM", icon: Users },
  { id: "values", label: "VALUES", icon: Compass },
  { id: "contact", label: "CONTACT", icon: Phone },
]

function InfoPageContent() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("team")
  const [isSticky, setIsSticky] = useState(false)
  const [expandedPolicy, setExpandedPolicy] = useState<string | null>(null)

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab && tabs.some((t) => t.id === tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-[45vh] flex items-center overflow-hidden bg-black pt-20">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{
              backgroundImage: `url('/company-info-hero.jpg')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 w-full">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium mb-6 border border-white/30 shadow-lg shadow-[#E8C24A]/20">
                <Award className="w-4 h-4 text-[#E8C24A]" />
                SERVING SINCE 1994
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-tight"
            >
              Company Information
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed"
            >
              Everything you need to know about BeeHive. Meet our team, learn our values, and review our policies.
            </motion.p>

            {/* Company Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
              {companyStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + 0.1 * index }}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 md:p-3 hover:bg-white/10 hover:border-[#E8C24A]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#E8C24A]/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E8C24A] focus:ring-offset-2 focus:ring-offset-black"
                    tabIndex={0}
                  >
                    <Icon className="w-7 h-7 md:w-6 md:h-6 text-[#E8C24A] mx-auto mb-2" />
                    <div className="text-white font-bold text-base md:text-base mb-1">{stat.value}</div>
                    <div className="text-white/60 text-xs uppercase tracking-wider">{stat.label}</div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Service Terms & Policies Section */}
      <section className="py-16 bg-gradient-to-b from-black via-zinc-900 to-black border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 uppercase tracking-tight">
              Service Terms & Policies
            </h2>
            <p className="text-white/60 text-lg">Click any category below to view full details</p>
          </motion.div>

          {/* Policy Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {serviceTerms.map((policy, index) => {
              const Icon = policy.icon
              const isExpanded = expandedPolicy === policy.id

              return (
                <motion.button
                  key={policy.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setExpandedPolicy(isExpanded ? null : policy.id)}
                  className={`bg-white/5 backdrop-blur-sm border rounded-2xl p-6 text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E8C24A] focus:ring-offset-2 focus:ring-offset-zinc-900 ${
                    isExpanded
                      ? "border-[#E8C24A]/50 bg-white/10 shadow-lg shadow-[#E8C24A]/20"
                      : "border-white/10 hover:border-[#E8C24A]/50 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      animate={{ rotate: isExpanded ? 360 : 0 }}
                      transition={{ duration: 0.5, type: "spring" }}
                      className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center shrink-0"
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-lg mb-1">{policy.title}</h3>
                      <p className="text-white/50 text-sm">
                        {isExpanded ? "Click to collapse" : "Click to expand"}
                      </p>
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* Expanded Policy Details */}
          <AnimatePresence mode="wait">
            {expandedPolicy && (
              <motion.div
                key={expandedPolicy}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-xl">
                  {serviceTerms
                    .filter((p) => p.id === expandedPolicy)
                    .map((policy) => {
                      const Icon = policy.icon
                      return (
                        <div key={policy.id}>
                          {/* Title */}
                          <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center">
                              <Icon className="w-8 h-8 text-white" />
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-white">{policy.title}</h3>
                              <p className="text-white/70 mt-1">{policy.description}</p>
                            </div>
                          </div>

                          {/* Details List */}
                          {policy.details && policy.details.length > 0 && (
                            <div className="space-y-3 mb-6">
                              {policy.details.map((detail, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.05 }}
                                  className="flex items-start gap-3"
                                >
                                  <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                                  <span className="text-white/80 text-base">{detail}</span>
                                </motion.div>
                              ))}
                            </div>
                          )}

                          {/* Note */}
                          {policy.note && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                              className="p-4 bg-white/5 border border-white/10 rounded-xl"
                            >
                              <p className="text-white/90 text-sm">
                                <span className="font-bold">Important Note:</span> {policy.note}
                              </p>
                            </motion.div>
                          )}
                        </div>
                      )
                    })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Quick Reference Bar - Sticky on desktop only */}
      <div
        className={`md:sticky md:top-20 z-40 transition-all duration-300 ${
          isSticky ? "bg-black/95 backdrop-blur-xl shadow-2xl border-b border-white/10" : "bg-black"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickReference.map((item) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl px-5 py-4 hover:border-[#E8C24A] hover:shadow-lg hover:shadow-[#E8C24A]/20 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E8C24A] focus:ring-offset-2 focus:ring-offset-black"
                  tabIndex={0}
                >
                  <Icon className="w-7 h-7 text-[#E8C24A] shrink-0" />
                  <div>
                    <div className="text-black/60 text-sm">{item.label}</div>
                    <div className="text-black font-bold text-base">{item.value}</div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>


      {/* Tab Navigation */}
      <div className="md:sticky md:top-20 z-30 bg-black/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 justify-center overflow-x-auto pb-0 pt-4 scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-semibold text-sm uppercase tracking-wide transition-all duration-300 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#E8C24A] focus:ring-offset-2 focus:ring-offset-black ${
                    isActive
                      ? "bg-[#E8C24A] text-black shadow-lg shadow-[#E8C24A]/20"
                      : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10 border-b-0"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <section className="py-12 bg-black min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatePresence mode="wait">
            {/* TEAM TAB */}
            {activeTab === "team" && (
              <motion.div
                key="team"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Meet the Team</h2>
                  <p className="text-white/60">The dedicated professionals behind BeeHive Rental & Sales</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {teamMembers.map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      whileHover={{ scale: 1.03, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-[#E8C24A]/10 hover:border-[#E8C24A]/30 transition-all cursor-pointer"
                    >
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      </div>

                      <div className="p-3">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded ${departmentColors[member.department] || "text-gray-500 bg-gray-500/10"}`}>
                          {member.department}
                        </span>
                        <h3 className="font-semibold text-white mt-2 text-sm">{member.name}</h3>
                        <p className="text-xs text-white/60">{member.role}</p>
                      </div>
                    </motion.div>
                  ))}

                  {/* Join the Team Card */}
                  <motion.a
                    href="tel:+14356286663"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: teamMembers.length * 0.03 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-[#E8C24A]/10 hover:border-[#E8C24A]/30 transition-all cursor-pointer flex flex-col items-center justify-center h-full min-h-[320px]"
                  >
                    <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-[#E8C24A]/20 to-[#E8C24A]/10 flex items-center justify-center">
                      <Users className="w-20 h-20 text-[#E8C24A]/40" />
                    </div>

                    <div className="p-3 text-center flex-1 flex flex-col justify-center">
                      <h3 className="font-semibold text-white text-sm mb-2">Join the BeeHive Family</h3>
                      <p className="text-xs text-white/60">We're always looking for great people</p>
                    </div>
                  </motion.a>
                </div>
              </motion.div>
            )}

            {/* VALUES TAB */}
            {activeTab === "values" && (
              <motion.div
                key="values"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Our Values</h2>
                  <p className="text-white/60">The principles that guide everything we do at BeeHive Rental</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {values.map((value, index) => {
                    const Icon = value.icon
                    return (
                      <motion.div
                        key={value.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-[#E8C24A]/50 hover:shadow-xl hover:shadow-[#E8C24A]/20 transition-all text-center group cursor-pointer"
                      >
                        <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="font-semibold text-white text-lg mb-2">{value.title}</h3>
                        <p className="text-white/60 text-sm leading-relaxed">{value.description}</p>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* CONTACT TAB */}
            {activeTab === "contact" && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-5xl mx-auto"
              >
                {/* Google Maps Embed */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8 rounded-2xl overflow-hidden border border-white/10 shadow-xl"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3181.8896753745825!2d-113.59363892345689!3d37.11631104450562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80ca447c6b3d0c91%3A0x9f7b5e5e5e5e5e5e!2s1175%20Highland%20Dr%2C%20St.%20George%2C%20UT%2084770!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                    width="100%"
                    height="300"
                    className="md:h-[400px]"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="BeeHive Rental & Sales Location"
                  ></iframe>
                </motion.div>

                {/* Contact Info Cards Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Phone Card */}
                  <motion.a
                    href="tel:+14356286663"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-[#E8C24A]/50 hover:shadow-xl hover:shadow-[#E8C24A]/20 transition-all group focus:outline-none focus:ring-2 focus:ring-[#E8C24A] focus:ring-offset-2 focus:ring-offset-black"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-[#E8C24A]/20 flex items-center justify-center shrink-0 group-hover:bg-[#E8C24A] transition-all">
                        <Phone className="w-7 h-7 text-[#E8C24A] group-hover:text-black" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-lg mb-1">Phone</h3>
                        <p className="text-[#E8C24A] font-semibold text-xl">(435) 628-6663</p>
                      </div>
                    </div>
                  </motion.a>

                  {/* Email Card */}
                  <motion.a
                    href="mailto:beehiverental@infowest.com"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-[#E8C24A]/50 hover:shadow-xl hover:shadow-[#E8C24A]/20 transition-all group focus:outline-none focus:ring-2 focus:ring-[#E8C24A] focus:ring-offset-2 focus:ring-offset-black"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-[#E8C24A]/20 flex items-center justify-center shrink-0 group-hover:bg-[#E8C24A] transition-all">
                        <Mail className="w-7 h-7 text-[#E8C24A] group-hover:text-black" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-lg mb-1">Email</h3>
                        <p className="text-white/70 font-medium break-all">beehiverental@infowest.com</p>
                      </div>
                    </div>
                  </motion.a>

                  {/* Address Card */}
                  <motion.a
                    href="https://maps.google.com/?q=1175+Highland+Dr+St+George+UT+84770"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-[#E8C24A]/50 hover:shadow-xl hover:shadow-[#E8C24A]/20 transition-all group focus:outline-none focus:ring-2 focus:ring-[#E8C24A] focus:ring-offset-2 focus:ring-offset-black"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-[#E8C24A]/20 flex items-center justify-center shrink-0 group-hover:bg-[#E8C24A] transition-all">
                        <MapPin className="w-7 h-7 text-[#E8C24A] group-hover:text-black" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-lg mb-1">Address</h3>
                        <p className="text-white/70 font-medium">
                          1175 Highland Dr
                          <br />
                          St. George, UT
                        </p>
                      </div>
                    </div>
                  </motion.a>

                  {/* Hours Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-[#E8C24A]/20 flex items-center justify-center shrink-0">
                        <Clock className="w-7 h-7 text-[#E8C24A]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-lg mb-3">Hours</h3>
                        <div className="space-y-2">
                          <div>
                            <p className="text-white/70 font-medium">Mon-Fri: 7AM-5PM</p>
                          </div>
                          <div>
                            <p className="text-white/70 font-medium">Sat: 8AM-12PM</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}

export default function InfoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
      <InfoPageContent />
    </Suspense>
  )
}
