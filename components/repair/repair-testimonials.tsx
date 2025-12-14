"use client"

import { Star, Quote } from "lucide-react"
import { motion } from "framer-motion"

const testimonials = [
  {
    id: 1,
    name: "Taylor Frazier",
    role: "Owner",
    company: "Turf It Landscaping",
    content:
      "Beehive is your one stop shop for all things equipment rentals. The staff is friendly and they have the most up to date equipment with the best prices in town! I highly recommend them for your next project!",
    rating: 5,
  },
  {
    id: 2,
    name: "Abel Alvallar",
    role: "Owner",
    company: "Gardesign Landscaping",
    content:
      "Best customer service and only place in town that has all equipment available. Always has everything we ask for. We rent and we buy from beehive. I'd give 100 stars if google would let me!",
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

export function RepairTestimonials() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-black via-black/95 to-black">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Here's what local contractors have to say about our service.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-[#E8C24A]/50 hover:bg-white/10 transition-all group relative hover:shadow-xl hover:shadow-[#E8C24A]/10"
            >
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 + 0.2, type: "spring" }}
              >
                <Quote className="w-10 h-10 text-[#E8C24A]/20 mb-4" />
              </motion.div>

              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              <div className="border-t border-white/10 pt-4">
                <h4 className="font-bold text-white text-base">{testimonial.name}</h4>
                <p className="text-white/50 text-sm mb-2">
                  {testimonial.role}, {testimonial.company}
                </p>
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.15 + 0.4 + i * 0.05, type: "spring" }}
                    >
                      <Star className="w-4 h-4 fill-[#E8C24A] text-[#E8C24A]" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
