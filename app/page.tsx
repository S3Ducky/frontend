"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  Shield,
  FolderOpen,
  Filter,
  MousePointer,
  Monitor,
  AlertTriangle,
  Github,
  ExternalLink,
  Moon,
  Sun,
  ChevronDown,
} from "lucide-react"
import { useTheme } from "next-themes"

export default function S3DuckyLanding() {
  const { theme, setTheme } = useTheme()
  const [expandedVersion, setExpandedVersion] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before rendering theme-dependent content
  useEffect(() => {
    setMounted(true)
    // Remove preload class after component mounts to enable transitions
    const timer = setTimeout(() => {
      document.body.classList.remove("preload")
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Add preload class to prevent transitions on initial load
  useEffect(() => {
    document.body.classList.add("preload")
  }, [])

  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
  }

  const features = [
    {
      icon: Shield,
      title: "Secure AWS Credentials",
      description: "Safe and encrypted storage of your AWS access keys with local-only authentication",
    },
    {
      icon: FolderOpen,
      title: "S3 Bucket Browsing",
      description: "Intuitive file browser with full metadata display and folder navigation",
    },
    {
      icon: Filter,
      title: "Advanced Filtering",
      description: "Filter files by prefix, extension, or custom patterns for quick discovery",
    },
    {
      icon: MousePointer,
      title: "Multi-Selection",
      description: "Select multiple files and folders for batch operations and ZIP downloads",
    },
    {
      icon: Monitor,
      title: "Modern GUI",
      description: "Clean, responsive Tkinter interface optimized for Windows desktop experience",
    },
    {
      icon: AlertTriangle,
      title: "Error Handling",
      description: "Robust error management with detailed logging and user-friendly messages",
    },
  ]

  const versions = [
    {
      version: "v1.0.0",
      date: "2025-01-07",
      changes: [
        "Initial release with core S3 browsing functionality",
        "Secure credential management system",
        "Multi-file selection and ZIP download",
        "Modern Tkinter GUI implementation",
      ],
    },
    {
      version: "v0.9.0-beta",
      date: "2024-12-15",
      changes: ["Beta release for testing", "Basic S3 bucket browsing", "File filtering capabilities"],
    },
  ]

  // Don't render theme toggle until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background preload">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background theme-transition">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 theme-transition">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center gradient-transition">
              <span className="text-white font-bold text-sm">S3</span>
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
              <a href="https://github.com/yourusername/s3ducky" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 theme-transition">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl flex items-center justify-center gradient-transition">
              <span className="text-white font-bold text-4xl">S3</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent gradient-transition">
            S3Ducky
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 theme-transition">
            Modern S3 Bucket Viewer for Windows
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto theme-transition">
            A powerful, secure, and user-friendly desktop application for browsing, managing, and downloading files from
            your AWS S3 buckets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gradient-transition"
              asChild
            >
              <a href="#download" className="flex items-center">
                <Download className="w-5 h-5 mr-2" />
                Download S3Ducky v1.0.0
              </a>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent theme-transition" asChild>
              <a href="#demo" className="flex items-center">
                View Screenshots
              </a>
            </Button>
          </div>
          <div className="mt-8 flex justify-center items-center space-x-4 text-sm text-muted-foreground">
            <Badge
              variant="secondary"
              className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 theme-transition"
            >
              Windows 10+
            </Badge>
            <Badge
              variant="secondary"
              className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 theme-transition"
            >
              Free & Open Source
            </Badge>
            <Badge
              variant="secondary"
              className="bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 theme-transition"
            >
              MIT License
            </Badge>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30 theme-transition">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 theme-transition">Powerful Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto theme-transition">
              Everything you need to manage your S3 buckets efficiently and securely
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 theme-transition"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4 shadow-lg gradient-transition">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold theme-transition">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground theme-transition">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section id="demo" className="py-20 px-4 theme-transition">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 theme-transition">See S3Ducky in Action</h2>
            <p className="text-lg text-muted-foreground theme-transition">
              Clean, intuitive interface designed for productivity
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 theme-transition">
              <CardContent className="p-0">
                <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center gradient-transition">
                  <div className="text-center">
                    <Shield className="w-16 h-16 mx-auto mb-4 text-blue-600 dark:text-blue-400 theme-transition" />
                    <p className="text-muted-foreground theme-transition">Credential Input Screenshot</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 theme-transition">Secure Credential Input</h3>
                  <p className="text-muted-foreground theme-transition">
                    Simple and secure AWS credential management with encrypted local storage
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 theme-transition">
              <CardContent className="p-0">
                <div className="w-full h-64 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 flex items-center justify-center gradient-transition">
                  <div className="text-center">
                    <FolderOpen className="w-16 h-16 mx-auto mb-4 text-green-600 dark:text-green-400 theme-transition" />
                    <p className="text-muted-foreground theme-transition">File Browser Screenshot</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 theme-transition">Intuitive File Browser</h3>
                  <p className="text-muted-foreground theme-transition">
                    Browse your S3 buckets with full metadata, filtering, and multi-selection support
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Version Info Section */}
      <section className="py-20 px-4 bg-muted/30 theme-transition">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 theme-transition">Release History</h2>
            <p className="text-lg text-muted-foreground theme-transition">Track the evolution of S3Ducky</p>
          </div>
          <div className="space-y-4">
            {versions.map((version, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 theme-transition">
                <CardContent className="p-6">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setExpandedVersion(expandedVersion === version.version ? null : version.version)}
                  >
                    <div className="flex items-center space-x-4">
                      <Badge
                        variant={index === 0 ? "default" : "secondary"}
                        className={`${index === 0 ? "bg-gradient-to-r from-blue-600 to-purple-600 gradient-transition" : "theme-transition"}`}
                      >
                        {version.version}
                      </Badge>
                      <span className="text-sm text-muted-foreground theme-transition">{version.date}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 theme-transition ${expandedVersion === version.version ? "rotate-180" : ""}`}
                    />
                  </div>
                  {expandedVersion === version.version && (
                    <div className="mt-4 pt-4 border-t theme-transition">
                      <ul className="space-y-2">
                        {version.changes.map((change, changeIndex) => (
                          <li key={changeIndex} className="flex items-start">
                            <span className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-2 mr-3 flex-shrink-0 gradient-transition"></span>
                            <span className="text-sm text-muted-foreground theme-transition">{change}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button
              variant="outline"
              asChild
              className="hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-300 bg-transparent theme-transition"
            >
              <a href="https://github.com/yourusername/s3ducky/releases" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                View All Releases
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-20 px-4 theme-transition">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 theme-transition">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8 theme-transition">
            Download S3Ducky now and start managing your S3 buckets with ease
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg gradient-transition"
              asChild
            >
              <a href="https://github.com/yourusername/s3ducky/releases/download/v1.0.0/S3Ducky-v1.0.0.exe">
                <Download className="w-5 h-5 mr-2" />
                Download for Windows (.exe)
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-300 bg-transparent theme-transition"
              asChild
            >
              <a href="https://github.com/yourusername/s3ducky/releases/download/v1.0.0/S3Ducky-v1.0.0.zip">
                <Download className="w-5 h-5 mr-2" />
                Download Source (.zip)
              </a>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4 theme-transition">
            Requires Windows 10 or later • Free and open source under MIT License
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12 px-4 theme-transition">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center gradient-transition">
                  <span className="text-white font-bold text-xs">S3</span>
                </div>
                <span className="font-bold theme-transition">S3Ducky</span>
              </div>
              <p className="text-sm text-muted-foreground theme-transition">
                Modern S3 bucket management for Windows developers
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 theme-transition">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors theme-transition"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors theme-transition"
                  >
                    API Reference
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors theme-transition"
                  >
                    Tutorials
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 theme-transition">Community</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors theme-transition"
                  >
                    GitHub Issues
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors theme-transition"
                  >
                    Discussions
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors theme-transition"
                  >
                    Contributing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 theme-transition">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors theme-transition"
                  >
                    MIT License
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors theme-transition"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors theme-transition"
                  >
                    Terms of Use
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center theme-transition">
            <p className="text-sm text-muted-foreground theme-transition">© 2025 S3Ducky — Version 1.0.0</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a
                href="https://github.com/yourusername/s3ducky"
                className="text-muted-foreground hover:text-foreground transition-colors theme-transition"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
