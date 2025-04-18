"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, AlertCircle, Key, Users, FileText, Building } from "lucide-react"
import { TazApiAuth } from "@/lib/taz-api-auth"
import { TazApiService } from "@/lib/taz-api-service"
import type { Client, Applicant, ClientProduct } from "@/types/taz-api-types"

export default function TazApiTest() {
  const [token, setToken] = useState(TazApiAuth.getToken() || "")
  const [activeTab, setActiveTab] = useState("auth")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(!!TazApiAuth.getToken())

  // Data state
  const [clients, setClients] = useState<Client[]>([])
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [applicants, setApplicants] = useState<Applicant[]>([])
  const [products, setProducts] = useState<ClientProduct[]>([])

  // Test applicant state
  const [testApplicantType, setTestApplicantType] = useState<"clean" | "records">("clean")
  const [testApplicantData, setTestApplicantData] = useState({
    email: "",
    phoneNumber: "",
    proposedPosition: "Test Position",
  })

  const handleSetToken = () => {
    try {
      TazApiAuth.setToken(token)
      setIsAuthenticated(true)
      setSuccess("Token set successfully")
      setError(null)
    } catch (err) {
      setError("Failed to set token")
      setSuccess(null)
    }
  }

  const handleClearToken = () => {
    TazApiAuth.clearToken()
    setToken("")
    setIsAuthenticated(false)
    setSuccess("Token cleared successfully")
    setError(null)
  }

  const fetchClients = async () => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(null)

      const apiService = new TazApiService()
      const response = await apiService.getClients()

      if (response.success && response.data) {
        setClients(response.data)
        setSuccess(`Successfully fetched ${response.data.length} clients`)
      } else {
        setError(response.error?.message || "Failed to fetch clients")
      }
    } catch (err) {
      setError("An error occurred while fetching clients")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const selectClient = (client: Client) => {
    setSelectedClient(client)
    setActiveTab("client")
  }

  const fetchClientDetails = async (clientGuid: string) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(null)

      const apiService = new TazApiService()

      // Fetch applicants
      const applicantsResponse = await apiService.getApplicants(clientGuid)
      if (applicantsResponse.success && applicantsResponse.data) {
        setApplicants(applicantsResponse.data.content)
      }

      // Fetch products
      const productsResponse = await apiService.getClientProducts(clientGuid)
      if (productsResponse.success && productsResponse.data) {
        setProducts(productsResponse.data)
      }

      setSuccess("Client details fetched successfully")
    } catch (err) {
      setError("An error occurred while fetching client details")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const createTestApplicant = async () => {
    if (!selectedClient) {
      setError("No client selected")
      return
    }

    try {
      setLoading(true)
      setError(null)
      setSuccess(null)

      const apiService = new TazApiService()
      const response = await apiService.createTestApplicant(
        selectedClient.clientGuid,
        testApplicantType === "clean",
        testApplicantData,
      )

      if (response.success && response.data) {
        setSuccess(`Test applicant created successfully: ${response.data.firstName} ${response.data.lastName}`)

        // Refresh applicants list
        const applicantsResponse = await apiService.getApplicants(selectedClient.clientGuid)
        if (applicantsResponse.success && applicantsResponse.data) {
          setApplicants(applicantsResponse.data.content)
        }
      } else {
        setError(response.error?.message || "Failed to create test applicant")
      }
    } catch (err) {
      setError("An error occurred while creating test applicant")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>TazAPI Sandbox Test</CardTitle>
          <CardDescription>Test your integration with the TazAPI sandbox environment</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="auth">Authentication</TabsTrigger>
              <TabsTrigger value="clients" disabled={!isAuthenticated}>
                Clients
              </TabsTrigger>
              <TabsTrigger value="client" disabled={!selectedClient}>
                Client Details
              </TabsTrigger>
            </TabsList>

            <TabsContent value="auth" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Enter JWT Token"
                    className="flex-1"
                    type="password"
                  />
                  <Button onClick={handleSetToken} disabled={!token}>
                    Set Token
                  </Button>
                  {isAuthenticated && (
                    <Button variant="outline" onClick={handleClearToken}>
                      Clear
                    </Button>
                  )}
                </div>

                {isAuthenticated && (
                  <Alert variant="default" className="bg-green-50 border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertTitle>Authenticated</AlertTitle>
                    <AlertDescription>
                      You are authenticated with TazAPI. You can now proceed to test the API.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="rounded-md bg-amber-50 border border-amber-200 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Key className="h-5 w-5 text-amber-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-amber-800">JWT Token Required</h3>
                      <div className="mt-2 text-sm text-amber-700">
                        <p>
                          You need to obtain a JWT token from the TazAPI Developer Portal. Register for an account and
                          create an API application to get a token.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="clients" className="space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Clients</h3>
                <Button onClick={fetchClients} disabled={loading}>
                  {loading ? "Loading..." : "Fetch Clients"}
                </Button>
              </div>

              {clients.length > 0 ? (
                <div className="border rounded-md divide-y">
                  {clients.map((client) => (
                    <div
                      key={client.clientGuid}
                      className="p-4 hover:bg-muted/50 cursor-pointer"
                      onClick={() => selectClient(client)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            <Building className="h-4 w-4 text-muted-foreground" />
                            {client.name}
                          </div>
                          <div className="text-sm text-muted-foreground">{client.email}</div>
                        </div>
                        <Badge variant={client.status === "active" ? "default" : "secondary"}>{client.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border rounded-md bg-muted/50">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No clients found</h3>
                  <p className="text-muted-foreground">
                    Click the "Fetch Clients" button to retrieve clients from the API.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="client" className="space-y-4 mt-4">
              {selectedClient && (
                <>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">{selectedClient.name}</h3>
                    <Button onClick={() => fetchClientDetails(selectedClient.clientGuid)} disabled={loading}>
                      {loading ? "Loading..." : "Refresh Data"}
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Test Applicants</CardTitle>
                        <CardDescription>Create test applicants using TazAPI's predefined test data</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex gap-4">
                          <div
                            className={`flex-1 p-3 border rounded-md cursor-pointer ${
                              testApplicantType === "clean" ? "border-blue-500 bg-blue-50" : ""
                            }`}
                            onClick={() => setTestApplicantType("clean")}
                          >
                            <div className="font-medium">Joe Clean</div>
                            <div className="text-sm text-muted-foreground">SSN: 111-22-3333</div>
                            <div className="text-sm text-green-600">Clear / Good Results</div>
                          </div>
                          <div
                            className={`flex-1 p-3 border rounded-md cursor-pointer ${
                              testApplicantType === "records" ? "border-blue-500 bg-blue-50" : ""
                            }`}
                            onClick={() => setTestApplicantType("records")}
                          >
                            <div className="font-medium">Hank Mess</div>
                            <div className="text-sm text-muted-foreground">SSN: 333-22-1111</div>
                            <div className="text-sm text-red-600">Records / Bad Results</div>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <div className="text-sm font-medium">Additional Information (Optional)</div>
                          <Input
                            placeholder="Email"
                            value={testApplicantData.email}
                            onChange={(e) => setTestApplicantData({ ...testApplicantData, email: e.target.value })}
                          />
                          <Input
                            placeholder="Phone Number"
                            value={testApplicantData.phoneNumber}
                            onChange={(e) =>
                              setTestApplicantData({ ...testApplicantData, phoneNumber: e.target.value })
                            }
                          />
                          <Input
                            placeholder="Position"
                            value={testApplicantData.proposedPosition}
                            onChange={(e) =>
                              setTestApplicantData({ ...testApplicantData, proposedPosition: e.target.value })
                            }
                          />
                        </div>

                        <Button className="w-full" onClick={createTestApplicant} disabled={loading}>
                          Create Test Applicant
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Available Products</CardTitle>
                        <CardDescription>Background check products available for this client</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {products.length > 0 ? (
                          <div className="space-y-3">
                            {products.map((product) => (
                              <div key={product.clientProductGuid} className="p-3 border rounded-md">
                                <div className="font-medium">{product.name}</div>
                                {product.description && (
                                  <div className="text-sm text-muted-foreground">{product.description}</div>
                                )}
                                <div className="text-sm mt-1">
                                  Price: ${product.price.toFixed(2)}
                                  {product.isDefault && (
                                    <Badge className="ml-2" variant="outline">
                                      Default
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {product.searches.length} searches included
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                            <p className="text-muted-foreground">No products found</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Applicants</CardTitle>
                      <CardDescription>Applicants associated with this client</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {applicants.length > 0 ? (
                        <div className="border rounded-md divide-y">
                          {applicants.map((applicant) => (
                            <div key={applicant.applicantGuid} className="p-4">
                              <div className="font-medium">
                                {applicant.firstName} {applicant.middleName} {applicant.lastName}
                                {applicant.generation && ` ${applicant.generation}`}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {applicant.email || "No email"} • {applicant.phoneNumber || "No phone"}
                              </div>
                              {applicant.proposedPosition && (
                                <div className="text-sm mt-1">Position: {applicant.proposedPosition}</div>
                              )}
                              {applicant.ssn && (
                                <div className="text-sm mt-1">SSN: xxx-xx-{applicant.ssn.slice(-4)}</div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Users className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-muted-foreground">No applicants found</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch gap-4 border-t pt-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert variant="default" className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
