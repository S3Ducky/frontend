import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download } from "lucide-react"
import React, { useState, useEffect } from "react"
import clsx from "clsx"

// Helper for button className
function getButtonClass({
  specialStyle,
  variant,
  theme,
  cardName,
  special,
  label
}: {
  specialStyle?: boolean
  variant?: "default" | "outline"
  theme?: string
  cardName: string
  special?: boolean
  label: string
}) {
  if (specialStyle) {
    return theme === "dark"
      ? "w-full gradient-transition bg-gray-200 text-gray-900 hover:bg-white"
      : "w-full gradient-transition bg-gradient-to-r from-gray-700 to-gray-500 hover:from-gray-800 hover:to-gray-600"
  }
  if (variant === "outline") {
    return clsx(
      "w-full bg-transparent theme-transition transition-all duration-300 hover:text-white",
      cardName === "Windows" && "hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600",
      cardName === "Linux" && "hover:bg-gradient-to-r hover:from-green-600 hover:to-blue-600",
      special && "hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-500"
    )
  }
  if (special && !specialStyle) {
    return "w-full gradient-transition bg-gradient-to-r from-gray-700 to-gray-500 hover:from-gray-800 hover:to-gray-600"
  }
  if (label.includes(".exe")) {
    return "w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gradient-transition"
  }
  if (label.includes(".AppImage")) {
    return "w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 gradient-transition"
  }
  return "w-full"
}

// DownloadCard subcomponent
function DownloadCard({
  name,
  logo,
  requirements,
  downloads,
  special,
  theme
}: {
  name: string
  logo: React.ReactNode
  requirements: string
  downloads: Array<{
    label: string
    href: string
    variant?: "default" | "outline"
    specialStyle?: boolean
  }>
  special?: boolean
  theme?: string
}) {
  return (
    <Card className="shadow-md hover:shadow-xl transition-shadow duration-300 theme-transition flex flex-col items-center">
      <CardContent className="flex flex-col items-center p-8">
        <div className="w-20 h-20 mb-4 flex items-center justify-center">
          {logo}
        </div>
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{requirements}</p>
        <div className="flex flex-col gap-3 w-full">
          {downloads.map((dl, i) => (
            <Button
              key={i}
              size="lg"
              variant={dl.variant || "default"}
              className={getButtonClass({
                specialStyle: dl.specialStyle,
                variant: dl.variant,
                theme,
                cardName: name,
                special,
                label: dl.label
              })}
              asChild
            >
              <a href={dl.href}>
                <Download className="w-5 h-5 mr-2" />
                {dl.label}
              </a>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function getCards(theme: string | undefined, RELEASE_VERSION: string, BASE_URL: string) {
  return [
    {
      name: "Windows",
      logo: <img src="/windows.png" alt="Windows Logo" className="w-20 h-20 object-contain" />,
      requirements: "Windows 10 or later",
      downloads: [
        {
          label: "Download .exe",
          href: `${BASE_URL}/${RELEASE_VERSION}/S3Ducky-Windows.exe`
        },
        {
          label: "Download .zip",
          href: `${BASE_URL}/${RELEASE_VERSION}/S3Ducky-Windows.zip`,
          variant: "outline" as const
        }
      ]
    },
    {
      name: "macOS",
      logo: (
        <img
          src={theme === "dark" ? "/apple-light.png" : "/apple-dark.png"}
          alt="Apple Logo"
          className="w-20 h-20 object-contain"
        />
      ),
      requirements: "macOS 11+ (Universal)",
      downloads: [
        {
          label: "Download .dmg",
          href: `${BASE_URL}/${RELEASE_VERSION}/S3Ducky-macOS`,
          specialStyle: true
        },
        {
          label: "Download .zip",
          href: `${BASE_URL}/${RELEASE_VERSION}/S3Ducky-macOS.zip`,
          variant: "outline" as const
        }
      ],
      special: true
    },
    {
      name: "Linux",
      logo: <img src="/linux.png" alt="Linux Logo" className="w-20 h-20 object-contain" />,
      requirements: "Tested on Ubuntu 20.04+",
      downloads: [
        {
          label: "Download .AppImage",
          href: `${BASE_URL}/${RELEASE_VERSION}/S3Ducky-Linux`
        },
        {
          label: "Download .zip",
          href: `${BASE_URL}/${RELEASE_VERSION}/S3Ducky-Linux.tar.gz`,
          variant: "outline" as const
        }
      ]
    }
  ]
}

export default function DownloadCards() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const BASE_URL = "https://github.com/S3Ducky/S3ducky/releases/download";
  const RELEASE_VERSION = process.env.NEXT_PUBLIC_RELEASE_VERSION || 'v0.0.1';
  const cards = getCards(theme, RELEASE_VERSION, BASE_URL);

  return (
    <section id="download" className="py-20 px-4 theme-transition">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center theme-transition">Ready to Get Started?</h2>
        <p className="text-lg text-muted-foreground mb-8 text-center theme-transition">
          Download S3Ducky now and start managing your S3 buckets with ease
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <DownloadCard key={card.name} {...card} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  )
} 