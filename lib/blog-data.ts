export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  image: string
  date: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: "equipment-rentals-southern-utah-guide",
    title: "Equipment Rentals in Southern Utah: The Complete Guide",
    excerpt: "From skid steers to concrete tools, everything contractors and homeowners need to know about renting equipment in St. George and beyond.",
    category: "Guide",
    readTime: "12 min read",
    image: "/bobcat-skid-steer-loader-yellow-construction.jpg",
    date: "2024-12-01",
  },
  {
    slug: "what-equipment-do-you-need",
    title: "What Equipment Do You Need? Project-by-Project Guide",
    excerpt: "Stop guessing. This guide matches BeeHive's equipment to your project—landscaping, concrete, trenching, demolition, and more.",
    category: "Projects",
    readTime: "15 min read",
    image: "/mini-excavator-compact-construction-equipment.jpg",
    date: "2024-11-15",
  },
  {
    slug: "first-time-rental-guide",
    title: "First-Time Equipment Rental Guide for Beginners",
    excerpt: "Never rented before? Everything you need to know—deposits, rental periods, what to expect, and how to choose the right machine.",
    category: "Beginners",
    readTime: "10 min read",
    image: "/concrete-mixer-buggy-power-trowel-construction.jpg",
    date: "2024-11-01",
  },
  {
    slug: "complete-equipment-catalog",
    title: "BeeHive Equipment Catalog: Complete Inventory & Specs",
    excerpt: "Full specifications, capacities, and applications for every machine in our fleet—from excavators to generators.",
    category: "Catalog",
    readTime: "20 min read",
    image: "/portable-air-compressor-towable-construction.jpg",
    date: "2024-10-15",
  },
]
