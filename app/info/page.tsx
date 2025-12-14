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
  ChevronDown,
  ChevronUp,
  FileText,
  DollarSign,
  Timer,
  Droplets,
  Truck,
  CheckCircle2,
  Download,
  Heart,
  Target,
  Zap,
  Shield,
} from "lucide-react"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"

const companyStats = [
  { label: "Established", value: "1994", icon: Award },
  { label: "Owner", value: "Campbell Family", icon: Users },
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

const teamMembers = [
  {
    id: "jenny-baker",
    name: "Jenny Baker",
    role: "Customer Service & Sales",
    department: "Sales",
    image: "/professional-woman-customer-service.png",
  },
  {
    id: "rickelle-limb",
    name: "Rickelle Limb",
    role: "Equipment Repair Coordinator",
    department: "Service",
    image: "/professional-woman-event-planner-portrait.jpg",
  },
  {
    id: "nicole-souders",
    name: "Nicole Souders",
    role: "Counter",
    department: "Customer Service",
    image: "/professional-woman-landscape-architect-portrait.jpg",
  },
  {
    id: "taunya-somerville",
    name: "Taunya Somerville",
    role: "Counter",
    department: "Customer Service",
    image: "/professional-woman-manager-business-portrait.jpg",
  },
  {
    id: "ben-campbell",
    name: "Ben Campbell",
    role: "Mechanic",
    department: "Service",
    image: "/professional-man-mechanic-technician-portrait.jpg",
  },
  {
    id: "terry-lee",
    name: "Terry Lee",
    role: "Mechanic",
    department: "Service",
    image: "/professional-man-technician-mechanic-portrait.jpg",
  },
  {
    id: "jody-brinkerhoff",
    name: "Jody Brinkerhoff",
    role: "Mechanic",
    department: "Service",
    image: "/professional-headshot-contractor.jpg",
  },
  {
    id: "jeremy-stratman",
    name: "Jeremy Stratman",
    role: "Delivery Driver",
    department: "Operations",
    image: "/professional-contractor-man-portrait.jpg",
  },
  {
    id: "delano-gonzales",
    name: "Delano Gonzales",
    role: "Yard Tech",
    department: "Operations",
    image: "/professional-headshot-construction-worker.jpg",
  },
  {
    id: "hunter-jones",
    name: "Hunter Jones",
    role: "Yard Tech",
    department: "Operations",
    image: "/professional-headshot-man-landscaping.jpg",
  },
  {
    id: "jake-ryan",
    name: "Jake Ryan",
    role: "Yard Tech",
    department: "Operations",
    image: "/friendly-homeowner-man-portrait-casual.jpg",
  },
  {
    id: "terron-meadows",
    name: "Terron Meadows",
    role: "Yard Tech",
    department: "Operations",
    image: "/professional-man-owner-construction-business-portr.jpg",
  },
  {
    id: "julie-campbell",
    name: "Julie Campbell",
    role: "Member",
    department: "Leadership",
    image: "/professional-woman-sales-representative-portrait.jpg",
  },
]

const values = [
  {
    icon: Heart,
    title: "Customer First",
    description: "Every decision we make starts with our customers in mind. Your success is our success.",
    color: "bg-red-500",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We maintain the highest standards in equipment quality, service, and professionalism.",
    color: "bg-blue-500",
  },
  {
    icon: Users,
    title: "Community",
    description: "We're proud to be part of the Southern Utah community and support local businesses.",
    color: "bg-green-500",
  },
  {
    icon: Zap,
    title: "Efficiency",
    description: "We value your time. Fast service, quick turnarounds, and streamlined processes.",
    color: "bg-yellow-500",
  },
  {
    icon: Shield,
    title: "Safety",
    description: "Safety is non-negotiable. We ensure every piece of equipment meets strict safety standards.",
    color: "bg-purple-500",
  },
  {
    icon: Award,
    title: "Integrity",
    description: "Honest pricing, transparent policies, and always doing the right thing.",
    color: "bg-orange-500",
  },
]

const policies = [
  {
    title: "Equipment Rental Policy",
    icon: FileText,
    color: "bg-yellow-500",
    description:
      "Please review the following terms and conditions that apply when renting equipment from our facility. These policies ensure fair and consistent service for all customers.",
  },
  {
    title: "Deposit Requirements",
    icon: DollarSign,
    color: "bg-blue-500",
    description:
      "A deposit is required before any equipment can be leased. This protects both parties and ensures equipment is returned in good condition.",
    details: [
      "Leave an open check with our office",
      "Authorize a hold on a major credit card",
      "Provide a cash deposit equal to 2.5 times the rental amount",
    ],
  },
  {
    title: "Contract Agreement",
    icon: FileText,
    color: "bg-green-500",
    description:
      "Before leaving or loading any equipment, you must sign a rental contract agreeing to our Conditions of Contract. This protects both you and BeeHive Rental & Sales.",
  },
  {
    title: "Rental Timing & Charges",
    icon: Timer,
    color: "bg-purple-500",
    description: "Understanding our rental timing structure helps you plan and budget effectively:",
    details: [
      "Rental time begins when equipment leaves our yard",
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
    title: "Cleaning & Fuel Policy",
    icon: Droplets,
    color: "bg-orange-500",
    description: "Proper equipment care ensures availability for all customers:",
    details: [
      "Equipment must be returned reasonably clean",
      "Excessive dirt/mud incurs cleaning fee (varies by equipment)",
      "All equipment must be returned with full fuel tank",
      "$7 per gallon charge for unreturned fuel",
    ],
  },
  {
    title: "Trailer Rental Requirements",
    icon: Truck,
    color: "bg-red-500",
    description: "Special safety and insurance requirements for trailer rentals:",
    details: [
      "10,000+ lb trailers require ¾-ton truck minimum",
      "Valid insurance verification required",
      "In-state use only (no out-of-state travel)",
      "Proper hitch and brake controller required",
    ],
  },
  {
    title: "Contract Closure",
    icon: CheckCircle2,
    color: "bg-yellow-500",
    description:
      "Rental contracts must be properly closed upon equipment return. Charges continue to accrue until an authorized employee confirms return and closes the contract. Always ensure you receive a receipt.",
  },
]

const tabs = [
  { id: "team", label: "TEAM", icon: Users },
  { id: "values", label: "VALUES", icon: Heart },
  { id: "policies", label: "POLICIES", icon: FileText },
  { id: "contact", label: "CONTACT", icon: Phone },
]

function PolicyAccordion() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {policies.map((policy, index) => {
        const isExpanded = expandedIndex === index
        const Icon = policy.icon

        return (
          <motion.div
            key={policy.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300"
          >
            <button
              onClick={() => setExpandedIndex(isExpanded ? null : index)}
              className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className={`w-10 h-10 rounded-lg ${policy.color} bg-opacity-20 flex items-center justify-center shrink-0`}>
                  <Icon className={`w-5 h-5 ${policy.color.replace('bg-', 'text-')}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-base mb-1">{policy.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{policy.description}</p>
                </div>
              </div>
              <div className="shrink-0 ml-4">
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-white/60" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-white/60" />
                )}
              </div>
            </button>

            <AnimatePresence>
              {isExpanded && policy.details && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4">
                    <div className="pl-13 space-y-2">
                      {policy.details.map((detail, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                          <span className="text-white/80 text-sm">{detail}</span>
                        </div>
                      ))}
                      {policy.note && (
                        <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                          <p className="text-sm text-yellow-400">
                            <span className="font-bold">Note:</span> {policy.note}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}

function InfoPageContent() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("team")
  const [isSticky, setIsSticky] = useState(false)

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
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative min-h-[45vh] flex items-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: `url('/equipment-rental-yard-southern-utah.jpg')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 w-full">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 border border-white/20">
                <Award className="w-4 h-4 text-yellow-500" />
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
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
              {companyStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + 0.1 * index }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-all duration-300"
                  >
                    <Icon className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                    <div className="text-white font-bold text-sm md:text-base mb-1">{stat.value}</div>
                    <div className="text-white/60 text-xs uppercase tracking-wider">{stat.label}</div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Reference Bar - Sticky */}
      <div
        className={`sticky top-20 z-40 transition-all duration-300 ${
          isSticky ? "bg-[#0a0a0a]/95 backdrop-blur-xl shadow-2xl border-b border-white/10" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickReference.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-3 py-2"
                >
                  <Icon className="w-5 h-5 text-yellow-500 shrink-0" />
                  <div>
                    <div className="text-white/60 text-xs">{item.label}</div>
                    <div className="text-white font-semibold text-sm">{item.value}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-[calc(5rem+4rem)] z-30 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-0 pt-4 scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-semibold text-sm uppercase tracking-wide transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20"
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
      <section className="py-12 bg-[#0a0a0a] min-h-[60vh]">
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
                      className="group bg-white/5 rounded-xl border border-white/10 overflow-hidden hover:shadow-xl hover:border-yellow-500/50 transition-all"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Contact on Hover */}
                        <div className="absolute bottom-2 left-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <a
                            href="mailto:beehiverental@infowest.com"
                            className="flex-1 h-7 rounded-lg bg-white/90 flex items-center justify-center hover:bg-yellow-500 transition-colors"
                            aria-label={`Email ${member.name}`}
                          >
                            <Mail className="w-3 h-3" />
                          </a>
                          <a
                            href="tel:+14356286663"
                            className="flex-1 h-7 rounded-lg bg-white/90 flex items-center justify-center hover:bg-yellow-500 transition-colors"
                            aria-label={`Call ${member.name}`}
                          >
                            <Phone className="w-3 h-3" />
                          </a>
                        </div>
                      </div>

                      <div className="p-3">
                        <span className="text-xs font-medium text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded">
                          {member.department}
                        </span>
                        <h3 className="font-semibold text-white mt-2 text-sm">{member.name}</h3>
                        <p className="text-xs text-white/60">{member.role}</p>
                      </div>
                    </motion.div>
                  ))}
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
                        className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-yellow-500/50 hover:shadow-xl transition-all text-center group"
                      >
                        <div
                          className={`w-14 h-14 rounded-xl ${value.color} bg-opacity-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                        >
                          <Icon className={`w-7 h-7 ${value.color.replace("bg-", "text-")}`} />
                        </div>
                        <h3 className="font-semibold text-white text-lg mb-2">{value.title}</h3>
                        <p className="text-white/60 text-sm leading-relaxed">{value.description}</p>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* POLICIES TAB */}
            {activeTab === "policies" && (
              <motion.div
                key="policies"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Policies & Procedures</h2>
                  <p className="text-white/60 mb-6">
                    Click on any section below to expand and read the full details
                  </p>
                  <Button asChild variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                    <a href="#" download>
                      <Download className="w-4 h-4 mr-2" />
                      Download Rental Contract (PDF)
                    </a>
                  </Button>
                </div>

                <div className="max-w-4xl mx-auto">
                  <PolicyAccordion />
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
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Contact Information</h2>
                  <p className="text-white/60">Get in touch with our team</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
                  <motion.a
                    href="tel:+14356286663"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-yellow-500/50 hover:shadow-xl transition-all group text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-500 transition-all">
                      <Phone className="w-8 h-8 text-yellow-500 group-hover:text-black" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-white">Call Us</h3>
                    <p className="text-2xl font-bold text-yellow-500">435-628-6663</p>
                  </motion.a>

                  <motion.a
                    href="https://maps.google.com/?q=1175+Highland+Drive+St+George+UT+84770"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-yellow-500/50 hover:shadow-xl transition-all group text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-500 transition-all">
                      <MapPin className="w-8 h-8 text-yellow-500 group-hover:text-black" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-white">Visit Us</h3>
                    <p className="text-base font-medium text-white/60">
                      1175 Highland Drive
                      <br />
                      St. George, UT 84770
                    </p>
                  </motion.a>

                  <motion.a
                    href="mailto:beehiverental@infowest.com"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-yellow-500/50 hover:shadow-xl transition-all group text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-500 transition-all">
                      <Mail className="w-8 h-8 text-yellow-500 group-hover:text-black" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-white">Email Us</h3>
                    <p className="text-sm font-medium text-white/60 break-all">beehiverental@infowest.com</p>
                  </motion.a>
                </div>

                {/* Business Hours */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-xl p-8 text-center mb-12"
                >
                  <Clock className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="font-semibold text-xl mb-4 text-white">Business Hours</h3>
                  <div className="grid grid-cols-2 gap-6 text-left max-w-md mx-auto">
                    <div>
                      <p className="text-white/60 text-sm mb-1">Monday - Friday</p>
                      <p className="font-semibold text-white">7:00 AM - 5:00 PM</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm mb-1">Saturday</p>
                      <p className="font-semibold text-white">8:00 AM - 12:00 PM</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm mb-1">Sunday</p>
                      <p className="font-semibold text-white">Closed</p>
                    </div>
                  </div>
                </motion.div>

                {/* CTA */}
                <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20 rounded-xl p-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Questions About Our Policies?</h3>
                  <p className="text-lg text-white/60 mb-6">
                    Our friendly team is here to help explain any terms or conditions. Don't hesitate to reach out!
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      asChild
                      size="lg"
                      className="bg-yellow-500 text-black hover:bg-yellow-400 shadow-lg shadow-yellow-500/20"
                    >
                      <a href="tel:+14356286663">
                        <Phone className="w-5 h-5 mr-2" />
                        Call 435-628-6663
                      </a>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                      <a href="mailto:beehiverental@infowest.com">
                        <Mail className="w-5 h-5 mr-2" />
                        Send Email
                      </a>
                    </Button>
                  </div>
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
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
      <InfoPageContent />
    </Suspense>
  )
}
