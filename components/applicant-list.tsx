"use client"

import { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckSquare,
  Clock,
  AlertCircle,
  Calendar,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  UserPlus,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import React from "react"

// Move the mock data outside the component
// Sample applicant data - reduced for better performance
const mockApplicants = [
  {
    applicantGuid: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
    firstName: "John",
    middleName: "M",
    lastName: "Smith",
    email: "john.smith@example.com",
    phoneNumber: "(555) 123-4567",
    proposedPosition: "Software Developer",
    status: "in-progress",
    dateSubmitted: "2025-04-02",
  },
  {
    applicantGuid: "b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@example.com",
    phoneNumber: "(555) 234-5678",
    proposedPosition: "Marketing Manager",
    status: "completed",
    dateSubmitted: "2025-04-01",
  },
  {
    applicantGuid: "c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8",
    firstName: "Michael",
    middleName: "J",
    lastName: "Chen",
    email: "michael.chen@example.com",
    phoneNumber: "(555) 345-6789",
    proposedPosition: "Financial Analyst",
    status: "pending",
    dateSubmitted: "2025-04-03",
  },
]

// Wrap the component with React.memo
const ApplicantList = React.memo(function ApplicantList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [openApplicant, setOpenApplicant] = useState<string | null>(null)

  // Use useMemo for filtered applicants
  const filteredApplicants = useMemo(() => {
    return mockApplicants.filter((applicant) => {
      const fullName = `${applicant.firstName} ${applicant.middleName || ""} ${applicant.lastName}`.toLowerCase()
      const matchesSearch =
        fullName.includes(searchTerm.toLowerCase()) ||
        (applicant.email && applicant.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (applicant.proposedPosition && applicant.proposedPosition.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesStatus = statusFilter === "all" || applicant.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckSquare className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-amber-500" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Completed
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            In Progress
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Pending Information
          </Badge>
        )
      default:
        return null
    }
  }

  const toggleApplicant = (id: string) => {
    setOpenApplicant(openApplicant === id ? null : id)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Recent Applicants</h2>
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Search applicants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-[250px]"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="pending">Pending Information</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Applicant
          </Button>
        </div>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="mt-4">
          <div className="grid gap-4">
            {filteredApplicants.length > 0 ? (
              filteredApplicants.map((applicant) => (
                <Collapsible
                  key={applicant.applicantGuid}
                  open={openApplicant === applicant.applicantGuid}
                  onOpenChange={() => {}}
                >
                  <Card className="rsi-card">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="flex items-center gap-2">
                            {getStatusIcon(applicant.status)}
                            {applicant.firstName} {applicant.middleName} {applicant.lastName}
                          </CardTitle>
                          <CardDescription>{applicant.proposedPosition || "No position specified"}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(applicant.status)}
                          <CollapsibleTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleApplicant(applicant.applicantGuid)}
                            >
                              {openApplicant === applicant.applicantGuid ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                              <span className="sr-only">Toggle details</span>
                            </Button>
                          </CollapsibleTrigger>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Full Profile</DropdownMenuItem>
                              <DropdownMenuItem>Order Background Check</DropdownMenuItem>
                              <DropdownMenuItem>Download PDF</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardHeader>
                    <CardFooter className="flex justify-between text-xs text-muted-foreground py-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Submitted: {new Date(applicant.dateSubmitted).toLocaleDateString()}
                      </div>
                    </CardFooter>
                    <CollapsibleContent>
                      <CardContent className="pt-0 pb-3">
                        <div className="border-t pt-3">
                          <h4 className="text-sm font-medium mb-2">Applicant Details</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm font-medium">Email</p>
                                <p className="text-sm text-muted-foreground">{applicant.email || "Not provided"}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Phone</p>
                                <p className="text-sm text-muted-foreground">
                                  {applicant.phoneNumber || "Not provided"}
                                </p>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm font-medium">Position</p>
                                <p className="text-sm text-muted-foreground">
                                  {applicant.proposedPosition || "Not specified"}
                                </p>
                              </div>
                              <div>
                                <Button variant="link" className="h-auto p-0 text-sm">
                                  View Background Checks
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No applicants found matching your filters.</p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="grid" className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredApplicants.length > 0 ? (
              filteredApplicants.map((applicant) => (
                <Card key={applicant.applicantGuid} className="rsi-card overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">
                        {applicant.firstName} {applicant.lastName}
                      </CardTitle>
                      {getStatusBadge(applicant.status)}
                    </div>
                    <CardDescription>{applicant.proposedPosition || "No position specified"}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="truncate">{applicant.email || "No email provided"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span>{applicant.phoneNumber || "No phone provided"}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">No applicants found matching your filters.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
})

// Export the memoized component
export { ApplicantList }
