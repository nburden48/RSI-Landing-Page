import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, Mail, MapPin, Clock, PlayCircle, FileText, HelpCircle } from "lucide-react"

export default function HelpCenterPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
        <p className="text-muted-foreground">
          Find answers to common questions, watch training videos, and get in touch with our support team.
        </p>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <div className="md:w-1/3">
          <Card>
            <CardHeader className="bg-primary-50 dark:bg-primary-950/50">
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary-500" />
                Quick Help
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="relative">
                  <Input type="search" placeholder="Search for help..." className="pl-10 pr-4" />
                  <HelpCircle className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Popular Topics</h3>
                  <ul className="space-y-1">
                    <li>
                      <a href="#faq" className="text-primary-600 hover:underline">
                        How to order a background check
                      </a>
                    </li>
                    <li>
                      <a href="#faq" className="text-primary-600 hover:underline">
                        Understanding background check results
                      </a>
                    </li>
                    <li>
                      <a href="#faq" className="text-primary-600 hover:underline">
                        Applicant consent requirements
                      </a>
                    </li>
                    <li>
                      <a href="#faq" className="text-primary-600 hover:underline">
                        Account settings and security
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-2/3">
          <Tabs defaultValue="faq">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="videos">Training Videos</TabsTrigger>
              <TabsTrigger value="contact">Contact Us</TabsTrigger>
            </TabsList>

            <TabsContent value="faq" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>
                    Find answers to the most common questions about our background check services.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>How do I order a background check?</AccordionTrigger>
                      <AccordionContent>
                        To order a background check, navigate to the Applicants section and click on "New Background
                        Check." Fill out the required information about the applicant and select the screening package
                        that meets your needs. Once submitted, you'll receive a confirmation and can track the status in
                        the Searches section.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                      <AccordionTrigger>How long does a background check take?</AccordionTrigger>
                      <AccordionContent>
                        The time to complete a background check varies depending on the type of search and the
                        jurisdictions involved. Basic checks may be completed within 24-48 hours, while more
                        comprehensive checks that include education verification, employment verification, or
                        international searches may take 3-5 business days or longer.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                      <AccordionTrigger>What information do I need to provide about an applicant?</AccordionTrigger>
                      <AccordionContent>
                        At minimum, you'll need to provide the applicant's full name, date of birth, and contact
                        information (email or phone). Depending on the type of check, you may also need their Social
                        Security Number, current address, and consent for the background check. For certain searches,
                        additional information like previous addresses, employment history, or education details may be
                        required.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                      <AccordionTrigger>How do I interpret background check results?</AccordionTrigger>
                      <AccordionContent>
                        Background check results are presented in a clear format with any findings highlighted. "Clear"
                        results indicate no issues were found, while "Records Found" indicates potential concerns that
                        require review. Each section of the report corresponds to a specific search type (criminal,
                        employment, education, etc.). For assistance interpreting specific results, contact our support
                        team.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5">
                      <AccordionTrigger>What are my legal obligations when using background checks?</AccordionTrigger>
                      <AccordionContent>
                        When using background checks for employment purposes, you must comply with the Fair Credit
                        Reporting Act (FCRA), which requires obtaining written consent from applicants, providing
                        pre-adverse action notices if you plan to reject based on the results, and allowing applicants
                        to dispute inaccurate information. Additional state and local laws may apply. We recommend
                        consulting with legal counsel to ensure compliance with all applicable regulations.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-6">
                      <AccordionTrigger>How do I add users to my account?</AccordionTrigger>
                      <AccordionContent>
                        To add users to your account, navigate to the Settings section and select "User Management."
                        Click "Add User" and enter the new user's email address and role (Admin or Standard User). The
                        new user will receive an email invitation to create their password and access the portal. You
                        can manage user permissions and remove users from the same section.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="videos" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Training Videos</CardTitle>
                  <CardDescription>
                    Watch our training videos to learn how to use the portal effectively.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow">
                      <div className="relative aspect-video bg-muted">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <PlayCircle className="h-16 w-16 text-primary-500 opacity-80" />
                        </div>
                        <img
                          src="/placeholder.svg?height=200&width=350"
                          alt="Portal Overview"
                          className="h-full w-full object-cover opacity-80"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">Portal Overview</h3>
                        <p className="text-sm text-muted-foreground">
                          A complete walkthrough of the client portal features and navigation.
                        </p>
                        <div className="mt-2 flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" /> 5:32
                        </div>
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow">
                      <div className="relative aspect-video bg-muted">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <PlayCircle className="h-16 w-16 text-primary-500 opacity-80" />
                        </div>
                        <img
                          src="/placeholder.svg?height=200&width=350"
                          alt="Ordering Background Checks"
                          className="h-full w-full object-cover opacity-80"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">Ordering Background Checks</h3>
                        <p className="text-sm text-muted-foreground">
                          Step-by-step guide to ordering and managing background checks.
                        </p>
                        <div className="mt-2 flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" /> 7:15
                        </div>
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow">
                      <div className="relative aspect-video bg-muted">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <PlayCircle className="h-16 w-16 text-primary-500 opacity-80" />
                        </div>
                        <img
                          src="/placeholder.svg?height=200&width=350"
                          alt="Understanding Results"
                          className="h-full w-full object-cover opacity-80"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">Understanding Results</h3>
                        <p className="text-sm text-muted-foreground">
                          How to interpret background check results and reports.
                        </p>
                        <div className="mt-2 flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" /> 6:48
                        </div>
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow">
                      <div className="relative aspect-video bg-muted">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <PlayCircle className="h-16 w-16 text-primary-500 opacity-80" />
                        </div>
                        <img
                          src="/placeholder.svg?height=200&width=350"
                          alt="Account Management"
                          className="h-full w-full object-cover opacity-80"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">Account Management</h3>
                        <p className="text-sm text-muted-foreground">
                          Managing users, permissions, and account settings.
                        </p>
                        <div className="mt-2 flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" /> 4:22
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Button variant="outline" className="w-full">
                      <FileText className="mr-2 h-4 w-4" />
                      View All Training Resources
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Reference Services Inc.</CardTitle>
                  <CardDescription>Our support team is here to help you with any questions or issues.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Phone className="mt-0.5 h-5 w-5 text-primary-500" />
                        <div>
                          <h3 className="font-medium">Phone Support</h3>
                          <p className="text-sm text-muted-foreground">Available Monday-Friday, 8am-6pm EST</p>
                          <a href="tel:+18005551234" className="mt-1 block text-primary-600 hover:underline">
                            1-800-555-1234
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Mail className="mt-0.5 h-5 w-5 text-primary-500" />
                        <div>
                          <h3 className="font-medium">Email Support</h3>
                          <p className="text-sm text-muted-foreground">We typically respond within 1 business day</p>
                          <a
                            href="mailto:support@referenceservices.com"
                            className="mt-1 block text-primary-600 hover:underline"
                          >
                            support@referenceservices.com
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <MapPin className="mt-0.5 h-5 w-5 text-primary-500" />
                        <div>
                          <h3 className="font-medium">Office Location</h3>
                          <p className="text-sm text-muted-foreground">Corporate Headquarters</p>
                          <address className="mt-1 not-italic text-sm">
                            123 Background Check Way
                            <br />
                            Suite 400
                            <br />
                            Cleveland, OH 44115
                          </address>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Clock className="mt-0.5 h-5 w-5 text-primary-500" />
                        <div>
                          <h3 className="font-medium">Business Hours</h3>
                          <p className="text-sm text-muted-foreground">When our team is available to assist you</p>
                          <div className="mt-1 text-sm">
                            <div className="flex justify-between">
                              <span>Monday-Friday:</span>
                              <span>8:00 AM - 6:00 PM EST</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Saturday:</span>
                              <span>Closed</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Sunday:</span>
                              <span>Closed</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Send Us a Message</h3>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <label htmlFor="first-name" className="text-sm font-medium">
                              First Name
                            </label>
                            <Input id="first-name" placeholder="John" />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="last-name" className="text-sm font-medium">
                              Last Name
                            </label>
                            <Input id="last-name" placeholder="Doe" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email
                          </label>
                          <Input id="email" type="email" placeholder="john.doe@example.com" />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="subject" className="text-sm font-medium">
                            Subject
                          </label>
                          <Input id="subject" placeholder="How can we help you?" />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="message" className="text-sm font-medium">
                            Message
                          </label>
                          <textarea
                            id="message"
                            rows={4}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Please describe your issue or question in detail..."
                          ></textarea>
                        </div>

                        <Button className="w-full">Send Message</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
