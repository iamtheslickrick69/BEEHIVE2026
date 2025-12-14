"use client"

import { useState, useEffect } from "react"
import { Phone, Mail, Share2, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { TableOfContents } from "./table-of-contents"

interface RelatedEquipment {
  name: string
  image: string
  href: string
}

export function ArticleSidebar({ content, relatedEquipment }: { content: string; relatedEquipment?: RelatedEquipment[] }) {
  const [readingProgress, setReadingProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrolled = window.scrollY
      const progress = (scrolled / documentHeight) * 100
      setReadingProgress(Math.min(Math.max(progress, 0), 100))
    }

    window.addEventListener("scroll", updateProgress)
    updateProgress()

    return () => window.removeEventListener("scroll", updateProgress)
  }, [])

  return (
    <div className="space-y-6">
      {/* Table of Contents */}
      <TableOfContents content={content} />

      {/* Reading Progress */}
      <div className="sticky top-[calc(60vh+7rem)]">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Reading Progress</span>
            <span className="text-sm text-primary font-semibold">{Math.round(readingProgress)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-yellow-500 transition-all duration-300"
              style={{ width: `${readingProgress}%` }}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card border border-border rounded-xl p-4 mt-6">
          <div className="flex items-center gap-2 mb-4">
            <Phone className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground text-sm">Need Equipment?</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            BeeHive Rental has everything for your project.
          </p>
          <div className="space-y-2">
            <Button asChild size="sm" className="w-full">
              <a href="tel:+14356286663">
                <Phone className="w-3 h-3 mr-2" />
                Call Now
              </a>
            </Button>
            <Button asChild size="sm" variant="outline" className="w-full">
              <a href="mailto:beehiverental@infowest.com">
                <Mail className="w-3 h-3 mr-2" />
                Email
              </a>
            </Button>
            <Button asChild size="sm" variant="outline" className="w-full">
              <Link href="/inventory">View Equipment</Link>
            </Button>
          </div>
        </div>

        {/* Related Equipment */}
        {relatedEquipment && relatedEquipment.length > 0 && (
          <div className="bg-card border border-border rounded-xl p-4 mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-foreground text-sm">Featured Equipment</h3>
            </div>
            <div className="space-y-3">
              {relatedEquipment.map((equipment) => (
                <Link
                  key={equipment.name}
                  href={equipment.href}
                  className="block group"
                >
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
                    <img
                      src={equipment.image}
                      alt={equipment.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors flex-1">
                      {equipment.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Share */}
        <div className="bg-card border border-border rounded-xl p-4 mt-6">
          <div className="flex items-center gap-2 mb-3">
            <Share2 className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground text-sm">Share Article</h3>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="w-full"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
            }}
          >
            Copy Link
          </Button>
        </div>
      </div>
    </div>
  )
}
