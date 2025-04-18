import { type NextRequest, NextResponse } from "next/server"
import { dbService } from "@/lib/db-service"
import { getToken } from "next-auth/jwt"
import type { ApiResponse, Applicant } from "@/types/api"

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<Applicant[]>>> {
  try {
    const token = await getToken({ req: request })
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    // In a real app, you'd get the client ID from the token
    const clientId = 1
    const applicants = await dbService.getApplicants(clientId)

    return NextResponse.json({ success: true, data: applicants })
  } catch (error) {
    console.error("Error fetching applicants:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch applicants" }, { status: 500 })
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<Applicant>>> {
  try {
    const token = await getToken({ req: request })
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.position) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // In a real app, you'd get the client ID from the token
    const clientId = 1

    const newApplicant = await dbService.createApplicant({
      name: body.name,
      email: body.email,
      position: body.position,
      dateSubmitted: new Date().toISOString().split("T")[0],
      status: "pending",
      clientId,
    })

    return NextResponse.json(
      { success: true, data: newApplicant, message: "Applicant created successfully" },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating applicant:", error)
    return NextResponse.json({ success: false, error: "Failed to create applicant" }, { status: 500 })
  }
}
