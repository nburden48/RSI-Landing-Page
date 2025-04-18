"use client"

import type React from "react"

import { useState } from "react"
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
import {
  Bell,
  FileSearch,
  Home,
  LogOut,
  MessageSquare,
  Settings,
  User,
  Users,
  Building,
  ShieldCheck,
  BarChart3,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [activeItem, setActiveItem] = useState("dashboard")

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-muted/40">
          <Sidebar>
            <SidebarHeader className="flex h-14 items-center border-b px-4">
              <div className="flex items-center gap-2 font-semibold">
                <ShieldCheck className="h-6 w-6 text-blue-600" />
                <span className="text-blue-600">RSI Admin Portal</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={activeItem === "admin-dashboard"}
                        onClick={() => setActiveItem("admin-dashboard")}
                        tooltip="Dashboard"
                      >
                        <a href="/admin">
                          <Home className="h-4 w-4" />
                          <span>Dashboard</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={activeItem === "analytics"}
                        onClick={() => setActiveItem("analytics")}
                        tooltip="Analytics"
                      >
                        <a href="/admin/analytics">
                          <BarChart3 className="h-4 w-4" />
                          <span>Analytics</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarSeparator />
              <SidebarGroup>
                <SidebarGroupLabel>Management</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={activeItem === "clients"}
                        onClick={() => setActiveItem("clients")}
                        tooltip="Clients"
                      >
                        <a href="/admin/clients">
                          <Building className="h-4 w-4" />
                          <span>Clients</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={activeItem === "applicants"}
                        onClick={() => setActiveItem("applicants")}
                        tooltip="Applicants"
                      >
                        <a href="/admin/applicants">
                          <Users className="h-4 w-4" />
                          <span>Applicants</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={activeItem === "searches"}
                        onClick={() => setActiveItem("searches")}
                        tooltip="Searches"
                      >
                        <a href="/admin/searches">
                          <FileSearch className="h-4 w-4" />
                          <span>Searches</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={activeItem === "messages"}
                        onClick={() => setActiveItem("messages")}
                        tooltip="Messages"
                      >
                        <a href="/admin/messages">
                          <MessageSquare className="h-4 w-4" />
                          <span>Messages</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarSeparator />
              <SidebarGroup>
                <SidebarGroupLabel>Settings</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={activeItem === "profile"}
                        onClick={() => setActiveItem("profile")}
                        tooltip="Profile"
                      >
                        <a href="/admin/profile">
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={activeItem === "settings"}
                        onClick={() => setActiveItem("settings")}
                        tooltip="Settings"
                      >
                        <a href="/admin/settings">
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t p-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Admin User</span>
                  <span className="text-xs text-muted-foreground">admin@referenceservices.com</span>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto">
                  <LogOut className="h-4 w-4" />
                  <span className="sr-only">Log out</span>
                </Button>
              </div>
            </SidebarFooter>
          </Sidebar>
          <div className="flex flex-1 flex-col">
            <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
              <SidebarTrigger />
              <div className="ml-auto flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </div>
            </header>
            <main className="flex-1 p-4 sm:p-6">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  )
}
