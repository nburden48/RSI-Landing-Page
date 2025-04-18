import { type NextRequest, NextResponse } from "next/server"
import { dbService } from "@/lib/db-service"
import { getToken } from "next-auth/jwt"
import type { ApiResponse, ApplicantAddress } from "@/types/api"

export async function GET(
  request: NextRequest,
  { params }: { params: { clientGuid: string; applicantGuid: string; addressGuid: string } },
): Promise<NextResponse<ApiResponse<ApplicantAddress>>> {
  try {
    const token = await getToken({ req: request })
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "Authentication required",
          },
        },
        { status: 401 },
      )
    }

    const { clientGuid, applicantGuid, addressGuid } = params

    // Verify client exists
    const client = await dbService.getClientById(clientGuid)
    if (!client) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "CLIENT_NOT_FOUND",
            message: "Client not found",
          },
        },
        { status: 404 },
      )
    }

    // Get the applicant
    const applicant = await dbService.getApplicantById(applicantGuid)
    if (!applicant) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "APPLICANT_NOT_FOUND",
            message: "Applicant not found",
          },
        },
        { status: 404 },
      )
    }

    // Verify the applicant belongs to the client
    if (applicant.clientGuid !== clientGuid) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "Applicant does not belong to this client",
          },
        },
        { status: 403 },
      )
    }

    // Get the address
    const address = await dbService.getAddressById(addressGuid)
    if (!address) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "ADDRESS_NOT_FOUND",
            message: "Address not found",
          },
        },
        { status: 404 },
      )
    }

    // Verify the address belongs to the applicant
    if (address.applicantGuid !== applicantGuid) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "Address does not belong to this applicant",
          },
        },
        { status: 403 },
      )
    }

    return NextResponse.json({ success: true, data: address })
  } catch (error) {
    console.error("Error fetching address:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch address",
        },
      },
      { status: 500 },
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { clientGuid: string; applicantGuid: string; addressGuid: string } },
): Promise<NextResponse<ApiResponse<ApplicantAddress>>> {
  try {
    const token = await getToken({ req: request })
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "Authentication required",
          },
        },
        { status: 401 },
      )
    }

    const { clientGuid, applicantGuid, addressGuid } = params

    // Verify client exists
    const client = await dbService.getClientById(clientGuid)
    if (!client) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "CLIENT_NOT_FOUND",
            message: "Client not found",
          },
        },
        { status: 404 },
      )
    }

    // Get the applicant
    const applicant = await dbService.getApplicantById(applicantGuid)
    if (!applicant) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "APPLICANT_NOT_FOUND",
            message: "Applicant not found",
          },
        },
        { status: 404 },
      )
    }

    // Verify the applicant belongs to the client
    if (applicant.clientGuid !== clientGuid) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "Applicant does not belong to this client",
          },
        },
        { status: 403 },
      )
    }

    // Get the existing address
    const existingAddress = await dbService.getAddressById(addressGuid)
    if (!existingAddress) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "ADDRESS_NOT_FOUND",
            message: "Address not found",
          },
        },
        { status: 404 },
      )
    }

    // Verify the address belongs to the applicant
    if (existingAddress.applicantGuid !== applicantGuid) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "Address does not belong to this applicant",
          },
        },
        { status: 403 },
      )
    }

    const body = await request.json()

    // Update the address
    const updatedAddress = await dbService.updateAddress(addressGuid, body)

    return NextResponse.json({
      success: true,
      data: updatedAddress,
    })
  } catch (error) {
    console.error("Error updating address:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update address",
        },
      },
      { status: 500 },
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { clientGuid: string; applicantGuid: string; addressGuid: string } },
): Promise<NextResponse<ApiResponse<string>>> {
  try {
    const token = await getToken({ req: request })
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "Authentication required",
          },
        },
        { status: 401 },
      )
    }

    const { clientGuid, applicantGuid, addressGuid } = params

    // Verify client exists
    const client = await dbService.getClientById(clientGuid)
    if (!client) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "CLIENT_NOT_FOUND",
            message: "Client not found",
          },
        },
        { status: 404 },
      )
    }

    // Get the applicant
    const applicant = await dbService.getApplicantById(applicantGuid)
    if (!applicant) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "APPLICANT_NOT_FOUND",
            message: "Applicant not found",
          },
        },
        { status: 404 },
      )
    }

    // Verify the applicant belongs to the client
    if (applicant.clientGuid !== clientGuid) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "Applicant does not belong to this client",
          },
        },
        { status: 403 },
      )
    }

    // Get the existing address
    const existingAddress = await dbService.getAddressById(addressGuid)
    if (!existingAddress) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "ADDRESS_NOT_FOUND",
            message: "Address not found",
          },
        },
        { status: 404 },
      )
    }

    // Verify the address belongs to the applicant
    if (existingAddress.applicantGuid !== applicantGuid) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "Address does not belong to this applicant",
          },
        },
        { status: 403 },
      )
    }

    // Delete the address
    const success = await dbService.deleteAddress(addressGuid)
    if (!success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to delete address",
          },
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      data: "Address has been deleted.",
    })
  } catch (error) {
    console.error("Error deleting address:", error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete address",
        },
      },
      { status: 500 },
    )
  }
}
