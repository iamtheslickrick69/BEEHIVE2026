"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

const testimonials = [
  {
    id: 1,
    name: "Taylor Frazier",
    role: "Owner",
    company: "Turf It Landscaping",
    image: "/professional-headshot-man-landscaping.jpg",
    content:
      "Beehive is your one stop shop for all things equipment rentals. The staff is friendly and they have the most up to date equipment with the best prices in town! I highly recommend them for your next project!",
    rating: 5,
  },
  {
    id: 2,
    name: "Abel Alvallar",
    role: "Owner",
    company: "Gardesign Landscaping",
    image: "/professional-headshot-contractor.jpg",
    content:
      "Best customer service and only place in town that has all equipment available. Always has everything we ask for. We rent and we buy from beehive. I'd give 100 stars if google would let me!",
    rating: 5,
  },
  {
    id: 3,
    name: "Rudy Ventura",
    role: "Owner",
    company: "RG Quality Concrete",
    image: "/professional-headshot-construction-worker.jpg",
    content: "They are wonderful people to work with, and they have about everything to rent. We always go with them.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollAnimation>
          <div className="text-center mb-6 md:mb-10">
            <span className="text-primary font-semibold text-sm tracking-widest uppercase">Testimonials</span>
            <h2
              className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mt-2 mb-3 uppercase tracking-tight"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              What Our Customers Say
            </h2>
          </div>
        </ScrollAnimation>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-xl p-6 md:p-10 border border-border shadow-lg"
            >
              <Quote className="w-8 md:w-10 h-8 md:h-10 text-primary/20 mb-4 md:mb-6" />
              <p className="text-base md:text-lg text-foreground leading-relaxed mb-6 md:mb-8">
                &quot;{testimonials[currentIndex].content}&quot;
              </p>
              <div>
                <h4 className="font-semibold text-foreground text-sm md:text-base">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                </p>
                <div className="flex gap-0.5 mt-1">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-primary text-primary" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6 md:mt-8">
            <Button variant="outline" size="icon" onClick={prev} className="rounded-full bg-transparent w-10 h-10">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={next} className="rounded-full bg-transparent w-10 h-10">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
