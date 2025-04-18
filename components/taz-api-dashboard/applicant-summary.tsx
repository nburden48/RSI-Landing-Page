"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { User, UserCheck, UserX } from "lucide-react"

interface Applicant {
  guid: string
  firstName: string
  lastName: string
  email: string
  status: string
  createdDate: string
}

export function ApplicantSummary() {
  const [applicants, setApplicants] = useState<Applicant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        // In a real implementation, this would use the client's actual GUID
        const mockClientGuid = "c1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6"
        const response = await fetch(`/api/mock/clients/${mockClientGuid}/applicants`)

        if (!response.ok) {
          throw new Error("Failed to fetch applicants")
        }

        const data = await response.json()
        setApplicants(data.data)
      } catch (err: any) {
        console.error("Error fetching applicants:", err)
        setError(err.message || "An error occurred while fetching applicants")
      } finally {
        setLoading(false)
      }
    }

    fetchApplicants()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status.toUpperCase()) {
      case "ACTIVE":
        return <UserCheck className="w-4 h-4 text-green-500" />
      case "INACTIVE":
        return <UserX className="w-4 h-4 text-red-500" />
      default:
        return <User className="w-4 h-4 text-gray-500" />
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
          <CardTitle>Recent Applicants</CardTitle>
          <CardDescription>Loading recent applicants...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-3 w-[200px]" />
                </div>
                <Skeleton className="h-6 w-[30px] rounded-full" />
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
          <CardTitle>Recent Applicants</CardTitle>
          <CardDescription>Error loading applicants</CardDescription>
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
        <CardTitle>Recent Applicants</CardTitle>
        <CardDescription>View your recent applicants</CardDescription>
      </CardHeader>
      <CardContent>
        {applicants.length === 0 ? (
          <div className="text-center p-4 text-muted-foreground">No applicants found</div>
        ) : (
          <div className="space-y-4">
            {applicants.map((applicant) => (
              <div
                key={applicant.guid}
                className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
              >
                <div className="space-y-1">
                  <div className="font-medium">
                    {applicant.firstName} {applicant.lastName}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {applicant.email} • Added: {formatDate(applicant.createdDate)}
                  </div>
                </div>
                {getStatusIcon(applicant.status)}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
