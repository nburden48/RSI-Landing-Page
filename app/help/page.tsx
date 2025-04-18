"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RsiBanner } from "@/components/rsi-banner"
import { FileText, Mail, Phone, MessageSquare, Video, BookOpen, HelpCircle, Search, Download } from "lucide-react"

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
        <p className="text-muted-foreground">Find answers, resources, and support for using the RSI client portal.</p>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search for help topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Help Center Banner */}
      <RsiBanner
        title="Need Immediate Assistance?"
        description="Our support team is available Monday through Friday, 8:00 AM to 6:00 PM EST to assist you with any questions or issues."
      >
        <div className="flex flex-wrap gap-3 mt-2">
          <Button>
            <Phone className="mr-2 h-4 w-4" />
            Call Support
          </Button>
          <Button variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
            <MessageSquare className="mr-2 h-4 w-4" />
            Live Chat
          </Button>
        </div>
      </RsiBanner>

      {/* Main Content Tabs */}
      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full max-w-[600px] grid-cols-4">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="videos">Training Videos</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
        </TabsList>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="mt-6" id="faq">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary-500" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>Find answers to common questions about using the RSI client portal.</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I add a new applicant?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">To add a new applicant:</p>
                    <ol className="list-decimal pl-5 space-y-1">
                      <li>Navigate to the Applicants page from the main menu</li>
                      <li>Click the "Add New Applicant" button in the top-right corner</li>
                      <li>Fill out the required information in the form (fields marked with * are required)</li>
                      <li>Click "Add Applicant" to save the new applicant</li>
                    </ol>
                    <p className="mt-2">The new applicant will immediately appear in your applicants list.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>How do I order a background check?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">To order a background check:</p>
                    <ol className="list-decimal pl-5 space-y-1">
                      <li>Navigate to the Applicants page</li>
                      <li>Find the applicant you want to order a check for</li>
                      <li>Click the three dots menu (⋮) and select "Order Background Check"</li>
                      <li>Select the type of background check package you want to order</li>
                      <li>Review the details and click "Submit Order"</li>
                    </ol>
                    <p className="mt-2">You can track the status of the background check on the Searches page.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>How long does a background check take?</AccordionTrigger>
                  <AccordionContent>
                    <p>Background check completion times vary based on the type of search:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                      <li>
                        <span className="font-medium">State Criminal Checks:</span> Typically 24-48 hours
                      </li>
                      <li>
                        <span className="font-medium">County Criminal Checks:</span> 2-5 business days
                      </li>
                      <li>
                        <span className="font-medium">Employment Verification:</span> 2-3 business days
                      </li>
                      <li>
                        <span className="font-medium">Education Verification:</span> 1-3 business days
                      </li>
                      <li>
                        <span className="font-medium">Credit Checks:</span> 24-48 hours
                      </li>
                    </ul>
                    <p className="mt-2">
                      Some searches may take longer if there are issues contacting references or if additional research
                      is needed.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>What do I do if a background check has an issue?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">If a background check has an issue:</p>
                    <ol className="list-decimal pl-5 space-y-1">
                      <li>Navigate to the Searches page</li>
                      <li>Look for searches with a "Pending Information" status</li>
                      <li>Click "View Details" to see what information is needed</li>
                      <li>Click "Provide Information" to submit the required information</li>
                    </ol>
                    <p className="mt-2">You can also contact our support team for assistance with resolving issues.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>How do I download a completed background check report?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">To download a completed background check report:</p>
                    <ol className="list-decimal pl-5 space-y-1">
                      <li>Navigate to the Searches page</li>
                      <li>Find the completed search you want to download</li>
                      <li>Click "View Details"</li>
                      <li>Click the "Download Report" button</li>
                    </ol>
                    <p className="mt-2">
                      Reports are available in PDF format and can be saved or printed for your records.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Training Videos Tab */}
        <TabsContent value="videos" className="mt-6" id="videos">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-primary-500" />
                Training Videos
              </CardTitle>
              <CardDescription>Watch step-by-step tutorials on how to use the RSI client portal.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Video 1 */}
                <div className="space-y-3">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center p-4">
                      <Video className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">Getting Started with RSI Client Portal</p>
                    </div>
                  </div>
                  <h3 className="font-medium">Getting Started with RSI Client Portal</h3>
                  <p className="text-sm text-muted-foreground">
                    This video provides an overview of the RSI client portal and how to navigate the dashboard.
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>Duration: 5:32</span>
                    <span className="mx-2">•</span>
                    <span>Updated: June 2025</span>
                  </div>
                </div>

                {/* Video 2 */}
                <div className="space-y-3">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center p-4">
                      <Video className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">Adding and Managing Applicants</p>
                    </div>
                  </div>
                  <h3 className="font-medium">Adding and Managing Applicants</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn how to add new applicants, edit their information, and manage their records.
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>Duration: 7:15</span>
                    <span className="mx-2">•</span>
                    <span>Updated: June 2025</span>
                  </div>
                </div>

                {/* Video 3 */}
                <div className="space-y-3">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center p-4">
                      <Video className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">Ordering Background Checks</p>
                    </div>
                  </div>
                  <h3 className="font-medium">Ordering Background Checks</h3>
                  <p className="text-sm text-muted-foreground">
                    Step-by-step guide on how to order different types of background checks for your applicants.
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>Duration: 6:48</span>
                    <span className="mx-2">•</span>
                    <span>Updated: May 2025</span>
                  </div>
                </div>

                {/* Video 4 */}
                <div className="space-y-3">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center p-4">
                      <Video className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">Understanding Background Check Results</p>
                    </div>
                  </div>
                  <h3 className="font-medium">Understanding Background Check Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn how to interpret background check results and understand the different status indicators.
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>Duration: 8:22</span>
                    <span className="mx-2">•</span>
                    <span>Updated: May 2025</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Guides Tab */}
        <TabsContent value="guides" className="mt-6" id="guides">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary-500" />
                Guides and Resources
              </CardTitle>
              <CardDescription>
                Download comprehensive guides and resources for using the RSI client portal.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Guide 1 */}
                <Card className="border shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary-50 p-3 rounded-lg">
                        <FileText className="h-6 w-6 text-primary-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">User Manual</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Complete user manual covering all features of the RSI client portal.
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">PDF • 4.2 MB</span>
                          <Button size="sm" variant="outline" className="h-8">
                            <Download className="mr-2 h-3.5 w-3.5" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Guide 2 */}
                <Card className="border shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary-50 p-3 rounded-lg">
                        <FileText className="h-6 w-6 text-primary-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">Quick Start Guide</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Essential information to get started with the RSI client portal quickly.
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">PDF • 1.8 MB</span>
                          <Button size="sm" variant="outline" className="h-8">
                            <Download className="mr-2 h-3.5 w-3.5" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Guide 3 */}
                <Card className="border shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary-50 p-3 rounded-lg">
                        <FileText className="h-6 w-6 text-primary-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">Background Check Types</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Detailed information about the different types of background checks available.
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">PDF • 2.5 MB</span>
                          <Button size="sm" variant="outline" className="h-8">
                            <Download className="mr-2 h-3.5 w-3.5" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Guide 4 */}
                <Card className="border shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary-50 p-3 rounded-lg">
                        <FileText className="h-6 w-6 text-primary-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">Compliance Guide</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Information about compliance requirements for background checks.
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">PDF • 3.1 MB</span>
                          <Button size="sm" variant="outline" className="h-8">
                            <Download className="mr-2 h-3.5 w-3.5" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Us Tab */}
        <TabsContent value="contact" className="mt-6" id="contact">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary-500" />
                Contact Us
              </CardTitle>
              <CardDescription>Get in touch with our support team for assistance.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Contact Information</h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Phone Support</h4>
                        <p className="text-muted-foreground">(800) 555-1234</p>
                        <p className="text-sm text-muted-foreground">Monday-Friday, 8:00 AM - 6:00 PM EST</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Email Support</h4>
                        <p className="text-muted-foreground">support@referenceservicesinc.com</p>
                        <p className="text-sm text-muted-foreground">Response within 24 business hours</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MessageSquare className="h-5 w-5 text-primary-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Live Chat</h4>
                        <p className="text-muted-foreground">Available during business hours</p>
                        <Button size="sm" className="mt-1">
                          Start Chat
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Send a Message</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="your.email@example.com" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="How can we help you?" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Please describe your issue or question in detail..."
                        rows={5}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <select
                        id="priority"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="low">Low - General Question</option>
                        <option value="medium">Medium - Need Assistance</option>
                        <option value="high">High - Urgent Issue</option>
                      </select>
                    </div>

                    <Button type="submit" className="w-full">
                      Submit Message
                    </Button>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
