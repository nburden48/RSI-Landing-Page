import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // API routes that start with /api/
  if (request.nextUrl.pathname.startsWith("/api/")) {
    // Skip authentication for login endpoint
    if (request.nextUrl.pathname.startsWith("/api/auth")) {
      return NextResponse.next()
    }

    const token = await getToken({ req: request })

    // If the user is not authenticated
    if (!token) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "Authentication required",
          },
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/api/:path*"],
}
