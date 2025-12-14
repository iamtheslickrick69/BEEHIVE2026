import { promises as fs } from "fs"
import path from "path"
import { CopyPromptButton } from "@/components/ui/copy-prompt-button"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { FileCode2, Sparkles } from "lucide-react"

export const metadata = {
  title: "Claude Prompt - BeeHive Rental & Sales",
  description: "Development guidelines and context for Claude AI",
}

export default async function ClaudePromptPage() {
  // Read the CLAUDE.md file
  const filePath = path.join(process.cwd(), "CLAUDE.md")
  const claudeContent = await fs.readFile(filePath, "utf8")

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-gray-900">
      {/* Header */}
      <section className="relative py-16 bg-gradient-to-br from-black via-gray-900 to-black border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 backdrop-blur-sm rounded-full text-purple-400 text-sm font-medium mb-6 border border-purple-500/20">
              <Sparkles className="w-4 h-4" />
              AI DEVELOPMENT GUIDE
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Claude Development Prompt
            </h1>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Complete development guidelines, tech stack reference, and best practices for working on the BeeHive
              Rental & Sales web application with Claude AI.
            </p>

            {/* Copy Button - Prominent */}
            <div className="flex justify-center">
              <CopyPromptButton
                content={claudeContent}
                label="Copy Full Prompt"
                variant="default"
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg shadow-purple-500/20 text-base px-8 py-6"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <FileCode2 className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{claudeContent.split("\n").length}</div>
              <div className="text-xs text-gray-400 uppercase">Lines</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{claudeContent.split("#").length - 1}</div>
              <div className="text-xs text-gray-400 uppercase">Sections</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <FileCode2 className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{Math.ceil(claudeContent.length / 1000)}K</div>
              <div className="text-xs text-gray-400 uppercase">Characters</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <Sparkles className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">Next.js 16</div>
              <div className="text-xs text-gray-400 uppercase">Framework</div>
            </div>
          </div>

          {/* Markdown Content */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-12">
            <div className="prose prose-invert prose-lg max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 border-b border-white/20 pb-4">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl md:text-3xl font-bold text-white mt-12 mb-4 border-b border-white/10 pb-3">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl md:text-2xl font-semibold text-white mt-8 mb-3">{children}</h3>
                  ),
                  p: ({ children }) => <p className="text-gray-300 leading-relaxed mb-4">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside text-gray-300 space-y-2 mb-4">{children}</ol>,
                  li: ({ children }) => <li className="text-gray-300">{children}</li>,
                  code: ({ className, children }) => {
                    const isInline = !className
                    return isInline ? (
                      <code className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-sm font-mono">
                        {children}
                      </code>
                    ) : (
                      <code className="block bg-black/50 text-green-300 p-4 rounded-lg overflow-x-auto text-sm font-mono mb-4 border border-white/10">
                        {children}
                      </code>
                    )
                  },
                  pre: ({ children }) => <pre className="mb-4">{children}</pre>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-yellow-500 pl-4 italic text-gray-400 my-4">
                      {children}
                    </blockquote>
                  ),
                  a: ({ href, children }) => (
                    <a href={href} className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  ),
                  hr: () => <hr className="border-white/10 my-8" />,
                  table: ({ children }) => (
                    <div className="overflow-x-auto mb-4">
                      <table className="w-full border-collapse border border-white/20">{children}</table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="border border-white/20 bg-white/5 px-4 py-2 text-left text-white font-semibold">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border border-white/20 px-4 py-2 text-gray-300">{children}</td>
                  ),
                }}
              >
                {claudeContent}
              </ReactMarkdown>
            </div>

            {/* Bottom Copy Button */}
            <div className="mt-12 pt-8 border-t border-white/20 text-center">
              <p className="text-gray-400 mb-4">Ready to use this prompt with Claude?</p>
              <CopyPromptButton
                content={claudeContent}
                label="Copy to Clipboard"
                variant="outline"
                size="lg"
                className="bg-white/5 border-white/20 text-white hover:bg-white/10"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
