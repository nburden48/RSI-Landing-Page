import { type NextRequest, NextResponse } from "next/server"
import { dbService } from "@/lib/db-service"
import { getToken } from "next-auth/jwt"
import type { ApiResponse, Applicant, PaginatedResponse } from "@/types/api"

export async function GET(
  request: NextRequest,
  { params }: { params: { clientGuid: string } },
): Promise<NextResponse<ApiResponse<PaginatedResponse<Applicant>>>> {
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

    const { clientGuid } = params

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

    // Get query parameters for pagination
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "0")
    const size = Number.parseInt(searchParams.get("size") || "30")

    // Get all applicants for this client
    const allApplicants = await dbService.getApplicants(clientGuid)

    // Apply pagination
    const startIndex = page * size
    const endIndex = startIndex + size
    const paginatedApplicants = allApplicants.slice(startIndex, endIndex)

    const paginatedResponse: PaginatedResponse<Applicant> = {
      content: paginatedApplicants,
      totalElements: allApplicants.length,
      totalPages: Math.ceil(allApplicants.length / size),
      size: size,
      number: page,
      first: page === 0,
      last: endIndex >= allApplicants.length,
    }

    return NextResponse.json({ success: true, data: paginatedResponse })
  } catch (error) {
    console.error("Error fetching applicants:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch applicants",
        },
      },
      { status: 500 },
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { clientGuid: string } },
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

    const { clientGuid } = params

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

    const newApplicant = await dbService.createApplicant({
      ...body,
      clientGuid,
    })

    return NextResponse.json({ success: true, data: newApplicant }, { status: 201 })
  } catch (error) {
    console.error("Error creating applicant:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create applicant",
        },
      },
      { status: 500 },
    )
  }
}
