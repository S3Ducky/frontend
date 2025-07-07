"use client"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useAppStore } from "@/lib/store"
import { Cloud, HelpCircle, LogOut } from "lucide-react"
import Link from "next/link"
import Image from "next/image";

export function Header() {
  const { isConnected, clearSession } = useAppStore()

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Image
            src="/S3DuckyLogo.png" 
            alt="S3Ducky Logo"
            width={32}
            height={32}
            className="h-12 w-12"
          />
          <div>
            <h1 className="text-2xl font-bold">S3Ducky</h1>
            <p className="text-xs text-muted-foreground">Secure AWS S3 Manager</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="#" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
            <HelpCircle className="h-4 w-4 mr-1" />
            Help & Contact
          </Link>

          {isConnected && (
            <Button variant="outline" size="sm" onClick={clearSession} className="flex items-center bg-transparent">
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          )}

          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
