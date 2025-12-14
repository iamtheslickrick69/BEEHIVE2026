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

const MIN_WIDTH = 320
const MIN_HEIGHT = 400
const MAX_WIDTH_RATIO = 0.9
const MAX_HEIGHT_RATIO = 0.9

const quickReplies = [
  "What equipment do you have?",
  "What are your rates?",
  "Do you deliver?",
  "Hours of operation?",
  "I need help with a project",
]

const mockResponses: Record<string, { content: string; actions?: { label: string; href: string }[] }> = {
  "what equipment do you have?": {
    content:
      "We have over 100 pieces of equipment including skid steers, mini excavators, compaction equipment, air compressors, saws, concrete equipment, dump trailers, and more! What type of project are you working on?",
    actions: [
      { label: "Browse Equipment", href: "/inventory" },
      { label: "View Categories", href: "/#equipment" },
    ],
  },
  "what are your rates?": {
    content:
      "Our rates vary by equipment type:\n\n• Hand tools: $25-75/day\n• Power equipment: $65-200/day\n• Heavy machinery: $175-400+/day\n\nWe offer weekly and monthly discounts. Would you like a quote for specific equipment?",
    actions: [{ label: "Get a Quote", href: "/#contact" }],
  },
  "do you deliver?": {
    content:
      "Yes! We deliver throughout Southern Utah including St. George, Washington, Hurricane, Ivins, Santa Clara, and surrounding areas. Delivery fees vary by location and equipment size.",
    actions: [{ label: "Contact Us", href: "/#contact" }],
  },
  "hours of operation?": {
    content:
      "We're open:\n\nMonday - Friday: 7:00 AM - 5:00 PM\nSaturday: 8:00 AM - 12:00 PM\nSunday: Closed\n\nYou can browse equipment and request quotes online 24/7!",
    actions: [
      { label: "Call Now", href: "tel:435-628-6663" },
      { label: "Browse Equipment", href: "/inventory" },
    ],
  },
  "i need help with a project": {
    content:
      "I'd love to help! Tell me more about your project:\n\n• What type of work? (excavation, landscaping, concrete, etc.)\n• How long do you need the equipment?\n• Any specific requirements?\n\nOr call us at (435) 628-6663 and speak with one of our experts!",
    actions: [
      { label: "Call Expert", href: "tel:435-628-6663" },
    ],
  },
  default: {
    content:
      "Thanks for reaching out! I can help you with:\n\n• Finding the right equipment\n• Rental rates and availability\n• Delivery information\n• Repair services\n\nWhat would you like to know more about?",
  },
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi there! I'm BeeBot, your equipment rental assistant. How can I help you today? You can ask me about equipment, rates, delivery, or anything else!",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [size, setSize] = useState<Size>({ width: 400, height: 550 })
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState<string | null>(null)
  const resizeStartRef = useRef<{ x: number; y: number; width: number; height: number } | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
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

    setTimeout(
      () => {
        const lowerText = messageText.toLowerCase()
        let response = mockResponses.default

        for (const [key, value] of Object.entries(mockResponses)) {
          if (lowerText.includes(key) || key.split(" ").some((word) => lowerText.includes(word) && word.length > 3)) {
            response = value
            break
          }
        }

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
      800 + Math.random() * 800,
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
              scale: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.2 }
            }}
            whileHover={{ scale: hasScrolled ? 1.0 : 1.07 }}
            whileTap={{ scale: hasScrolled ? 0.88 : 0.95 }}
            onClick={() => setIsOpen(true)}
            className="group fixed bottom-6 right-4 sm:bottom-10 sm:right-6 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 flex items-center justify-center z-50 bg-transparent"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.2)) drop-shadow(0 0 30px rgba(255, 255, 255, 0.1))',
            }}
            aria-label="Open chat assistant"
          >

            {/* SVG AI Icon */}
            <div className="relative flex items-center justify-center w-full h-full">
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full"
                style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))' }}
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
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              width: typeof window !== 'undefined' && window.innerWidth < 768 ? '100vw' : size.width,
              height: typeof window !== 'undefined' && window.innerWidth < 768 ? '100vh' : size.height
            }}
            className={cn(
              "fixed z-50 bg-[#0a0a0a] shadow-2xl border border-white/10 flex flex-col overflow-hidden",
              "md:bottom-10 md:right-6 md:rounded-2xl",
              "bottom-0 right-0 left-0 top-0 rounded-none",
              isResizing && "select-none",
            )}
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

            {/* Header */}
            <div className="bg-[#111] text-white px-4 py-3 flex items-center justify-between shrink-0 border-b border-white/10 relative">
              {/* Drag indicator - top left (hidden on mobile) */}
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
                {/* Drag handle - hidden on mobile */}
                <div className="hidden md:block p-2 opacity-50">
                  <GripVertical className="w-4 h-4" />
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
            <div className="p-4 pb-6 md:pb-4 border-t border-white/10 shrink-0">
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
                  className="flex-1 px-4 py-2.5 bg-white/5 border-2 border-white/30 rounded-full text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/60 focus:ring-1 focus:ring-white/20 transition-all"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="rounded-full bg-[#E8C24A] text-black hover:bg-[#E8C24A] w-10 h-10"
                  disabled={!input.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
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
