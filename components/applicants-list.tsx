"use client"

import React from "react"

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
  MapPin,
  FileText,
  Mail,
  Phone,
  Briefcase,
  Search,
  Download,
  Eye,
  UserPlus,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
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

// Move the mock data outside the component
// Mock data for applicants
const mockApplicants = [
  {
    applicantGuid: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
    firstName: "John",
    middleName: "M",
    lastName: "Smith",
    gender: "MALE",
    ssn: "111-22-3333",
    dateOfBirth: "1985-06-15",
    email: "john.smith@example.com",
    phoneNumber: "(555) 123-4567",
    driverLicense: "S12345678",
    driverLicenseState: "CA",
    proposedPosition: "Software Developer",
    status: "in-progress",
  },
  {
    applicantGuid: "b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7",
    firstName: "Sarah",
    lastName: "Johnson",
    gender: "FEMALE",
    ssn: "222-33-4444",
    dateOfBirth: "1990-03-22",
    email: "sarah.johnson@example.com",
    phoneNumber: "(555) 234-5678",
    proposedPosition: "Marketing Manager",
    status: "completed",
  },
  {
    applicantGuid: "c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8",
    firstName: "Michael",
    middleName: "J",
    lastName: "Chen",
    gender: "MALE",
    ssn: "333-44-5555",
    dateOfBirth: "1988-11-10",
    email: "michael.chen@example.com",
    phoneNumber: "(555) 345-6789",
    proposedPosition: "Financial Analyst",
    status: "pending",
  },
  {
    applicantGuid: "d4e5f6g7-h8i9-j0k1-l2m3-n4o5p6q7r8s9",
    firstName: "Emily",
    lastName: "Rodriguez",
    gender: "FEMALE",
    ssn: "444-55-6666",
    dateOfBirth: "1992-07-18",
    email: "emily.rodriguez@example.com",
    phoneNumber: "(555) 456-7890",
    proposedPosition: "HR Specialist",
    status: "completed",
  },
  {
    applicantGuid: "e5f6g7h8-i9j0-k1l2-m3n4-o5p6q7r8s9t0",
    firstName: "David",
    middleName: "A",
    lastName: "Wilson",
    gender: "MALE",
    ssn: "555-66-7777",
    dateOfBirth: "1983-09-05",
    email: "david.wilson@example.com",
    phoneNumber: "(555) 567-8901",
    proposedPosition: "Project Manager",
    status: "in-progress",
  },
]

