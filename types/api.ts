export type ApiResponse<T> = {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
  }
  message?: string
}

export type Applicant = {
  applicantGuid: string
  firstName: string
  middleName?: string
  lastName: string
  email?: string
  phoneNumber?: string
  proposedPosition?: string
  status: string
  dateSubmitted: string
  clientGuid: string
  gender?: string
  ssn?: string
  dateOfBirth?: string
  driverLicense?: string
  driverLicenseState?: string
}

export type ApplicantAddress = {
  addressGuid: string
  applicantGuid: string
  addressType: string
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
  status: string
  dateOrdered: string
  dateCompleted?: string
  searches: Search[]
}

export type Search = {
  searchGuid: string
  applicantGuid: string
  type: string
  displayName: string
  status: string
  dateOrdered: string
  dateCompleted?: string
  estimatedCompletion?: string
  result?: string
  issue?: string
  location: string
  price?: number
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

export type Client = {
  clientGuid: string
  name: string
  email: string
  status: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
}

export type Fee = {
  feeGuid: string
  clientGuid: string
  searchType: string
  amount: number
  effectiveDate: string
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

export type PaginatedResponse<T> = {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number
  first: boolean
  last: boolean
}
