import type {
  Applicant,
  ApplicantAddress,
  ApplicantReference,
  ApplicantEmployment,
  ApplicantEducation,
  Client,
  ClientProduct,
  Order,
  Search,
  Message,
  Fee,
} from "@/types/api"
import { v4 as uuidv4 } from "uuid"

// Mock data
const clients: Client[] = [
  {
    clientGuid: "c1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
    name: "Client Company",
    email: "hr@clientcompany.com",
    status: "active",
    phone: "(555) 123-4567",
    address: "123 Business Ave",
    city: "Enterprise",
    state: "CA",
    zipCode: "90210",
  },
]

let applicants: Applicant[] = [
  {
    applicantGuid: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
    firstName: "John",
    middleName: "M",
    lastName: "Smith",
    gender: "MALE",
    ssn: "111-22-3333", // Using test SSN from TazAPI docs
    dateOfBirth: "1985-06-15",
    email: "john.smith@example.com",
    phoneNumber: "(555) 123-4567",
    driverLicense: "S12345678",
    driverLicenseState: "CA",
    proposedPosition: "Software Developer",
    clientGuid: "c1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
  },
  {
    applicantGuid: "b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7",
    firstName: "Sarah",
    lastName: "Johnson",
    gender: "FEMALE",
    ssn: "222-33-4444",
    dateOfBirth: "1990-03-22",
    email: "sarah.johnson@example.com",
    phoneNumber: "(555) 234-5678",
    proposedPosition: "Marketing Manager",
    clientGuid: "c1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
  },
  {
    applicantGuid: "c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8",
    firstName: "Michael",
    middleName: "J",
    lastName: "Chen",
    gender: "MALE",
    ssn: "333-44-5555",
    dateOfBirth: "1988-11-10",
    email: "michael.chen@example.com",
    phoneNumber: "(555) 345-6789",
    proposedPosition: "Financial Analyst",
    clientGuid: "c1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
  },
  {
    applicantGuid: "d4e5f6g7-h8i9-j0k1-l2m3-n4o5p6q7r8s9",
    firstName: "Emily",
    lastName: "Rodriguez",
    gender: "FEMALE",
    ssn: "444-55-6666",
    dateOfBirth: "1992-07-18",
    email: "emily.rodriguez@example.com",
    phoneNumber: "(555) 456-7890",
    proposedPosition: "HR Specialist",
    clientGuid: "c1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
  },
  {
    applicantGuid: "e5f6g7h8-i9j0-k1l2-m3n4-o5p6q7r8s9t0",
    firstName: "David",
    middleName: "A",
    lastName: "Wilson",
    gender: "MALE",
    ssn: "555-66-7777",
    dateOfBirth: "1983-09-05",
    email: "david.wilson@example.com",
    phoneNumber: "(555) 567-8901",
    proposedPosition: "Project Manager",
    clientGuid: "c1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
  },
]

let addresses: ApplicantAddress[] = [
  {
    addressGuid: "addr-a1b2c3d4-e5f6-g7h8-i9j0",
    applicantGuid: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
    addressType: "CURRENT",
    address1: "123 Main St",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90001",
    county: "Los Angeles",
    country: "USA",
    startDate: "2020-01-15",
  },
  {
    addressGuid: "addr-b2c3d4e5-f6g7-h8i9-j0k1",
    applicantGuid: "b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7",
    addressType: "CURRENT",
    address1: "456 Park Ave",
    address2: "Apt 2B",
    city: "New York",
    state: "NY",
    zipCode: "10022",
    county: "New York",
    country: "USA",
    startDate: "2019-05-10",
  },
]

