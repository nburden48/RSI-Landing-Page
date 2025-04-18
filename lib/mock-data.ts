/**
 * Mock data for development and testing
 */
export const MockData = {
  // Mock users
  users: [
    {
      id: "mock-user-1",
      email: "admin@example.com",
      password: "password", // In a real app, this would be hashed
      role: "admin",
      clientId: null,
      apiKey: "mock-admin-api-key",
    },
    {
      id: "mock-user-2",
      email: "client@example.com",
      password: "password", // In a real app, this would be hashed
      role: "client_user",
      clientId: "mock-client-1",
      apiKey: "mock-client-api-key",
    },
  ],

  // Mock clients
  clients: [
    {
      id: "mock-client-1",
      name: "Mock Client Inc.",
      contactEmail: "contact@mockclient.com",
      phone: "(555) 123-4567",
      address: "123 Mock St, Mockville, MO 12345",
    },
  ],

  // Mock applicants
  applicants: [
    {
      id: "mock-applicant-1",
      clientId: "mock-client-1",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "(555) 987-6543",
      status: "pending",
      createdAt: new Date("2023-01-15").toISOString(),
    },
    {
      id: "mock-applicant-2",
      clientId: "mock-client-1",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      phone: "(555) 456-7890",
      status: "completed",
      createdAt: new Date("2023-02-20").toISOString(),
    },
  ],

  // Mock background checks
  backgroundChecks: [
    {
      id: "mock-check-1",
      applicantId: "mock-applicant-1",
      clientId: "mock-client-1",
      type: "standard",
      status: "in_progress",
      orderedBy: "mock-user-2",
      orderedAt: new Date("2023-01-16").toISOString(),
      completedAt: null,
      results: null,
    },
    {
      id: "mock-check-2",
      applicantId: "mock-applicant-2",
      clientId: "mock-client-1",
      type: "comprehensive",
      status: "completed",
      orderedBy: "mock-user-2",
      orderedAt: new Date("2023-02-21").toISOString(),
      completedAt: new Date("2023-02-25").toISOString(),
      results: {
        criminal: "clear",
        employment: "verified",
        education: "verified",
      },
    },
  ],

  // Mock messages
  messages: [
    {
      id: "mock-message-1",
      clientId: "mock-client-1",
      from: "system",
      to: "client",
      subject: "Background Check Update",
      body: "The background check for John Doe is now in progress.",
      createdAt: new Date("2023-01-16T10:30:00Z").toISOString(),
      read: true,
    },
    {
      id: "mock-message-2",
      clientId: "mock-client-1",
      from: "client",
      to: "system",
      subject: "Question about Background Check",
      body: "How long does a comprehensive check typically take?",
      createdAt: new Date("2023-02-22T14:15:00Z").toISOString(),
      read: false,
    },
  ],

  // Helper function to get mock user by email and password
  getUserByCredentials(email: string, password: string) {
    return this.users.find((user) => user.email === email && user.password === password) || null
  },

  // Helper function to get mock applicants by client ID
  getApplicantsByClientId(clientId: string) {
    return this.applicants.filter((applicant) => applicant.clientId === clientId)
  },

  // Helper function to get mock background checks by client ID
  getBackgroundChecksByClientId(clientId: string) {
    return this.backgroundChecks.filter((check) => check.clientId === clientId)
  },

  // Helper function to get mock messages by client ID
  getMessagesByClientId(clientId: string) {
    return this.messages.filter((message) => message.clientId === clientId)
  },
}

export default MockData
