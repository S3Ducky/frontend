"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Github, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeToggle = () => {
    const currentTheme = theme ?? "dark"
    const newTheme = currentTheme === "dark" ? "light" : "dark"
    setTheme(newTheme)
  }

  if (!mounted) return null

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 theme-transition">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
            <Image src="/S3DuckyLogo.png" alt="S3Ducky Logo" width={28} height={28} className="object-contain" />
          </div>
          <span className="text-xl font-bold theme-transition">S3Ducky</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleThemeToggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="relative theme-transition"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 transition-all duration-300" />
            ) : (
              <Moon className="h-4 w-4 transition-all duration-300" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button variant="outline" asChild className="theme-transition bg-transparent">
            <a href="https://github.com/s3ducky" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
} 