"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { CheckCircle, Clock, AlertCircle } from "lucide-react"

type BackgroundCheckStatus = "COMPLETE" | "IN_PROGRESS" | "PENDING" | "CANCELED"

interface BackgroundCheck {
  guid: string
  applicantName: string
  fileNumber: string
  status: BackgroundCheckStatus
  orderDate: string
  completedDate: string | null
}

export function BackgroundCheckSummary() {
  const [checks, setChecks] = useState<BackgroundCheck[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBackgroundChecks = async () => {
      try {
        // In a real implementation, this would use the client's actual GUID
        const mockClientGuid = "c1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6"
        const response = await fetch(`/api/mock/clients/${mockClientGuid}/orders`)

        if (!response.ok) {
          throw new Error("Failed to fetch background checks")
        }

        const data = await response.json()
        setChecks(data.data)
      } catch (err: any) {
        console.error("Error fetching background checks:", err)
        setError(err.message || "An error occurred while fetching background checks")
      } finally {
        setLoading(false)
      }
    }

    fetchBackgroundChecks()
  }, [])

  const getStatusBadge = (status: BackgroundCheckStatus) => {
    switch (status) {
      case "COMPLETE":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" /> Complete
          </Badge>
        )
      case "IN_PROGRESS":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Clock className="w-3 h-3 mr-1" /> In Progress
          </Badge>
        )
      case "PENDING":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </Badge>
        )
      case "CANCELED":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <AlertCircle className="w-3 h-3 mr-1" /> Canceled
          </Badge>
        )
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Unknown</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Background Checks</CardTitle>
          <CardDescription>Loading recent background checks...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-3 w-[200px]" />
                </div>
                <Skeleton className="h-6 w-[100px]" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Background Checks</CardTitle>
          <CardDescription>Error loading background checks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-red-50 text-red-800 rounded-md">{error}</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Background Checks</CardTitle>
        <CardDescription>View your recent background check orders</CardDescription>
      </CardHeader>
      <CardContent>
        {checks.length === 0 ? (
          <div className="text-center p-4 text-muted-foreground">No background checks found</div>
        ) : (
          <div className="space-y-4">
            {checks.map((check) => (
              <div key={check.guid} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                <div className="space-y-1">
                  <div className="font-medium">{check.applicantName}</div>
                  <div className="text-sm text-muted-foreground">
                    {check.fileNumber} • Ordered: {formatDate(check.orderDate)}
                  </div>
                </div>
                {getStatusBadge(check.status)}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
