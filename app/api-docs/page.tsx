export default function ApiDocsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Reference Services Inc. API Documentation</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
          <p className="mb-4">All API endpoints require authentication using JWT tokens.</p>

          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-medium mb-2">Authentication Endpoints</h3>
            <p className="mb-2">
              <code>/api/auth/signin</code> - POST - Sign in with credentials
            </p>
            <p>
              <code>/api/auth/signout</code> - POST - Sign out
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Clients</h2>
          <p className="mb-4">Endpoints for managing client data.</p>

          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">GET /api/clients</h3>
              <p className="mb-2">Retrieve all clients.</p>
            </div>

            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">GET /api/clients/{"{clientGuid}"}</h3>
              <p className="mb-2">Retrieve a specific client by ID.</p>
            </div>

            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">PUT /api/clients/{"{clientGuid}"}</h3>
              <p className="mb-2">Update an existing client.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Applicants</h2>
          <p className="mb-4">Endpoints for managing applicant data.</p>

          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">GET /api/clients/{"{clientGuid}"}/applicants</h3>
              <p className="mb-2">Retrieve all applicants for a client.</p>
              <p className="font-medium">Query Parameters:</p>
              <p>
                <code>page</code> - Optional - Page number (default: 0)
              </p>
              <p>
                <code>size</code> - Optional - Page size (default: 30)
              </p>
            </div>

            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">POST /api/clients/{"{clientGuid}"}/applicants</h3>
              <p className="mb-2">Create a new applicant for a client.</p>
              <p className="font-medium">Request Body:</p>
              <pre className="bg-gray-800 text-white p-2 rounded-md overflow-x-auto">
                {`{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "(555) 123-4567",
  "proposedPosition": "Software Developer"
}`}
              </pre>
            </div>

            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">
                GET /api/clients/{"{clientGuid}"}/applicants/{"{applicantGuid}"}
              </h3>
              <p className="mb-2">Retrieve a specific applicant by ID.</p>
            </div>

            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">
                PUT /api/clients/{"{clientGuid}"}/applicants/{"{applicantGuid}"}
              </h3>
              <p className="mb-2">Update an existing applicant.</p>
            </div>

            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">
                DELETE /api/clients/{"{clientGuid}"}/applicants/{"{applicantGuid}"}
              </h3>
              <p className="mb-2">Delete an applicant.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Addresses</h2>
          <p className="mb-4">Endpoints for managing applicant addresses.</p>

          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">
                GET /api/clients/{"{clientGuid}"}/applicants/{"{applicantGuid}"}/addresses
              </h3>
              <p className="mb-2">Retrieve all addresses for an applicant.</p>
            </div>

            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">
                POST /api/clients/{"{clientGuid}"}/applicants/{"{applicantGuid}"}/addresses
              </h3>
              <p className="mb-2">Create a new address for an applicant.</p>
            </div>

            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">
                GET /api/clients/{"{clientGuid}"}/applicants/{"{applicantGuid}"}/addresses/{"{addressGuid}"}
              </h3>
              <p className="mb-2">Retrieve a specific address by ID.</p>
            </div>

            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">
                PUT /api/clients/{"{clientGuid}"}/applicants/{"{applicantGuid}"}/addresses/{"{addressGuid}"}
              </h3>
              <p className="mb-2">Update an existing address.</p>
            </div>

            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">
                DELETE /api/clients/{"{clientGuid}"}/applicants/{"{applicantGuid}"}/addresses/{"{addressGuid}"}
              </h3>
              <p className="mb-2">Delete an address.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">References</h2>
          <p className="mb-4">Endpoints for managing applicant references.</p>

          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">
                GET /api/clients/{"{clientGuid}"}/applicants/{"{applicantGuid}"}/references
              </h3>
              <p className="mb-2">Retrieve all references for an applicant.</p>
            </div>

            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">
                POST /api/clients/{"{clientGuid}"}/applicants/{"{applicantGuid}"}/references
              </h3>
              <p className="mb-2">Create a new reference for an applicant.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Orders</h2>
          <p className="mb-4">Endpoints for managing background check orders.</p>

          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">GET /api/clients/{"{clientGuid}"}/orders</h3>
              <p className="mb-2">Retrieve all orders for a client.</p>
              <p className="font-medium">Query Parameters:</p>
              <p>
                <code>page</code> - Optional - Page number (default: 0)
              </p>
              <p>
                <code>size</code> - Optional - Page size (default: 30)
              </p>
              <p>
                <code>applicantGuid</code> - Optional - Filter by applicant
              </p>
            </div>

            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">POST /api/clients/{"{clientGuid}"}/orders</h3>
              <p className="mb-2">Create a new order for a client.</p>
              <p className="font-medium">Request Body:</p>
              <pre className="bg-gray-800 text-white p-2 rounded-md overflow-x-auto">
                {`{
  "applicantGuid": "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
  "clientProductGuid": "prod-a1b2c3d4-e5f6-g7h8-i9j0",
  "clientReference": "JOB123"
}`}
              </pre>
            </div>

            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">
                GET /api/clients/{"{clientGuid}"}/orders/{"{orderGuid}"}
              </h3>
              <p className="mb-2">Retrieve a specific order by ID.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Products</h2>
          <p className="mb-4">Endpoints for retrieving available background check products.</p>

          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-medium mb-2">GET /api/clients/{"{clientGuid}"}/products</h3>
            <p className="mb-2">Retrieve all products available to a client.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Messages</h2>
          <p className="mb-4">Endpoints for managing client messages.</p>

          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">GET /api/clients/{"{clientGuid}"}/messages</h3>
              <p className="mb-2">Retrieve all messages for a client.</p>
              <p className="font-medium">Query Parameters:</p>
              <p>
                <code>page</code> - Optional - Page number (default: 0)
              </p>
              <p>
                <code>size</code> - Optional - Page size (default: 30)
              </p>
              <p>
                <code>orderGuid</code> - Optional - Filter by order
              </p>
              <p>
                <code>applicantGuid</code> - Optional - Filter by applicant
              </p>
            </div>

            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">POST /api/clients/{"{clientGuid}"}/messages</h3>
              <p className="mb-2">Create a new message from a client.</p>
              <p className="font-medium">Request Body:</p>
              <pre className="bg-gray-800 text-white p-2 rounded-md overflow-x-auto">
                {`{
  "subject": "Question about background check",
  "content": "I have a question about the background check for John Smith...",
  "orderGuid": "ord-a1b2c3d4-e5f6-g7h8-i9j0",
  "applicantGuid": "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6"
}`}
              </pre>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Fees</h2>
          <p className="mb-4">Endpoints for retrieving client fees.</p>

          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-medium mb-2">GET /api/clients/{"{clientGuid}"}/fees</h3>
            <p className="mb-2">Retrieve all fees for a client.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
          <p className="mb-4">Endpoints for dashboard data.</p>

          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-medium mb-2">GET /api/dashboard/summary</h3>
            <p className="mb-2">Retrieve summary statistics for the dashboard.</p>
            <p className="font-medium">Response:</p>
            <pre className="bg-gray-800 text-white p-2 rounded-md overflow-x-auto">
              {`{
  "success": true,
  "data": {
    "totalApplicants": 5,
    "completedSearches": 24,
    "inProgressSearches": 13,
    "pendingSearches": 5,
    "recentActivity": [
      {
        "date": "2025-04-07",
        "action": "Background Check Completed",
        "details": "State Criminal check for John Smith completed with Clear result"
      },
      ...
    ]
  }
}`}
            </pre>
          </div>
        </section>
      </div>
    </div>
  )
}
