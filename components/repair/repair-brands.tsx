"use client"

import { motion } from "framer-motion"

const brands = [
  "Caterpillar",
  "John Deere",
  "Bobcat",
  "Kubota",
  "Vermeer",
  "JLG",
  "Genie",
  "Honda",
  "Stihl",
  "Husqvarna",
  "Miller",
  "Lincoln Electric",
  "Generac",
  "Multiquip",
  "Wacker Neuson",
  "Ditch Witch",
]

export function RepairBrands() {
  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Brands We Service</h2>
          <p className="text-muted-foreground">Factory-trained on all major equipment brands</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {brands.map((brand, index) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              viewport={{ once: true }}
              className="bg-card rounded-lg p-4 border border-border flex items-center justify-center hover:border-primary/50 hover:shadow-md transition-all"
            >
              <span className="text-sm font-medium text-muted-foreground text-center">{brand}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
