import { TAZ_API_CONFIG } from "./taz-api-config"
import { TazApiAuth } from "./taz-api-auth"
import type {
  ApiResponse,
  PaginatedResponse,
  Client,
  Applicant,
  ApplicantAddress,
  ApplicantReference,
  ApplicantEmployment,
  ApplicantEducation,
  ClientProduct,
  Order,
  Search,
  Message,
  Fee,
  GeneralPreferences,
  DashboardSummary,
  CreateApplicantRequest,
  UpdateApplicantRequest,
  CreateAddressRequest,
  UpdateAddressRequest,
  CreateReferenceRequest,
  CreateEmploymentRequest,
  CreateEducationRequest,
  CreateOrderRequest,
  CreateMessageRequest,
  UpdateClientRequest,
} from "../types/taz-api-types"

/**
 * Comprehensive service for interacting with TazAPI
 */
export class TazApiService {
  private baseUrl: string

  constructor() {
    this.baseUrl = `${TAZ_API_CONFIG.baseUrl}/${TAZ_API_CONFIG.apiVersion}`
  }

  /**
   * Helper method to handle API responses and errors
   */
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (response.status === 401) {
      return {
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Authentication required. Please set a valid API token.",
        },
      }
    }

    if (!response.ok) {
      // Try to parse error response
      try {
        const errorData = await response.json()
        return {
          success: false,
          error: {
            code: errorData.error?.code || "API_ERROR",
            message: errorData.error?.message || `API Error: ${response.status} ${response.statusText}`,
          },
        }
      } catch (e) {
        // If error response can't be parsed, return generic error
        return {
          success: false,
          error: {
            code: "API_ERROR",
            message: `API Error: ${response.status} ${response.statusText}`,
          },
        }
      }
    }

    try {
      const data = await response.json()
      return data
    } catch (e) {
      return {
        success: false,
        error: {
          code: "PARSE_ERROR",
          message: "Failed to parse API response",
        },
      }
    }
  }

  // ==================== CLIENT ENDPOINTS ====================

  /**
   * Get all clients
   */
  async getClients(): Promise<ApiResponse<Client[]>> {
    try {
      const response = await fetch(`${this.baseUrl}/clients`, {
        headers: TazApiAuth.getAuthHeaders(),
      })

      return this.handleResponse<Client[]>(response)
    } catch (error) {
      return {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }
    }
  }

  /**
   * Get a specific client by ID
   */
  async getClient(clientGuid: string): Promise<ApiResponse<Client>> {
    try {
      const response = await fetch(`${this.baseUrl}/clients/${clientGuid}`, {
        headers: TazApiAuth.getAuthHeaders(),
      })

      return this.handleResponse<Client>(response)
    } catch (error) {
      return {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }
    }
  }

  /**
   * Update a client
   */
  async updateClient(clientGuid: string, client: UpdateClientRequest): Promise<ApiResponse<Client>> {
    try {
      const response = await fetch(`${this.baseUrl}/clients/${clientGuid}`, {
        method: "PUT",
        headers: TazApiAuth.getAuthHeaders(),
        body: JSON.stringify(client),
      })

      return this.handleResponse<Client>(response)
    } catch (error) {
      return {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }
    }
  }

  // ==================== APPLICANT ENDPOINTS ====================

  /**
   * Get all applicants for a client
   */
  async getApplicants(clientGuid: string, page = 0, size = 30): Promise<ApiResponse<PaginatedResponse<Applicant>>> {
    try {
      const response = await fetch(`${this.baseUrl}/clients/${clientGuid}/applicants?page=${page}&size=${size}`, {
        headers: TazApiAuth.getAuthHeaders(),
      })

      return this.handleResponse<PaginatedResponse<Applicant>>(response)
    } catch (error) {
      return {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }
    }
  }

  /**
   * Create a new applicant
   */
  async createApplicant(clientGuid: string, applicant: CreateApplicantRequest): Promise<ApiResponse<Applicant>> {
    try {
      const response = await fetch(`${this.baseUrl}/clients/${clientGuid}/applicants`, {
        method: "POST",
        headers: TazApiAuth.getAuthHeaders(),
        body: JSON.stringify(applicant),
      })

      return this.handleResponse<Applicant>(response)
    } catch (error) {
      return {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }
    }
  }

  /**
   * Get a specific applicant
   */
  async getApplicant(clientGuid: string, applicantGuid: string): Promise<ApiResponse<Applicant>> {
    try {
      const response = await fetch(`${this.baseUrl}/clients/${clientGuid}/applicants/${applicantGuid}`, {
        headers: TazApiAuth.getAuthHeaders(),
      })

      return this.handleResponse<Applicant>(response)
    } catch (error) {
      return {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }
    }
  }

  /**
   * Update an applicant
   */
  async updateApplicant(
    clientGuid: string,
    applicantGuid: string,
    applicant: UpdateApplicantRequest,
  ): Promise<ApiResponse<Applicant>> {
    try {
      const response = await fetch(`${this.baseUrl}/clients/${clientGuid}/applicants/${applicantGuid}`, {
        method: "PUT",
        headers: TazApiAuth.getAuthHeaders(),
        body: JSON.stringify(applicant),
      })

      return this.handleResponse<Applicant>(response)
    } catch (error) {
      return {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }
    }
  }

  /**
   * Delete an applicant
   */
  async deleteApplicant(clientGuid: string, applicantGuid: string): Promise<ApiResponse<string>> {
    try {
      const response = await fetch(`${this.baseUrl}/clients/${clientGuid}/applicants/${applicantGuid}`, {
        method: "DELETE",
        headers: TazApiAuth.getAuthHeaders(),
      })

      return this.handleResponse<string>(response)
    } catch (error) {
      return {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }
    }
  }

  /**
   * Create a test applicant using the predefined test data
   */
  async createTestApplicant(
    clientGuid: string,
    useCleanResults = true,
    additionalData: Partial<CreateApplicantRequest> = {},
  ): Promise<ApiResponse<Applicant>> {
    const testData = useCleanResults ? TAZ_API_CONFIG.testApplicants.clean : TAZ_API_CONFIG.testApplicants.records

    const testApplicant: CreateApplicantRequest = {
      firstName: testData.firstName,
      lastName: testData.lastName,
      ssn: testData.ssn,
      clientGuid,
      ...additionalData,
    }

    return this.createApplicant(clientGuid, testApplicant)
  }

  // ==================== APPLICANT ADDRESS ENDPOINTS ====================

  /**
   * Get all addresses for an applicant
   */
  async getAddresses(clientGuid: string, applicantGuid: string): Promise<ApiResponse<ApplicantAddress[]>> {
    try {
      const response = await fetch(`${this.baseUrl}/clients/${clientGuid}/applicants/${applicantGuid}/addresses`, {
        headers: TazApiAuth.getAuthHeaders(),
      })

      return this.handleResponse<ApplicantAddress[]>(response)
    } catch (error) {
      return {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }
    }
  }

  /**
   * Create a new address for an applicant
   */
  async createAddress(
    clientGuid: string,
    applicantGuid: string,
    address: CreateAddressRequest,
  ): Promise<ApiResponse<ApplicantAddress>> {
    try {
      const response = await fetch(`${this.baseUrl}/clients/${clientGuid}/applicants/${applicantGuid}/addresses`, {
        method: "POST",
        headers: TazApiAuth.getAuthHeaders(),
        body: JSON.stringify(address),
      })

      return this.handleResponse<ApplicantAddress>(response)
    } catch (error) {
      return {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }
    }
  }

  /**
   * Get a specific address
   */
  async getAddress(
    clientGuid: string,
    applicantGuid: string,
    addressGuid: string,
  ): Promise<ApiResponse<ApplicantAddress>> {
    try {
      const response = await fetch(
        `${this.baseUrl}/clients/${clientGuid}/applicants/${applicantGuid}/addresses/${addressGuid}`,
        {
          headers: TazApiAuth.getAuthHeaders(),
        },
      )

      return this.handleResponse<ApplicantAddress>(response)
    } catch (error) {
      return {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }
    }
  }

  /**
   * Update an address
   */
  async updateAddress(
    clientGuid: string,
    applicantGuid: string,
    addressGuid: string,
    address: UpdateAddressRequest,
  ): Promise<ApiResponse<ApplicantAddress>> {
    try {
      const response = await fetch(
        `${this.baseUrl}/clients/${clientGuid}/applicants/${applicantGuid}/addresses/${addressGuid}`,
        {
          method: "PUT",
          headers: TazApiAuth.getAuthHeaders(),
          body: JSON.stringify(address),
        },
      )

      return this.handleResponse<ApplicantAddress>(response)
    } catch (error) {
      return {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }
    }
  }

  /**
   * Delete an address
   */
  async deleteAddress(clientGuid: string, applicantGuid: string, addressGuid: string): Promise<ApiResponse<string>> {
    try {
      const response = await fetch(
        `${this.baseUrl}/clients/${clientGuid}/applicants/${applicantGuid}/addresses/${addressGuid}`,
        {
          method: "DELETE",
          headers: TazApiAuth.getAuthHeaders(),
        },
      )

      return this.handleResponse<string>(response)
    } catch (error) {
      return {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }
    }
  }

  // ==================== APPLICANT REFERENCE ENDPOINTS ====================

  /**
   * Get all references for an applicant
   */
  async getReferences(clientGuid: string, applicantGuid: string): Promise<ApiResponse<ApplicantReference[]>> {
    try {
      const response = await fetch(`${this.baseUrl}/clients/${clientGuid}/applicants/${applicantGuid}/references`, {
        headers: TazApiAuth.getAuthHeaders(),
      })

      return this.handleResponse<ApplicantReference[]>(response)
    } catch (error) {
      return {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }
    }
  }

  /**
   * Create a new reference for an applicant
   */
  async createReference(
    clientGuid: string,
    applicantGuid: string,
    reference: CreateReferenceRequest,
  ): Promise<ApiResponse<ApplicantReference>> {
    try {
      const response = await fetch(`${this.baseUrl}/clients/${clientGuid}/applicants/${applicantGuid}/references`, {
        method: "POST",
        headers: TazApiAuth.getAuthHeaders(),
        body: JSON.stringify(reference),
      })

      return this.handleResponse<ApplicantReference>(response)
    } catch (error) {
      return {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }
    }
  }

  // ==================== APPLICANT EMPLOYMENT ENDPOINTS ====================

  /**
   * Get all employment records for an applicant
   */
  async getEmployments(clientGuid: string, applicantGuid: string): Promise<ApiResponse<ApplicantEmployment[]>> {
    try {
      const response = await fetch(`${this.baseUrl}/clients/${clientGuid}/applicants/${applicantGuid}/employments`, {
        headers: TazApiAuth.getAuthHeaders(),
      })

      return this.handleResponse<ApplicantEmployment[]>(response)
    } catch (error) {
      return {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }
    }
  }

  /**
   * Create a new employment record for an applicant
   */
  async createEmployment(
    clientGuid: string,
    applicantGuid: string,
    employment: CreateEmploymentRequest,
  ): Promise<ApiResponse<ApplicantEmployment>> {
    try {
      const response = await fetch(`${this.baseUrl}/clients/${clientGuid}/applicants/${applicantGuid}/employments`, {
        method: "POST",
        headers: TazApiAuth.getAuthHeaders(),
        body: JSON.stringify(employment),
      })

      return this.handleResponse<ApplicantEmployment>(response)
    } catch (error) {
      return {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }
    }
  }

  // ==================== APPLICANT EDUCATION ENDPOINTS ====================

  /**
   * Get all education records for an applicant
   */
  async getEducations(clientGuid: string, applicantGuid: string): Promise<ApiResponse<ApplicantEducation[]>> {
    try {
      const response = await fetch(`${this.baseUrl}/clients/${clientGuid}/applicants/${applicantGuid}/educations`, {
        headers: TazApiAuth.getAuthHeaders(),
      })

      return this.handleResponse<ApplicantEducation[]>(response)
    } catch (error) {
      return {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }
    }
  }

  /**
   * Create a new education record for an applicant
   */
  async createEducation(
    clientGuid: string,
    applicantGuid: string,
    education: CreateEducationRequest,
  ): Promise<ApiResponse<ApplicantEducation>> {
    try {
      const response = await fetch(`${this.baseUrl}/clients/${clientGuid}/applicants/${applicantGuid}/educations`, {
        method: "POST",
        headers: TazApiAuth.getAuthHeaders(),
        body: JSON.stringify(education),
      })

      return this.handleResponse<ApplicantEducation>(response)
    } catch (error) {
      return {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }
    }
  }

  // ==================== CLIENT PRODUCT ENDPOINTS ====================

  /**
   * Get all products for a client
   */
  async getClientProducts(clientGuid: string): Promise<ApiResponse<ClientProduct[]>> {
    try {
      const response = await fetch(`${this.baseUrl}/clients/${clientGuid}/products`, {
        headers: TazApiAuth.getAuthHeaders(),
      })

      return this.handleResponse<ClientProduct[]>(response)
    } catch (error) {
      return {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }
    }
  }

  /**
   * Get search fields for a client product
   */
  async getSearchFields(clientGuid: string, clientProductGuid: string): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${this.baseUrl}/clients/${clientGuid}/products/${clientProductGuid}/fields`, {
        headers: TazApiAuth.getAuthHeaders(),
      })

      return this.handleResponse<any>(response)
    } catch (error) {
      return {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }
    }
  }

  // ==================== ORDER ENDPOINTS ====================

  /**
   * Get all orders for a client
   */
  async getOrders(
    clientGuid: string,
    page = 0,
    size = 30,
    applicantGuid?: string,
  ): Promise<ApiResponse<PaginatedResponse<Order>>> {
    try {
      let url = `${this.baseUrl}/clients/${clientGuid}/orders?page=${page}&size=${size}`

      if (applicantGuid) {
        url += `&applicantGuid=${applicantGuid}`
      }

      const response = await fetch(url, {
        headers: TazApiAuth.getAuthHeaders(),
      })

      return this.handleResponse<PaginatedResponse<Order>>(response)
    } catch (error) {
      return {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }
    }
  }

  /**
   * Create a new order
   */
  async createOrder(clientGuid: string, order: CreateOrderRequest): Promise<ApiResponse<Order>> {
    try {
      const response = await fetch(`${this.baseUrl}/clients/${clientGuid}/orders`, {
        method: "POST",
        headers: TazApiAuth.getAuthHeaders(),
        body: JSON.stringify(order),
      })

      return this.handleResponse<Order>(response)
    } catch (error) {
      return {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }
    }
  }

  /**
   * Get a specific order
   */
  async getOrder(clientGuid: string, orderGuid: string): Promise<ApiResponse<Order>> {
    try {
      const response = await fetch(`${this.baseUrl}/clients/${clientGuid}/orders/${orderGuid}`, {
        headers: TazApiAuth.getAuthHeaders(),
      })

      return this.handleResponse<Order>(response)
    } catch (error) {
      return {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }
    }
  }

  // ==================== BACKGROUND CHECK ENDPOINTS ====================

  /**
   * Get all background checks
   */
  async getBackgroundChecks(applicantId?: number): Promise<ApiResponse<Search[]>> {
    try {
      let url = `${this.baseUrl}/background-checks`

      if (applicantId) {
        url += `?applicantId=${applicantId}`
      }

      const response = await fetch(url, {
        headers: TazApiAuth.getAuthHeaders(),
      })

      return this.handleResponse<Search[]>(response)
    } catch (error) {
      return {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }
    }
  }

  /**
   * Create a new background check
   */
  async createBackgroundCheck(backgroundCheck: any): Promise<ApiResponse<Search>> {
    try {
      const response = await fetch(`${this.baseUrl}/background-checks`, {
        method: "POST",
        headers: TazApiAuth.getAuthHeaders(),
        body: JSON.stringify(backgroundCheck),
      })

      return this.handleResponse<Search>(response)
    } catch (error) {
      return {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }
    }
  }

  /**
   * Get a specific background check
   */
  async getBackgroundCheck(id: number): Promise<ApiResponse<Search>> {
    try {
      const response = await fetch(`${this.baseUrl}/background-checks/${id}`, {
        headers: TazApiAuth.getAuthHeaders(),
      })

      return this.handleResponse<Search>(response)
    } catch (error) {
      return {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }
    }
  }

  /**
   * Update a background check
   */
  async updateBackgroundCheck(id: number, backgroundCheck: any): Promise<ApiResponse<Search>> {
    try {
      const response = await fetch(`${this.baseUrl}/background-checks/${id}`, {
        method: "PUT",
        headers: TazApiAuth.getAuthHeaders(),
        body: JSON.stringify(backgroundCheck),
      })

      return this.handleResponse<Search>(response)
    } catch (error) {
      return {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }
    }
  }

  // ==================== MESSAGE ENDPOINTS ====================

  /**
   * Get all messages for a client
   */
  async getMessages(
    clientGuid: string,
    page = 0,
    size = 30,
    orderGuid?: string,
    applicantGuid?: string,
  ): Promise<ApiResponse<PaginatedResponse<Message>>> {
    try {
      let url = `${this.baseUrl}/clients/${clientGuid}/messages?page=${page}&size=${size}`

      if (orderGuid) {
        url += `&orderGuid=${orderGuid}`
      }

      if (applicantGuid) {
        url += `&applicantGuid=${applicantGuid}`
      }

      const response = await fetch(url, {
        headers: TazApiAuth.getAuthHeaders(),
      })

      return this.handleResponse<PaginatedResponse<Message>>(response)
    } catch (error) {
      return {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }
    }
  }

  /**
   * Create a new message
   */
  async createMessage(clientGuid: string, message: CreateMessageRequest): Promise<ApiResponse<Message>> {
    try {
      const response = await fetch(`${this.baseUrl}/clients/${clientGuid}/messages`, {
        method: "POST",
        headers: TazApiAuth.getAuthHeaders(),
        body: JSON.stringify(message),
      })

      return this.handleResponse<Message>(response)
    } catch (error) {
      return {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }
    }
  }

  // ==================== FEE ENDPOINTS ====================

  /**
   * Get all fees for a client
   */
  async getFees(clientGuid: string): Promise<ApiResponse<Fee[]>> {
    try {
      const response = await fetch(`${this.baseUrl}/clients/${clientGuid}/fees`, {
        headers: TazApiAuth.getAuthHeaders(),
      })

      return this.handleResponse<Fee[]>(response)
    } catch (error) {
      return {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }
    }
  }

  // ==================== PREFERENCES ENDPOINTS ====================

  /**
   * Get general preferences for a client
   */
  async getGeneralPreferences(clientGuid: string): Promise<ApiResponse<GeneralPreferences>> {
    try {
      const response = await fetch(`${this.baseUrl}/clients/${clientGuid}/preferences/general`, {
        headers: TazApiAuth.getAuthHeaders(),
      })

      return this.handleResponse<GeneralPreferences>(response)
    } catch (error) {
      return {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }
    }
  }

  /**
   * Update general preferences for a client
   */
  async updateGeneralPreferences(
    clientGuid: string,
    preferences: GeneralPreferences,
  ): Promise<ApiResponse<GeneralPreferences>> {
    try {
      const response = await fetch(`${this.baseUrl}/clients/${clientGuid}/preferences/general`, {
        method: "PUT",
        headers: TazApiAuth.getAuthHeaders(),
        body: JSON.stringify(preferences),
      })

      return this.handleResponse<GeneralPreferences>(response)
    } catch (error) {
      return {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }
    }
  }

  // ==================== DASHBOARD ENDPOINTS ====================

  /**
   * Get dashboard summary
   */
  async getDashboardSummary(): Promise<ApiResponse<DashboardSummary>> {
    try {
      const response = await fetch(`${this.baseUrl}/dashboard/summary`, {
        headers: TazApiAuth.getAuthHeaders(),
      })

      return this.handleResponse<DashboardSummary>(response)
    } catch (error) {
      return {
        success: false,
        error: {
          code: "REQUEST_FAILED",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }
    }
  }
}
