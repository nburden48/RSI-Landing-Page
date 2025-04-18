"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import { NotificationPopup } from "@/components/notification-popup"

type NotificationType = "info" | "success" | "warning" | "error"

interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  autoClose?: boolean
  autoCloseTime?: number
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id">) => void
  removeNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = useCallback((notification: Omit<Notification, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    setNotifications((prev) => [...prev, { ...notification, id }])
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }, [])

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
      {notifications.map((notification) => (
        <NotificationPopup
          key={notification.id}
          title={notification.title}
          message={notification.message}
          type={notification.type}
          autoClose={notification.autoClose}
          autoCloseTime={notification.autoCloseTime}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}
