/**
 * Configuration for TazAPI integration
 */
export const TAZ_API_CONFIG = {
  /**
   * Base URL for the TazAPI sandbox environment
   */
  baseUrl: "https://api-sandbox.instascreen.net",

  /**
   * API version
   */
  apiVersion: "v1",

  /**
   * Test applicants provided by TazAPI for sandbox testing
   */
  testApplicants: {
    clean: {
      ssn: "111-22-3333",
      firstName: "Joe",
      lastName: "Clean",
      result: "Clear / Good Results",
    },
    records: {
      ssn: "333-22-1111",
      firstName: "Hank",
      lastName: "Mess",
      result: "Records / Bad Results",
    },
  },
}
