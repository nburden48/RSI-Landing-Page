"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"
import { RsiLogo } from "@/components/rsi-logo"
import { Bell, FileSearch, Home, LogOut, MessageSquare, Settings, User, Users, HelpCircle, Menu, X } from "lucide-react"

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const NavLink = ({
    href,
    icon: Icon,
    children,
  }: {
    href: string
    icon: React.ElementType
    children: React.ReactNode
  }) => {
    const isActive = pathname === href
    return (
      <Link
        href={href}
        className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
          isActive ? "bg-white/10 text-white font-medium" : "text-white hover:bg-white/5 hover:text-white"
        }`}
      >
        <Icon className="h-4 w-4" />
        <span>{children}</span>
      </Link>
    )
  }

  // Common sidebar content to avoid duplication
  const SidebarContent = () => (
    <>
      <nav className="space-y-6 px-2">
        <div>
          <h3 className="mb-2 px-3 text-xs font-semibold uppercase text-blue-200">Menu</h3>
          <div className="space-y-1">
            <NavLink href="/" icon={Home}>
              Dashboard
            </NavLink>
            <NavLink href="/applicants" icon={Users}>
              Applicants
            </NavLink>
            <NavLink href="/searches" icon={FileSearch}>
              Searches
            </NavLink>
            <NavLink href="/messages" icon={MessageSquare}>
              Messages
            </NavLink>
          </div>
        </div>

        <div>
          <h3 className="mb-2 px-3 text-xs font-semibold uppercase text-blue-200">Account</h3>
          <div className="space-y-1">
            <NavLink href="/profile" icon={User}>
              Profile
            </NavLink>
            <NavLink href="/settings" icon={Settings}>
              Settings
            </NavLink>
          </div>
        </div>

        <div>
          <h3 className="mb-2 px-3 text-xs font-semibold uppercase text-blue-200">Support</h3>
          <div className="space-y-1">
            <NavLink href="/help" icon={HelpCircle}>
              Help Center
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  )

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="flex min-h-screen w-full">
        {/* Sidebar - Desktop */}
        <aside
          className={`fixed inset-y-0 left-0 z-20 hidden w-64 transform transition-transform duration-200 ease-in-out lg:block ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } bg-gradient-to-b from-primary-600 to-primary-800`}
        >
          <div className="flex h-full flex-col">
            {/* Sidebar Header */}
            <div className="flex h-16 items-center border-b border-white/10 px-4">
              <div className="flex items-center gap-2 font-heading font-semibold">
                <RsiLogo size={32} />
                <span className="text-white">Reference Services Inc.</span>
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto py-4">
              <SidebarContent />
            </div>

            {/* Sidebar Footer */}
            <div className="border-t border-white/10 p-4 bg-primary-800/50">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 bg-primary-100">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Client" />
                  <AvatarFallback className="bg-primary-100 text-primary-700">CL</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">Client Company</span>
                  <span className="text-xs text-blue-200">hr@clientcompany.com</span>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto text-white hover:bg-white/10">
                  <LogOut className="h-4 w-4" />
                  <span className="sr-only">Log out</span>
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/50 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Mobile Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-200 ease-in-out lg:hidden ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } bg-gradient-to-b from-primary-600 to-primary-800`}
        >
          <div className="flex h-full flex-col">
            {/* Mobile Sidebar Header */}
            <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
              <div className="flex items-center gap-2 font-heading font-semibold">
                <RsiLogo size={24} />
                <span className="text-white">RSI</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>

            {/* Mobile Sidebar Content */}
            <div className="flex-1 overflow-y-auto py-4">
              <SidebarContent />
            </div>

            {/* Mobile Sidebar Footer */}
            <div className="border-t border-white/10 p-4 bg-primary-800/50">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 bg-primary-100">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Client" />
                  <AvatarFallback className="bg-primary-100 text-primary-700">CL</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">Client Company</span>
                  <span className="text-xs text-blue-200">hr@clientcompany.com</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex flex-1 flex-col lg:pl-64">
          {/* Header */}
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>

            {/* Sidebar toggle button - desktop */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>

            <div className="ml-auto flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Notifications</span>
              </Button>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 p-4 sm:p-6">{children}</main>

          {/* Footer */}
          <footer className="border-t py-4 px-6 text-center text-sm text-muted-foreground">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center gap-2 mb-2 sm:mb-0">
                <RsiLogo size={24} />
                <span>© {new Date().getFullYear()} Reference Services Inc. All rights reserved.</span>
              </div>
              <div className="flex gap-4">
                <a href="#" className="hover:text-primary-500 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-primary-500 transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-primary-500 transition-colors">
                  Contact Us
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  )
}
