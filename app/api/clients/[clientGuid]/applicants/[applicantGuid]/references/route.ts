import { type NextRequest, NextResponse } from "next/server"
import { dbService } from "@/lib/db-service"
import { getToken } from "next-auth/jwt"
import type { ApiResponse, ApplicantReference } from "@/types/api"

export async function GET(
  request: NextRequest,
  { params }: { params: { clientGuid: string; applicantGuid: string } },
): Promise<NextResponse<ApiResponse<ApplicantReference[]>>> {
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

    const references = await dbService.getReferences(applicantGuid)

    return NextResponse.json({ success: true, data: references })
  } catch (error) {
    console.error("Error fetching references:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch references",
        },
      },
      { status: 500 },
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { clientGuid: string; applicantGuid: string } },
): Promise<NextResponse<ApiResponse<ApplicantReference>>> {
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

    const body = await request.json()

    // Validate required fields
    if (!body.firstName || !body.lastName) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "MISSING_REQUIRED_FIELDS",
            message: "First name and last name are required",
          },
        },
        { status: 400 },
      )
    }

    const newReference = await dbService.createReference({
      ...body,
      applicantGuid,
    })

    return NextResponse.json({ success: true, data: newReference }, { status: 201 })
  } catch (error) {
    console.error("Error creating reference:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create reference",
        },
      },
      { status: 500 },
    )
  }
}
