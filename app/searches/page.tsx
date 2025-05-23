"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  CheckSquare,
  Clock,
  AlertCircle,
  Calendar,
  Search,
  MapPin,
  FileText,
  User,
  HelpCircle,
  Video,
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import type { Search as SearchType } from "@/types/api"

export default function SearchesPage() {
  const [searches, setSearches] = useState<SearchType[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedSearch, setSelectedSearch] = useState<SearchType | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  // Fetch searches data
  useEffect(() => {
    async function fetchSearches() {
      try {
        setLoading(true)
        // In a real app, this would be an API call
        // const response = await fetch('/api/background-checks')
        // const data = await response.json()

        // For now, use mock data
        const mockSearches: SearchType[] = [
          {
            searchGuid: "srch-a1b2c3d4-e5f6-g7h8-i9j0",
            applicantGuid: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
            type: "STATE_CRIMINAL",
            displayName: "State Criminal",
            status: "completed",
            dateOrdered: "2025-04-02",
            dateCompleted: "2025-04-05",
            result: "Clear",
            location: "California",
            price: 12.99,
          },
          {
            searchGuid: "srch-b2c3d4e5-f6g7-h8i9-j0k1",
            applicantGuid: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
            type: "COUNTY_CRIMINAL",
            displayName: "County Criminal",
            status: "in-progress",
            dateOrdered: "2025-04-02",
            estimatedCompletion: "2025-04-09",
            location: "Los Angeles County, CA",
            price: 18.99,
          },
          {
            searchGuid: "srch-c3d4e5f6-g7h8-i9j0-k1l2",
            applicantGuid: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
            type: "EMPLOYMENT_VERIFICATION",
            displayName: "Employment Verification",
            status: "pending",
            dateOrdered: "2025-04-02",
            issue: "Waiting for employer response",
            location: "Previous Employer",
            price: 15.99,
          },
          {
            searchGuid: "srch-d4e5f6g7-h8i9-j0k1-l2m3",
            applicantGuid: "b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7",
            type: "STATE_CRIMINAL",
            displayName: "State Criminal",
            status: "completed",
            dateOrdered: "2025-04-01",
            dateCompleted: "2025-04-04",
            result: "Clear",
            location: "New York",
            price: 12.99,
          },
          {
            searchGuid: "srch-e5f6g7h8-i9j0-k1l2-m3n4",
            applicantGuid: "c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8",
            type: "CREDIT_CHECK",
            displayName: "Credit Check",
            status: "completed",
            dateOrdered: "2025-04-03",
            dateCompleted: "2025-04-05",
            result: "Alert",
            location: "National",
            price: 19.99,
          },
        ]

        setSearches(mockSearches)
      } catch (error) {
        console.error("Error fetching searches:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSearches()
  }, [])

  // Get unique search types for filter
  const searchTypes = [...new Set(searches.map((s) => s.type))]

  // Filter searches based on search term, status filter, and type filter
  const filteredSearches = searches.filter((search) => {
    const matchesSearch =
      search.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      search.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || search.status === statusFilter
    const matchesType = typeFilter === "all" || search.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

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

  const getResultBadge = (result?: string) => {
    if (!result) return null

    switch (result) {
      case "Clear":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
            Clear
          </Badge>
        )
      case "Alert":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100">
            Alert
          </Badge>
        )
      case "Verified":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Verified
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            {result}
          </Badge>
        )
    }
  }

  const viewSearchDetails = (search: SearchType) => {
    setSelectedSearch(search)
    setIsDetailsOpen(true)
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <Skeleton className="h-10 w-[250px] mb-2" />
          <Skeleton className="h-5 w-[350px]" />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="h-10 w-full sm:w-[250px]" />
          <Skeleton className="h-10 w-full sm:w-[150px]" />
          <Skeleton className="h-10 w-full sm:w-[150px]" />
        </div>
        <Skeleton className="h-10 w-[400px]" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Background Checks</h1>
        <p className="text-muted-foreground">View and manage all your background checks and search requests.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6 max-w-3xl">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-[250px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search background checks..."
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="pending">Pending Information</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Search Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {searchTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {searches.find((s) => s.type === type)?.displayName || type}
                  </SelectItem>
                ))}
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
                        <TableHead>Search Type</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date Ordered</TableHead>
                        <TableHead>Result</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSearches.length > 0 ? (
                        filteredSearches.map((search) => (
                          <TableRow key={search.searchGuid}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                {getStatusIcon(search.status)}
                                {search.displayName}
                              </div>
                            </TableCell>
                            <TableCell>{search.location}</TableCell>
                            <TableCell>{getStatusBadge(search.status)}</TableCell>
                            <TableCell>{new Date(search.dateOrdered).toLocaleDateString()}</TableCell>
                            <TableCell>{search.result ? getResultBadge(search.result) : "-"}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" onClick={() => viewSearchDetails(search)}>
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6">
                            No background checks found matching your filters.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="cards" className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredSearches.length > 0 ? (
                  filteredSearches.map((search) => (
                    <Card key={search.searchGuid} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2 text-lg font-medium">
                            {getStatusIcon(search.status)}
                            {search.displayName}
                          </div>
                          {getStatusBadge(search.status)}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                          <MapPin className="h-3.5 w-3.5" />
                          {search.location}
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Date Ordered:</span>
                            <span className="text-sm">{new Date(search.dateOrdered).toLocaleDateString()}</span>
                          </div>
                          {search.dateCompleted && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Date Completed:</span>
                              <span className="text-sm">{new Date(search.dateCompleted).toLocaleDateString()}</span>
                            </div>
                          )}
                          {search.estimatedCompletion && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Est. Completion:</span>
                              <span className="text-sm">
                                {new Date(search.estimatedCompletion).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                          {search.result && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Result:</span>
                              <span>{getResultBadge(search.result)}</span>
                            </div>
                          )}
                          {search.issue && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Issue:</span>
                              <span className="text-sm text-amber-600">{search.issue}</span>
                            </div>
                          )}
                        </div>
                        <div className="mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => viewSearchDetails(search)}
                          >
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-muted-foreground">No background checks found matching your filters.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right side - Resources and Help */}
        <div className="w-full md:w-80 space-y-6">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary-500" />
                <h3 className="font-medium">Order New Check</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Need to run a new background check? Click below to start the process.
              </p>
              <Button className="w-full">Order Background Check</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary-500" />
                <h3 className="font-medium">Need Help?</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Video className="h-4 w-4 mt-1 text-primary-500" />
                  <div>
                    <h4 className="text-sm font-medium">How to Read Results</h4>
                    <p className="text-xs text-muted-foreground">Watch our tutorial video</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <FileText className="h-4 w-4 mt-1 text-primary-500" />
                  <div>
                    <h4 className="text-sm font-medium">Understanding Statuses</h4>
                    <p className="text-xs text-muted-foreground">Learn what each status means</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Visit Help Center
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Background Check Details</DialogTitle>
            <DialogDescription>Detailed information about this background check.</DialogDescription>
          </DialogHeader>
          {selectedSearch && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{selectedSearch.displayName}</h3>
                {getStatusBadge(selectedSearch.status)}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">{selectedSearch.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Date Ordered</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(selectedSearch.dateOrdered).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {selectedSearch.dateCompleted && (
                    <div className="flex items-center gap-2">
                      <CheckSquare className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="text-sm font-medium">Date Completed</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(selectedSearch.dateCompleted).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                  {selectedSearch.estimatedCompletion && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-amber-500" />
                      <div>
                        <p className="text-sm font-medium">Estimated Completion</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(selectedSearch.estimatedCompletion).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  {selectedSearch.result && (
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Result</p>
                        <div>{getResultBadge(selectedSearch.result)}</div>
                      </div>
                    </div>
                  )}
                  {selectedSearch.issue && (
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <div>
                        <p className="text-sm font-medium">Issue</p>
                        <p className="text-sm text-amber-600">{selectedSearch.issue}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Applicant ID</p>
                      <p className="text-sm text-muted-foreground">{selectedSearch.applicantGuid}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div>
                      <p className="text-sm font-medium">Price</p>
                      <p className="text-sm text-muted-foreground">${selectedSearch.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedSearch.status === "in-progress" && (
                <div className="rounded-md bg-amber-50 p-4 mt-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Clock className="h-5 w-5 text-amber-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-amber-800">Search in progress</h3>
                      <div className="mt-2 text-sm text-amber-700">
                        <p>
                          This background check is currently being processed. You will be notified when it is complete.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedSearch.status === "pending" && (
                <div className="rounded-md bg-red-50 p-4 mt-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Action Required</h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>{selectedSearch.issue || "Additional information is needed to complete this search."}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
              Close
            </Button>
            {selectedSearch?.status === "pending" && <Button>Provide Information</Button>}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {filteredSearches.length === 0 && !loading && (
        <div className="text-center py-12 bg-muted rounded-lg border">
          <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">No background checks found</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-4">
            You don't have any background checks matching the current filters.
          </p>
          <Button>Order New Background Check</Button>
        </div>
      )}
    </div>
  )
}
