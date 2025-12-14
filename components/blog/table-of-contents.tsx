"use client"

import { useEffect, useState } from "react"
import { List } from "lucide-react"

interface TOCItem {
  id: string
  text: string
  level: number
}

export function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    // Extract headings from markdown content
    const lines = content.split("\n")
    const tocItems: TOCItem[] = []

    lines.forEach((line, index) => {
      if (line.startsWith("## ")) {
        const text = line.replace("## ", "").trim()
        const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")
        tocItems.push({ id, text, level: 2 })
      } else if (line.startsWith("### ")) {
        const text = line.replace("### ", "").trim()
        const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")
        tocItems.push({ id, text, level: 3 })
      }
    })

    setHeadings(tocItems)
  }, [content])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-100px 0px -66%", threshold: 0 }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <div className="sticky top-24">
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
          <List className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-foreground text-sm">Jump to Section</h3>
        </div>
        <nav className="space-y-1 max-h-[60vh] overflow-y-auto">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth", block: "start" })
              }}
              className={`block text-sm py-1.5 px-2 rounded transition-colors ${
                heading.level === 3 ? "pl-4" : ""
              } ${
                activeId === heading.id
                  ? "text-primary bg-primary/10 font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
