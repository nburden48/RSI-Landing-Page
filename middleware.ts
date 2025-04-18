// Simplified middleware that doesn't try to validate tokens or access APIs
export const config = {
  matcher: [], // Empty matcher to avoid intercepting any routes
}

// Export an empty middleware function
export function middleware() {
  return
}