let references: ApplicantReference[] = [
  {
    referenceGuid: "ref-a1b2c3d4-e5f6-g7h8-i9j0",
    applicantGuid: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
    firstName: "Robert",
    lastName: "Johnson",
    email: "robert.johnson@example.com",
    phoneNumber: "(555) 987-6543",
    relationship: "Former Manager",
    yearsKnown: 5,
  },
  {
    referenceGuid: "ref-b2c3d4e5-f6g7-h8i9-j0k1",
    applicantGuid: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
    firstName: "Jennifer",
    lastName: "Williams",
    email: "jennifer.williams@example.com",
    phoneNumber: "(555) 876-5432",
    relationship: "Colleague",
    yearsKnown: 3,
  },
]

let employments: ApplicantEmployment[] = [
  {
    employmentGuid: "emp-a1b2c3d4-e5f6-g7h8-i9j0",
    applicantGuid: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
    employer: "Previous Tech Inc.",
    position: "Senior Developer",
    supervisor: "Jane Smith",
    phoneNumber: "(555) 111-2222",
    startDate: "2018-03-15",
    endDate: "2022-01-10",
    current: false,
    salary: "85000",
    reasonForLeaving: "Career advancement",
  },
  {
    employmentGuid: "emp-b2c3d4e5-f6g7-h8i9-j0k1",
    applicantGuid: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
    employer: "Current Solutions LLC",
    position: "Lead Developer",
    supervisor: "Michael Brown",
    phoneNumber: "(555) 333-4444",
    startDate: "2022-01-15",
    current: true,
    salary: "110000",
  },
]

let educations: ApplicantEducation[] = [
  {
    educationGuid: "edu-a1b2c3d4-e5f6-g7h8-i9j0",
    applicantGuid: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
    institution: "State University",
    degree: "Bachelor of Science",
    fieldOfStudy: "Computer Science",
    startDate: "2010-09-01",
    endDate: "2014-05-15",
    completed: true,
  },
]

const clientProducts: ClientProduct[] = [
  {
    clientProductGuid: "prod-a1b2c3d4-e5f6-g7h8-i9j0",
    clientGuid: "c1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
    name: "Standard Background Check",
    description: "Includes state and county criminal checks plus employment verification",
    price: 49.99,
    searches: [],
    isDefault: true,
  },
  {
    clientProductGuid: "prod-b2c3d4e5-f6g7-h8i9-j0k1",
    clientGuid: "c1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
    name: "Comprehensive Background Check",
    description: "Includes all standard checks plus education verification and credit check",
    price: 79.99,
    searches: [],
    isDefault: false,
  },
]

let searches: Search[] = [
  {
    searchGuid: "srch-a1b2c3d4-e5f6-g7h8-i9j0",
    applicantGuid: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
    type: "STATE_CRIMINAL",
    displayName: "State Criminal",
    status: "completed",
    dateOrdered: "2025-04-02",
    dateCompleted: "2025-04-05",
    result: "Clear",
    location: "California",
    price: 12.99,
  },
  {
    searchGuid: "srch-b2c3d4e5-f6g7-h8i9-j0k1",
    applicantGuid: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
    type: "COUNTY_CRIMINAL",
    displayName: "County Criminal",
    status: "in-progress",
    dateOrdered: "2025-04-02",
    estimatedCompletion: "2025-04-09",
    location: "Los Angeles County, CA",
    price: 18.99,
  },
  {
    searchGuid: "srch-c3d4e5f6-g7h8-i9j0-k1l2",
    applicantGuid: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
    type: "EMPLOYMENT_VERIFICATION",
    displayName: "Employment Verification",
    status: "pending",
    dateOrdered: "2025-04-02",
    issue: "Waiting for employer response",
    location: "Previous Employer",
    price: 15.99,
  },
  {
    searchGuid: "srch-d4e5f6g7-h8i9-j0k1-l2m3",
    applicantGuid: "b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7",
    type: "STATE_CRIMINAL",
    displayName: "State Criminal",
    status: "completed",
    dateOrdered: "2025-04-01",
    dateCompleted: "2025-04-04",
    result: "Clear",
    location: "New York",
    price: 12.99,
  },
]

