/**
 * Feature flags for the application
 */
export const FeatureFlags = {
  // Database features
  MONGODB: process.env.ENABLE_MONGODB === "true",

  // API features
  TAZAPI: process.env.ENABLE_TAZAPI === "true",

  // Authentication features
  IRON_SESSION: !!process.env.IRON_SESSION_PASSWORD && process.env.IRON_SESSION_PASSWORD.length >= 32,

  // Check if all required features for production are enabled
  isProductionReady(): boolean {
    return this.MONGODB && this.TAZAPI && this.IRON_SESSION
  },

  // Check if we're in development mode with mock data
  isDevelopmentMode(): boolean {
    return process.env.NODE_ENV === "development" && !this.isProductionReady()
  },
}

export default FeatureFlags
