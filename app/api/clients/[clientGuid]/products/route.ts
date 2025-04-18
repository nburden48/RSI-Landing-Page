import { type NextRequest, NextResponse } from "next/server"
import { dbService } from "@/lib/db-service"
import { getToken } from "next-auth/jwt"
import type { ApiResponse, ClientProduct } from "@/types/api"

export async function GET(
  request: NextRequest,
  { params }: { params: { clientGuid: string } },
): Promise<NextResponse<ApiResponse<ClientProduct[]>>> {
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

    const products = await dbService.getClientProducts(clientGuid)

    return NextResponse.json({ success: true, data: products })
  } catch (error) {
    console.error("Error fetching client products:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch client products",
        },
      },
      { status: 500 },
    )
  }
}
