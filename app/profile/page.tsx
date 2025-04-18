"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Building, Mail, Phone, MapPin, Shield, Save, Edit } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import type { Client } from "@/types/api"

export default function ProfilePage() {
  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editedClient, setEditedClient] = useState<Client | null>(null)

  // Fetch client data
  useEffect(() => {
    async function fetchClient() {
      try {
        setLoading(true)
        // In a real app, this would be an API call
        // const response = await fetch('/api/clients/{clientGuid}')
        // const data = await response.json()

        // For now, use mock data
        const mockClient: Client = {
          clientGuid: "c1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
          name: "Client Company",
          email: "hr@clientcompany.com",
          status: "active",
          phone: "(555) 123-4567",
          address: "123 Business Ave",
          city: "Enterprise",
          state: "CA",
          zipCode: "90210",
        }

        setClient(mockClient)
        setEditedClient(mockClient)
      } catch (error) {
        console.error("Error fetching client:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchClient()
  }, [])

  const saveChanges = () => {
    // In a real app, this would be an API call
    // const response = await fetch('/api/clients/{clientGuid}', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(editedClient)
    // })

    // For now, just update the local state
    setClient(editedClient)
    setIsEditing(false)
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <Skeleton className="h-10 w-[200px] mb-2" />
          <Skeleton className="h-5 w-[350px]" />
        </div>
        <Skeleton className="h-10 w-[400px]" />
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-[150px] mb-2" />
            <Skeleton className="h-5 w-[250px]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Company Profile</h1>
        <p className="text-muted-foreground">View and manage your company information and account details.</p>
      </div>

      <Tabs defaultValue="company" className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2">
          <TabsTrigger value="company">Company Info</TabsTrigger>
          <TabsTrigger value="account">Account Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="company" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Manage your company details and contact information.</CardDescription>
              </div>
              <Button
                variant={isEditing ? "default" : "outline"}
                onClick={() => (isEditing ? saveChanges() : setIsEditing(true))}
              >
                {isEditing ? (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </>
                ) : (
                  <>
                    <Edit className="mr-2 h-4 w-4" /> Edit Profile
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Company Name</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={editedClient?.name}
                          onChange={(e) => setEditedClient((prev) => (prev ? { ...prev, name: e.target.value } : null))}
                        />
                      ) : (
                        <div className="flex items-center gap-2 h-10 px-3 rounded-md border bg-muted/50">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span>{client?.name}</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={editedClient?.email}
                          onChange={(e) =>
                            setEditedClient((prev) => (prev ? { ...prev, email: e.target.value } : null))
                          }
                        />
                      ) : (
                        <div className="flex items-center gap-2 h-10 px-3 rounded-md border bg-muted/50">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{client?.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={editedClient?.phone}
                          onChange={(e) =>
                            setEditedClient((prev) => (prev ? { ...prev, phone: e.target.value } : null))
                          }
                        />
                      ) : (
                        <div className="flex items-center gap-2 h-10 px-3 rounded-md border bg-muted/50">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{client?.phone}</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Account Status</Label>
                      <div className="flex items-center gap-2 h-10 px-3 rounded-md border bg-muted/50">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span className="capitalize">{client?.status}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Address Information</h3>
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    {isEditing ? (
                      <Input
                        id="address"
                        value={editedClient?.address}
                        onChange={(e) =>
                          setEditedClient((prev) => (prev ? { ...prev, address: e.target.value } : null))
                        }
                      />
                    ) : (
                      <div className="flex items-center gap-2 h-10 px-3 rounded-md border bg-muted/50">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{client?.address}</span>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      {isEditing ? (
                        <Input
                          id="city"
                          value={editedClient?.city}
                          onChange={(e) => setEditedClient((prev) => (prev ? { ...prev, city: e.target.value } : null))}
                        />
                      ) : (
                        <div className="flex items-center gap-2 h-10 px-3 rounded-md border bg-muted/50">
                          <span>{client?.city}</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      {isEditing ? (
                        <Input
                          id="state"
                          value={editedClient?.state}
                          onChange={(e) =>
                            setEditedClient((prev) => (prev ? { ...prev, state: e.target.value } : null))
                          }
                        />
                      ) : (
                        <div className="flex items-center gap-2 h-10 px-3 rounded-md border bg-muted/50">
                          <span>{client?.state}</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">Zip Code</Label>
                      {isEditing ? (
                        <Input
                          id="zipCode"
                          value={editedClient?.zipCode}
                          onChange={(e) =>
                            setEditedClient((prev) => (prev ? { ...prev, zipCode: e.target.value } : null))
                          }
                        />
                      ) : (
                        <div className="flex items-center gap-2 h-10 px-3 rounded-md border bg-muted/50">
                          <span>{client?.zipCode}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {isEditing && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false)
                      setEditedClient(client)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={saveChanges}>
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="account" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences and security settings.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Security</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="flex">
                        <Input id="password" type="password" value="••••••••••••" disabled className="rounded-r-none" />
                        <Button className="rounded-l-none">Change Password</Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                      <div className="flex items-center gap-2 h-10 px-3 rounded-md border bg-muted/50">
                        <Shield className="h-4 w-4 text-amber-500" />
                        <span>Not Enabled</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Preferences</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive email notifications for important updates.
                        </p>
                      </div>
                      <Button variant="outline">Configure</Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Account Management</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>User Access</Label>
                        <p className="text-sm text-muted-foreground">Manage user access and permissions.</p>
                      </div>
                      <Button variant="outline">Manage Users</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
