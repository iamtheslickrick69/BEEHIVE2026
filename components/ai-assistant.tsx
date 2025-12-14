"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Bot, User, Phone, Calendar, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { aiAssistantEvents } from "@/lib/ai-assistant-events"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  actions?: { label: string; href: string }[]
}

interface Size {
  width: number
  height: number
}

// ============================================================================
// CONVERSATION CONTEXT - Session Memory
// ============================================================================

interface ConversationContext {
  userName: string | null
  projectType: string | null
  equipmentDiscussed: string[]
  lastTopic: string | null
  questionsAsked: string[]
  turnCount: number
  hasGreeted: boolean
  waitingForResponse: string | null // What are we waiting for the user to answer?
  userIntent: string | null // What does the user seem to want overall?
}

const MIN_WIDTH = 320
const MIN_HEIGHT = 400
const MAX_WIDTH_RATIO = 0.9
const MAX_HEIGHT_RATIO = 0.9

const quickReplies = [
  "What equipment do you have?",
  "What are your rates?",
  "Do you deliver?",
  "Hours & location?",
  "Repair services",
]

// ============================================================================
// BEEBOT KNOWLEDGE BASE - Comprehensive Data
// ============================================================================

const COMPANY_INFO = {
  name: "BeeHive Rental & Sales LLC",
  address: "1175 Highland Dr, St. George, UT 84770",
  phone: "(435) 628-6663",
  email: "beehiverental@infowest.com",
  founded: "1994",
  yearsExperience: "30+",
  serviceArea: "Southern Utah - St. George, Washington, Hurricane, Ivins, Santa Clara, and surrounding areas",
  hours: {
    weekdays: "Monday - Friday: 7:00 AM - 5:00 PM",
    saturday: "Saturday: 8:00 AM - 12:00 PM",
    sunday: "Sunday: Closed"
  }
}

const RENTAL_POLICIES = {
  halfDay: "4 hours from pickup time",
  fullDay: "24 hours (max 8 hours on meter)",
  weekendSpecial: "Saturday to Monday 8AM = 1 day (if ≤8 hours use)",
  fuelCharge: "$7 per gallon for unreturned fuel",
  deposit: "2.5x rental amount (cash) or credit card hold",
  cleaning: "Equipment must be returned reasonably clean"
}

const EQUIPMENT_CATEGORIES = [
  { name: "Heavy Equipment", items: ["Skid Steers (Bobcat S70, S76)", "Mini Excavators (Cat 308 CR)", "Backhoes", "Trenchers"] },
  { name: "Concrete & Compaction", items: ["Plate Compactors", "Jumping Jacks/Rammers", "Power Trowels", "Concrete Mixers", "Concrete Buggies", "Vibratory Rollers"] },
  { name: "Trailers", items: ["7K Dump Trailer", "10K Dump Trailer", "14K Dump Trailer", "Water Trailers"] },
  { name: "Power Tools", items: ["Air Compressors (185-375 CFM)", "Jackhammers", "Chipping Hammers", "Nail Guns", "Cut-off Saws"] },
  { name: "Generators & Welders", items: ["2.5kW - 25kW Generators", "Miller Welders", "Oxy-Acetylene Torches"] },
  { name: "Floor & Carpet", items: ["Floor Sanders", "Floor Strippers", "Tile Saws", "Floor Buffers", "Carpet Stretchers"] },
  { name: "Landscaping", items: ["Lawn Mowers", "Aerators", "Rototillers", "Stump Grinders", "Brush Cutters"] },
  { name: "General Tools", items: ["Scaffolding", "Ladders", "Scissor Lifts", "Pumps", "Pallet Jacks"] }
]

const SAMPLE_RATES = [
  { item: "Bobcat S70 Skid Steer", daily: "$295", weekly: "$1,180" },
  { item: "Cat 308 CR Excavator", daily: "$395", weekly: "$1,580" },
  { item: "Plate Compactor", daily: "$65-75", weekly: "$260-300" },
  { item: "Jumping Jack Rammer", daily: "$95-105", weekly: "$380-420" },
  { item: "Air Compressor (185 CFM)", daily: "Call", weekly: "Call" },
  { item: "Husqvarna Cut-off Saw", daily: "Call", weekly: "Call" }
]

const REPAIR_SERVICES = {
  types: ["General Repairs", "Preventive Maintenance", "Electrical Systems", "Hydraulic Service", "Engine Service", "Safety Inspections"],
  benefits: ["Factory-Trained Technicians", "90-Day Parts & Labor Warranty", "Same-Day Service Available", "Free Diagnostics", "30+ Years Experience"],
  brands: ["Ditch Witch", "Craftsman", "Makita", "Briggs & Stratton", "Tecumseh", "Echo", "Little Wonder", "Toro", "Kohler", "Wacker", "Bobcat", "Bosch", "Honda", "Troy-Bilt", "John Deere"],
  equipmentTypes: {
    homeowner: ["Lawn Mowers", "Leaf Blowers", "Generators", "Aerators", "Rototillers"],
    contractor: ["Concrete Buggies", "Air Compressors", "Lifts", "Cement Mixers", "Cut-off Saws"],
    landscape: ["Backhoes", "Skid Steers", "Excavators", "Trenchers", "Pressure Washers"],
    flooring: ["Floor Sanders", "Tile Strippers", "Tile Saws", "Floor Buffers"]
  }
}

const SALES_INFO = {
  newItems: ["Husqvarna Cut-off Saws ($1,150-1,600)", "Bosch Roto Hammers ($1,130)", "MQ Plate Compactors ($2,150-2,400)", "Water Trailers ($9,700)"],
  usedItems: ["Generators", "Mowers", "Saws", "Tools", "Storage Equipment"],
  note: "Inventory changes frequently - call for current availability and pricing"
}

// ============================================================================
// GUARDRAILS - Blocked Topics & Off-Topic Detection
// ============================================================================

const BLOCKED_PATTERNS = [
  // Inappropriate content
  /\b(sex|porn|xxx|nude|naked|drugs|weed|cocaine|meth)\b/i,
  // Violence
  /\b(kill|murder|bomb|terrorist|weapon|gun|shoot)\b/i,
  // Personal attacks
  /\b(stupid|idiot|dumb|hate you|f\*ck|shit|damn)\b/i,
  // Competitor fishing
  /\b(sunbelt|united rentals|home depot rental|lowes rental)\b/i,
  // Personal info requests
  /\b(social security|credit card number|bank account|password)\b/i,
]

const OFF_TOPIC_PATTERNS = [
  /\b(weather|sports|politics|election|president|movie|celebrity|recipe|cooking|dating|relationship)\b/i,
  /\b(stock market|crypto|bitcoin|investment advice)\b/i,
  /\b(medical advice|health condition|doctor|prescription)\b/i,
  /\b(legal advice|lawyer|lawsuit)\b/i,
]

// Keywords that indicate BeeHive-relevant topics
const RELEVANT_KEYWORDS = [
  "equipment", "rental", "rent", "tool", "machine", "excavator", "skid", "bobcat", "concrete",
  "compactor", "trailer", "dump", "generator", "welder", "saw", "drill", "hammer", "floor",
  "carpet", "sander", "repair", "fix", "service", "maintenance", "price", "rate", "cost",
  "delivery", "deliver", "pickup", "hours", "open", "location", "address", "contact",
  "project", "construction", "landscaping", "building", "dig", "trench", "pour", "pave",
  "sales", "buy", "purchase", "used", "new", "available", "inventory", "beehive", "beebot"
]

// Initial conversation context
const INITIAL_CONTEXT: ConversationContext = {
  userName: null,
  projectType: null,
  equipmentDiscussed: [],
  lastTopic: null,
  questionsAsked: [],
  turnCount: 0,
  hasGreeted: false,
  waitingForResponse: null,
  userIntent: null,
}

// ============================================================================
// CONVERSATION ANALYSIS HELPERS
// ============================================================================

