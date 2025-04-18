import { type NextRequest, NextResponse } from "next/server"
import { dbService } from "@/lib/db-service"
import { getToken } from "next-auth/jwt"
import type { ApiResponse, Applicant } from "@/types/api"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<ApiResponse<Applicant>>> {
  try {
    const token = await getToken({ req: request })
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const id = Number.parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 })
    }

    const applicant = await dbService.getApplicantById(id)
    if (!applicant) {
      return NextResponse.json({ success: false, error: "Applicant not found" }, { status: 404 })
    }

    // In a real app, check if the applicant belongs to the client
    const clientId = 1 // From token
    if (applicant.clientId !== clientId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 })
    }

    return NextResponse.json({ success: true, data: applicant })
  } catch (error) {
    console.error("Error fetching applicant:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch applicant" }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<ApiResponse<Applicant>>> {
  try {
    const token = await getToken({ req: request })
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const id = Number.parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 })
    }

    const body = await request.json()

    // Get the existing applicant
    const existingApplicant = await dbService.getApplicantById(id)
    if (!existingApplicant) {
      return NextResponse.json({ success: false, error: "Applicant not found" }, { status: 404 })
    }

    // In a real app, check if the applicant belongs to the client
    const clientId = 1 // From token
    if (existingApplicant.clientId !== clientId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 })
    }

    // Update the applicant
    const updatedApplicant = await dbService.updateApplicant(id, {
      name: body.name,
      email: body.email,
      position: body.position,
      status: body.status,
    })

    return NextResponse.json({
      success: true,
      data: updatedApplicant,
      message: "Applicant updated successfully",
    })
  } catch (error) {
    console.error("Error updating applicant:", error)
    return NextResponse.json({ success: false, error: "Failed to update applicant" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<ApiResponse<null>>> {
  try {
    const token = await getToken({ req: request })
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const id = Number.parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 })
    }

    // Get the existing applicant
    const existingApplicant = await dbService.getApplicantById(id)
    if (!existingApplicant) {
      return NextResponse.json({ success: false, error: "Applicant not found" }, { status: 404 })
    }

    // In a real app, check if the applicant belongs to the client
    const clientId = 1 // From token
    if (existingApplicant.clientId !== clientId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 })
    }

    // Delete the applicant
    const success = await dbService.deleteApplicant(id)
    if (!success) {
      return NextResponse.json({ success: false, error: "Failed to delete applicant" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Applicant deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting applicant:", error)
    return NextResponse.json({ success: false, error: "Failed to delete applicant" }, { status: 500 })
  }
}
