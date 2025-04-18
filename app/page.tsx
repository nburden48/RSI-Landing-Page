import { SearchOverview } from "@/components/search-overview"
import { ApplicantList } from "@/components/applicant-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, ArrowRight, BookOpen, Bell } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Welcome Banner - Cosmetic only, no buttons */}
      <div className="rsi-pattern-bg rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to Reference Services Inc.</h1>
        <p className="text-lg opacity-90 max-w-2xl">
          Your trusted partner for comprehensive background screening solutions. Manage your applicants, track
          background checks, and access reports all in one place.
        </p>
      </div>

      {/* Main content area with two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column (2/3 width) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Background Check Overview - Highlighted */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <SearchOverview />
          </div>

          {/* Applicant List */}
          <ApplicantList />
        </div>

        {/* Right column (1/3 width) - Announcements and Resources */}
        <div className="space-y-8">
          {/* Announcements Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Bell className="mr-2 h-5 w-5 text-primary-500" />
                Announcements
              </CardTitle>
              <CardDescription>Latest updates and news</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-primary-500 pl-3 py-1">
                  <h3 className="font-medium text-sm">System Maintenance</h3>
                  <p className="text-sm text-muted-foreground">
                    Scheduled maintenance on June 15th from 2-4 AM EST. Some services may be unavailable.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Posted: June 8, 2025</p>
                </div>
                <div className="border-l-4 border-primary-500 pl-3 py-1">
                  <h3 className="font-medium text-sm">New Feature: Enhanced Reporting</h3>
                  <p className="text-sm text-muted-foreground">
                    We've added new customizable reports. Check the Resources section for a tutorial.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Posted: June 5, 2025</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resources Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <BookOpen className="mr-2 h-5 w-5 text-primary-500" />
                Resources
              </CardTitle>
              <CardDescription>Training videos and FAQs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="rounded-md border p-3 hover:bg-muted/50 transition-colors">
                  <h3 className="font-medium text-sm">Getting Started Guide</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Learn the basics of using the dashboard and managing applicants.
                  </p>
                  <Link href="#" className="text-xs text-primary-500 hover:underline inline-flex items-center mt-2">
                    Watch video <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
                <div className="rounded-md border p-3 hover:bg-muted/50 transition-colors">
                  <h3 className="font-medium text-sm">Background Check Process</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Understanding the background check workflow and timeline.
                  </p>
                  <Link href="#" className="text-xs text-primary-500 hover:underline inline-flex items-center mt-2">
                    Watch video <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
                <div className="rounded-md border p-3 hover:bg-muted/50 transition-colors">
                  <h3 className="font-medium text-sm">Frequently Asked Questions</h3>
                  <p className="text-xs text-muted-foreground mt-1">Answers to common questions about our services.</p>
                  <Link href="#" className="text-xs text-primary-500 hover:underline inline-flex items-center mt-2">
                    View FAQ <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Help Center Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <MessageSquare className="mr-2 h-5 w-5 text-primary-500" />
                Help Center
              </CardTitle>
              <CardDescription>Get assistance when you need it</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="rounded-md border p-3 hover:bg-muted/50 transition-colors">
                  <h3 className="font-medium text-sm">Contact Support</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Our support team is available Monday-Friday, 8AM-6PM EST.
                  </p>
                  <Link href="#" className="text-xs text-primary-500 hover:underline inline-flex items-center mt-2">
                    Submit a ticket <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
                <div className="rounded-md border p-3 hover:bg-muted/50 transition-colors">
                  <h3 className="font-medium text-sm">Knowledge Base</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Browse articles and guides on using our services.
                  </p>
                  <Link href="#" className="text-xs text-primary-500 hover:underline inline-flex items-center mt-2">
                    Browse articles <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
                <div className="rounded-md border p-3 hover:bg-muted/50 transition-colors">
                  <h3 className="font-medium text-sm">Live Chat</h3>
                  <p className="text-xs text-muted-foreground mt-1">Chat with a support representative in real-time.</p>
                  <Link href="#" className="text-xs text-primary-500 hover:underline inline-flex items-center mt-2">
                    Start chat <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
