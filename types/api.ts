// Core entity types
export type Client = {
  clientGuid: string
  name: string
  email: string
  status: "active" | "inactive"
  phone?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
}

export type Applicant = {
  applicantGuid: string
  firstName: string
  middleName?: string
  noMiddleName?: boolean
  lastName: string
  generation?: string
  gender?: "MALE" | "FEMALE" | "UNKNOWN"
  ssn?: string
  race?: string
  dateOfBirth?: string
  email?: string
  phoneNumber?: string
  driverLicense?: string
  driverLicenseState?: string
  proposedPosition?: string
  proposedSalary?: string
  monthlyIncome?: number
  monthlyDebt?: number
  monthlyRent?: number
  desiredUnit?: string
  clientGuid: string
}

export type ApplicantAddress = {
  addressGuid: string
  applicantGuid: string
  addressType: "CURRENT" | "PREVIOUS" | "PERMANENT"
  address1: string
  address2?: string
  city: string
  state: string
  zipCode: string
  county?: string
  country?: string
  startDate?: string
  endDate?: string
}

export type ApplicantReference = {
  referenceGuid: string
  applicantGuid: string
  firstName: string
  lastName: string
  email?: string
  phoneNumber?: string
  relationship?: string
  yearsKnown?: number
}

export type ApplicantEmployment = {
  employmentGuid: string
  applicantGuid: string
  employer: string
  position?: string
  supervisor?: string
  phoneNumber?: string
  startDate?: string
  endDate?: string
  current?: boolean
  salary?: string
  reasonForLeaving?: string
}

export type ApplicantEducation = {
  educationGuid: string
  applicantGuid: string
  institution: string
  degree?: string
  fieldOfStudy?: string
  startDate?: string
  endDate?: string
  completed?: boolean
}

export type Search = {
  searchGuid: string
  applicantGuid: string
  type: string
  displayName: string
  status: "completed" | "in-progress" | "pending"
  dateOrdered: string
  dateCompleted?: string
  estimatedCompletion?: string
  result?: string
  issue?: string
  location?: string
  price?: number
}

export type ClientProduct = {
  clientProductGuid: string
  clientGuid: string
  name: string
  description?: string
  price: number
  searches: Search[]
  isDefault?: boolean
}

export type Order = {
  orderGuid: string
  clientGuid: string
  applicantGuid: string
  clientProductGuid: string
  clientReference?: string
  status: "completed" | "in-progress" | "pending"
  dateOrdered: string
  dateCompleted?: string
  searches: Search[]
}

export type Message = {
  messageGuid: string
  clientGuid: string
  orderGuid?: string
  applicantGuid?: string
  subject: string
  content: string
  dateCreated: string
  isRead: boolean
  fromClient: boolean
}

export type Fee = {
  feeGuid: string
  clientGuid: string
  searchType: string
  amount: number
  effectiveDate: string
}

// API response types
export type ApiResponse<T> = {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
  }
  message?: string
}

export type PaginatedResponse<T> = {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number
  first: boolean
  last: boolean
}

export type DashboardSummary = {
  totalApplicants: number
  completedSearches: number
  inProgressSearches: number
  pendingSearches: number
  recentActivity: {
    date: string
    action: string
    details: string
  }[]
}

export type BackgroundCheck = {
  id: number
  applicantId: number
  type: string
  location: string
  status: string
  dateOrdered: string
  dateCompleted?: string
  estimatedCompletion?: string
  result?: string
  issue?: string
}
