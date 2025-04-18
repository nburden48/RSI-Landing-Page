import { NextResponse } from "next/server"

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return mock clients in TazAPI format
  return NextResponse.json({
    success: true,
    data: [
      {
        guid: "c1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
        name: "Acme Corporation",
        status: "ACTIVE",
        createdDate: "2022-01-15T10:30:00Z",
        modifiedDate: "2023-03-20T14:45:00Z",
        contactEmail: "hr@acmecorp.com",
        contactPhone: "(555) 123-4567",
      },
      {
        guid: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
        name: "Global Industries",
        status: "ACTIVE",
        createdDate: "2022-02-10T09:15:00Z",
        modifiedDate: "2023-04-05T11:20:00Z",
        contactEmail: "recruiting@globalind.com",
        contactPhone: "(555) 987-6543",
      },
      {
        guid: "z9y8x7w6-v5u4-t3s2-r1q0-p9o8n7m6l5k4",
        name: "Tech Innovations LLC",
        status: "ACTIVE",
        createdDate: "2022-03-22T13:45:00Z",
        modifiedDate: "2023-02-18T16:30:00Z",
        contactEmail: "talent@techinnovations.com",
        contactPhone: "(555) 456-7890",
      },
    ],
  })
}
