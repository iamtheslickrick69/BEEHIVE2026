"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Clock, BookOpen, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { blogPosts } from "@/lib/blog-data"
import { motion, AnimatePresence } from "framer-motion"

export function BlogSection() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section className="relative py-12 overflow-hidden bg-black border-t border-white/10">
      {/* Minimalistic Header - Always Visible */}
      <div className="max-w-7xl mx-auto px-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full group"
        >
          <div className="flex items-center justify-between py-6 border-b border-white/10 hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 transition-all">
                <BookOpen className="w-6 h-6 text-white/60 group-hover:text-primary transition-colors" />
              </div>
              <div className="text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-white group-hover:text-primary transition-colors">
                  Blog
                </h2>
                <p className="text-white/50 text-sm">Equipment guides & resources</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden md:block text-white/50 text-sm group-hover:text-white/70 transition-colors">
                {isExpanded ? "Hide" : "View"} {blogPosts.length} articles
              </span>
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 transition-all">
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-white/60 group-hover:text-primary transition-colors" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-white/60 group-hover:text-primary group-hover:translate-y-0.5 transition-all" />
                )}
              </div>
            </div>
          </div>
        </button>

        {/* Expandable Content - Hidden by Default */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-12 pb-8">
                {/* Animated Background (only when expanded) */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  {/* Animated glowing orbs */}
                  <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#E8C24A]/10 blur-[120px]"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                      x: [0, 50, 0],
                      y: [0, -30, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-amber-600/10 blur-[100px]"
                    animate={{
                      scale: [1.2, 1, 1.2],
                      opacity: [0.2, 0.4, 0.2],
                      x: [0, -40, 0],
                      y: [0, 40, 0],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>

                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-12 relative z-10"
                >
                  <span className="text-primary font-semibold text-sm tracking-wider uppercase">
                    Resources
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mt-2">
                    Equipment Guides & Advice
                  </h3>
                  <p className="text-white/70 mt-3 max-w-2xl mx-auto">
                    Practical knowledge from 30 years in the rental business. No fluff—just what actually works.
                  </p>
                </motion.div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                  {blogPosts.map((post, index) => (
                    <motion.div
                      key={post.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Link
                        href={`/blog/guides?article=${post.slug}`}
                        className="group block h-full bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden hover:bg-white/15 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300"
                      >
                        {/* Image */}
                        <div className="relative h-40 overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">
                            {post.category}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          <h4 className="font-semibold text-white group-hover:text-primary transition-colors line-clamp-2 mb-2">
                            {post.title}
                          </h4>
                          <p className="text-white/60 text-sm line-clamp-2 mb-3">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-white/50">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.readTime}
                            </div>
                            <span className="flex items-center gap-1 text-primary group-hover:gap-2 transition-all">
                              Read
                              <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-center mt-10 relative z-10"
                >
                  <Button
                    asChild
                    variant="outline"
                    className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white"
                  >
                    <Link href="/blog/guides">
                      <BookOpen className="w-4 h-4 mr-2" />
                      View All Articles
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
