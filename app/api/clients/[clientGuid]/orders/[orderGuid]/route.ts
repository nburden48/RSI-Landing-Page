import { type NextRequest, NextResponse } from "next/server"
import { dbService } from "@/lib/db-service"
import { getToken } from "next-auth/jwt"
import type { ApiResponse, Order } from "@/types/api"

export async function GET(
  request: NextRequest,
  { params }: { params: { clientGuid: string; orderGuid: string } },
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

    const { clientGuid, orderGuid } = params

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

    // Get the order
    const order = await dbService.getOrderById(orderGuid)
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

    // Verify the order belongs to the client
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

    return NextResponse.json({ success: true, data: order })
  } catch (error) {
    console.error("Error fetching order:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch order",
        },
      },
      { status: 500 },
    )
  }
}
