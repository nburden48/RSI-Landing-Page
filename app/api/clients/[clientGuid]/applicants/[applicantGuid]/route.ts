import { type NextRequest, NextResponse } from "next/server"
import { dbService } from "@/lib/db-service"
import { getToken } from "next-auth/jwt"
import type { ApiResponse, Applicant } from "@/types/api"

export async function GET(
  request: NextRequest,
  { params }: { params: { clientGuid: string; applicantGuid: string } },
): Promise<NextResponse<ApiResponse<Applicant>>> {
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

    const { clientGuid, applicantGuid } = params

    // Verify client exists
    const client = await dbService.getClientById(clientGuid)
    if (!client) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "CLIENT_NOT_FOUND",
            message: "Client not found",
          },
        },
        { status: 404 },
      )
    }

    // Get the applicant
    const applicant = await dbService.getApplicantById(applicantGuid)
    if (!applicant) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "APPLICANT_NOT_FOUND",
            message: "Applicant not found",
          },
        },
        { status: 404 },
      )
    }

    // Verify the applicant belongs to the client
    if (applicant.clientGuid !== clientGuid) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "Applicant does not belong to this client",
          },
        },
        { status: 403 },
      )
    }

    return NextResponse.json({ success: true, data: applicant })
  } catch (error) {
    console.error("Error fetching applicant:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch applicant",
        },
      },
      { status: 500 },
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { clientGuid: string; applicantGuid: string } },
): Promise<NextResponse<ApiResponse<Applicant>>> {
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

    const { clientGuid, applicantGuid } = params

    // Verify client exists
    const client = await dbService.getClientById(clientGuid)
    if (!client) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "CLIENT_NOT_FOUND",
            message: "Client not found",
          },
        },
        { status: 404 },
      )
    }

    // Get the existing applicant
    const existingApplicant = await dbService.getApplicantById(applicantGuid)
    if (!existingApplicant) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "APPLICANT_NOT_FOUND",
            message: "Applicant not found",
          },
        },
        { status: 404 },
      )
    }

    // Verify the applicant belongs to the client
    if (existingApplicant.clientGuid !== clientGuid) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "Applicant does not belong to this client",
          },
        },
        { status: 403 },
      )
    }

    const body = await request.json()

    // Update the applicant
    const updatedApplicant = await dbService.updateApplicant(applicantGuid, body)

    return NextResponse.json({
      success: true,
      data: updatedApplicant,
    })
  } catch (error) {
    console.error("Error updating applicant:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update applicant",
        },
      },
      { status: 500 },
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { clientGuid: string; applicantGuid: string } },
): Promise<NextResponse<ApiResponse<string>>> {
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

    const { clientGuid, applicantGuid } = params

    // Verify client exists
    const client = await dbService.getClientById(clientGuid)
    if (!client) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "CLIENT_NOT_FOUND",
            message: "Client not found",
          },
        },
        { status: 404 },
      )
    }

    // Get the existing applicant
    const existingApplicant = await dbService.getApplicantById(applicantGuid)
    if (!existingApplicant) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "APPLICANT_NOT_FOUND",
            message: "Applicant not found",
          },
        },
        { status: 404 },
      )
    }

    // Verify the applicant belongs to the client
    if (existingApplicant.clientGuid !== clientGuid) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "Applicant does not belong to this client",
          },
        },
        { status: 403 },
      )
    }

    // Delete the applicant
    const success = await dbService.deleteApplicant(applicantGuid)
    if (!success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to delete applicant",
          },
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      data: "Applicant has been deleted.",
    })
  } catch (error) {
    console.error("Error deleting applicant:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete applicant",
        },
      },
      { status: 500 },
    )
  }
}
