import type React from "react"
import type { Metadata } from "next"
import { Inter, Inter_Tight, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"
import { ToastProvider } from "@/components/ui/toast-provider"
import { BackToTop } from "@/components/ui/back-to-top"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: ["500", "600", "700", "800", "900"],
})
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: "BeeHive Rental & Sales LLC | Equipment Rental St. George Utah",
  description:
    "Southern Utah's premier equipment rental company. Professional-grade construction, landscaping, and event equipment. Serving St. George, Washington, Hurricane, and surrounding areas since 1994.",
  keywords:
    "equipment rental, St. George Utah, construction equipment, tool rental, excavator rental, skid steer, BeeHive Rental, heavy equipment, party rental",
  openGraph: {
    title: "BeeHive Rental & Sales LLC",
    description: "Southern Utah's premier equipment rental company since 1994",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${interTight.variable} ${geistMono.variable} font-sans antialiased`}>
        <ToastProvider>
          <Navigation />
          <main className="min-h-screen pt-20">{children}</main>
          <Footer />
          <AIAssistant />
          <BackToTop />
          <Analytics />
        </ToastProvider>
      </body>
    </html>
  )
}
