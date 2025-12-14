"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useToast } from "@/components/ui/toast-provider"

interface CopyPromptButtonProps {
  content: string
  label?: string
  variant?: "default" | "outline" | "ghost" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function CopyPromptButton({
  content,
  label = "Copy Prompt",
  variant = "outline",
  size = "default",
  className,
}: CopyPromptButtonProps) {
  const [copied, setCopied] = useState(false)
  const { showToast } = useToast()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      showToast("Claude prompt copied to clipboard!", "success")

      // Reset the copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      showToast("Failed to copy. Please try again.", "error")
      console.error("Failed to copy to clipboard:", error)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleCopy}
      className={className}
      aria-label={copied ? "Copied!" : label}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          {label}
        </>
      )}
    </Button>
  )
}
