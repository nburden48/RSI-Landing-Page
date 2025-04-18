import { type NextRequest, NextResponse } from "next/server"
import { dbService } from "@/lib/db-service"
import { getToken } from "next-auth/jwt"
import type { ApiResponse, ApplicantAddress } from "@/types/api"

export async function GET(
  request: NextRequest,
  { params }: { params: { clientGuid: string; applicantGuid: string } },
): Promise<NextResponse<ApiResponse<ApplicantAddress[]>>> {
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

    const addresses = await dbService.getAddresses(applicantGuid)

    return NextResponse.json({ success: true, data: addresses })
  } catch (error) {
    console.error("Error fetching addresses:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch addresses",
        },
      },
      { status: 500 },
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { clientGuid: string; applicantGuid: string } },
): Promise<NextResponse<ApiResponse<ApplicantAddress>>> {
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
    if (!body.address1 || !body.city || !body.state || !body.zipCode || !body.addressType) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "MISSING_REQUIRED_FIELDS",
            message: "Address1, city, state, zipCode, and addressType are required",
          },
        },
        { status: 400 },
      )
    }

    const newAddress = await dbService.createAddress({
      ...body,
      applicantGuid,
    })

    return NextResponse.json({ success: true, data: newAddress }, { status: 201 })
  } catch (error) {
    console.error("Error creating address:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create address",
        },
      },
      { status: 500 },
    )
  }
}