function extractName(text: string): string | null {
  // Check for "I'm [name]" or "my name is [name]" patterns
  const namePatterns = [
    /(?:i'm|i am|my name is|this is|call me)\s+([A-Z][a-z]+)/i,
    /^([A-Z][a-z]+)\s+here/i,
  ]

  for (const pattern of namePatterns) {
    const match = text.match(pattern)
    if (match) return match[1]
  }
  return null
}

function extractProjectType(text: string): string | null {
  const lower = text.toLowerCase()

  if (/\b(landscap|yard|lawn|garden|outdoor|backyard)\b/.test(lower)) return "landscaping"
  if (/\b(concrete|pour|slab|sidewalk|driveway|patio|foundation)\b/.test(lower)) return "concrete"
  if (/\b(dig|excavat|trench|hole|basement|underground|utilities)\b/.test(lower)) return "excavation"
  if (/\b(floor|flooring|tile|carpet|hardwood|refinish|sand)\b/.test(lower)) return "flooring"
  if (/\b(demo|demolition|tear down|break|remove|gut)\b/.test(lower)) return "demolition"
  if (/\b(fence|post|fencing)\b/.test(lower)) return "fencing"
  if (/\b(roof|roofing)\b/.test(lower)) return "roofing"
  if (/\b(plumb|pipe|water line|sewer|drain)\b/.test(lower)) return "plumbing"
  if (/\b(electric|wiring|power)\b/.test(lower)) return "electrical"
  if (/\b(build|building|construct|construction|remodel|renovation)\b/.test(lower)) return "construction"
  if (/\b(clean|cleaning|cleanup|clear)\b/.test(lower)) return "cleanup"

  return null
}

function extractEquipmentMentioned(text: string): string[] {
  const lower = text.toLowerCase()
  const equipment: string[] = []

  if (/\b(skid\s*steer|skidsteer|bobcat)\b/.test(lower)) equipment.push("skid steer")
  if (/\b(excavator|mini excavator|digger)\b/.test(lower)) equipment.push("excavator")
  if (/\b(backhoe|back hoe)\b/.test(lower)) equipment.push("backhoe")
  if (/\b(compactor|plate compactor|jumping jack|rammer)\b/.test(lower)) equipment.push("compactor")
  if (/\b(trailer|dump trailer)\b/.test(lower)) equipment.push("trailer")
  if (/\b(generator|power)\b/.test(lower)) equipment.push("generator")
  if (/\b(welder|welding)\b/.test(lower)) equipment.push("welder")
  if (/\b(saw|cut-off|quickie)\b/.test(lower)) equipment.push("saw")
  if (/\b(concrete mixer|mixer|buggy)\b/.test(lower)) equipment.push("concrete mixer")
  if (/\b(trowel|power trowel)\b/.test(lower)) equipment.push("trowel")
  if (/\b(trencher|ditch witch)\b/.test(lower)) equipment.push("trencher")
  if (/\b(air compressor|compressor|jackhammer)\b/.test(lower)) equipment.push("air compressor")
  if (/\b(floor sander|sander)\b/.test(lower)) equipment.push("floor sander")
  if (/\b(tile saw)\b/.test(lower)) equipment.push("tile saw")
  if (/\b(scaffold|scaffolding)\b/.test(lower)) equipment.push("scaffolding")
  if (/\b(lift|scissor lift|boom lift)\b/.test(lower)) equipment.push("lift")
  if (/\b(pump|water pump|trash pump)\b/.test(lower)) equipment.push("pump")
  if (/\b(auger|post hole)\b/.test(lower)) equipment.push("auger")
  if (/\b(stump grinder)\b/.test(lower)) equipment.push("stump grinder")
  if (/\b(aerator)\b/.test(lower)) equipment.push("aerator")
  if (/\b(rototiller|tiller)\b/.test(lower)) equipment.push("rototiller")
  if (/\b(mower|lawn mower)\b/.test(lower)) equipment.push("mower")

  return equipment
}

function isAffirmative(text: string): boolean {
  const lower = text.toLowerCase().trim()
  return /^(yes|yeah|yep|yup|sure|ok|okay|sounds good|perfect|great|absolutely|definitely|please|do it|go ahead|let's do it|that works|correct|right|fine|alright|cool|good|k)\b/.test(lower)
}

function isNegative(text: string): boolean {
  const lower = text.toLowerCase().trim()
  return /^(no|nope|nah|not really|don't|actually|never mind|different|something else|not that)\b/.test(lower)
}

function isQuestion(text: string): boolean {
  return text.trim().endsWith("?") || /^(what|where|when|how|why|do you|can you|is there|are there|does|will|would|could)\b/i.test(text)
}

// ============================================================================
// INTELLIGENT RESPONSE SYSTEM
// ============================================================================

interface ResponseData {
  content: string
  actions?: { label: string; href: string }[]
}

function isBlocked(text: string): boolean {
  return BLOCKED_PATTERNS.some(pattern => pattern.test(text))
}

function isOffTopic(text: string): boolean {
  const lower = text.toLowerCase()
  const hasOffTopicPattern = OFF_TOPIC_PATTERNS.some(pattern => pattern.test(text))
  const hasRelevantKeyword = RELEVANT_KEYWORDS.some(keyword => lower.includes(keyword))

  // If it has off-topic patterns AND no relevant keywords, it's off-topic
  return hasOffTopicPattern && !hasRelevantKeyword
}

function detectIntent(text: string): string {
  const lower = text.toLowerCase()

  // ============ PRIORITY 1: Specific high-value intents (check first!) ============

  // Greeting (only at start of message)
  if (/^(hi|hello|hey|good morning|good afternoon|good evening|howdy|sup|yo|whats up|what's up|greetings)\b/.test(lower)) return "greeting"

  // Thanks
  if (/\b(thank|thanks|thx|appreciate|helpful|awesome|great|perfect)\b/.test(lower) && lower.length < 50) return "thanks"

  // Hours/Location queries - HIGH PRIORITY (check early!)
  if (/\b(hour|hours|open|close|closed|when open|when do you|what time|location|address|where are you|where is|find you|directions|located|come by|visit|come in)\b/.test(lower)) return "hours_location"

  // Repair queries - check BEFORE generator (so "fix my generator" → repair)
  if (/\b(repair|repairs|fix|fixed|service|servicing|maintenance|broken|broke|not working|won't start|doesn't work|mechanic|warranty|tune up|tune-up)\b/.test(lower)) return "repair"

  // Sales queries - check BEFORE equipment (so "sell equipment" → sales)
  if (/\b(buy|buying|purchase|for sale|sell|selling|sales|used for sale|new for sale)\b/.test(lower)) return "sales"

  // Delivery queries
  if (/\b(deliver|delivers|delivery|delivering|pickup|pick up|pick-up|drop off|drop-off|bring it|come to me|to my site|to my house|to my location)\b/.test(lower)) return "delivery"

  // Policy queries
  if (/\b(policy|policies|late return|late fee|damage|damaged|insurance|waiver|after hours|after-hours|deposit|security deposit|contract|agreement|terms)\b/.test(lower)) return "policy"

  // Training queries
  if (/\b(training|train me|teach|learn|how to use|how to operate|how do i use|how do i operate|instruction|instructions|show me how|demo|demonstrate)\b/.test(lower)) return "training"

  // Rental process queries
  if (/\b(how to rent|how do i rent|how does rental|rental process|reserve|reservation|book|booking|need to bring|what do i need|requirements|require|sign up|get started)\b/.test(lower)) return "rental_process"

  // Company info
  if (/\b(about you|about beehive|about the company|who are you|who owns|company|family owned|family-owned|owner|owners|history|how long have you|been in business|tell me about)\b/.test(lower)) return "company_info"

  // Talk to human / call request
  if (/\b(talk to|speak to|speak with|can i talk|transfer me|get me|call me|have someone call|phone call|real person|actual person|human|manager|owner|someone there)\b/.test(lower)) return "talk_to_human"

  // Competitor comparison (not blocking, just redirect)
  if (/\b(home depot|lowes|lowe's|sunbelt|united rentals|better than|compared to|vs|versus|different from|difference between)\b/.test(lower)) return "competitor_comparison"

  // ============ PRIORITY 2: Project-specific intents (PROACTIVE) ============

  // Fencing project - suggest auger IMMEDIATELY
  if (/\b(fence|fencing|fences|post|posts|post hole|setting posts|fence post)\b/.test(lower)) return "fencing_project"

  // Demolition project - suggest jackhammers/breakers
  if (/\b(demo|demolition|demoing|tear down|tearing down|break up|breaking up|smash|destroy)\b/.test(lower)) return "demolition_project"

  // ============ PRIORITY 3: Specific equipment categories ============

  // Skid steers - ENHANCED patterns for "do you have" questions + common typos
  if (/\b(skid\s*steer|skidsteer|skid-steer|skd\s*steer|bobcat|s70|s76|skid loader|mini loader)\b/.test(lower)) return "skid_steer"

  // Excavators - specific terms + typos
  if (/\b(excavator|excavators|excevator|excavater|mini excavator|mini-excavator|cat 308|308 cr|digger|backhoe|back hoe|track hoe|trackhoe)\b/.test(lower)) return "excavator"

  // Concrete equipment
  if (/\b(concrete|compactor|compactors|trowel|trowels|mixer|mixers|buggy|buggies|pour|pouring|rammer|rammers|jumping jack|vibrator|vibrating|screed)\b/.test(lower)) return "concrete"

  // Trailers
  if (/\b(trailer|trailers|dump trailer|dump trailers|flatbed|hauling|haul|7k|10k|14k|water trailer|utility trailer)\b/.test(lower)) return "trailer"

  // Generators & Welders (after repair check)
  if (/\b(generator|generators|welder|welders|welding|miller|weld|power supply|portable power)\b/.test(lower)) return "generator"

  // Air compressors & Jackhammers - COMBINED for better detection
  if (/\b(air compressor|air-compressor|compressor|compressors|cfm|pneumatic|jackhammer|jackhammers|jack hammer|breaker|demo hammer|chipping hammer)\b/.test(lower)) return "air_compressor"

  // Saws
  if (/\b(saw|saws|cut\s*off|cut-off|cutting|husqvarna|quickie|quick cut|tile saw|concrete saw|chop saw|demo saw|ring saw)\b/.test(lower)) return "saw"

  // Flooring
  if (/\b(floor|floors|flooring|carpet|carpeting|sander|sanders|sanding|stripper|stripping|strip|tile|tiling|buffer|buffers|buffing|refinish|refinishing|hardwood)\b/.test(lower)) return "flooring"

  // Landscaping - ENHANCED with "landscaping equipment" and "working on landscaping"
  if (/\b(landscap|yard|lawn|grass|mower|mowers|mowing|aerator|aerators|aerate|aerating|stump|stumps|brush|brush cutter|rototiller|rototillers|tiller|tillers|sod|sod cutter|dethatcher|edger)\b/.test(lower)) return "landscaping"

  // Access equipment
  if (/\b(scaffold|scaffolding|ladder|ladders|lift|lifts|scissor lift|scissor-lift|boom|boom lift|platform|man lift|aerial|reach)\b/.test(lower)) return "access_equipment"

  // Pumps - DEDICATED intent now (not generic equipment_inquiry)
  if (/\b(pump|pumps|water pump|trash pump|submersible|dewatering|sump|pumping)\b/.test(lower)) return "pump"

  // ============ PRIORITY 4: General queries ============

  // Pricing queries
  if (/\b(price|prices|pricing|rate|rates|cost|costs|how much|charge|charges|fee|fees|quote|quotes|estimate|per day|per week|daily|weekly|monthly)\b/.test(lower)) return "pricing"

  // General equipment inquiry - only if asking broadly
  if (/\b(what equipment|what do you have|what do you got|what tools|what kind|show me|your inventory|rent from you|what can i rent|what's available|whats available|available equipment|do you have)\b/.test(lower)) {
    return "equipment_inquiry"
  }

  // Digging/excavation project (suggest excavator)
  if (/\b(dig|digging|dig out|trench|trenching|foundation|basement|excavat|hole|holes|underground|bury|burying)\b/.test(lower)) return "excavator"

  // Project help - general assistance (lower priority catch-all)
  if (/\b(project|help me|help with|recommend|suggest|suggestion|working on|need to|need some|need a|i need|we need|looking for|looking to)\b/.test(lower)) return "project_help"

  return "general"
}

// ============================================================================
// CONVERSATIONAL RESPONSE GENERATOR
// ============================================================================

function generateConversationalResponse(
  text: string,
  context: ConversationContext,
  messages: Message[]
): { response: ResponseData; updatedContext: ConversationContext } {
  const lower = text.toLowerCase()
  let updatedContext = { ...context }

  // Update turn count
  updatedContext.turnCount = context.turnCount + 1

  // Extract any new information from the message
  const extractedName = extractName(text)
  if (extractedName) updatedContext.userName = extractedName

  const extractedProject = extractProjectType(text)
  if (extractedProject) updatedContext.projectType = extractedProject

  const extractedEquipment = extractEquipmentMentioned(text)
  if (extractedEquipment.length > 0) {
    updatedContext.equipmentDiscussed = [...new Set([...context.equipmentDiscussed, ...extractedEquipment])]
  }

  // Check guardrails first
  if (isBlocked(text)) {
    return {
      response: {
        content: "Hey, let's keep things focused on equipment and rentals! So, what kind of project are you working on? I'd love to help you find the right tools."
      },
      updatedContext
    }
  }

  if (isOffTopic(text)) {
    return {
      response: {
        content: `Ha, I wish I could help with that, but I'm just a simple equipment rental assistant! I know everything about BeeHive's 500+ pieces of equipment though. ${context.projectType ? `You mentioned a ${context.projectType} project earlier - did you still need help with that?` : "What kind of project can I help you with today?"}`
      },
      updatedContext
    }
  }

  // Handle follow-up responses if we were waiting for one
  if (context.waitingForResponse) {
    const waitingFor = context.waitingForResponse
    updatedContext.waitingForResponse = null

    // User responding to a question we asked
    if (waitingFor === "project_type") {
      const projectType = extractProjectType(text)
      if (projectType) {
        updatedContext.projectType = projectType
        return generateProjectRecommendation(projectType, updatedContext)
      }
      // They gave an unclear answer, try again naturally
      if (isAffirmative(text) || lower.includes("yes")) {
        return {
          response: {
            content: "Great! What kind of work are you doing? Digging, concrete, landscaping, flooring? Just give me a rough idea and I'll point you in the right direction."
          },
          updatedContext: { ...updatedContext, waitingForResponse: "project_type" }
        }
      }
    }

    if (waitingFor === "equipment_size") {
      return {
        response: {
          content: `Got it! For the exact sizing and to make sure we have what you need in stock, give us a quick call at (435) 628-6663. We can also discuss delivery if you need it.`,
          actions: [{ label: "Call Now", href: "tel:435-628-6663" }]
        },
        updatedContext
      }
    }

    if (waitingFor === "rental_duration") {
      if (/day|daily|one day|1 day|couple days|few days/i.test(lower)) {
        return {
          response: {
            content: `Perfect, daily rentals work great. ${context.equipmentDiscussed.length > 0 ? `For the ${context.equipmentDiscussed[context.equipmentDiscussed.length - 1]}, ` : ""}our day rate is a 24-hour period with max 8 hours on the meter. Need me to check availability?`
          },
          updatedContext
        }
      }
      if (/week|weekly/i.test(lower)) {
        return {
          response: {
            content: `A week rental is a great choice - you get it for 4x the daily rate, so you're basically getting 3 days free. ${context.equipmentDiscussed.length > 0 ? `Want me to put together a quote for the ${context.equipmentDiscussed[context.equipmentDiscussed.length - 1]}?` : "What equipment are you looking at?"}`
          },
          updatedContext
        }
      }
    }

    if (waitingFor === "more_help") {
      if (isAffirmative(text)) {
        return {
          response: {
            content: "Sure thing! What else can I help you with? Need info on different equipment, pricing, delivery, or maybe our repair services?"
          },
          updatedContext
        }
      }
      if (isNegative(text)) {
        return {
          response: {
            content: `Alright${context.userName ? `, ${context.userName}` : ""}! If you need anything else, I'm here. And remember, you can always call us at (435) 628-6663 or stop by the shop at 1175 Highland Dr. Good luck with your project!`,
            actions: [{ label: "Call Us", href: "tel:435-628-6663" }]
          },
          updatedContext
        }
      }
    }
  }

  // Detect intent
  const intent = detectIntent(text)

  // TOPIC SWITCHING DETECTION - Natural acknowledgment when changing topics
  const topicSwitched = context.lastTopic && context.lastTopic !== intent && context.turnCount > 2
  const differentCategory = topicSwitched && ![intent, context.lastTopic].every(t =>
    ["greeting", "thanks", "hours_location", "pricing", "delivery", "general"].includes(t || "")
  )

  updatedContext.lastTopic = intent

  // Track questions asked
  if (!context.questionsAsked.includes(intent)) {
    updatedContext.questionsAsked = [...context.questionsAsked, intent]
  }

  // Topic switch acknowledgments (prepend to responses)
  const topicSwitchAcknowledgments = [
    "Oh, switching gears - ",
    "Actually, ",
    "Gotcha, changing topics - ",
    "Alright, different question - ",
    "Sure thing - "
  ]
  const acknowledgment = differentCategory
    ? topicSwitchAcknowledgments[Math.floor(Math.random() * topicSwitchAcknowledgments.length)]
    : ""

  // Generate conversational response based on intent and context
  switch (intent) {
    case "greeting": {
      updatedContext.hasGreeted = true
      const greetings = [
        `Hey there! Welcome to BeeHive Rental. I'm here to help you find whatever you need - equipment rentals, repairs, or if you're looking to buy something. What brings you in today?`,
        `Hi! Thanks for reaching out to BeeHive. We've got over 500 pieces of equipment here. Are you working on a project I can help with?`,
        `Hey! Good to hear from you. I'm BeeBot - I work here at BeeHive Rental. What can I help you find today?`
      ]
      return {
        response: {
          content: greetings[Math.floor(Math.random() * greetings.length)],
        },
        updatedContext
      }
    }

    case "thanks": {
      const responses = [
        `You bet! ${context.equipmentDiscussed.length > 0 ? `Good luck with the ${context.equipmentDiscussed[0]} - ` : ""}anything else I can help with?`,
        `Happy to help! Let me know if any other questions come up${context.projectType ? ` about your ${context.projectType} project` : ""}.`,
        `Anytime! We're here Monday through Friday 7-5, Saturday til noon if you need us.`
      ]
      return {
        response: {
          content: responses[Math.floor(Math.random() * responses.length)],
        },
        updatedContext: { ...updatedContext, waitingForResponse: "more_help" }
      }
    }

    case "hours_location": {
      return {
        response: {
          content: `We're at 1175 Highland Dr here in St. George. Hours are Monday through Friday 7am to 5pm, and Saturday 8am to noon. Closed Sundays.\n\nWere you planning to come by, or did you need us to deliver something?`,
          actions: [
            { label: "Get Directions", href: "https://maps.google.com/?q=1175+Highland+Dr+St+George+UT" },
          ]
        },
        updatedContext
      }
    }

    case "repair": {
      return {
        response: {
          content: `${acknowledgment}Yeah, we do repairs! We've got factory-trained techs with 30+ years experience. What kind of equipment needs work?\n\nWe service most major brands - Honda, Briggs & Stratton, Kohler, Toro, you name it. And we offer free diagnostics plus a 90-day warranty on parts and labor.`,
          actions: [{ label: "Call for Quote", href: "tel:435-628-6663" }]
        },
        updatedContext: { ...updatedContext, userIntent: "repair" }
      }
    }

    case "sales": {
      return {
        response: {
          content: `${acknowledgment}Yep, we sell equipment too! We've got new Husqvarna saws, Bosch roto hammers, MQ compactors, and a bunch of used stuff that rotates pretty regularly.\n\nAre you looking for something specific, or just browsing what's available?`,
          actions: [{ label: "View Sales Inventory", href: "/sales" }]
        },
        updatedContext: { ...updatedContext, userIntent: "sales" }
      }
    }

    case "delivery": {
      const lastEquipment = context.equipmentDiscussed.length > 0
        ? context.equipmentDiscussed[context.equipmentDiscussed.length - 1]
        : null

      const deliveryResponses = lastEquipment
        ? [
            `Yeah, absolutely! We can deliver the ${lastEquipment} to you. We cover all of Southern Utah - St. George, Washington, Hurricane, and surrounding areas. Fee varies by location and equipment size.\n\nWhere's your job site? I can give you an idea on delivery cost.`,
            `No problem, we deliver the ${lastEquipment} all the time. Service area is St. George and the surrounding towns - Hurricane, Ivins, Washington, Santa Clara.\n\nWhere are you working? That'll help me figure out the delivery fee.`,
            `For sure! We can bring the ${lastEquipment} right to your site. Delivery fee depends on how far out you are and what we're hauling.\n\nWhat's the address or general area?`
          ]
        : [
            `Absolutely, we deliver throughout Southern Utah! St. George, Washington, Hurricane, Ivins, Santa Clara - pretty much anywhere in the area.\n\nWhat equipment are you needing delivered?`,
            `Yeah, delivery is no problem. We cover St. George and all the surrounding towns - usually same-day if you call early enough.\n\nWhat are you looking to have delivered?`,
            `For sure! We deliver all over Southern Utah. Fee depends on the equipment and how far we're going.\n\nWhat do you need brought out?`
          ]

      return {
        response: {
          content: deliveryResponses[Math.floor(Math.random() * deliveryResponses.length)],
          actions: [{ label: "Call for Delivery Quote", href: "tel:435-628-6663" }]
        },
        updatedContext
      }
    }

    case "pricing": {
      const pricingResponse = context.equipmentDiscussed.length > 0
        ? `For the ${context.equipmentDiscussed[context.equipmentDiscussed.length - 1]}, let me give you a quick idea of rates... Actually, pricing varies a bit based on exactly which model and rental duration. How long were you thinking of renting?`
        : `Our rates are pretty competitive! For example, skid steers run about $295/day, mini excavators around $395/day. We do daily, weekly (4x daily), and monthly (12x daily) rates.\n\nWhat equipment were you looking at?`
      return {
        response: {
          content: pricingResponse,
        },
        updatedContext: { ...updatedContext, waitingForResponse: context.equipmentDiscussed.length > 0 ? "rental_duration" : null }
      }
    }

    case "skid_steer": {
      updatedContext.equipmentDiscussed = [...new Set([...updatedContext.equipmentDiscussed, "skid steer"])]
      const contextualResponse = context.projectType
        ? `For your ${context.projectType} project, a skid steer would be perfect! `
        : ""

      // Natural variations
      const responses = [
        `${contextualResponse}We've got Bobcat S70s and S76s. The S70 is great for tight spaces - it's our smallest one. The S76 is a bit bigger, more of an all-around workhorse.\n\nS70 runs $295/day. We've also got attachments - buckets, augers, forks. What kind of work are you doing with it?`,
        `${contextualResponse}Yeah, we have a couple Bobcat skid steers. The S70 is perfect if you're working in tighter areas - driveways, backyards, that kind of thing. The S76 has a bit more power if you need it.\n\nDaily rate on the S70 is $295, and we've got all the attachments. What's the project?`,
        `${contextualResponse}Absolutely! Our Bobcats are super popular. We've got the S70 for smaller jobs and tight spots, and the S76 if you need something with a bit more muscle.\n\nS70 is $295/day, plus we have buckets, augers, and forks. Tell me what you're working on and I'll make sure you get the right setup.`
      ]

      return {
        response: {
          content: responses[Math.floor(Math.random() * responses.length)],
          actions: [{ label: "View Skid Steers", href: "/inventory" }]
        },
        updatedContext
      }
    }

    case "excavator": {
      updatedContext.equipmentDiscussed = [...new Set([...updatedContext.equipmentDiscussed, "excavator"])]

      // Context-aware responses
      const projectContext = context.projectType
      const responses = projectContext
        ? [
            `Perfect! For ${projectContext} work, our Cat 308 CR mini excavator is ideal. It's a Next Generation machine - smooth to operate, plenty of power. Runs $395/day, $1,580/week.\n\nHow deep are you going? That'll help me confirm it's the right machine.`,
            `Great choice! The mini excavator works awesome for ${projectContext}. We have the Cat 308 CR - really nice machine, easy on fuel, tracks are gentle on lawns if that matters.\n\n$395/day or $1,580 for the week. What size area are you working with?`
          ]
        : [
            `Our mini excavators are super popular. We've got the Cat 308 CR - it's a Next Generation machine, really nice to operate. Runs $395/day or $1,580 for the week.\n\nWhat are you digging? Foundation, trenches, landscaping? I can make sure it's the right size for what you need.`,
            `Yeah, the Cat 308 CR mini excavator is one of our most rented machines. Smooth operation, good reach, and the tracks are rubber so they won't tear up grass.\n\n$395/day, $1,580/week. Tell me about the job and I'll make sure it'll handle it.`
          ]

      return {
        response: {
          content: responses[Math.floor(Math.random() * responses.length)],
          actions: [{ label: "View Excavators", href: "/inventory" }]
        },
        updatedContext
      }
    }

    case "concrete": {
      updatedContext.equipmentDiscussed = [...new Set([...updatedContext.equipmentDiscussed, "concrete equipment"])]
      return {
        response: {
          content: `Concrete work? We've got everything you need:\n\n• Mixers - 9 cu ft\n• Buggies - 16 cu ft, tracked or wheeled\n• Trowels - 36" and 48"\n• Compactors - plate compactors and jumping jacks\n• Saws for cutting joints\n\nWhat's the job - slab, sidewalk, driveway? I can help you figure out what you'll need.`,
          actions: [{ label: "View Concrete Equipment", href: "/inventory" }]
        },
        updatedContext: { ...updatedContext, waitingForResponse: "project_type" }
      }
    }

    case "trailer": {
      updatedContext.equipmentDiscussed = [...new Set([...updatedContext.equipmentDiscussed, "trailer"])]
      return {
        response: {
          content: `We've got dump trailers in 7K, 10K, and 14K sizes. Quick heads up - if you're going with the 10K or 14K, you'll need at least a 3/4-ton truck to tow it.\n\nWhat are you hauling? That'll help me point you to the right size.`
        },
        updatedContext
      }
    }

    case "generator": {
      updatedContext.equipmentDiscussed = [...new Set([...updatedContext.equipmentDiscussed, "generator"])]
      return {
        response: {
          content: `Generators - we've got portables from 2.5kW up to 9.7kW, and a towable 25kW if you need serious power. Also have welders with built-in generators if that's what you're after.\n\nWhat are you powering? Tools on a job site, an event, backup power?`,
        },
        updatedContext
      }
    }

    case "air_compressor": {
      updatedContext.equipmentDiscussed = [...new Set([...updatedContext.equipmentDiscussed, "air compressor"])]
      return {
        response: {
          content: `For air compressors, we've got the AIRMAN 185 CFM towable and a big Sullair 375 CFM for the heavy stuff. If you need jackhammers or chipping hammers, we've got those too - 60lb and 90lb.\n\nBreaking up concrete? Demo work? What's the project?`,
        },
        updatedContext
      }
    }

    case "saw": {
      updatedContext.equipmentDiscussed = [...new Set([...updatedContext.equipmentDiscussed, "saw"])]
      return {
        response: {
          content: `Saws - we've got Husqvarna cut-off saws (those we actually sell, $1,150-1,600), walk-behind concrete saws, tile saws, the works. We stock blades for concrete, asphalt, and metal.\n\nWhat are you cutting? I can point you to the right one.`,
          actions: [{ label: "View Saws", href: "/sales" }]
        },
        updatedContext
      }
    }

    case "flooring": {
      updatedContext.equipmentDiscussed = [...new Set([...updatedContext.equipmentDiscussed, "flooring equipment"])]
      updatedContext.projectType = "flooring"
      return {
        response: {
          content: `Flooring project? Nice! We've got:\n\n• Floor sanders (American Sanders orbital)\n• Floor strippers for tile/vinyl/carpet\n• Tile saws\n• Buffers\n• Carpet stretchers\n\nPlus all the consumables - sandpaper in every grit, buffer pads, etc. What are you working with - hardwood, tile, carpet?`,
        },
        updatedContext
      }
    }

    case "landscaping": {
      updatedContext.equipmentDiscussed = [...new Set([...updatedContext.equipmentDiscussed, "landscaping equipment"])]
      updatedContext.projectType = "landscaping"
      return {
        response: {
          content: `Landscaping - we can definitely help! Mowers, aerators, rototillers, stump grinders, trenchers for irrigation lines...\n\nWhat's the project? Lawn renovation, new install, tree removal, sprinkler system? I'll point you to exactly what you need.`,
        },
        updatedContext: { ...updatedContext, waitingForResponse: "project_type" }
      }
    }

    case "access_equipment": {
      updatedContext.equipmentDiscussed = [...new Set([...updatedContext.equipmentDiscussed, "lifts/scaffolding"])]
      return {
        response: {
          content: `Need to get up high? We've got scaffolding, extension ladders, A-frame ladders, and scissor lifts (19' to 32' platform height).\n\nHow high do you need to get, and is this indoor or outdoor? That'll help me figure out what works best.`,
        },
        updatedContext
      }
    }

    case "pump": {
      updatedContext.equipmentDiscussed = [...new Set([...updatedContext.equipmentDiscussed, "pump"])]
      return {
        response: {
          content: `Yeah, we've got pumps! Here's what we have:\n\n• Trash Pump - 2" ($85/day) - for dirty water, debris, mud\n• Water Pump - 3" - for clean water transfer\n• Submersible Pumps - for wells, basements\n• Diaphragm Pumps - for heavier solids\n\nWhat are you pumping? Water, mud, flooded basement? That'll help me get you the right one.`,
        },
        updatedContext
      }
    }

    case "fencing_project": {
      updatedContext.equipmentDiscussed = [...new Set([...updatedContext.equipmentDiscussed, "auger"])]
      updatedContext.projectType = "fencing"
      return {
        response: {
          content: `Building a fence? Perfect! Here's what you'll want:\n\n• Post Hole Auger - for setting fence posts (much faster than digging by hand)\n• Skid Steer with Auger Attachment - if you've got a lot of posts to set\n• Compactor - for packing the dirt/concrete around posts\n\nHow many posts are we talking about? That'll help me figure out if you need the handheld auger or the skid steer setup.`,
          actions: [{ label: "Call for Quote", href: "tel:435-628-6663" }]
        },
        updatedContext
      }
    }

    case "demolition_project": {
      updatedContext.equipmentDiscussed = [...new Set([...updatedContext.equipmentDiscussed, "jackhammer"])]
      updatedContext.projectType = "demolition"
      return {
        response: {
          content: `Demo work? Nice! Let's break some stuff. Here's what we've got:\n\n• Jackhammers - 60lb and 90lb (90lb for heavy concrete)\n• Air Compressor - 185 CFM or 375 CFM to power them\n• Skid Steer with Breaker Attachment - for bigger demo jobs\n• Cut-off Saws - for cutting before breaking\n\nWhat are you tearing out - concrete slab, sidewalk, driveway, asphalt, interior walls? I'll make sure you get the right setup.`,
          actions: [{ label: "View Equipment", href: "/inventory" }]
        },
        updatedContext
      }
    }

    case "equipment_inquiry": {
      return {
        response: {
          content: `We've got over 500 pieces of equipment, so yeah - we probably have what you need! Heavy equipment like skid steers and excavators, concrete equipment, trailers, generators, floor equipment, landscaping stuff...\n\nEasiest way to narrow it down - what kind of project are you tackling?`,
        },
        updatedContext: { ...updatedContext, waitingForResponse: "project_type" }
      }
    }

    case "company_info": {
      return {
        response: {
          content: `BeeHive's been around since 1994 - family-owned, locally operated, right here in St. George. We've got about 14 people on the team and over 500 pieces of equipment.\n\nWe do rentals, sales, repairs, and delivery. Basically, if you need equipment for a job, we can help. What brings you to us today?`,
        },
        updatedContext
      }
    }

    case "talk_to_human": {
      const responses = [
        `I'd be happy to have someone call you! Our team is here Monday-Friday 7am-5pm, Saturday 8am-noon. Give us a call at (435) 628-6663 anytime during those hours.\n\n${context.equipmentDiscussed.length > 0 ? `If you want, you can mention you were asking about the ${context.equipmentDiscussed[context.equipmentDiscussed.length - 1]} - they'll get you taken care of!` : "They'll be able to help you out with whatever you need!"}`,
        `Sure thing! The best way to talk to the team is to give us a call at (435) 628-6663. We're here Monday-Friday 7-5, Saturday 8-12.\n\n${context.projectType ? `Let them know about your ${context.projectType} project and they'll get you set up!` : "They'll be able to answer any questions you have!"}`,
        `Absolutely! You can call us directly at (435) 628-6663 - someone will pick up during business hours (Mon-Fri 7am-5pm, Sat 8am-noon).\n\nOr if you want to stop by, we're at 1175 Highland Dr in St. George. The team can help you out in person!`
      ]
      return {
        response: {
          content: responses[Math.floor(Math.random() * responses.length)],
          actions: [
            { label: "Call Now", href: "tel:435-628-6663" },
            { label: "Get Directions", href: "https://maps.google.com/?q=1175+Highland+Dr+St+George+UT" }
          ]
        },
        updatedContext
      }
    }

    case "competitor_comparison": {
      const tactfulResponses = [
        `I appreciate you asking! I can't really speak to what other companies do, but I can tell you what makes BeeHive special - we're family-owned and been here in St. George since 1994. We know our customers by name, our team has 30+ years experience, and we take care of our equipment.\n\nWhat matters most to you in a rental company? Selection, service, price, location?`,
        `That's a fair question! I'm obviously biased since I work here, but what I can say is we're locally owned, we've been serving Southern Utah for 30+ years, and we stand behind our equipment with real warranties.\n\nWhat's most important to you for your project? I'd rather focus on making sure you get the right equipment than worrying about the competition!`,
        `Ha, I'm not going to trash-talk anyone - we're all trying to help folks get their jobs done! What I will say is BeeHive is family-owned, we've been here since '94, and we take pride in personal service.\n\nTell me about your project and let me show you what we can do for you. If we're not the right fit, we're not the right fit - but I think you'll like working with us!`
      ]
      return {
        response: {
          content: tactfulResponses[Math.floor(Math.random() * tactfulResponses.length)],
        },
        updatedContext
      }
    }

    case "policy":
    case "rental_process":
    case "training": {
      return {
        response: {
          content: `For stuff like rental agreements, deposits, insurance, or equipment training - honestly, it's easiest to just give us a call or stop by. We'll walk you through everything and make sure you're comfortable before you head out.\n\nWere you ready to rent something, or did you have questions first?`,
          actions: [{ label: "Call Us", href: "tel:435-628-6663" }]
        },
        updatedContext
      }
    }

    case "project_help": {
      // Check if they mentioned a specific project type
      const projectType = extractProjectType(text)
      if (projectType) {
        updatedContext.projectType = projectType
        return generateProjectRecommendation(projectType, updatedContext)
      }

      return {
        response: {
          content: `Sure, I can help figure out what you need! Tell me a bit about the project - are you digging, pouring concrete, working on floors, landscaping, or something else? The more details the better!`,
        },
        updatedContext: { ...updatedContext, waitingForResponse: "project_type" }
      }
    }

    default: {
      // SMART FALLBACKS - Context-aware, helpful, not generic

      // If we have project context, offer specific help
      if (context.projectType && context.turnCount > 1) {
        const smartSuggestions = [
          `I didn't quite catch that - are you still asking about your ${context.projectType} project? I can help with equipment recommendations, pricing, delivery, or if you're ready to reserve something.`,
          `Hmm, not sure I followed. We were talking about ${context.projectType} - did you want to know more about equipment for that, or are you asking about something else?`,
          `Let me make sure I understand - is this still about the ${context.projectType} work? Or did you have a different question? I'm here to help!`
        ]
        return {
          response: {
            content: smartSuggestions[Math.floor(Math.random() * smartSuggestions.length)],
          },
          updatedContext
        }
      }

      // If we discussed equipment, reference it
      if (context.equipmentDiscussed.length > 0) {
        const lastEquipment = context.equipmentDiscussed[context.equipmentDiscussed.length - 1]
        const smartResponses = [
          `Sorry, I didn't quite get that. Were you asking about the ${lastEquipment} we just discussed, or something else? Feel free to be specific - I'm here to help!`,
          `I'm not following - is this about the ${lastEquipment}? Or are you looking for different equipment? Just let me know what you need!`,
          `Hmm, I missed that. Are you still thinking about the ${lastEquipment}, or did you have a question about something else?`
        ]
        return {
          response: {
            content: smartResponses[Math.floor(Math.random() * smartResponses.length)],
          },
          updatedContext
        }
      }

      // If waitingForResponse but user gave unclear answer, clarify
      if (context.waitingForResponse) {
        return {
          response: {
            content: `I'm trying to figure out what you need, but I'm not quite getting it. Can you tell me a bit more? Like what kind of project you're working on, or what equipment you're looking for?`,
          },
          updatedContext: { ...updatedContext, waitingForResponse: null }
        }
      }

      // First interaction - be welcoming and ask good questions
      if (context.turnCount <= 1) {
        return {
          response: {
            content: `I want to make sure I help you with the right stuff! Are you:\n\n• Looking to rent equipment for a project?\n• Need something repaired?\n• Want to buy new or used equipment?\n• Just browsing to see what we have?\n\nOr feel free to just tell me what you're working on!`,
            actions: [
              { label: "Browse Equipment", href: "/inventory" },
              { label: "Call Us", href: "tel:435-628-6663" }
            ]
          },
          updatedContext
        }
      }

      // Generic but helpful fallback
      const genericResponses = [
        `Not sure I understood that one. I can help you find equipment, get pricing, schedule delivery, or answer questions about our services. What do you need?`,
        `Hmm, I didn't quite get that. I'm here to help with rentals, repairs, sales, or whatever you need. What are you working on?`,
        `Let me help you out - what can I do for you? Equipment rental? Pricing info? Repair quote? Just let me know!`
      ]

      return {
        response: {
          content: genericResponses[Math.floor(Math.random() * genericResponses.length)],
          actions: [
            { label: "Browse Equipment", href: "/inventory" },
            { label: "Call Us", href: "tel:435-628-6663" }
          ]
        },
        updatedContext
      }
    }
  }
}

// Helper function to generate project-specific recommendations
function generateProjectRecommendation(projectType: string, context: ConversationContext): { response: ResponseData; updatedContext: ConversationContext } {
  const recommendations: Record<string, string> = {
    landscaping: `For landscaping, here's what I'd suggest looking at:\n\n• Skid steer - for moving dirt, grading\n• Rototiller - for soil prep\n• Trencher - if you're doing irrigation\n• Stump grinder - if trees are involved\n\nWhat specifically are you tackling? New lawn, sprinklers, hardscape?`,
    concrete: `For concrete work, you'll probably want:\n\n• Mixer or buggy - depending on the volume\n• Trowel - for finishing (36" or 48")\n• Compactor - for the base prep\n• Saw - for cutting control joints\n\nHow big is the pour? That'll help me dial in what you need.`,
    excavation: `For digging work, we've got:\n\n• Mini excavator (Cat 308) - for bigger jobs, trenches, foundations\n• Trencher - for narrow utility trenches\n• Skid steer - for moving material around\n\nHow deep and wide are we talking?`,
    flooring: `For flooring, depending on what you're doing:\n\n• Floor sander - for refinishing hardwood\n• Stripper - for removing old tile/vinyl/carpet\n• Tile saw - for cutting new tile\n• Buffer - for final polish\n\nWhat type of floor are you working with?`,
    demolition: `Demo work? Nice, let's break stuff! We've got:\n\n• Jackhammers (60lb and 90lb)\n• Air compressor to power them\n• Skid steer with breaker attachment\n• Demo saws\n\nWhat are you tearing out - concrete, asphalt, interior stuff?`,
    fencing: `For fence work, you'll want:\n\n• Auger/post hole digger - for setting posts\n• Possibly a skid steer with auger attachment for bigger jobs\n• Compactor - for setting posts solid\n\nHow many posts are we talking? That'll help me recommend the right setup.`,
    construction: `General construction - we can definitely help! The basics:\n\n• Skid steer or excavator - for site work\n• Compactor - for base prep\n• Generator - for power on site\n• Scaffolding or lifts - for height work\n\nWhat stage is the project at?`,
    plumbing: `For plumbing/pipe work:\n\n• Trencher - for digging the lines\n• Mini excavator - for deeper/bigger trenches\n• Pipe cutter\n• Compactor - for backfill\n\nHow deep do you need to go?`,
    cleanup: `For cleanup/clearing:\n\n• Skid steer - for moving debris\n• Dump trailer - for hauling it away\n• Brush cutter - for vegetation\n\nWhat kind of debris are we talking about?`
  }

  const recommendation = recommendations[projectType] || `For your ${projectType} project, let me ask a few questions to figure out exactly what you need. What's the scope - residential or commercial? And roughly how long do you think you'll need the equipment?`

  return {
    response: { content: recommendation },
    updatedContext: { ...context, waitingForResponse: "equipment_size" }
  }
}

// Legacy wrapper for compatibility
function generateResponse(text: string): ResponseData {
  const result = generateConversationalResponse(text, INITIAL_CONTEXT, [])
  return result.response
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hey! I'm BeeBot - I work here at BeeHive Rental. What can I help you with today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  // Conversation context - session memory for back-and-forth dialogue
  const [conversationContext, setConversationContext] = useState<ConversationContext>(INITIAL_CONTEXT)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [size, setSize] = useState<Size>({ width: 400, height: 550 })
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState<string | null>(null)
  const resizeStartRef = useRef<{ x: number; y: number; width: number; height: number } | null>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const lastMessageCountRef = useRef(1)
  const [keyboardVisible, setKeyboardVisible] = useState(false)
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== 'undefined'
      ? (window.visualViewport?.height || window.innerHeight)
      : 0
  )

  // Graceful scroll - doesn't jolt the user, gently scrolls new messages into view
  const scrollToBottom = useCallback((immediate = false) => {
    if (!messagesContainerRef.current) return

    const container = messagesContainerRef.current
    const scrollHeight = container.scrollHeight
    const currentScroll = container.scrollTop
    const clientHeight = container.clientHeight

    // Calculate target scroll position (leave some padding at bottom)
    const targetScroll = scrollHeight - clientHeight

    if (immediate) {
      // For user messages, scroll immediately but smoothly
      container.scrollTo({
        top: targetScroll,
        behavior: "smooth"
      })
    } else {
      // For AI messages, use a gentle delayed scroll
      // First, small scroll to show typing indicator
      const partialScroll = Math.min(currentScroll + 100, targetScroll)
      container.scrollTo({
        top: partialScroll,
        behavior: "smooth"
      })

      // Then after a brief moment, scroll to show full message
      setTimeout(() => {
        container.scrollTo({
          top: targetScroll,
          behavior: "smooth"
        })
      }, 300)
    }
  }, [])

  useEffect(() => {
    const newCount = messages.length
    const wasNewMessage = newCount > lastMessageCountRef.current

    if (wasNewMessage) {
      const lastMessage = messages[messages.length - 1]
      // User messages scroll immediately, AI messages scroll gently with delay
      if (lastMessage.role === "user") {
        scrollToBottom(true)
      } else {
        // Small delay before scrolling to AI response for graceful feel
        setTimeout(() => scrollToBottom(false), 150)
      }
    }

    lastMessageCountRef.current = newCount
  }, [messages, scrollToBottom])

  useEffect(() => {
    // CRITICAL: Don't auto-focus on mobile (prevents keyboard popup)
    if (isOpen && inputRef.current && typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 768
      if (!isMobile) {
        inputRef.current.focus()
      }
    }
  }, [isOpen])

  useEffect(() => {
    const unsubscribe = aiAssistantEvents.subscribe((message: string) => {
      setIsOpen(true)
      setTimeout(() => {
        handleSend(message)
      }, 300)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    const savedSize = localStorage.getItem("beebot-size")
    if (savedSize) {
      try {
        const parsed = JSON.parse(savedSize)
        setSize(parsed)
      } catch (e) {
        // Ignore parse errors
      }
    }

    // Set loading to false after 2 seconds
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(loadingTimer)
  }, [])

  // Scroll detection for orb shrink effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setHasScrolled(scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // CRITICAL: Detect keyboard open/close on mobile (iOS + Android)
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => {
      const newHeight = window.visualViewport?.height || window.innerHeight
      setViewportHeight(newHeight)

      // Detect keyboard (viewport shrinks significantly)
      const heightDiff = window.innerHeight - newHeight
      setKeyboardVisible(heightDiff > 150) // Keyboard typically >150px

      // Scroll to bottom when keyboard opens
      if (heightDiff > 150 && isOpen) {
        setTimeout(() => scrollToBottom(true), 100)
      }
    }

    // Use visualViewport API (best for iOS)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize)
    } else {
      window.addEventListener('resize', handleResize)
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize)
      } else {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [isOpen, scrollToBottom])

  useEffect(() => {
    if (!isResizing) {
      localStorage.setItem("beebot-size", JSON.stringify(size))
    }
  }, [size, isResizing])

  const handleResizeStart = useCallback(
    (e: React.MouseEvent, direction: string) => {
      e.preventDefault()
      e.stopPropagation()
      setIsResizing(true)
      setResizeDirection(direction)
      resizeStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        width: size.width,
        height: size.height,
      }
    },
    [size],
  )

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !resizeStartRef.current || !resizeDirection) return

      const deltaX = e.clientX - resizeStartRef.current.x
      const deltaY = e.clientY - resizeStartRef.current.y
      const maxWidth = window.innerWidth * MAX_WIDTH_RATIO
      const maxHeight = window.innerHeight * MAX_HEIGHT_RATIO

      let newWidth = resizeStartRef.current.width
      let newHeight = resizeStartRef.current.height

      if (resizeDirection.includes("w")) {
        newWidth = Math.max(MIN_WIDTH, Math.min(maxWidth, resizeStartRef.current.width - deltaX))
      }
      if (resizeDirection.includes("e")) {
        newWidth = Math.max(MIN_WIDTH, Math.min(maxWidth, resizeStartRef.current.width + deltaX))
      }
      if (resizeDirection.includes("n")) {
        newHeight = Math.max(MIN_HEIGHT, Math.min(maxHeight, resizeStartRef.current.height - deltaY))
      }
      if (resizeDirection.includes("s")) {
        newHeight = Math.max(MIN_HEIGHT, Math.min(maxHeight, resizeStartRef.current.height + deltaY))
      }

      setSize({ width: newWidth, height: newHeight })
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      setResizeDirection(null)
      resizeStartRef.current = null
    }

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isResizing, resizeDirection])

  const handleSend = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // CRITICAL: Blur input to dismiss keyboard on mobile
    if (inputRef.current && typeof window !== 'undefined' && window.innerWidth < 768) {
      inputRef.current.blur()
    }

    // Use conversational response generation with context memory
    // Realistic typing delay (2.5-4 seconds) for natural feel
    setTimeout(
      () => {
        // Generate response using conversation context
        const { response, updatedContext } = generateConversationalResponse(
          messageText,
          conversationContext,
          messages
        )

        // Update the conversation context for next turn
        setConversationContext(updatedContext)

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response.content,
          timestamp: new Date(),
          actions: response.actions,
        }

        setMessages((prev) => [...prev, assistantMessage])
        setIsTyping(false)
      },
      2500 + Math.random() * 1500, // 2.5-4 seconds for realistic typing feel
    )
  }

  const isWide = size.width > 500
  const isShort = size.height < 500
  const showQuickReplies = !isShort && messages.length <= 2

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: hasScrolled ? 0.93 : 1,
              opacity: 1
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 600,
              damping: 25,
              mass: 0.4,
              duration: 0.15
            }}
            whileHover={{ scale: hasScrolled ? 1.0 : 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              setIsOpen(true)
              setIsMinimized(false)
            }}
            className="group fixed bottom-6 right-4 sm:bottom-10 sm:right-6 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center z-[100] bg-transparent touch-manipulation"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.2)) drop-shadow(0 0 30px rgba(255, 255, 255, 0.1))',
              WebkitTapHighlightColor: 'transparent',
              aspectRatio: '1/1',
              willChange: 'transform',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
            aria-label="Open chat assistant"
          >

            {/* SVG AI Icon */}
            <div className="relative flex items-center justify-center w-full h-full" style={{ minWidth: '64px', minHeight: '64px', aspectRatio: '1/1' }}>
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))',
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  aspectRatio: '1/1',
                  willChange: 'transform'
                }}
              >
                {/* Hexagon background with gradient */}
                <defs>
                  <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#e0e0e0', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#f5f5f5', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#d0d0d0', stopOpacity: 1 }} />
                  </linearGradient>
                  <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#4a4a4a', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#2a2a2a', stopOpacity: 1 }} />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Outer hexagon - silver frame */}
                <polygon
                  points="100,20 170,60 170,140 100,180 30,140 30,60"
                  fill="url(#hexGradient)"
                  stroke="#ffffff"
                  strokeWidth="3"
                  filter="url(#glow)"
                />

                {/* Middle hexagon - depth layer */}
                <polygon
                  points="100,35 160,67.5 160,132.5 100,165 40,132.5 40,67.5"
                  fill="none"
                  stroke="#c0c0c0"
                  strokeWidth="2"
                  opacity="0.6"
                />

                {/* Inner hexagon - dark background */}
                <polygon
                  points="100,45 150,72.5 150,127.5 100,155 50,127.5 50,72.5"
                  fill="url(#innerGradient)"
                  stroke="#888888"
                  strokeWidth="1"
                />

                {/* AI Text with glow */}
                <text
                  x="100"
                  y="115"
                  fontFamily="Arial, sans-serif"
                  fontSize="60"
                  fontWeight="bold"
                  fill="#ffffff"
                  textAnchor="middle"
                  style={{
                    filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 12px rgba(255, 255, 255, 0.4))',
                  }}
                >
                  AI
                </text>
              </svg>
            </div>

            {/* Hover tooltip */}
            <span className="absolute right-full mr-4 px-4 py-2 bg-[#111] text-white text-base rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
              Need help? Chat with us!
            </span>
          </motion.button>
        )}
      </AnimatePresence>


      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 500,
              mass: 0.5,
              duration: 0.2
            }}
            className={cn(
              "fixed z-[100] bg-[#0a0a0a] border border-white/10 flex flex-col overflow-hidden",
              // Mobile: bottom of screen with margin, rounded corners, Apple-style shadow
              "bottom-2 left-2 right-2 rounded-2xl shadow-[0_-10px_60px_rgba(0,0,0,0.8)]",
              // Desktop: bottom-right corner, not fullscreen
              "md:inset-auto md:bottom-10 md:right-6 md:left-auto md:top-auto md:rounded-2xl md:shadow-2xl",
              isResizing && "select-none",
            )}
            style={{
              ...typeof window !== 'undefined' && window.innerWidth < 768 ? {
                width: 'calc(100vw - 16px)',
                // CRITICAL: Use dynamic viewport height (accounts for keyboard)
                height: `${viewportHeight - 16}px`,
                maxHeight: 'calc(100vh - 16px)'
              } : {
                width: size.width,
                height: size.height
              },
              willChange: 'transform, opacity',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            {/* Corners - hidden on mobile */}
            <div
              onMouseDown={(e) => handleResizeStart(e, "nw")}
              className="hidden md:block absolute top-0 left-0 w-4 h-4 cursor-nw-resize z-10 hover:bg-[#E8C24A]/20 rounded-tl-2xl"
            />
            <div
              onMouseDown={(e) => handleResizeStart(e, "ne")}
              className="hidden md:block absolute top-0 right-0 w-4 h-4 cursor-ne-resize z-10 hover:bg-[#E8C24A]/20 rounded-tr-2xl"
            />
            <div
              onMouseDown={(e) => handleResizeStart(e, "sw")}
              className="hidden md:block absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize z-10 hover:bg-[#E8C24A]/20 rounded-bl-2xl"
            />
            <div
              onMouseDown={(e) => handleResizeStart(e, "se")}
              className="hidden md:block absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-10 hover:bg-[#E8C24A]/20 rounded-br-2xl"
            />
            {/* Edges - hidden on mobile */}
            <div
              onMouseDown={(e) => handleResizeStart(e, "n")}
              className="hidden md:block absolute top-0 left-4 right-4 h-2 cursor-n-resize z-10 hover:bg-[#E8C24A]/10"
            />
            <div
              onMouseDown={(e) => handleResizeStart(e, "s")}
              className="hidden md:block absolute bottom-0 left-4 right-4 h-2 cursor-s-resize z-10 hover:bg-[#E8C24A]/10"
            />
            <div
              onMouseDown={(e) => handleResizeStart(e, "w")}
              className="hidden md:block absolute left-0 top-4 bottom-4 w-2 cursor-w-resize z-10 hover:bg-[#E8C24A]/10"
            />
            <div
              onMouseDown={(e) => handleResizeStart(e, "e")}
              className="hidden md:block absolute right-0 top-4 bottom-4 w-2 cursor-e-resize z-10 hover:bg-[#E8C24A]/10"
            />

            {/* iOS-style Drag Handle (Mobile Only) */}
            <motion.div
              className="md:hidden flex justify-center pt-3 pb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="w-12 h-1 bg-white/40 rounded-full"
                animate={{ scaleX: [1, 1.2, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: 2,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Header */}
            <div className="bg-[#111] text-white px-4 py-3 flex items-center justify-between shrink-0 border-b border-white/10 relative">
              {/* Drag indicator - top left (desktop only) */}
              <div className="hidden md:block absolute top-2 left-2 opacity-30 pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <line x1="3" y1="3" x2="8" y2="3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="3" y1="6" x2="8" y2="6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="3" y1="9" x2="8" y2="9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <defs>
                      <linearGradient id="hexGradientSmall" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#e0e0e0', stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: '#f5f5f5', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#d0d0d0', stopOpacity: 1 }} />
                      </linearGradient>
                      <linearGradient id="innerGradientSmall" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#4a4a4a', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#2a2a2a', stopOpacity: 1 }} />
                      </linearGradient>
                    </defs>
                    <polygon
                      points="100,20 170,60 170,140 100,180 30,140 30,60"
                      fill="url(#hexGradientSmall)"
                      stroke="#ffffff"
                      strokeWidth="3"
                    />
                    <polygon
                      points="100,45 150,72.5 150,127.5 100,155 50,127.5 50,72.5"
                      fill="url(#innerGradientSmall)"
                    />
                    <text
                      x="100"
                      y="115"
                      fontFamily="Arial, sans-serif"
                      fontSize="60"
                      fontWeight="bold"
                      fill="#ffffff"
                      textAnchor="middle"
                    >
                      AI
                    </text>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">BeeBot Assistant</h3>
                  <span className="text-xs text-white/60 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    Online - Replies instantly
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {/* Drag handle - desktop only */}
                <div className="hidden md:block p-2 opacity-50">
                  <GripVertical className="w-4 h-4" />
                </div>
                {/* Minimize button - mobile only */}
                <button
                  onClick={() => {
                    setIsMinimized(true)
                    setTimeout(() => setIsOpen(false), 200)
                  }}
                  className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-all active:scale-90"
                  aria-label="Minimize chat"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                    <line x1="4" y1="8" x2="12" y2="8" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-all active:scale-90"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex gap-3", message.role === "user" ? "flex-row-reverse" : "")}
                >
                  <div
                    className={cn(
                      "w-8 h-8 flex items-center justify-center shrink-0",
                      message.role === "user" ? "bg-white/10 text-white rounded-full" : "",
                    )}
                  >
                    {message.role === "user" ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <svg viewBox="0 0 200 200" className="w-full h-full">
                        <defs>
                          <linearGradient id="hexGradientMsg" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#e0e0e0', stopOpacity: 1 }} />
                            <stop offset="50%" style={{ stopColor: '#f5f5f5', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#d0d0d0', stopOpacity: 1 }} />
                          </linearGradient>
                          <linearGradient id="innerGradientMsg" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#4a4a4a', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#2a2a2a', stopOpacity: 1 }} />
                          </linearGradient>
                        </defs>
                        <polygon
                          points="100,20 170,60 170,140 100,180 30,140 30,60"
                          fill="url(#hexGradientMsg)"
                          stroke="#ffffff"
                          strokeWidth="3"
                        />
                        <polygon
                          points="100,45 150,72.5 150,127.5 100,155 50,127.5 50,72.5"
                          fill="url(#innerGradientMsg)"
                        />
                        <text
                          x="100"
                          y="115"
                          fontFamily="Arial, sans-serif"
                          fontSize="60"
                          fontWeight="bold"
                          fill="#ffffff"
                          textAnchor="middle"
                        >
                          AI
                        </text>
                      </svg>
                    )}
                  </div>
                  <div className={cn("max-w-[75%]", message.role === "user" ? "text-right" : "")}>
                    <div
                      className={cn(
                        "px-4 py-3 rounded-2xl",
                        message.role === "user"
                          ? "bg-[#E8C24A] text-black rounded-br-md"
                          : "bg-white/10 text-white rounded-bl-md",
                      )}
                    >
                      <p className={cn("text-sm leading-relaxed whitespace-pre-line", isWide && "text-base")}>
                        {message.content}
                      </p>
                    </div>
                    {/* Action buttons */}
                    {message.actions && message.actions.length > 0 && (
                      <div className={cn("flex flex-wrap gap-2 mt-2", isWide ? "gap-3" : "")}>
                        {message.actions.map((action) => (
                          <a
                            key={action.label}
                            href={action.href}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#E8C24A]/20 hover:bg-[#E8C24A]/30 text-[#E8C24A] text-xs font-medium rounded-full transition-colors"
                          >
                            {action.label.includes("Call") && <Phone className="w-3 h-3" />}
                            {action.label.includes("Browse") && <Calendar className="w-3 h-3" />}
                            {action.label}
                          </a>
                        ))}
                      </div>
                    )}
                    <span className="text-[10px] mt-1 block text-white/40">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                  <div className="w-8 h-8 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <defs>
                        <linearGradient id="hexGradientTyping" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{ stopColor: '#e0e0e0', stopOpacity: 1 }} />
                          <stop offset="50%" style={{ stopColor: '#f5f5f5', stopOpacity: 1 }} />
                          <stop offset="100%" style={{ stopColor: '#d0d0d0', stopOpacity: 1 }} />
                        </linearGradient>
                        <linearGradient id="innerGradientTyping" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{ stopColor: '#4a4a4a', stopOpacity: 1 }} />
                          <stop offset="100%" style={{ stopColor: '#2a2a2a', stopOpacity: 1 }} />
                        </linearGradient>
                      </defs>
                      <polygon
                        points="100,20 170,60 170,140 100,180 30,140 30,60"
                        fill="url(#hexGradientTyping)"
                        stroke="#ffffff"
                        strokeWidth="3"
                      />
                      <polygon
                        points="100,45 150,72.5 150,127.5 100,155 50,127.5 50,72.5"
                        fill="url(#innerGradientTyping)"
                      />
                      <text
                        x="100"
                        y="115"
                        fontFamily="Arial, sans-serif"
                        fontSize="60"
                        fontWeight="bold"
                        fill="#ffffff"
                        textAnchor="middle"
                      >
                        AI
                      </text>
                    </svg>
                  </div>
                  <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <span
                        className="w-2 h-2 bg-white/40 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-2 h-2 bg-white/40 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-2 h-2 bg-white/40 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies - Adaptive layout based on width */}
            {showQuickReplies && (
              <div className="px-4 pb-2 shrink-0">
                <p className="text-xs text-white/40 mb-2">Quick questions:</p>
                <div className={cn("flex flex-wrap gap-2", isWide && "grid grid-cols-2")}>
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleSend(reply)}
                      className="px-3 py-1.5 bg-white/5 text-white text-xs rounded-full hover:bg-[#E8C24A] hover:text-black transition-colors border border-white/10"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/10 shrink-0" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
                className="flex gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  enterKeyHint="send"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="sentences"
                  spellCheck="true"
                  className="flex-1 px-4 py-3 bg-white/5 border-2 border-white/30 rounded-full text-white placeholder:text-white/40 focus:outline-none focus:border-white/60 focus:ring-1 focus:ring-white/20 transition-all"
                  style={{ fontSize: '16px' }}
                />
                <motion.div whileTap={{ scale: 0.85 }}>
                  <Button
                    type="submit"
                    size="icon"
                    className="rounded-full bg-[#E8C24A] text-black hover:bg-[#E8C24A] w-10 h-10 active:scale-90 transition-transform"
                    disabled={!input.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </motion.div>
              </form>
              <p className="text-[10px] text-white/40 text-center mt-2">
                Or call us at{" "}
                <a href="tel:435-628-6663" className="text-[#E8C24A] hover:underline">
                  (435) 628-6663
                </a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
