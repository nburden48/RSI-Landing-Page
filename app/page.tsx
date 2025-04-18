import { SearchOverview } from "@/components/search-overview"
import { ApplicantList } from "@/components/applicant-list"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Bell, HelpCircle, Video, FileText } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Welcome Banner - Cosmetic only, no buttons */}
      <div className="rsi-pattern-bg rounded-lg py-3 px-6 text-white">
        <h1 className="text-2xl font-bold mb-1">Welcome to Reference Services Inc.</h1>
        <p className="text-sm opacity-90 max-w-2xl">
          Your trusted partner for comprehensive background screening solutions. Manage your applicants, track
          background checks, and access reports all in one place.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-8 max-w-3xl">
          {/* Background Check Overview - Highlighted with border */}
          <div className="border-2 border-primary-300 rounded-lg p-4 bg-primary-50">
            <SearchOverview />
          </div>

          {/* Applicant List */}
          <ApplicantList />
        </div>

        {/* Right side - Announcements and Resources */}
        <div className="w-full md:w-80 space-y-6">
          {/* Announcements Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Bell className="mr-2 h-5 w-5 text-primary-500" />
                Announcements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-primary-500 pl-3 py-1">
                <h4 className="font-medium text-sm">System Maintenance</h4>
                <p className="text-xs text-muted-foreground">
                  Scheduled maintenance on April 20, 2025 from 2-4 AM EST.
                </p>
                <p className="text-xs text-primary-600 mt-1 font-medium">Posted: April 15, 2025</p>
              </div>
              <div className="border-l-4 border-secondary-500 pl-3 py-1">
                <h4 className="font-medium text-sm">New Feature: Bulk Processing</h4>
                <p className="text-xs text-muted-foreground">You can now process multiple background checks at once.</p>
                <p className="text-xs text-primary-600 mt-1 font-medium">Posted: April 10, 2025</p>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                View All Announcements
              </Button>
            </CardContent>
          </Card>

          {/* Resources Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <BookOpen className="mr-2 h-5 w-5 text-primary-500" />
                Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Video className="h-4 w-4 mt-1 text-primary-500" />
                  <div>
                    <h4 className="text-sm font-medium">Training Videos</h4>
                    <p className="text-xs text-muted-foreground">Learn how to use the platform</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <HelpCircle className="h-4 w-4 mt-1 text-primary-500" />
                  <div>
                    <h4 className="text-sm font-medium">FAQ</h4>
                    <p className="text-xs text-muted-foreground">Answers to common questions</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <FileText className="h-4 w-4 mt-1 text-primary-500" />
                  <div>
                    <h4 className="text-sm font-medium">User Guides</h4>
                    <p className="text-xs text-muted-foreground">Detailed documentation</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Visit Help Center
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
