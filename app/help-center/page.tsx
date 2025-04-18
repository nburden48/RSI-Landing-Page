import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Video, FileText, HelpCircle, Mail, Phone, MessageSquare } from "lucide-react"

export default function HelpCenterPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
        <p className="text-muted-foreground">Find answers to your questions and learn how to use our platform.</p>
      </div>

      <div className="relative">
        <div className="flex items-center border-2 border-primary-200 rounded-lg overflow-hidden bg-white">
          <div className="pl-4">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            placeholder="Search for help articles, videos, and more..."
            className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button className="rounded-l-none">Search</Button>
        </div>
      </div>

      <Tabs defaultValue="guides" className="w-full">
        <TabsList className="grid w-full max-w-[600px] grid-cols-4">
          <TabsTrigger value="guides">User Guides</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
        </TabsList>

        <TabsContent value="guides" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary-500" />
                  Getting Started
                </CardTitle>
                <CardDescription>Essential guides for new users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Platform Overview</h3>
                  <p className="text-sm text-muted-foreground">Learn about the key features and navigation</p>
                  <Button variant="link" className="p-0 h-auto text-primary-500">
                    Read Guide
                  </Button>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Setting Up Your Account</h3>
                  <p className="text-sm text-muted-foreground">Configure your profile and preferences</p>
                  <Button variant="link" className="p-0 h-auto text-primary-500">
                    Read Guide
                  </Button>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Adding Your First Applicant</h3>
                  <p className="text-sm text-muted-foreground">Step-by-step instructions for adding applicants</p>
                  <Button variant="link" className="p-0 h-auto text-primary-500">
                    Read Guide
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary-500" />
                  Background Checks
                </CardTitle>
                <CardDescription>Learn about our screening process</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Types of Background Checks</h3>
                  <p className="text-sm text-muted-foreground">Understand the different search types available</p>
                  <Button variant="link" className="p-0 h-auto text-primary-500">
                    Read Guide
                  </Button>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Understanding Results</h3>
                  <p className="text-sm text-muted-foreground">How to interpret background check results</p>
                  <Button variant="link" className="p-0 h-auto text-primary-500">
                    Read Guide
                  </Button>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Compliance Guidelines</h3>
                  <p className="text-sm text-muted-foreground">Important legal information for employers</p>
                  <Button variant="link" className="p-0 h-auto text-primary-500">
                    Read Guide
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary-500" />
                  Managing Applicants
                </CardTitle>
                <CardDescription>Efficiently track and manage applicants</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Applicant Statuses</h3>
                  <p className="text-sm text-muted-foreground">Understanding the different applicant statuses</p>
                  <Button variant="link" className="p-0 h-auto text-primary-500">
                    Read Guide
                  </Button>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Bulk Processing</h3>
                  <p className="text-sm text-muted-foreground">How to process multiple applicants at once</p>
                  <Button variant="link" className="p-0 h-auto text-primary-500">
                    Read Guide
                  </Button>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Applicant Communications</h3>
                  <p className="text-sm text-muted-foreground">Best practices for applicant messaging</p>
                  <Button variant="link" className="p-0 h-auto text-primary-500">
                    Read Guide
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary-500" />
                  Reports & Analytics
                </CardTitle>
                <CardDescription>Get insights from your data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Standard Reports</h3>
                  <p className="text-sm text-muted-foreground">Overview of available reports</p>
                  <Button variant="link" className="p-0 h-auto text-primary-500">
                    Read Guide
                  </Button>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Custom Reporting</h3>
                  <p className="text-sm text-muted-foreground">How to create and save custom reports</p>
                  <Button variant="link" className="p-0 h-auto text-primary-500">
                    Read Guide
                  </Button>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Data Export</h3>
                  <p className="text-sm text-muted-foreground">Exporting data for external analysis</p>
                  <Button variant="link" className="p-0 h-auto text-primary-500">
                    Read Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="videos" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Video className="h-5 w-5 text-primary-500" />
                  Platform Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-md mb-3 flex items-center justify-center">
                  <Video className="h-10 w-10 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  A comprehensive overview of the Reference Services Inc. platform and its features.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Watch Video
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Video className="h-5 w-5 text-primary-500" />
                  Background Check Process
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-md mb-3 flex items-center justify-center">
                  <Video className="h-10 w-10 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Learn about the background check process from start to finish.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Watch Video
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Video className="h-5 w-5 text-primary-500" />
                  Managing Applicants
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-md mb-3 flex items-center justify-center">
                  <Video className="h-10 w-10 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Tips and tricks for efficiently managing your applicants.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Watch Video
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Video className="h-5 w-5 text-primary-500" />
                  Reading Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-md mb-3 flex items-center justify-center">
                  <Video className="h-10 w-10 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  How to interpret and understand background check results.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Watch Video
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Video className="h-5 w-5 text-primary-500" />
                  Messaging System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-md mb-3 flex items-center justify-center">
                  <Video className="h-10 w-10 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  How to use the messaging system to communicate with our team.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Watch Video
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Video className="h-5 w-5 text-primary-500" />
                  Advanced Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-md mb-3 flex items-center justify-center">
                  <Video className="h-10 w-10 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Explore advanced features and customization options.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Watch Video
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="faq" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary-500" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>Find answers to common questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">General Questions</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">How long does a typical background check take?</h4>
                    <p className="text-sm text-muted-foreground">
                      Most background checks are completed within 2-3 business days. However, some searches, such as
                      county criminal checks in certain jurisdictions, may take longer due to court access limitations.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">
                      What information do I need to provide for a background check?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      At minimum, you'll need the applicant's full name, date of birth, and Social Security Number.
                      Additional information such as current address, previous addresses, and employment history may be
                      required for certain searches.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">How are background check results delivered?</h4>
                    <p className="text-sm text-muted-foreground">
                      Results are delivered through our secure online portal. You'll receive an email notification when
                      results are ready to view. You can also download and print PDF reports from the platform.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Technical Questions</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">What browsers are supported by the platform?</h4>
                    <p className="text-sm text-muted-foreground">
                      Our platform supports the latest versions of Chrome, Firefox, Safari, and Edge. For the best
                      experience, we recommend keeping your browser updated to the latest version.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Can I access the platform on mobile devices?</h4>
                    <p className="text-sm text-muted-foreground">
                      Yes, our platform is fully responsive and can be accessed on smartphones and tablets. However, for
                      complex tasks like bulk processing, we recommend using a desktop computer.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">How secure is my data?</h4>
                    <p className="text-sm text-muted-foreground">
                      We take data security very seriously. Our platform uses bank-level encryption, and we comply with
                      all relevant data protection regulations. All sensitive information is encrypted both in transit
                      and at rest.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Billing Questions</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">How am I billed for background checks?</h4>
                    <p className="text-sm text-muted-foreground">
                      Billing is based on the specific searches you order. You'll only be charged for completed
                      searches. Invoices are generated monthly and can be viewed in the billing section of your account.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">What payment methods do you accept?</h4>
                    <p className="text-sm text-muted-foreground">
                      We accept all major credit cards, ACH transfers, and corporate checks. For enterprise clients, we
                      also offer invoicing with net-30 terms upon approval.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary-500" />
                  Contact Support
                </CardTitle>
                <CardDescription>Get help from our support team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Subject of your inquiry" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Describe your issue or question" rows={5} />
                </div>
                <Button className="w-full">Submit Support Request</Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary-500" />
                    Contact Information
                  </CardTitle>
                  <CardDescription>Reach out to us directly</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Customer Support</h3>
                    <p className="text-sm text-muted-foreground">
                      <Phone className="h-4 w-4 inline mr-2" />
                      (800) 555-1234
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <Mail className="h-4 w-4 inline mr-2" />
                      support@referenceservicesinc.com
                    </p>
                    <p className="text-sm text-muted-foreground">Monday - Friday, 8:00 AM - 6:00 PM EST</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Sales Inquiries</h3>
                    <p className="text-sm text-muted-foreground">
                      <Phone className="h-4 w-4 inline mr-2" />
                      (800) 555-5678
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <Mail className="h-4 w-4 inline mr-2" />
                      sales@referenceservicesinc.com
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary-500" />
                    Live Chat
                  </CardTitle>
                  <CardDescription>Chat with our support team in real-time</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Our live chat support is available Monday through Friday from 9:00 AM to 5:00 PM EST.
                  </p>
                  <Button className="w-full">Start Live Chat</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
