import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Pension Jesuitská Znojmo",
  description: "Luxusní ubytování v srdci Znojma, kde se elegance setkává s klidem. Pension Jesuitská nabízí komfortní pobyt v historickém centru města.",
  keywords: "pension Znojmo, Jesuitská, ubytování Znojmo, luxusní pension, Znojmo centrum",
  authors: [{ name: "Pension Jesuitská" }],
  openGraph: {
    title: "Pension Jesuitská Znojmo",
    description: "Luxusní ubytování v historickém centru Znojma",
    siteName: "Pension Jesuitská Znojmo",
    locale: "cs_CZ",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <body className={`${playfair.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'