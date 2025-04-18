import { type NextRequest, NextResponse } from "next/server"
import { dbService } from "@/lib/db-service"
import { getToken } from "next-auth/jwt"
import type { ApiResponse, Client } from "@/types/api"

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<Client[]>>> {
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

    const clients = await dbService.getClients()

    return NextResponse.json({ success: true, data: clients })
  } catch (error) {
    console.error("Error fetching clients:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch clients",
        },
      },
      { status: 500 },
    )
  }
}
