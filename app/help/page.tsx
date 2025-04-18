import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, FileText, Video, Mail, Phone, MessageSquare, Download } from "lucide-react"

export default function HelpCenterPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Help Center</h1>
        <p className="text-muted-foreground">
          Find answers to common questions, watch training videos, and get in touch with our support team.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search for help topics..." className="pl-10" />
      </div>

      {/* Navigation Tabs */}
      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
          <TabsTrigger value="faq">FAQs</TabsTrigger>
          <TabsTrigger value="videos">Training Videos</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
        </TabsList>

        {/* FAQs Section */}
        <TabsContent value="faq" id="faq" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to common questions about our services.</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How long does a typical background check take?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Most background checks are completed within 2-3 business days. However, some searches may take
                      longer depending on the type of check and the jurisdiction. County criminal searches, for example,
                      can take 3-5 business days in some counties.
                    </p>
                    <p className="mt-2">
                      You can always check the status of your background checks in the "Searches" section of your
                      dashboard.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What information do I need to provide for an applicant?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      At minimum, you'll need to provide the applicant's full name, date of birth, and Social Security
                      Number (SSN) for most background checks. For more comprehensive checks, you may also need:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Current and previous addresses (past 7 years)</li>
                      <li>Employment history</li>
                      <li>Educational background</li>
                      <li>Driver's license number (for driving record checks)</li>
                      <li>Professional licenses (for license verification)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How do I interpret the results of a background check?</AccordionTrigger>
                  <AccordionContent>
                    <p>Background check results are typically marked as either "Clear" or "Alert":</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>
                        <strong>Clear:</strong> No records were found that match the search criteria.
                      </li>
                      <li>
                        <strong>Alert:</strong> Records were found that match the search criteria. You should review
                        these records carefully.
                      </li>
                    </ul>
                    <p className="mt-2">
                      For detailed information on interpreting specific types of searches, please refer to our guides
                      section or contact our support team.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>What should I do if an applicant disputes the results?</AccordionTrigger>
                  <AccordionContent>
                    <p>If an applicant disputes the results of a background check, you should:</p>
                    <ol className="list-decimal pl-6 mt-2 space-y-1">
                      <li>Provide the applicant with a copy of the background check report.</li>
                      <li>Inform them of their right to dispute the information.</li>
                      <li>Direct them to contact our dispute resolution team at disputes@referenceservicesinc.com.</li>
                      <li>We will investigate the dispute and provide an updated report if necessary.</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>How secure is my applicant's information?</AccordionTrigger>
                  <AccordionContent>
                    <p>We take data security very seriously. All applicant information is:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Encrypted both in transit and at rest</li>
                      <li>Stored in secure, SOC 2 compliant data centers</li>
                      <li>Accessible only to authorized personnel</li>
                      <li>Handled in compliance with FCRA regulations</li>
                      <li>Protected by multi-factor authentication</li>
                    </ul>
                    <p className="mt-2">
                      For more information about our security practices, please contact our security team.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Training Videos Section */}
        <TabsContent value="videos" id="videos" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Training Videos</CardTitle>
              <CardDescription>Watch tutorials and learn how to use our platform effectively.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg overflow-hidden">
                  <div className="aspect-video bg-muted relative flex items-center justify-center">
                    <Video className="h-12 w-12 text-muted-foreground" />
                    <Button className="absolute" variant="secondary">
                      Watch Video
                    </Button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-1">Getting Started with RSI Dashboard</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Learn how to navigate the dashboard and access key features.
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>Duration: 5:32</span>
                      <span className="mx-2">•</span>
                      <span>Updated: May 2025</span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="aspect-video bg-muted relative flex items-center justify-center">
                    <Video className="h-12 w-12 text-muted-foreground" />
                    <Button className="absolute" variant="secondary">
                      Watch Video
                    </Button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-1">Ordering Background Checks</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Step-by-step guide to ordering different types of background checks.
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>Duration: 7:15</span>
                      <span className="mx-2">•</span>
                      <span>Updated: May 2025</span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="aspect-video bg-muted relative flex items-center justify-center">
                    <Video className="h-12 w-12 text-muted-foreground" />
                    <Button className="absolute" variant="secondary">
                      Watch Video
                    </Button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-1">Understanding Background Check Results</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      How to interpret different types of background check results.
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>Duration: 8:45</span>
                      <span className="mx-2">•</span>
                      <span>Updated: May 2025</span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="aspect-video bg-muted relative flex items-center justify-center">
                    <Video className="h-12 w-12 text-muted-foreground" />
                    <Button className="absolute" variant="secondary">
                      Watch Video
                    </Button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-1">Managing Applicants</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Learn how to add, edit, and manage applicant information.
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>Duration: 6:20</span>
                      <span className="mx-2">•</span>
                      <span>Updated: May 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Guides Section */}
        <TabsContent value="guides" id="guides" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Guides & Resources</CardTitle>
              <CardDescription>Download comprehensive guides and resources.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary-50 p-3 rounded-lg">
                      <FileText className="h-6 w-6 text-primary-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">Complete User Guide</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Comprehensive guide to all features and functionality of the RSI platform.
                      </p>
                      <Button size="sm" className="gap-1">
                        <Download className="h-4 w-4" /> Download PDF
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary-50 p-3 rounded-lg">
                      <FileText className="h-6 w-6 text-primary-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">Background Check Types</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Detailed information about each type of background check and when to use them.
                      </p>
                      <Button size="sm" className="gap-1">
                        <Download className="h-4 w-4" /> Download PDF
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary-50 p-3 rounded-lg">
                      <FileText className="h-6 w-6 text-primary-500" />
                    </div>
                    <div className="flex-1">
                      <h />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">FCRA Compliance Guide</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Essential information about Fair Credit Reporting Act compliance for employers.
                      </p>
                      <Button size="sm" className="gap-1">
                        <Download className="h-4 w-4" /> Download PDF
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary-50 p-3 rounded-lg">
                      <FileText className="h-6 w-6 text-primary-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">Adverse Action Procedures</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Step-by-step guide to handling adverse action based on background check results.
                      </p>
                      <Button size="sm" className="gap-1">
                        <Download className="h-4 w-4" /> Download PDF
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Us Section */}
        <TabsContent value="contact" id="contact" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>Get in touch with our support team for assistance.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Customer Support</h3>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary-500" />
                      <span>(800) 555-1234</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary-500" />
                      <span>support@referenceservicesinc.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-primary-500" />
                      <span>Live Chat (Available 8AM-6PM EST)</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Hours of Operation</h3>
                    <p className="text-sm">Monday - Friday: 8:00 AM - 6:00 PM EST</p>
                    <p className="text-sm">Saturday: 9:00 AM - 1:00 PM EST</p>
                    <p className="text-sm">Sunday: Closed</p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Emergency Support</h3>
                    <p className="text-sm">
                      For urgent matters outside of business hours, please call our emergency support line at (800)
                      555-9876.
                    </p>
                  </div>
                </div>

                <div className="border rounded-lg p-6">
                  <h3 className="font-medium mb-4">Send Us a Message</h3>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="Your email address" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input id="subject" placeholder="Message subject" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea id="message" placeholder="Type your message here..." rows={4} />
                    </div>
                    <Button className="w-full">Send Message</Button>
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
