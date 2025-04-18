/**
 * Authentication service for TazAPI
 * Manages JWT token storage and provides authentication headers
 */
export class TazApiAuth {
  private static token: string | null = null

  /**
   * Set the JWT token for API authentication
   * @param token JWT token from TazAPI Developer Portal
   */
  static setToken(token: string): void {
    this.token = token

    // Optionally store in localStorage for persistence
    if (typeof window !== "undefined") {
      localStorage.setItem("tazapi_token", token)
    }
  }

  /**
   * Get the current JWT token
   * @returns The current JWT token or null if not set
   */
  static getToken(): string | null {
    // Try to load from localStorage if not already loaded
    if (!this.token && typeof window !== "undefined") {
      const storedToken = localStorage.getItem("tazapi_token")
      if (storedToken) {
        this.token = storedToken
      }
    }

    return this.token
  }

  /**
   * Clear the stored JWT token
   */
  static clearToken(): void {
    this.token = null

    if (typeof window !== "undefined") {
      localStorage.removeItem("tazapi_token")
    }
  }

  /**
   * Get headers with authentication for API requests
   * @returns Headers object with Authorization and Content-Type
   * @throws Error if token is not set
   */
  static getAuthHeaders(): HeadersInit {
    const token = this.getToken()

    // If no token is available, return basic headers without Authorization
    if (!token) {
      return {
        "Content-Type": "application/json",
      }
    }

    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  }
}
