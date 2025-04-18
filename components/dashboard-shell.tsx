"use client"

import type React from "react"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Bell, FileSearch, Home, LogOut, MessageSquare, Settings, User, Users, HelpCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"
import { RsiLogo } from "@/components/rsi-logo"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-muted/40">
          <Sidebar className="bg-primary-800 text-white border-r border-primary-700">
            <SidebarHeader className="flex h-16 items-center border-b border-primary-700 px-4">
              <div className="flex items-center gap-2 font-heading font-semibold">
                <RsiLogo size={32} />
                <span className="text-white">Reference Services Inc.</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel className="text-primary-200">Menu</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === "/"}
                        tooltip="Dashboard"
                        className="text-white hover:bg-primary-700 hover:text-white data-[active=true]:bg-primary-700 data-[active=true]:text-white"
                      >
                        <Link href="/">
                          <Home className="h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === "/applicants"}
                        tooltip="Applicants"
                        className="text-white hover:bg-primary-700 hover:text-white data-[active=true]:bg-primary-700 data-[active=true]:text-white"
                      >
                        <Link href="/applicants">
                          <Users className="h-4 w-4" />
                          <span>Applicants</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === "/searches"}
                        tooltip="Searches"
                        className="text-white hover:bg-primary-700 hover:text-white data-[active=true]:bg-primary-700 data-[active=true]:text-white"
                      >
                        <Link href="/searches">
                          <FileSearch className="h-4 w-4" />
                          <span>Searches</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === "/messages"}
                        tooltip="Messages"
                        className="text-white hover:bg-primary-700 hover:text-white data-[active=true]:bg-primary-700 data-[active=true]:text-white"
                      >
                        <Link href="/messages">
                          <MessageSquare className="h-4 w-4" />
                          <span>Messages</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarSeparator className="bg-primary-700" />
              <SidebarGroup>
                <SidebarGroupLabel className="text-primary-200">Account</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === "/profile"}
                        tooltip="Profile"
                        className="text-white hover:bg-primary-700 hover:text-white data-[active=true]:bg-primary-700 data-[active=true]:text-white"
                      >
                        <Link href="/profile">
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === "/settings"}
                        tooltip="Settings"
                        className="text-white hover:bg-primary-700 hover:text-white data-[active=true]:bg-primary-700 data-[active=true]:text-white"
                      >
                        <Link href="/settings">
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarSeparator className="bg-primary-700" />
              <SidebarGroup>
                <SidebarGroupLabel className="text-primary-200">Support</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === "/help"}
                        tooltip="Help Center"
                        className="text-white hover:bg-primary-700 hover:text-white data-[active=true]:bg-primary-700 data-[active=true]:text-white"
                      >
                        <Link href="/help">
                          <HelpCircle className="h-4 w-4" />
                          <span>Help Center</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t border-primary-700 p-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 bg-primary-100">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Client" />
                  <AvatarFallback className="bg-primary-100 text-primary-700">CL</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">Client Company</span>
                  <span className="text-xs text-primary-200">hr@clientcompany.com</span>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto text-white hover:bg-primary-700">
                  <LogOut className="h-4 w-4" />
                  <span className="sr-only">Log out</span>
                </Button>
              </div>
            </SidebarFooter>
          </Sidebar>
          <div className="flex flex-1 flex-col">
            <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
              <SidebarTrigger />
              <div className="ml-auto flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </div>
            </header>
            <main className="flex-1 p-4 sm:p-6">{children}</main>
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
      </SidebarProvider>
    </ThemeProvider>
  )
}
