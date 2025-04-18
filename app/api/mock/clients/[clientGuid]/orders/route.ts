import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { clientGuid: string } }) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const { clientGuid } = params

  // Return mock orders in TazAPI format
  return NextResponse.json({
    success: true,
    data: [
      {
        guid: "o1p2q3r4-s5t6-u7v8-w9x0-y1z2a3b4c5d6",
        clientGuid: clientGuid,
        applicantGuid: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
        applicantName: "John Doe",
        fileNumber: "BG-2023-001",
        externalIdentifier: "EXT-001",
        status: "COMPLETE",
        orderDate: "2023-01-16T09:30:00Z",
        completedDate: "2023-01-20T14:45:00Z",
        totalCost: 49.99,
        searches: [
          {
            guid: "s1t2u3v4-w5x6-y7z8-a9b0-c1d2e3f4g5h6",
            name: "Criminal Background Check",
            status: "COMPLETE",
            result: "CLEAR",
          },
          {
            guid: "t2u3v4w5-x6y7-z8a9-b0c1-d2e3f4g5h6i7",
            name: "Employment Verification",
            status: "COMPLETE",
            result: "VERIFIED",
          },
        ],
      },
      {
        guid: "p2q3r4s5-t6u7-v8w9-x0y1-z2a3b4c5d6e7",
        clientGuid: clientGuid,
        applicantGuid: "b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7",
        applicantName: "Jane Smith",
        fileNumber: "BG-2023-002",
        externalIdentifier: "EXT-002",
        status: "IN_PROGRESS",
        orderDate: "2023-02-12T11:15:00Z",
        completedDate: null,
        totalCost: 79.99,
        searches: [
          {
            guid: "u3v4w5x6-y7z8-a9b0-c1d2-e3f4g5h6i7j8",
            name: "Criminal Background Check",
            status: "COMPLETE",
            result: "CLEAR",
          },
          {
            guid: "v4w5x6y7-z8a9-b0c1-d2e3-f4g5h6i7j8k9",
            name: "Education Verification",
            status: "IN_PROGRESS",
            result: null,
          },
          {
            guid: "w5x6y7z8-a9b0-c1d2-e3f4-g5h6i7j8k9l0",
            name: "Drug Screening",
            status: "PENDING",
            result: null,
          },
        ],
      },
      {
        guid: "q3r4s5t6-u7v8-w9x0-y1z2-a3b4c5d6e7f8",
        clientGuid: clientGuid,
        applicantGuid: "c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8",
        applicantName: "Michael Johnson",
        fileNumber: "BG-2023-003",
        externalIdentifier: "EXT-003",
        status: "COMPLETE",
        orderDate: "2023-03-07T10:00:00Z",
        completedDate: "2023-03-12T16:30:00Z",
        totalCost: 129.99,
        searches: [
          {
            guid: "x6y7z8a9-b0c1-d2e3-f4g5-h6i7j8k9l0m1",
            name: "Criminal Background Check",
            status: "COMPLETE",
            result: "RECORDS_FOUND",
          },
          {
            guid: "y7z8a9b0-c1d2-e3f4-g5h6-i7j8k9l0m1n2",
            name: "Employment Verification",
            status: "COMPLETE",
            result: "VERIFIED",
          },
          {
            guid: "z8a9b0c1-d2e3-f4g5-h6i7-j8k9l0m1n2o3",
            name: "Education Verification",
            status: "COMPLETE",
            result: "VERIFIED",
          },
          {
            guid: "a9b0c1d2-e3f4-g5h6-i7j8-k9l0m1n2o3p4",
            name: "Drug Screening",
            status: "COMPLETE",
            result: "NEGATIVE",
          },
        ],
      },
    ],
  })
}
