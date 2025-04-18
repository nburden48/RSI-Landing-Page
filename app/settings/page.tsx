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
  const [contentDensity, setContentDensity] = useState("comfortable")

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and settings.</p>
      </div>

      <Tabs defaultValue="preferences" className="w-full">
        <TabsList className="grid w-full max-w-[600px] grid-cols-3">
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
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
                  <h3 className="text-lg font-medium">Dashboard Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="defaultView">Default View</Label>
                        <p className="text-sm text-muted-foreground">
                          Select your preferred default view for the dashboard.
                        </p>
                      </div>
                      <Select defaultValue="applicants">
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
          </Card>
        </TabsContent>
        <TabsContent value="appearance" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of your dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Theme</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border cursor-pointer transition-colors ${
                        theme === "light" ? "border-blue-500 bg-blue-50" : ""
                      }`}
                      onClick={() => setTheme("light")}
                    >
                      <div className="h-20 w-full rounded-md bg-white border shadow-sm flex items-center justify-center">
                        <Sun className="h-8 w-8 text-amber-500" />
                      </div>
                      <span className="text-sm font-medium">Light</span>
                    </div>
                    <div
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border cursor-pointer transition-colors ${
                        theme === "dark" ? "border-blue-500 bg-blue-50" : ""
                      }`}
                      onClick={() => setTheme("dark")}
                    >
                      <div className="h-20 w-full rounded-md bg-gray-900 border shadow-sm flex items-center justify-center">
                        <Moon className="h-8 w-8 text-blue-400" />
                      </div>
                      <span className="text-sm font-medium">Dark</span>
                    </div>
                    <div
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border cursor-pointer transition-colors ${
                        theme === "system" ? "border-blue-500 bg-blue-50" : ""
                      }`}
                      onClick={() => setTheme("system")}
                    >
                      <div className="h-20 w-full rounded-md bg-gradient-to-br from-white to-gray-900 border shadow-sm flex items-center justify-center">
                        <Laptop className="h-8 w-8 text-gray-600" />
                      </div>
                      <span className="text-sm font-medium">System</span>
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
                      <Select value={contentDensity} onValueChange={setContentDensity}>
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

                    {/* Content Density Examples */}
                    <div className="mt-6 space-y-6">
                      <h4 className="text-sm font-medium">Content Density Examples</h4>

                      {contentDensity === "compact" && (
                        <div className="border rounded-md p-2">
                          <h5 className="text-sm font-medium mb-1">Compact Density</h5>
                          <div className="space-y-1">
                            <div className="bg-muted/50 p-1 rounded text-xs">Reduced padding and spacing</div>
                            <div className="bg-muted/50 p-1 rounded text-xs">Smaller text and controls</div>
                            <div className="bg-muted/50 p-1 rounded text-xs">More content fits on screen</div>
                            <div className="bg-muted/50 p-1 rounded text-xs">Ideal for power users</div>
                          </div>
                        </div>
                      )}

                      {contentDensity === "comfortable" && (
                        <div className="border rounded-md p-4">
                          <h5 className="text-sm font-medium mb-2">Comfortable Density</h5>
                          <div className="space-y-2">
                            <div className="bg-muted/50 p-2 rounded text-sm">Balanced padding and spacing</div>
                            <div className="bg-muted/50 p-2 rounded text-sm">Standard text and controls</div>
                            <div className="bg-muted/50 p-2 rounded text-sm">
                              Good balance of content and whitespace
                            </div>
                            <div className="bg-muted/50 p-2 rounded text-sm">Default setting for most users</div>
                          </div>
                        </div>
                      )}

                      {contentDensity === "spacious" && (
                        <div className="border rounded-md p-6">
                          <h5 className="text-base font-medium mb-3">Spacious Density</h5>
                          <div className="space-y-3">
                            <div className="bg-muted/50 p-3 rounded text-sm">Increased padding and spacing</div>
                            <div className="bg-muted/50 p-3 rounded text-sm">Larger text and controls</div>
                            <div className="bg-muted/50 p-3 rounded text-sm">More whitespace between elements</div>
                            <div className="bg-muted/50 p-3 rounded text-sm">Ideal for touch interfaces</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <div className="flex justify-end p-6 pt-0">
              <Button>
                <Save className="mr-2 h-4 w-4" /> Save Appearance Settings
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
