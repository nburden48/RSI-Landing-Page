import { type NextRequest, NextResponse } from "next/server"
import { dbService } from "@/lib/db-service"
import { getToken } from "next-auth/jwt"
import type { ApiResponse, Message, PaginatedResponse } from "@/types/api"

export async function GET(
  request: NextRequest,
  { params }: { params: { clientGuid: string } },
): Promise<NextResponse<ApiResponse<PaginatedResponse<Message>>>> {
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
    const orderGuid = searchParams.get("orderGuid")
    const applicantGuid = searchParams.get("applicantGuid")

    // Get messages for this client
    const allMessages = await dbService.getMessages(clientGuid, orderGuid || undefined, applicantGuid || undefined)

    // Apply pagination
    const startIndex = page * size
    const endIndex = startIndex + size
    const paginatedMessages = allMessages.slice(startIndex, endIndex)

    const paginatedResponse: PaginatedResponse<Message> = {
      content: paginatedMessages,
      totalElements: allMessages.length,
      totalPages: Math.ceil(allMessages.length / size),
      size: size,
      number: page,
      first: page === 0,
      last: endIndex >= allMessages.length,
    }

    return NextResponse.json({ success: true, data: paginatedResponse })
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch messages",
        },
      },
      { status: 500 },
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { clientGuid: string } },
): Promise<NextResponse<ApiResponse<Message>>> {
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
    if (!body.subject || !body.content) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "MISSING_REQUIRED_FIELDS",
            message: "Subject and content are required",
          },
        },
        { status: 400 },
      )
    }

    // If orderGuid is provided, verify it exists and belongs to the client
    if (body.orderGuid) {
      const order = await dbService.getOrderById(body.orderGuid)
      if (!order) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: "ORDER_NOT_FOUND",
              message: "Order not found",
            },
          },
          { status: 404 },
        )
      }

      if (order.clientGuid !== clientGuid) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: "UNAUTHORIZED",
              message: "Order does not belong to this client",
            },
          },
          { status: 403 },
        )
      }
    }

    // If applicantGuid is provided, verify it exists and belongs to the client
    if (body.applicantGuid) {
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
    }

    // Create the message
    const newMessage = await dbService.createMessage({
      clientGuid,
      orderGuid: body.orderGuid,
      applicantGuid: body.applicantGuid,
      subject: body.subject,
      content: body.content,
      dateCreated: new Date().toISOString().split("T")[0],
      isRead: false,
      fromClient: true,
    })

    return NextResponse.json({ success: true, data: newMessage }, { status: 201 })
  } catch (error) {
    console.error("Error creating message:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create message",
        },
      },
      { status: 500 },
    )
  }
}
