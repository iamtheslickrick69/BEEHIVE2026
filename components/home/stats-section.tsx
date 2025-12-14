"use client"

import { motion, AnimatePresence, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Truck, Award, Users, ShieldCheck, Quote, Star } from "lucide-react"

const stats = [
  { value: 500, suffix: "+", label: "Equipment Items", icon: Truck },
  { value: 30, suffix: "+", label: "Years Experience", icon: Award },
  { value: 10000, suffix: "+", label: "Happy Customers", icon: Users },
  { value: 98, suffix: "%", label: "On-Time Delivery", icon: ShieldCheck },
]

const testimonials = [
  {
    id: 1,
    name: "Taylor Frazier",
    role: "Owner",
    company: "Turf It Landscaping",
    content:
      "Beehive is your one stop shop for all things equipment rentals. The staff is friendly and they have the most up to date equipment with the best prices in town!",
    rating: 5,
  },
  {
    id: 2,
    name: "Abel Alvallar",
    role: "Owner",
    company: "Gardesign Landscaping",
    content:
      "Best customer service and only place in town that has all equipment available. Always has everything we ask for. We rent and we buy from beehive.",
    rating: 5,
  },
  {
    id: 3,
    name: "Rudy Ventura",
    role: "Owner",
    company: "RG Quality Concrete",
    content: "They are wonderful people to work with, and they have about everything to rent. We always go with them.",
    rating: 5,
  },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Auto-rotate testimonials every 15 seconds
  useEffect(() => {
    if (isHovered) return // Pause when hovered

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 15000)

    return () => clearInterval(timer)
  }, [isHovered])

  return (
    <motion.section
      id="stats"
      className="py-8 md:py-12 bg-[#E8C24A] relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Pill-Shaped Stat Badges */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 md:mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -1 }}
              className="group"
            >
              <div className="relative">
                {/* Pill Background */}
                <div className="bg-black/90 backdrop-blur-sm text-[#E8C24A] rounded-2xl px-3 md:px-4 py-2 md:py-2.5 flex items-center gap-2 shadow-md hover:shadow-lg hover:shadow-black/20 transition-all duration-300 border border-black/10">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: "spring", bounce: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <stat.icon className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
                  </motion.div>

                  {/* Content */}
                  <div className="text-left">
                    <div className="text-lg md:text-xl lg:text-2xl font-bold leading-none mb-0.5">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-[9px] md:text-[10px] font-medium opacity-80 leading-none whitespace-nowrap">
                      {stat.label}
                    </div>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-[#E8C24A]/0 group-hover:bg-[#E8C24A]/10 blur-lg transition-all duration-300 -z-10" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="bg-white rounded-xl p-6 md:p-8 lg:p-10 border border-gray-200 shadow-md relative overflow-hidden">

            {/* Animated Testimonial Content */}
            <div className="relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Quote */}
                  <p className="text-base md:text-xl lg:text-2xl text-black/90 leading-relaxed mb-5 md:mb-6 italic font-medium min-h-[80px] md:min-h-[100px]">
                    &quot;{testimonials[currentIndex].content}&quot;
                  </p>

                  {/* Author Info */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3 mb-3"
                  >
                    <div className="flex-1">
                      <h4 className="font-bold text-black text-base md:text-lg mb-0.5">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-xs md:text-sm text-black/60">
                        {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                      </p>
                    </div>

                    {/* Star Rating */}
                    <motion.div
                      className="flex gap-0.5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.4 + i * 0.1, type: "spring", bounce: 0.5 }}
                        >
                          <Star className="w-4 h-4 md:w-5 md:h-5 fill-[#E8C24A] text-[#E8C24A]" />
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="relative group"
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  {/* Dot */}
                  <div
                    className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-black scale-125"
                        : "bg-black/20 hover:bg-black/40"
                    }`}
                  />

                  {/* Active indicator glow */}
                  {index === currentIndex && (
                    <motion.div
                      layoutId="activeTestimonial"
                      className="absolute inset-0 rounded-full bg-black/20 blur-md -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