let orders: Order[] = [
  {
    orderGuid: "ord-a1b2c3d4-e5f6-g7h8-i9j0",
    clientGuid: "c1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
    applicantGuid: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
    clientProductGuid: "prod-a1b2c3d4-e5f6-g7h8-i9j0",
    clientReference: "JOB123",
    status: "in-progress",
    dateOrdered: "2025-04-02",
    searches: searches.filter((s) => s.applicantGuid === "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6"),
  },
  {
    orderGuid: "ord-b2c3d4e5-f6g7-h8i9-j0k1",
    clientGuid: "c1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
    applicantGuid: "b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7",
    clientProductGuid: "prod-a1b2c3d4-e5f6-g7h8-i9j0",
    clientReference: "JOB124",
    status: "completed",
    dateOrdered: "2025-04-01",
    dateCompleted: "2025-04-06",
    searches: searches.filter((s) => s.applicantGuid === "b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7"),
  },
]

let messages: Message[] = [
  {
    messageGuid: "msg-a1b2c3d4-e5f6-g7h8-i9j0",
    clientGuid: "c1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
    orderGuid: "ord-a1b2c3d4-e5f6-g7h8-i9j0",
    applicantGuid: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
    subject: "Additional information needed",
    content:
      "We need additional information for the employment verification. Please provide the correct phone number for your previous employer.",
    dateCreated: "2025-04-03",
    isRead: true,
    fromClient: false,
  },
  {
    messageGuid: "msg-b2c3d4e5-f6g7-h8i9-j0k1",
    clientGuid: "c1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
    orderGuid: "ord-a1b2c3d4-e5f6-g7h8-i9j0",
    applicantGuid: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
    subject: "Updated contact information",
    content: "Here is the updated phone number for my previous employer: (555) 999-8888",
    dateCreated: "2025-04-04",
    isRead: true,
    fromClient: true,
  },
]

let fees: Fee[] = [
  {
    feeGuid: "fee-a1b2c3d4-e5f6-g7h8-i9j0",
    clientGuid: "c1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
    searchType: "STATE_CRIMINAL",
    amount: 12.99,
    effectiveDate: "2025-01-01",
  },
  {
    feeGuid: "fee-b2c3d4e5-f6g7-h8i9-j0k1",
    clientGuid: "c1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
    searchType: "COUNTY_CRIMINAL",
    amount: 18.99,
    effectiveDate: "2025-01-01",
  },
  {
    feeGuid: "fee-c3d4e5f6-g7h8-i9j0-k1l2",
    clientGuid: "c1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
    searchType: "EMPLOYMENT_VERIFICATION",
    amount: 15.99,
    effectiveDate: "2025-01-01",
  },
]

// Update client products with searches
clientProducts[0].searches = [
  {
    searchGuid: "srch-template-1",
    applicantGuid: "",
    type: "STATE_CRIMINAL",
    displayName: "State Criminal",
    status: "pending",
    dateOrdered: "",
    price: 12.99,
  },
  {
    searchGuid: "srch-template-2",
    applicantGuid: "",
    type: "COUNTY_CRIMINAL",
    displayName: "County Criminal",
    status: "pending",
    dateOrdered: "",
    price: 18.99,
  },
  {
    searchGuid: "srch-template-3",
    applicantGuid: "",
    type: "EMPLOYMENT_VERIFICATION",
    displayName: "Employment Verification",
    status: "pending",
    dateOrdered: "",
    price: 15.99,
  },
]

clientProducts[1].searches = [
  ...clientProducts[0].searches,
  {
    searchGuid: "srch-template-4",
    applicantGuid: "",
    type: "EDUCATION_VERIFICATION",
    displayName: "Education Verification",
    status: "pending",
    dateOrdered: "",
    price: 14.99,
  },
  {
    searchGuid: "srch-template-5",
    applicantGuid: "",
    type: "CREDIT_CHECK",
    displayName: "Credit Check",
    status: "pending",
    dateOrdered: "",
    price: 19.99,
  },
]

