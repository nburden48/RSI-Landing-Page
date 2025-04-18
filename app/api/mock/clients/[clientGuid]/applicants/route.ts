import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { clientGuid: string } }) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 700))

  const { clientGuid } = params

  // Return mock applicants in TazAPI format
  return NextResponse.json({
    success: true,
    data: [
      {
        guid: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
        clientGuid: clientGuid,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "(555) 123-4567",
        ssn: "XXX-XX-1234", // Masked for security
        dateOfBirth: "1985-06-15",
        createdDate: "2023-01-15T10:30:00Z",
        status: "ACTIVE",
      },
      {
        guid: "b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7",
        clientGuid: clientGuid,
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        phone: "(555) 987-6543",
        ssn: "XXX-XX-5678", // Masked for security
        dateOfBirth: "1990-03-22",
        createdDate: "2023-02-10T14:45:00Z",
        status: "ACTIVE",
      },
      {
        guid: "c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8",
        clientGuid: clientGuid,
        firstName: "Michael",
        lastName: "Johnson",
        email: "michael.johnson@example.com",
        phone: "(555) 456-7890",
        ssn: "XXX-XX-9012", // Masked for security
        dateOfBirth: "1988-11-30",
        createdDate: "2023-03-05T09:15:00Z",
        status: "INACTIVE",
      },
    ],
  })
}
