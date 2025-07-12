import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "S3Ducky - Modern S3 Bucket Viewer for Windows",
  description:
    "A powerful, secure, and user-friendly desktop application for browsing, managing, and downloading files from your AWS S3 buckets.",
  generator: 'v0.dev',
  icons: {
    icon: [
      { url: '/S3DuckyLogo.ico', type: 'image/x-icon' }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
