"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Moon, Sun, Laptop, Save, Mail, MessageSquare, FileText } from "lucide-react"

export default function SettingsPage() {
  const [theme, setTheme] = useState("system")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [appNotifications, setAppNotifications] = useState(true)
  const [searchCompleted, setSearchCompleted] = useState(true)
  const [searchIssue, setSearchIssue] = useState(true)
  const [newMessage, setNewMessage] = useState(true)
  const [reportReady, setReportReady] = useState(true)
  const [density, setDensity] = useState("comfortable")

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and settings.</p>
      </div>

      <Tabs defaultValue="preferences" className="w-full">
        <TabsList className="grid w-full max-w-[600px] grid-cols-2">
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="preferences" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>General Preferences</CardTitle>
              <CardDescription>Configure your general account preferences.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Display</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="theme">Theme</Label>
                        <p className="text-sm text-muted-foreground">Select your preferred theme for the dashboard.</p>
                      </div>
                      <Select value={theme} onValueChange={setTheme}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">
                            <div className="flex items-center gap-2">
                              <Sun className="h-4 w-4" />
                              <span>Light</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="dark">
                            <div className="flex items-center gap-2">
                              <Moon className="h-4 w-4" />
                              <span>Dark</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="system">
                            <div className="flex items-center gap-2">
                              <Laptop className="h-4 w-4" />
                              <span>System</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Content Density</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="density">Content Density</Label>
                        <p className="text-sm text-muted-foreground">Adjust the density of content in the dashboard.</p>
                      </div>
                      <Select value={density} onValueChange={setDensity}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select density" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="compact">Compact</SelectItem>
                          <SelectItem value="comfortable">Comfortable</SelectItem>
                          <SelectItem value="spacious">Spacious</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Content Density Examples */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Content Density Examples</h3>
                  <div className="space-y-4">
                    {density === "compact" && (
                      <div className="border rounded-md p-2">
                        <h4 className="text-sm font-medium mb-1">Compact Density</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center py-1 border-b text-xs">
                            <span>Item 1</span>
                            <span>Value 1</span>
                          </div>
                          <div className="flex justify-between items-center py-1 border-b text-xs">
                            <span>Item 2</span>
                            <span>Value 2</span>
                          </div>
                          <div className="flex justify-between items-center py-1 text-xs">
                            <span>Item 3</span>
                            <span>Value 3</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {density === "comfortable" && (
                      <div className="border rounded-md p-3">
                        <h4 className="text-sm font-medium mb-2">Comfortable Density</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center py-2 border-b">
                            <span>Item 1</span>
                            <span>Value 1</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b">
                            <span>Item 2</span>
                            <span>Value 2</span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span>Item 3</span>
                            <span>Value 3</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {density === "spacious" && (
                      <div className="border rounded-md p-4">
                        <h4 className="text-sm font-medium mb-3">Spacious Density</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center py-3 border-b">
                            <span>Item 1</span>
                            <span>Value 1</span>
                          </div>
                          <div className="flex justify-between items-center py-3 border-b">
                            <span>Item 2</span>
                            <span>Value 2</span>
                          </div>
                          <div className="flex justify-between items-center py-3">
                            <span>Item 3</span>
                            <span>Value 3</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Dashboard Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="defaultView">Default View</Label>
                        <p className="text-sm text-muted-foreground">
                          Select your preferred default view for the dashboard.
                        </p>
                      </div>
                      <Select defaultValue="dashboard">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select default view" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dashboard">Dashboard</SelectItem>
                          <SelectItem value="applicants">Applicants</SelectItem>
                          <SelectItem value="searches">Searches</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how and when you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Channels</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div className="space-y-0.5">
                          <Label htmlFor="emailNotifications">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications via email.</p>
                        </div>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <div className="space-y-0.5">
                          <Label htmlFor="smsNotifications">SMS Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications via SMS.</p>
                        </div>
                      </div>
                      <Switch id="smsNotifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <div className="space-y-0.5">
                          <Label htmlFor="appNotifications">In-App Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications within the application.</p>
                        </div>
                      </div>
                      <Switch id="appNotifications" checked={appNotifications} onCheckedChange={setAppNotifications} />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Types</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-green-500" />
                        <div className="space-y-0.5">
                          <Label htmlFor="searchCompleted">Search Completed</Label>
                          <p className="text-sm text-muted-foreground">Notify when a background check is completed.</p>
                        </div>
                      </div>
                      <Switch id="searchCompleted" checked={searchCompleted} onCheckedChange={setSearchCompleted} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-amber-500" />
                        <div className="space-y-0.5">
                          <Label htmlFor="searchIssue">Search Issues</Label>
                          <p className="text-sm text-muted-foreground">
                            Notify when there's an issue with a background check.
                          </p>
                        </div>
                      </div>
                      <Switch id="searchIssue" checked={searchIssue} onCheckedChange={setSearchIssue} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-blue-500" />
                        <div className="space-y-0.5">
                          <Label htmlFor="newMessage">New Messages</Label>
                          <p className="text-sm text-muted-foreground">Notify when you receive a new message.</p>
                        </div>
                      </div>
                      <Switch id="newMessage" checked={newMessage} onCheckedChange={setNewMessage} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-purple-500" />
                        <div className="space-y-0.5">
                          <Label htmlFor="reportReady">Reports Ready</Label>
                          <p className="text-sm text-muted-foreground">Notify when a report is ready for download.</p>
                        </div>
                      </div>
                      <Switch id="reportReady" checked={reportReady} onCheckedChange={setReportReady} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <div className="flex justify-end p-6 pt-0">
              <Button>
                <Save className="mr-2 h-4 w-4" /> Save Notification Settings
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
