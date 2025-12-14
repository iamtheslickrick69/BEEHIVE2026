"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Clock, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { blogPosts } from "@/lib/blog-data"
import { blogContent } from "@/lib/blog-content"
import { ArticleSidebar } from "@/components/blog/article-sidebar"
import { motion, AnimatePresence } from "framer-motion"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

const articles = [
  { id: "equipment-rentals-southern-utah-guide", label: "Complete Guide" },
  { id: "what-equipment-do-you-need", label: "Project Guide" },
  { id: "first-time-rental-guide", label: "Beginner Guide" },
  { id: "complete-equipment-catalog", label: "Equipment Catalog" },
]

const relatedEquipment = [
  {
    name: "Bobcat S450 Skid Steer",
    image: "/bobcat-skid-steer-loader-yellow-construction.jpg",
    href: "/inventory?category=skid-steers",
  },
  {
    name: "Bobcat E35 Excavator",
    image: "/mini-excavator-compact-construction-equipment.jpg",
    href: "/inventory?category=mini-excavators",
  },
  {
    name: "Concrete Equipment",
    image: "/concrete-mixer-buggy-power-trowel-construction.jpg",
    href: "/inventory?category=concrete",
  },
]

function GuidesPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const articleParam = searchParams?.get("article")
  const [activeArticle, setActiveArticle] = useState(articleParam || articles[0].id)

  useEffect(() => {
    if (articleParam && articles.find((a) => a.id === articleParam)) {
      setActiveArticle(articleParam)
    }
  }, [articleParam])

  const handleTabChange = (articleId: string) => {
    setActiveArticle(articleId)
    router.push(`/blog/guides?article=${articleId}`, { scroll: false })
  }

  const currentPost = blogPosts.find((p) => p.slug === activeArticle)
  const currentContent = blogContent[activeArticle]

  if (!currentPost || !currentContent) {
    return <div>Article not found</div>
  }

  return (
    <main className="min-h-screen bg-background pt-20">
      {/* Tabs Header */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 py-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Link>
            </Button>
            <div className="flex-1 flex items-center gap-1 overflow-x-auto">
              {articles.map((article) => (
                <button
                  key={article.id}
                  onClick={() => handleTabChange(article.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                    activeArticle === article.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {article.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeArticle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Article Header */}
            <div className="mb-8">
              <span className="inline-block bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded mb-4">
                {currentPost.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {currentPost.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">{currentPost.excerpt}</p>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {currentPost.readTime}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(currentPost.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>

            {/* Article Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
              {/* Main Article */}
              <article
                className="prose prose-invert prose-yellow max-w-none
                  prose-headings:scroll-mt-24
                  prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-foreground prose-h2:border-l-4 prose-h2:border-primary prose-h2:pl-4
                  prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-foreground
                  prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:my-4
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:my-6
                  prose-blockquote:text-foreground
                  prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
                  prose-pre:bg-muted prose-pre:border prose-pre:border-border
                  prose-ul:my-6 prose-ul:text-muted-foreground
                  prose-ol:my-6 prose-ol:text-muted-foreground
                  prose-li:my-2 prose-li:text-muted-foreground
                  prose-table:w-full prose-table:my-8 prose-table:border-collapse
                  prose-thead:bg-muted
                  prose-th:text-left prose-th:font-semibold prose-th:text-foreground prose-th:p-4 prose-th:border prose-th:border-border
                  prose-td:p-4 prose-td:border prose-td:border-border prose-td:text-muted-foreground
                  prose-tr:transition-colors hover:prose-tr:bg-primary/5
                  prose-hr:border-border prose-hr:my-12
                  prose-img:rounded-lg prose-img:shadow-lg"
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: ({ children, ...props }) => {
                      const text = String(children)
                      const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")
                      return (
                        <h2 id={id} {...props}>
                          {children}
                        </h2>
                      )
                    },
                    h3: ({ children, ...props }) => {
                      const text = String(children)
                      const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")
                      return (
                        <h3 id={id} {...props}>
                          {children}
                        </h3>
                      )
                    },
                  }}
                >
                  {currentContent}
                </ReactMarkdown>
              </article>

              {/* Sidebar */}
              <aside className="hidden lg:block">
                <ArticleSidebar content={currentContent} relatedEquipment={relatedEquipment} />
              </aside>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA */}
      <div className="bg-primary/10 border-t border-primary/20 py-12 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">Ready to Start Your Project?</h2>
          <p className="text-muted-foreground mb-6">
            BeeHive Rental has the equipment you need. Stop by or give us a call.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/inventory">Browse Equipment</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="tel:+14356286663">Call 435-628-6663</a>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function GuidesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background pt-20">Loading...</div>}>
      <GuidesPageContent />
    </Suspense>
  )
}
