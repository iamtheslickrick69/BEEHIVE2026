import type React from "react"
import type { Metadata } from "next"
import { Inter, Inter_Tight, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"
import { ToastProvider } from "@/components/ui/toast-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: ["500", "600", "700", "800", "900"],
})
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.beehiverentalandsales.com'),
  title: "BeeHive Rental & Sales LLC | Equipment Rental St. George Utah",
  description:
    "Southern Utah's premier equipment rental company. Professional-grade construction, landscaping, and event equipment. Serving St. George, Washington, Hurricane, and surrounding areas since 1994.",
  keywords:
    "equipment rental, St. George Utah, construction equipment, tool rental, excavator rental, skid steer, BeeHive Rental, heavy equipment, party rental, Southern Utah equipment",
  authors: [{ name: "BeeHive Rental & Sales LLC" }],
  robots: "index, follow",

  // Favicons
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },

  // Open Graph
  openGraph: {
    title: "BeeHive Rental & Sales - Southern Utah's Premier Equipment Rental",
    description: "Professional equipment rental, sales & repair since 1994. Heavy equipment, tools, concrete equipment & more. Serving contractors and homeowners in St. George & Southern Utah.",
    url: "https://www.beehiverentalandsales.com",
    siteName: "BeeHive Rental & Sales",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BeeHive Rental & Sales - Aerial view of equipment yard in St. George, Utah",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "BeeHive Rental & Sales - Equipment Rental Experts",
    description: "Southern Utah's premier equipment rental since 1994. Heavy equipment, tools & more.",
    images: ["/og-image.jpg"],
  },

  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover" />
      </head>
      <body className={`${inter.variable} ${interTight.variable} ${geistMono.variable} font-sans antialiased`}>
        <ToastProvider>
          <Navigation />
          <main className="min-h-screen pt-20">{children}</main>
          <Footer />
          <AIAssistant />
          <Analytics />
        </ToastProvider>
      </body>
    </html>
  )
}
