import { type NextRequest, NextResponse } from "next/server"
import { dbService } from "@/lib/db-service"
import { getToken } from "next-auth/jwt"
import type { ApiResponse, Order, PaginatedResponse } from "@/types/api"
import { v4 as uuidv4 } from "uuid"

export async function GET(
  request: NextRequest,
  { params }: { params: { clientGuid: string } },
): Promise<NextResponse<ApiResponse<PaginatedResponse<Order>>>> {
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

    // Get query parameters for pagination and filtering
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "0")
    const size = Number.parseInt(searchParams.get("size") || "30")
    const applicantGuid = searchParams.get("applicantGuid")

    // Get orders for this client
    const allOrders = await dbService.getOrders(clientGuid, applicantGuid || undefined)

    // Apply pagination
    const startIndex = page * size
    const endIndex = startIndex + size
    const paginatedOrders = allOrders.slice(startIndex, endIndex)

    const paginatedResponse: PaginatedResponse<Order> = {
      content: paginatedOrders,
      totalElements: allOrders.length,
      totalPages: Math.ceil(allOrders.length / size),
      size: size,
      number: page,
      first: page === 0,
      last: endIndex >= allOrders.length,
    }

    return NextResponse.json({ success: true, data: paginatedResponse })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch orders",
        },
      },
      { status: 500 },
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { clientGuid: string } },
): Promise<NextResponse<ApiResponse<Order>>> {
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
    if (!body.applicantGuid || !body.clientProductGuid) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "MISSING_REQUIRED_FIELDS",
            message: "Applicant GUID and client product GUID are required",
          },
        },
        { status: 400 },
      )
    }

    // Verify applicant exists and belongs to client
    const applicant = await dbService.getApplicantById(body.applicantGuid)
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

    // Verify client product exists and belongs to client
    const clientProduct = await dbService.getClientProductById(body.clientProductGuid)
    if (!clientProduct) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "CLIENT_PRODUCT_NOT_FOUND",
            message: "Client product not found",
          },
        },
        { status: 404 },
      )
    }

    if (clientProduct.clientGuid !== clientGuid) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "Client product does not belong to this client",
          },
        },
        { status: 403 },
      )
    }

    // Create searches for this order based on the client product
    const orderSearches = clientProduct.searches.map((templateSearch) => {
      const { searchGuid, ...rest } = templateSearch
      return {
        ...rest,
        searchGuid: `srch-${uuidv4()}`,
        applicantGuid: body.applicantGuid,
        status: "pending",
        dateOrdered: new Date().toISOString().split("T")[0],
      }
    })

    // Add the searches to the database
    for (const search of orderSearches) {
      await dbService.createSearch(search)
    }

    // Create the order
    const newOrder = await dbService.createOrder({
      clientGuid,
      applicantGuid: body.applicantGuid,
      clientProductGuid: body.clientProductGuid,
      clientReference: body.clientReference,
      status: "pending",
      dateOrdered: new Date().toISOString().split("T")[0],
      searches: orderSearches,
    })

    return NextResponse.json({ success: true, data: newOrder }, { status: 201 })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create order",
        },
      },
      { status: 500 },
    )
  }
}
