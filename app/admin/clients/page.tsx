"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, MoreHorizontal, Search, Building, Users, FileSearch } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import type { Client } from "@/types/api"

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddClientOpen, setIsAddClientOpen] = useState(false)
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    status: "active",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  })

  // Fetch clients data
  useEffect(() => {
    async function fetchClients() {
      try {
        setLoading(true)
        // In a real app, this would be an API call
        // const response = await fetch('/api/admin/clients')
        // const data = await response.json()

        // For now, use mock data
        const mockClients: Client[] = [
          {
            clientGuid: "c1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
            name: "Acme Corporation",
            email: "hr@acmecorp.com",
            status: "active",
            phone: "(555) 123-4567",
            address: "123 Business Ave",
            city: "Enterprise",
            state: "CA",
            zipCode: "90210",
          },
          {
            clientGuid: "d2e3f4g5-h6i7-j8k9-l0m1-n2o3p4q5r6s7",
            name: "TechStart Inc.",
            email: "hr@techstart.com",
            status: "active",
            phone: "(555) 234-5678",
            address: "456 Innovation Blvd",
            city: "Silicon",
            state: "CA",
            zipCode: "94103",
          },
          {
            clientGuid: "e3f4g5h6-i7j8-k9l0-m1n2-o3p4q5r6s7t8",
            name: "Global Services LLC",
            email: "hr@globalservices.com",
            status: "inactive",
            phone: "(555) 345-6789",
            address: "789 Corporate Dr",
            city: "Metropolis",
            state: "NY",
            zipCode: "10001",
          },
          {
            clientGuid: "f4g5h6i7-j8k9-l0m1-n2o3-p4q5r6s7t8u9",
            name: "Innovative Solutions",
            email: "hr@innovative.com",
            status: "active",
            phone: "(555) 456-7890",
            address: "101 Creative Way",
            city: "Newtown",
            state: "TX",
            zipCode: "75001",
          },
          {
            clientGuid: "g5h6i7j8-k9l0-m1n2-o3p4-q5r6s7t8u9v0",
            name: "Premier Staffing",
            email: "hr@premierstaffing.com",
            status: "active",
            phone: "(555) 567-8901",
            address: "202 Recruitment Rd",
            city: "Talentville",
            state: "IL",
            zipCode: "60601",
          },
        ]

        setClients(mockClients)
      } catch (error) {
        console.error("Error fetching clients:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchClients()
  }, [])

  // Filter clients based on search term and status filter
  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || client.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Handle adding a new client
  const handleAddClient = () => {
    // In a real app, this would be an API call
    // const response = await fetch('/api/admin/clients', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(newClient)
    // })

    // For now, just add to the local state
    const newClientWithId: Client = {
      ...newClient,
      clientGuid: `new-${Date.now()}`,
    }

    setClients([...clients, newClientWithId])
    setIsAddClientOpen(false)
    setNewClient({
      name: "",
      email: "",
      status: "active",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    })
  }

  if (loading) {
    return <ClientsListSkeleton />
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground">Manage all client accounts and their information.</p>
        </div>
        <Dialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription>Enter the details for the new client account.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name</Label>
                  <Input
                    id="name"
                    value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    placeholder="Acme Corporation"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newClient.email}
                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                    placeholder="hr@company.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newClient.status}
                    onValueChange={(value) => setNewClient({ ...newClient, status: value })}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={newClient.address}
                  onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                  placeholder="123 Business Ave"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={newClient.city}
                    onChange={(e) => setNewClient({ ...newClient, city: e.target.value })}
                    placeholder="Enterprise"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={newClient.state}
                    onChange={(e) => setNewClient({ ...newClient, state: e.target.value })}
                    placeholder="CA"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input
                    id="zipCode"
                    value={newClient.zipCode}
                    onChange={(e) => setNewClient({ ...newClient, zipCode: e.target.value })}
                    placeholder="90210"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddClientOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddClient}>Add Client</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-[350px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 w-full"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="table" className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2">
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="cards">Card View</TabsTrigger>
        </TabsList>
        <TabsContent value="table" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.length > 0 ? (
                    filteredClients.map((client) => (
                      <TableRow key={client.clientGuid}>
                        <TableCell className="font-medium">{client.name}</TableCell>
                        <TableCell>{client.email}</TableCell>
                        <TableCell>{client.phone}</TableCell>
                        <TableCell>
                          <Badge variant={client.status === "active" ? "success" : "secondary"}>
                            {client.status === "active" ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {client.city}, {client.state}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit Client</DropdownMenuItem>
                              <DropdownMenuItem>View Applicants</DropdownMenuItem>
                              <DropdownMenuItem>View Searches</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6">
                        No clients found matching your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="cards" className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <Card key={client.clientGuid}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{client.name}</CardTitle>
                      <Badge variant={client.status === "active" ? "success" : "secondary"}>
                        {client.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <CardDescription>{client.email}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{client.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">
                        {client.city}, {client.state} {client.zipCode}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{client.phone}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-8 px-2">
                        <Users className="h-3.5 w-3.5 mr-1" />
                        <span>Applicants</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 px-2">
                        <FileSearch className="h-3.5 w-3.5 mr-1" />
                        <span>Searches</span>
                      </Button>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Client</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">No clients found matching your filters.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ClientsListSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <Skeleton className="h-10 w-[150px] mb-2" />
          <Skeleton className="h-5 w-[350px]" />
        </div>
        <Skeleton className="h-10 w-[120px]" />
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Skeleton className="h-10 w-full sm:w-[350px]" />
        <Skeleton className="h-10 w-full sm:w-[150px]" />
      </div>

      <Skeleton className="h-10 w-[400px]" />

      <Card>
        <CardContent className="p-6">
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