export const dbService = {
  // Client methods
  getClients: async (): Promise<Client[]> => {
    return clients
  },

  getClientById: async (clientGuid: string): Promise<Client | undefined> => {
    return clients.find((c) => c.clientGuid === clientGuid)
  },

  updateClient: async (clientGuid: string, client: Partial<Client>): Promise<Client | undefined> => {
    const index = clients.findIndex((c) => c.clientGuid === clientGuid)
    if (index === -1) return undefined

    clients[index] = { ...clients[index], ...client }
    return clients[index]
  },

  // Applicant methods
  getApplicants: async (clientGuid: string): Promise<Applicant[]> => {
    return applicants.filter((a) => a.clientGuid === clientGuid)
  },

  getApplicantById: async (applicantGuid: string): Promise<Applicant | undefined> => {
    return applicants.find((a) => a.applicantGuid === applicantGuid)
  },

  createApplicant: async (applicant: Omit<Applicant, "applicantGuid">): Promise<Applicant> => {
    const newApplicant = { ...applicant, applicantGuid: uuidv4() }
    applicants.push(newApplicant)
    return newApplicant
  },

  updateApplicant: async (applicantGuid: string, applicant: Partial<Applicant>): Promise<Applicant | undefined> => {
    const index = applicants.findIndex((a) => a.applicantGuid === applicantGuid)
    if (index === -1) return undefined

    applicants[index] = { ...applicants[index], ...applicant }
    return applicants[index]
  },

  deleteApplicant: async (applicantGuid: string): Promise<boolean> => {
    const initialLength = applicants.length
    applicants = applicants.filter((a) => a.applicantGuid !== applicantGuid)
    return applicants.length < initialLength
  },

  // Address methods
  getAddresses: async (applicantGuid: string): Promise<ApplicantAddress[]> => {
    return addresses.filter((addr) => addr.applicantGuid === applicantGuid)
  },

  getAddressById: async (addressGuid: string): Promise<ApplicantAddress | undefined> => {
    return addresses.find((addr) => addr.addressGuid === addressGuid)
  },

  createAddress: async (address: Omit<ApplicantAddress, "addressGuid">): Promise<ApplicantAddress> => {
    const newAddress = { ...address, addressGuid: `addr-${uuidv4()}` }
    addresses.push(newAddress)
    return newAddress
  },

  updateAddress: async (
    addressGuid: string,
    address: Partial<ApplicantAddress>,
  ): Promise<ApplicantAddress | undefined> => {
    const index = addresses.findIndex((addr) => addr.addressGuid === addressGuid)
    if (index === -1) return undefined

    addresses[index] = { ...addresses[index], ...address }
    return addresses[index]
  },

  deleteAddress: async (addressGuid: string): Promise<boolean> => {
    const initialLength = addresses.length
    addresses = addresses.filter((addr) => addr.addressGuid !== addressGuid)
    return addresses.length < initialLength
  },

  // Reference methods
  getReferences: async (applicantGuid: string): Promise<ApplicantReference[]> => {
    return references.filter((ref) => ref.applicantGuid === applicantGuid)
  },

  getReferenceById: async (referenceGuid: string): Promise<ApplicantReference | undefined> => {
    return references.find((ref) => ref.referenceGuid === referenceGuid)
  },

  createReference: async (reference: Omit<ApplicantReference, "referenceGuid">): Promise<ApplicantReference> => {
    const newReference = { ...reference, referenceGuid: `ref-${uuidv4()}` }
    references.push(newReference)
    return newReference
  },

  updateReference: async (
    referenceGuid: string,
    reference: Partial<ApplicantReference>,
  ): Promise<ApplicantReference | undefined> => {
    const index = references.findIndex((ref) => ref.referenceGuid === referenceGuid)
    if (index === -1) return undefined

    references[index] = { ...references[index], ...reference }
    return references[index]
  },

  deleteReference: async (referenceGuid: string): Promise<boolean> => {
    const initialLength = references.length
    references = references.filter((ref) => ref.referenceGuid !== referenceGuid)
    return references.length < initialLength
  },

  // Employment methods
  getEmployments: async (applicantGuid: string): Promise<ApplicantEmployment[]> => {
    return employments.filter((emp) => emp.applicantGuid === applicantGuid)
  },

  getEmploymentById: async (employmentGuid: string): Promise<ApplicantEmployment | undefined> => {
    return employments.find((emp) => emp.employmentGuid === employmentGuid)
  },

  createEmployment: async (employment: Omit<ApplicantEmployment, "employmentGuid">): Promise<ApplicantEmployment> => {
    const newEmployment = { ...employment, employmentGuid: `emp-${uuidv4()}` }
    employments.push(newEmployment)
    return newEmployment
  },

  updateEmployment: async (
    employmentGuid: string,
    employment: Partial<ApplicantEmployment>,
  ): Promise<ApplicantEmployment | undefined> => {
    const index = employments.findIndex((emp) => emp.employmentGuid === employmentGuid)
    if (index === -1) return undefined

    employments[index] = { ...employments[index], ...employment }
    return employments[index]
  },

  deleteEmployment: async (employmentGuid: string): Promise<boolean> => {
    const initialLength = employments.length
    employments = employments.filter((emp) => emp.employmentGuid !== employmentGuid)
    return employments.length < initialLength
  },

  // Education methods
  getEducations: async (applicantGuid: string): Promise<ApplicantEducation[]> => {
    return educations.filter((edu) => edu.applicantGuid === applicantGuid)
  },

  getEducationById: async (educationGuid: string): Promise<ApplicantEducation | undefined> => {
    return educations.find((edu) => edu.educationGuid === educationGuid)
  },

  createEducation: async (education: Omit<ApplicantEducation, "educationGuid">): Promise<ApplicantEducation> => {
    const newEducation = { ...education, educationGuid: `edu-${uuidv4()}` }
    educations.push(newEducation)
    return newEducation
  },

  updateEducation: async (
    educationGuid: string,
    education: Partial<ApplicantEducation>,
  ): Promise<ApplicantEducation | undefined> => {
    const index = educations.findIndex((edu) => edu.educationGuid === educationGuid)
    if (index === -1) return undefined

    educations[index] = { ...educations[index], ...education }
    return educations[index]
  },

  deleteEducation: async (educationGuid: string): Promise<boolean> => {
    const initialLength = educations.length
    educations = educations.filter((edu) => edu.educationGuid !== educationGuid)
    return educations.length < initialLength
  },

  // Client Product methods
  getClientProducts: async (clientGuid: string): Promise<ClientProduct[]> => {
    return clientProducts.filter((cp) => cp.clientGuid === clientGuid)
  },

  getClientProductById: async (clientProductGuid: string): Promise<ClientProduct | undefined> => {
    return clientProducts.find((cp) => cp.clientProductGuid === clientProductGuid)
  },

  // Search methods
  getSearches: async (applicantGuid?: string): Promise<Search[]> => {
    if (applicantGuid) {
      return searches.filter((s) => s.applicantGuid === applicantGuid)
    }
    return searches
  },

  getSearchById: async (searchGuid: string): Promise<Search | undefined> => {
    return searches.find((s) => s.searchGuid === searchGuid)
  },

  createSearch: async (search: Omit<Search, "searchGuid">): Promise<Search> => {
    const newSearch = { ...search, searchGuid: `srch-${uuidv4()}` }
    searches.push(newSearch)
    return newSearch
  },

  updateSearch: async (searchGuid: string, search: Partial<Search>): Promise<Search | undefined> => {
    const index = searches.findIndex((s) => s.searchGuid === searchGuid)
    if (index === -1) return undefined

    searches[index] = { ...searches[index], ...search }
    return searches[index]
  },

  deleteSearch: async (searchGuid: string): Promise<boolean> => {
    const initialLength = searches.length
    searches = searches.filter((s) => s.searchGuid !== searchGuid)
    return searches.length < initialLength
  },

  // Order methods
  getOrders: async (clientGuid: string, applicantGuid?: string): Promise<Order[]> => {
    let result = orders.filter((o) => o.clientGuid === clientGuid)
    if (applicantGuid) {
      result = result.filter((o) => o.applicantGuid === applicantGuid)
    }
    return result
  },

  getOrderById: async (orderGuid: string): Promise<Order | undefined> => {
    return orders.find((o) => o.orderGuid === orderGuid)
  },

  createOrder: async (order: Omit<Order, "orderGuid">): Promise<Order> => {
    const newOrder = { ...order, orderGuid: `ord-${uuidv4()}` }
    orders.push(newOrder)
    return newOrder
  },

  updateOrder: async (orderGuid: string, order: Partial<Order>): Promise<Order | undefined> => {
    const index = orders.findIndex((o) => o.orderGuid === orderGuid)
    if (index === -1) return undefined

    orders[index] = { ...orders[index], ...order }
    return orders[index]
  },

  deleteOrder: async (orderGuid: string): Promise<boolean> => {
    const initialLength = orders.length
    orders = orders.filter((o) => o.orderGuid !== orderGuid)
    return orders.length < initialLength
  },

  // Message methods
  getMessages: async (clientGuid: string, orderGuid?: string, applicantGuid?: string): Promise<Message[]> => {
    let result = messages.filter((m) => m.clientGuid === clientGuid)
    if (orderGuid) {
      result = result.filter((m) => m.orderGuid === orderGuid)
    }
    if (applicantGuid) {
      result = result.filter((m) => m.applicantGuid === applicantGuid)
    }
    return result
  },

  getMessageById: async (messageGuid: string): Promise<Message | undefined> => {
    return messages.find((m) => m.messageGuid === messageGuid)
  },

  createMessage: async (message: Omit<Message, "messageGuid">): Promise<Message> => {
    const newMessage = { ...message, messageGuid: `msg-${uuidv4()}` }
    messages.push(newMessage)
    return newMessage
  },

  updateMessage: async (messageGuid: string, message: Partial<Message>): Promise<Message | undefined> => {
    const index = messages.findIndex((m) => m.messageGuid === messageGuid)
    if (index === -1) return undefined

    messages[index] = { ...messages[index], ...message }
    return messages[index]
  },

  deleteMessage: async (messageGuid: string): Promise<boolean> => {
    const initialLength = messages.length
    messages = messages.filter((m) => m.messageGuid !== messageGuid)
    return messages.length < initialLength
  },

  // Fee methods
  getFees: async (clientGuid: string): Promise<Fee[]> => {
    return fees.filter((f) => f.clientGuid === clientGuid)
  },

  getFeeById: async (feeGuid: string): Promise<Fee | undefined> => {
    return fees.find((f) => f.feeGuid === feeGuid)
  },

  createFee: async (fee: Omit<Fee, "feeGuid">): Promise<Fee> => {
    const newFee = { ...fee, feeGuid: `fee-${uuidv4()}` }
    fees.push(newFee)
    return newFee
  },

  updateFee: async (feeGuid: string, fee: Partial<Fee>): Promise<Fee | undefined> => {
    const index = fees.findIndex((f) => f.feeGuid === feeGuid)
    if (index === -1) return undefined

    fees[index] = { ...fees[index], ...fee }
    return fees[index]
  },

  deleteFee: async (feeGuid: string): Promise<boolean> => {
    const initialLength = fees.length
    fees = fees.filter((f) => f.feeGuid !== feeGuid)
    return fees.length < initialLength
  },
}
