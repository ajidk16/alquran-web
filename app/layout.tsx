import type React from "react"
import type { Metadata } from "next"
import { Inter, Amiri } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
})

export const metadata: Metadata = {
  title: "Al-Quran Digital - Baca Al-Quran Online",
  description:
    "Baca Al-Quran online dengan terjemahan bahasa Indonesia. Fitur bookmark, pencarian ayat, dan audio murattal.",
  keywords: "Al-Quran, Quran, Islam, Surah, Ayat, Terjemahan, Audio, Murattal",
  authors: [{ name: "Al-Quran Digital" }],
  openGraph: {
    title: "Al-Quran Digital - Baca Al-Quran Online",
    description: "Baca Al-Quran online dengan terjemahan bahasa Indonesia",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Al-Quran Digital",
    description: "Baca Al-Quran online dengan terjemahan bahasa Indonesia",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} ${amiri.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-8">{children}</main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
