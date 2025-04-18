import { type NextRequest, NextResponse } from "next/server"
import { dbService } from "@/lib/db-service"
import { getToken } from "next-auth/jwt"
import type { ApiResponse, BackgroundCheck } from "@/types/api"

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<BackgroundCheck[]>>> {
  try {
    const token = await getToken({ req: request })
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const applicantId = searchParams.get("applicantId")

    let backgroundChecks: BackgroundCheck[]

    if (applicantId) {
      const id = Number.parseInt(applicantId)
      if (isNaN(id)) {
        return NextResponse.json({ success: false, error: "Invalid applicant ID" }, { status: 400 })
      }

      // In a real app, verify the applicant belongs to the client
      backgroundChecks = await dbService.getBackgroundChecks(id)
    } else {
      // In a real app, filter by client ID
      backgroundChecks = await dbService.getBackgroundChecks()
    }

    return NextResponse.json({ success: true, data: backgroundChecks })
  } catch (error) {
    console.error("Error fetching background checks:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch background checks" }, { status: 500 })
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<BackgroundCheck>>> {
  try {
    const token = await getToken({ req: request })
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    // Validate required fields
    if (!body.applicantId || !body.type || !body.location) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // In a real app, verify the applicant belongs to the client
    const applicant = await dbService.getApplicantById(body.applicantId)
    if (!applicant) {
      return NextResponse.json({ success: false, error: "Applicant not found" }, { status: 404 })
    }

    const newBackgroundCheck = await dbService.createBackgroundCheck({
      applicantId: body.applicantId,
      type: body.type,
      location: body.location,
      status: "pending",
      dateOrdered: new Date().toISOString().split("T")[0],
      ...body,
    })

    return NextResponse.json(
      { success: true, data: newBackgroundCheck, message: "Background check created successfully" },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating background check:", error)
    return NextResponse.json({ success: false, error: "Failed to create background check" }, { status: 500 })
  }
}
