"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Clock, Calendar, AlertTriangle, Lightbulb, CheckCircle2, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { blogPosts } from "@/lib/blog-data"
import { blogContent } from "@/lib/blog-content"
import { motion, AnimatePresence } from "framer-motion"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

const articles = [
  { id: "equipment-rentals-southern-utah-guide", label: "Complete Guide" },
  { id: "what-equipment-do-you-need", label: "Project Guide" },
  { id: "first-time-rental-guide", label: "Beginner Guide" },
  { id: "complete-equipment-catalog", label: "Equipment Catalog" },
]

// Custom callout component
function Callout({ type, children }: { type: string; children: React.ReactNode }) {
  const styles = {
    tip: {
      bg: "bg-[#E8C24A]/10",
      border: "border-[#E8C24A]/30",
      icon: <Lightbulb className="w-5 h-5 text-[#E8C24A]" />,
      title: "Pro Tip"
    },
    warning: {
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
      title: "Watch Out"
    },
    info: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      icon: <Info className="w-5 h-5 text-blue-500" />,
      title: "Good to Know"
    },
    success: {
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
      title: "Key Point"
    }
  }

  const style = styles[type as keyof typeof styles] || styles.info

  return (
    <div className={`${style.bg} ${style.border} border rounded-xl p-5 my-8`}>
      <div className="flex items-center gap-2 mb-2">
        {style.icon}
        <span className="font-semibold text-foreground text-sm uppercase tracking-wide">{style.title}</span>
      </div>
      <div className="text-muted-foreground leading-relaxed">{children}</div>
    </div>
  )
}

// Custom testimonial component
function Testimonial({ quote, author, company }: { quote: string; author: string; company?: string }) {
  return (
    <div className="relative my-12 py-8 px-8 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent rounded-2xl border border-primary/20">
      <div className="absolute -top-4 left-8 text-6xl text-primary/30 font-serif">"</div>
      <p className="text-lg md:text-xl text-foreground leading-relaxed italic mb-4 relative z-10">
        {quote}
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-primary font-bold">{author.charAt(0)}</span>
        </div>
        <div>
          <p className="font-semibold text-foreground">{author}</p>
          {company && <p className="text-sm text-muted-foreground">{company}</p>}
        </div>
      </div>
    </div>
  )
}

// Equipment card for catalog
function EquipmentCard({ name, specs, bestFor }: { name: string; specs: Record<string, string>; bestFor: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 my-4 hover:border-primary/50 transition-colors">
      <h4 className="text-lg font-bold text-foreground mb-4">{name}</h4>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {Object.entries(specs).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">{key}</span>
            <span className="text-sm text-foreground font-medium">{value}</span>
          </div>
        ))}
      </div>
      <div className="pt-4 border-t border-border">
        <span className="text-xs text-primary uppercase tracking-wide font-semibold">Best For</span>
        <p className="text-sm text-muted-foreground mt-1">{bestFor}</p>
      </div>
    </div>
  )
}

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
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
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
      <div className="max-w-7xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeArticle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Article Header */}
            <div className="max-w-3xl mx-auto mb-12">
              <span className="inline-block bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded mb-6">
                {currentPost.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {currentPost.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">{currentPost.excerpt}</p>
              <div className="flex items-center gap-6 text-sm text-muted-foreground pb-8 border-b border-border">
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

            {/* Article Content */}
            <div className="max-w-3xl mx-auto">
              <article
                className="prose prose-invert prose-yellow max-w-none
                  [&>*]:mb-6
                  prose-headings:scroll-mt-24
                  prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-16 prose-h2:mb-6 prose-h2:text-foreground prose-h2:border-l-4 prose-h2:border-primary prose-h2:pl-5 prose-h2:py-2
                  prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-foreground prose-h3:text-primary
                  prose-p:text-muted-foreground prose-p:leading-[1.8] prose-p:text-base prose-p:my-5
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-gradient-to-r prose-blockquote:from-primary/10 prose-blockquote:to-transparent prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:my-10 prose-blockquote:text-foreground prose-blockquote:text-lg
                  prose-code:text-primary prose-code:bg-primary/10 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
                  prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-xl
                  prose-ul:my-6 prose-ul:text-muted-foreground prose-ul:space-y-3
                  prose-ol:my-6 prose-ol:text-muted-foreground prose-ol:space-y-3
                  prose-li:text-muted-foreground prose-li:leading-relaxed
                  prose-table:w-full prose-table:my-10 prose-table:border-collapse prose-table:rounded-xl prose-table:overflow-hidden
                  prose-thead:bg-primary/10
                  prose-th:text-left prose-th:font-semibold prose-th:text-foreground prose-th:p-4 prose-th:border-b prose-th:border-border
                  prose-td:p-4 prose-td:border-b prose-td:border-border/50 prose-td:text-muted-foreground
                  prose-tr:transition-colors hover:prose-tr:bg-primary/5
                  prose-hr:border-border prose-hr:my-16"
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
                    // Custom blockquote styling for testimonials
                    blockquote: ({ children }) => {
                      return (
                        <blockquote className="relative my-12 py-8 px-8 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent rounded-2xl border border-primary/20 not-italic">
                          <div className="absolute -top-4 left-8 text-6xl text-primary/30 font-serif">"</div>
                          <div className="relative z-10 text-lg text-foreground leading-relaxed">
                            {children}
                          </div>
                        </blockquote>
                      )
                    },
                    // Better table styling
                    table: ({ children }) => (
                      <div className="my-10 rounded-xl border border-border overflow-hidden">
                        <table className="w-full">{children}</table>
                      </div>
                    ),
                    thead: ({ children }) => (
                      <thead className="bg-primary/10">{children}</thead>
                    ),
                    th: ({ children }) => (
                      <th className="text-left font-semibold text-foreground p-4 border-b border-border">{children}</th>
                    ),
                    td: ({ children }) => (
                      <td className="p-4 border-b border-border/50 text-muted-foreground">{children}</td>
                    ),
                    tr: ({ children }) => (
                      <tr className="transition-colors hover:bg-primary/5">{children}</tr>
                    ),
                    // Style horizontal rules as section breaks
                    hr: () => (
                      <div className="my-16 flex items-center justify-center gap-4">
                        <div className="h-px bg-border flex-1" />
                        <div className="w-2 h-2 rounded-full bg-primary/50" />
                        <div className="h-px bg-border flex-1" />
                      </div>
                    ),
                    // Make lists look better
                    ul: ({ children }) => (
                      <ul className="my-6 space-y-3 list-none pl-0">
                        {children}
                      </ul>
                    ),
                    li: ({ children }) => (
                      <li className="flex gap-3 text-muted-foreground leading-relaxed">
                        <span className="text-primary mt-1.5">•</span>
                        <span>{children}</span>
                      </li>
                    ),
                  }}
                >
                  {currentContent}
                </ReactMarkdown>
              </article>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-b from-primary/10 to-primary/5 border-t border-primary/20 py-16 mt-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Start Your Project?</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            BeeHive Rental has the equipment you need. Stop by or give us a call.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-base px-8">
              <Link href="/inventory">Browse Equipment</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8">
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