// Wrap the component with React.memo
export const ApplicantsList = React.memo(function ApplicantsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [positionFilter, setPositionFilter] = useState("all")
  const [openApplicant, setOpenApplicant] = useState<string | null>(null)
  const [isAddApplicantOpen, setIsAddApplicantOpen] = useState(false)
  const [newApplicant, setNewApplicant] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    proposedPosition: "",
    ssn: "",
    dateOfBirth: "",
  })

  // Use useMemo for positions
  const positions = useMemo(() => {
    return [...new Set(mockApplicants.map((a) => a.proposedPosition).filter(Boolean))]
  }, [])

  // Use useMemo for filtered applicants
  const filteredApplicants = useMemo(() => {
    return mockApplicants.filter((applicant) => {
      const fullName = `${applicant.firstName} ${applicant.middleName || ""} ${applicant.lastName}`.toLowerCase()
      const matchesSearch =
        fullName.includes(searchTerm.toLowerCase()) ||
        (applicant.email && applicant.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (applicant.proposedPosition && applicant.proposedPosition.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesStatus = statusFilter === "all" || applicant.status === statusFilter
      const matchesPosition = positionFilter === "all" || applicant.proposedPosition === positionFilter

      return matchesSearch && matchesStatus && matchesPosition
    })
  }, [searchTerm, statusFilter, positionFilter])

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

  const handleAddApplicant = () => {
    // In a real app, this would call an API
    console.log("Adding new applicant:", newApplicant)
    setIsAddApplicantOpen(false)
    // Reset form
    setNewApplicant({
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      proposedPosition: "",
      ssn: "",
      dateOfBirth: "",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Dialog open={isAddApplicantOpen} onOpenChange={setIsAddApplicantOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <UserPlus className="mr-2 h-4 w-4" /> Add New Applicant
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Applicant</DialogTitle>
              <DialogDescription>Enter the details for the new applicant.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name*</Label>
                  <Input
                    id="firstName"
                    value={newApplicant.firstName}
                    onChange={(e) => setNewApplicant({ ...newApplicant, firstName: e.target.value })}
                    placeholder="John"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="middleName">Middle Name</Label>
                  <Input
                    id="middleName"
                    value={newApplicant.middleName}
                    onChange={(e) => setNewApplicant({ ...newApplicant, middleName: e.target.value })}
                    placeholder="M"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name*</Label>
                  <Input
                    id="lastName"
                    value={newApplicant.lastName}
                    onChange={(e) => setNewApplicant({ ...newApplicant, lastName: e.target.value })}
                    placeholder="Smith"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email*</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newApplicant.email}
                    onChange={(e) => setNewApplicant({ ...newApplicant, email: e.target.value })}
                    placeholder="john.smith@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    value={newApplicant.phoneNumber}
                    onChange={(e) => setNewApplicant({ ...newApplicant, phoneNumber: e.target.value })}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="proposedPosition">Position</Label>
                <Input
                  id="proposedPosition"
                  value={newApplicant.proposedPosition}
                  onChange={(e) => setNewApplicant({ ...newApplicant, proposedPosition: e.target.value })}
                  placeholder="Software Developer"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ssn">SSN</Label>
                  <Input
                    id="ssn"
                    value={newApplicant.ssn}
                    onChange={(e) => setNewApplicant({ ...newApplicant, ssn: e.target.value })}
                    placeholder="XXX-XX-XXXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={newApplicant.dateOfBirth}
                    onChange={(e) => setNewApplicant({ ...newApplicant, dateOfBirth: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddApplicantOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAddApplicant}
                disabled={!newApplicant.firstName || !newApplicant.lastName || !newApplicant.email}
              >
                Add Applicant
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
          <Select value={positionFilter} onValueChange={setPositionFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Positions</SelectItem>
              {positions.map((position) => (
                <SelectItem key={position} value={position}>
                  {position}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Full Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="h-4 w-4 mr-2" />
                                Order Background Check
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Download PDF
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardHeader>
                    <CardFooter className="flex justify-between text-xs text-muted-foreground py-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {applicant.dateOfBirth
                          ? `DOB: ${new Date(applicant.dateOfBirth).toLocaleDateString()}`
                          : "No DOB provided"}
                      </div>
                      <div>SSN: {applicant.ssn ? `xxx-xx-${applicant.ssn.slice(-4)}` : "Not provided"}</div>
                    </CardFooter>
                    <CollapsibleContent>
                      <CardContent className="pt-0 pb-3">
                        <div className="border-t pt-3">
                          <h4 className="text-sm font-medium mb-2">Applicant Details</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div className="flex items-start gap-2">
                                <Mail className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                <div>
                                  <p className="text-sm font-medium">Email</p>
                                  <p className="text-sm text-muted-foreground">{applicant.email || "Not provided"}</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <Phone className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                <div>
                                  <p className="text-sm font-medium">Phone</p>
                                  <p className="text-sm text-muted-foreground">
                                    {applicant.phoneNumber || "Not provided"}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <Briefcase className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                <div>
                                  <p className="text-sm font-medium">Position</p>
                                  <p className="text-sm text-muted-foreground">
                                    {applicant.proposedPosition || "Not specified"}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-start gap-2">
                                <FileText className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                <div>
                                  <p className="text-sm font-medium">Driver's License</p>
                                  <p className="text-sm text-muted-foreground">
                                    {applicant.driverLicense
                                      ? `${applicant.driverLicense} (${applicant.driverLicenseState})`
                                      : "Not provided"}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                <div>
                                  <p className="text-sm font-medium">Addresses</p>
                                  <Button variant="link" className="h-auto p-0 text-sm">
                                    View Addresses
                                  </Button>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <Search className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                <div>
                                  <p className="text-sm font-medium">Background Checks</p>
                                  <Button variant="link" className="h-auto p-0 text-sm">
                                    View Background Checks
                                  </Button>
                                </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate">{applicant.email || "No email provided"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{applicant.phoneNumber || "No phone provided"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>
                          DOB:{" "}
                          {applicant.dateOfBirth
                            ? new Date(applicant.dateOfBirth).toLocaleDateString()
                            : "Not provided"}
                        </span>
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
