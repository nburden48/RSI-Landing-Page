import { type NextRequest, NextResponse } from "next/server"
import { dbService } from "@/lib/db-service"
import { getToken } from "next-auth/jwt"
import type { ApiResponse, BackgroundCheck } from "@/types/api"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<ApiResponse<BackgroundCheck>>> {
  try {
    const token = await getToken({ req: request })
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const id = Number.parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 })
    }

    const backgroundCheck = await dbService.getBackgroundCheckById(id)
    if (!backgroundCheck) {
      return NextResponse.json({ success: false, error: "Background check not found" }, { status: 404 })
    }

    // In a real app, verify the applicant belongs to the client
    const applicant = await dbService.getApplicantById(backgroundCheck.applicantId)
    if (!applicant) {
      return NextResponse.json({ success: false, error: "Associated applicant not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: backgroundCheck })
  } catch (error) {
    console.error("Error fetching background check:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch background check" }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<ApiResponse<BackgroundCheck>>> {
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

    // Get the existing background check
    const existingCheck = await dbService.getBackgroundCheckById(id)
    if (!existingCheck) {
      return NextResponse.json({ success: false, error: "Background check not found" }, { status: 404 })
    }

    // In a real app, verify the applicant belongs to the client
    const applicant = await dbService.getApplicantById(existingCheck.applicantId)
    if (!applicant) {
      return NextResponse.json({ success: false, error: "Associated applicant not found" }, { status: 404 })
    }

    // Update the background check
    const updatedCheck = await dbService.updateBackgroundCheck(id, {
      type: body.type,
      location: body.location,
      status: body.status,
      dateCompleted: body.dateCompleted,
      estimatedCompletion: body.estimatedCompletion,
      result: body.result,
      issue: body.issue,
    })

    return NextResponse.json({
      success: true,
      data: updatedCheck,
      message: "Background check updated successfully",
    })
  } catch (error) {
    console.error("Error updating background check:", error)
    return NextResponse.json({ success: false, error: "Failed to update background check" }, { status: 500 })
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

    // Get the existing background check
    const existingCheck = await dbService.getBackgroundCheckById(id)
    if (!existingCheck) {
      return NextResponse.json({ success: false, error: "Background check not found" }, { status: 404 })
    }

    // In a real app, verify the applicant belongs to the client
    const applicant = await dbService.getApplicantById(existingCheck.applicantId)
    if (!applicant) {
      return NextResponse.json({ success: false, error: "Associated applicant not found" }, { status: 404 })
    }

    // Delete the background check
    const success = await dbService.deleteBackgroundCheck(id)
    if (!success) {
      return NextResponse.json({ success: false, error: "Failed to delete background check" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Background check deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting background check:", error)
    return NextResponse.json({ success: false, error: "Failed to delete background check" }, { status: 500 })
  }
}
