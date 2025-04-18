import { cookies } from "next/headers"
import { getIronSession } from "iron-session"

// Define the session data type
export interface SessionData {
  isLoggedIn: boolean
  userId?: string
  email?: string
  role?: "admin" | "client_user"
  clientId?: string
  apiKey?: string
}

// Define the session options
export const sessionOptions = {
  password: process.env.IRON_SESSION_PASSWORD || "complex_password_at_least_32_characters_long",
  cookieName: process.env.IRON_SESSION_COOKIE_NAME || "client_portal_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict" as const,
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
}

/**
 * Check if Iron Session is configured
 */
export const isSessionConfigured = (): boolean => {
  return !!process.env.IRON_SESSION_PASSWORD && process.env.IRON_SESSION_PASSWORD.length >= 32
}

/**
 * Get the session data
 * @returns The session data or a default session
 */
export async function getSession(): Promise<SessionData> {
  // If Iron Session is not configured, return a default session
  if (!isSessionConfigured()) {
    console.warn("Iron Session is not configured. Using mock session.")
    return { isLoggedIn: false }
  }

  // Get the session from the cookies
  const cookieStore = cookies()
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions)

  // Initialize the session if it doesn't exist
  if (!session.isLoggedIn) {
    session.isLoggedIn = false
  }

  return session
}

export default getSession
