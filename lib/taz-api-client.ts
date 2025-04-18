/**
 * Check if TazAPI is configured
 */
export const isTazApiConfigured = (): boolean => {
  return !!process.env.TAZAPI_BASE_URL && !!process.env.TAZAPI_JWT_TOKEN && process.env.ENABLE_TAZAPI === "true"
}

/**
 * Base TazAPI client with error handling and fallbacks
 */
export class TazApiClient {
  private baseUrl: string
  private jwtToken: string
  private isConfigured: boolean

  constructor() {
    this.baseUrl = process.env.TAZAPI_BASE_URL || ""
    this.jwtToken = process.env.TAZAPI_JWT_TOKEN || ""
    this.isConfigured = isTazApiConfigured()
  }

  /**
   * Make a request to the TazAPI
   * @param endpoint The API endpoint
   * @param options Fetch options
   * @param mockData Mock data to return if TazAPI is not configured
   * @returns The API response or mock data
   */
  async request<T>(endpoint: string, options: RequestInit = {}, mockData: T | null = null): Promise<T> {
    // If TazAPI is not configured, return mock data
    if (!this.isConfigured) {
      console.warn(`TazAPI is not configured or disabled. Using mock data for: ${endpoint}`)
      if (mockData === null) {
        throw new Error(`No mock data provided for endpoint: ${endpoint}`)
      }
      return mockData
    }

    // Prepare the request
    const url = `${this.baseUrl}${endpoint}`
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.jwtToken}`,
      ...options.headers,
    }

    try {
      // Make the request
      const response = await fetch(url, {
        ...options,
        headers,
      })

      // Check if the request was successful
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`TazAPI request failed: ${response.status} ${response.statusText} - ${errorText}`)
      }

      // Parse the response
      const data = await response.json()
      return data as T
    } catch (error) {
      console.error("TazAPI request error:", error)

      // If we have mock data, return it as a fallback
      if (mockData !== null) {
        console.warn(`Falling back to mock data for: ${endpoint}`)
        return mockData
      }

      throw error
    }
  }

  /**
   * Check if the TazAPI client is configured
   */
  isReady(): boolean {
    return this.isConfigured
  }
}

// Create a singleton instance
export const tazApiClient = new TazApiClient()

export default tazApiClient
