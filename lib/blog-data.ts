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
    title: "The Real Guide to Equipment Rental in Southern Utah",
    excerpt: "30 years of watching contractors figure out what works. The honest truth about renting vs. owning, hidden costs, and matching equipment to your project.",
    category: "Guide",
    readTime: "8 min read",
    image: "/bobcat-skid-steer-loader-yellow-construction.jpg",
    date: "2024-12-01",
  },
  {
    slug: "what-equipment-do-you-need",
    title: "What Equipment Do You Actually Need?",
    excerpt: "Stop guessing. A practical breakdown by project type—landscaping, trenching, concrete, demolition—with specific equipment recommendations.",
    category: "Projects",
    readTime: "10 min read",
    image: "/mini-excavator-compact-construction-equipment.jpg",
    date: "2024-11-15",
  },
  {
    slug: "first-time-rental-guide",
    title: "First-Time Renter? Read This First",
    excerpt: "The things nobody tells first-time renters. How to avoid surprise charges, common mistakes, and what to ask before you leave the yard.",
    category: "Beginners",
    readTime: "7 min read",
    image: "/concrete-mixer-buggy-power-trowel-construction.jpg",
    date: "2024-11-01",
  },
  {
    slug: "complete-equipment-catalog",
    title: "Complete Equipment Catalog",
    excerpt: "Full specs, capacities, and recommended uses for every machine in our fleet. Bookmark this for project planning.",
    category: "Catalog",
    readTime: "12 min read",
    image: "/portable-air-compressor-towable-construction.jpg",
    date: "2024-10-15",
  },
]
