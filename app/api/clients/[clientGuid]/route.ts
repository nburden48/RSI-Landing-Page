import { type NextRequest, NextResponse } from "next/server"
import { dbService } from "@/lib/db-service"
import { getToken } from "next-auth/jwt"
import type { ApiResponse, Client } from "@/types/api"

export async function GET(
  request: NextRequest,
  { params }: { params: { clientGuid: string } },
): Promise<NextResponse<ApiResponse<Client>>> {
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

    return NextResponse.json({ success: true, data: client })
  } catch (error) {
    console.error("Error fetching client:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch client",
        },
      },
      { status: 500 },
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { clientGuid: string } },
): Promise<NextResponse<ApiResponse<Client>>> {
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
    const existingClient = await dbService.getClientById(clientGuid)
    if (!existingClient) {
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

    // Update the client
    const updatedClient = await dbService.updateClient(clientGuid, body)

    return NextResponse.json({
      success: true,
      data: updatedClient,
    })
  } catch (error) {
    console.error("Error updating client:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update client",
        },
      },
      { status: 500 },
    )
  }
}
