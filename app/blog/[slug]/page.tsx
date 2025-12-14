"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, Calendar, Share2, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { blogPosts } from "@/lib/blog-data"
import { blogContent } from "@/lib/blog-content"
import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { notFound } from "next/navigation"

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const post = blogPosts.find((p) => p.slug === slug)
  const content = blogContent[slug]

  // Redirect to new guides page
  useEffect(() => {
    if (post) {
      router.replace(`/blog/guides?article=${slug}`)
    }
  }, [slug, post, router])

  if (!post || !content) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px]">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-black/50" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 pb-12 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button asChild variant="ghost" className="mb-4 text-white hover:text-white hover:bg-white/10">
                <Link href="/blog/guides">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Articles
                </Link>
              </Button>
              <span className="inline-block bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded mb-4">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-6 text-white/70">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
          {/* Article */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose prose-invert prose-yellow max-w-none
              prose-headings:text-foreground
              prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground
              prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
              prose-table:border-border
              prose-th:bg-muted prose-th:text-foreground prose-th:font-semibold prose-th:p-3 prose-th:border-border
              prose-td:p-3 prose-td:border-border prose-td:text-muted-foreground
              prose-li:text-muted-foreground
              prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1 prose-code:rounded
              prose-hr:border-border"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </motion.article>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="sticky top-24 space-y-6">
              {/* Contact Card */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">Need Equipment?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  BeeHive Rental has everything you need for your project.
                </p>
                <div className="space-y-3">
                  <a
                    href="tel:+14356286663"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    435-628-6663
                  </a>
                  <a
                    href="mailto:beehiverental@infowest.com"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    beehiverental@infowest.com
                  </a>
                </div>
                <Button asChild className="w-full mt-4">
                  <Link href="/inventory">View Equipment</Link>
                </Button>
              </div>

              {/* Share */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share Article
                </h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href)
                    }}
                  >
                    Copy Link
                  </Button>
                </div>
              </div>

              {/* Related Articles */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">More Articles</h3>
                <div className="space-y-3">
                  {blogPosts
                    .filter((p) => p.slug !== slug)
                    .slice(0, 3)
                    .map((relatedPost) => (
                      <Link
                        key={relatedPost.slug}
                        href={`/blog/${relatedPost.slug}`}
                        className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {relatedPost.title}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary/10 border-t border-primary/20 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Ready to Start Your Project?
          </h2>
          <p className="text-muted-foreground mb-6">
            BeeHive Rental has the equipment you need. Stop by or give us a call.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/inventory">Browse Equipment</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="tel:+14356286663">
                <Phone className="w-4 h-4 mr-2" />
                Call 435-628-6663
              </a>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
