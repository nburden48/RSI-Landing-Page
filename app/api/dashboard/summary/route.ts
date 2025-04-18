import { type NextRequest, NextResponse } from "next/server"
import { dbService } from "@/lib/db-service"
import { getToken } from "next-auth/jwt"
import type { ApiResponse, DashboardSummary } from "@/types/api"

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<DashboardSummary>>> {
  try {
    const token = await getToken({ req: request })
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "Authentication required",
          },
        },
        { status: 401 },
      )
    }

    // In a real app, you'd get the client ID from the token
    const clientGuid = "c1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6"

    // Get all applicants for this client
    const applicants = await dbService.getApplicants(clientGuid)

    // Get all orders for this client
    const orders = await dbService.getOrders(clientGuid)

    // Get all searches from all orders
    const searches = orders.flatMap((order) => order.searches)

    // Calculate summary statistics
    const completedSearches = searches.filter((s) => s.status === "completed").length
    const inProgressSearches = searches.filter((s) => s.status === "in-progress").length
    const pendingSearches = searches.filter((s) => s.status === "pending").length

    // Mock recent activity
    const recentActivity = [
      {
        date: "2025-04-07",
        action: "Background Check Completed",
        details: "State Criminal check for John Smith completed with Clear result",
      },
      {
        date: "2025-04-06",
        action: "New Applicant Added",
        details: "David Wilson added for Project Manager position",
      },
      {
        date: "2025-04-05",
        action: "Background Check Updated",
        details: "County Criminal check for Sarah Johnson is now in progress",
      },
      {
        date: "2025-04-04",
        action: "Information Requested",
        details: "Additional information needed for Michael Chen's credit check",
      },
    ]

    const summaryData: DashboardSummary = {
      totalApplicants: applicants.length,
      completedSearches,
      inProgressSearches,
      pendingSearches,
      recentActivity,
    }

    return NextResponse.json({ success: true, data: summaryData })
  } catch (error) {
    console.error("Error fetching dashboard summary:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch dashboard summary",
        },
      },
      { status: 500 },
    )
  }
}
