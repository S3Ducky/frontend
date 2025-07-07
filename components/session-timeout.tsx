"use client"

import { useEffect, useState } from "react"
import { useAppStore } from "@/lib/store"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

export function SessionTimeout() {
  const { sessionExpiry, clearSession } = useAppStore()
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    if (!sessionExpiry) return

    const interval = setInterval(() => {
      const now = new Date()
      const remaining = Math.max(0, sessionExpiry.getTime() - now.getTime())
      const minutes = Math.floor(remaining / 60000)

      setTimeLeft(remaining)
      setShowWarning(minutes <= 5 && remaining > 0)

      if (remaining <= 0) {
        clearSession()
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [sessionExpiry, clearSession])

  if (!showWarning || timeLeft <= 0) return null

  const minutes = Math.floor(timeLeft / 60000)
  const seconds = Math.floor((timeLeft % 60000) / 1000)

  return (
    <Alert className="mb-4 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
      <Clock className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>
          Session expires in {minutes}:{seconds.toString().padStart(2, "0")}
        </span>
        <Button variant="outline" size="sm" onClick={clearSession} className="ml-4 bg-transparent">
          Logout Now
        </Button>
      </AlertDescription>
    </Alert>
  )
}
