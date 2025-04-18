"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, CheckCircle, AlertCircle, Info } from "lucide-react"

type NotificationType = "info" | "success" | "warning" | "error"

interface NotificationPopupProps {
  title: string
  message: string
  type?: NotificationType
  onClose: () => void
  autoClose?: boolean
  autoCloseTime?: number
}

export function NotificationPopup({
  title,
  message,
  type = "info",
  onClose,
  autoClose = false,
  autoCloseTime = 5000,
}: NotificationPopupProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 300) // Allow time for animation
      }, autoCloseTime)
      return () => clearTimeout(timer)
    }
  }, [autoClose, autoCloseTime, onClose])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300) // Allow time for animation
  }

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200"
      case "warning":
        return "bg-amber-50 border-amber-200"
      case "error":
        return "bg-red-50 border-red-200"
      default:
        return "bg-blue-50 border-blue-200"
    }
  }

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-sm transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <Card className={`shadow-lg ${getBgColor()}`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
            <div className="flex-1">
              <h3 className="font-medium text-sm">{title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{message}</p>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full -mt-1 -mr-1" onClick={handleClose}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="px-4 py-2 flex justify-end border-t">
          <Button size="sm" variant="outline" onClick={handleClose}>
            Dismiss
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
