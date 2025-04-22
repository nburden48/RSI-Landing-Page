import { SearchOverview } from "@/components/search-overview"
import { ApplicantList } from "@/components/applicant-list"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Bell, Video, FileText } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      {/* Welcome Banner - Cosmetic only, no buttons */}
      <div className="rsi-pattern-bg rounded-lg py-3 px-6 text-white">
        <h1 className="text-2xl font-bold mb-1">Welcome to Reference Services Inc.</h1>
        <p className="text-sm opacity-90 max-w-2xl">
          Your trusted partner for comprehensive background screening solutions. Manage your applicants, track
          background checks, and access reports all in one place.
        </p>
      </div>

      {/* Background Check Overview - Full Width */}
      <div className="border-2 border-primary-300 rounded-lg p-4 bg-primary-50">
        <SearchOverview />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Applicant List - Takes 3/4 of the width on large screens */}
        <div className="lg:col-span-3 border rounded-lg p-4">
          <ApplicantList />
        </div>

        {/* Resources and Announcements - Takes 1/4 of the width on large screens */}
        <div className="space-y-4">
          {/* Announcements Section */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-base">
                <Bell className="mr-2 h-4 w-4 text-primary-500" />
                Announcements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              <div className="border-l-4 border-primary-500 pl-2 py-1">
                <h4 className="font-medium text-xs">System Maintenance</h4>
                <p className="text-xs text-muted-foreground">
                  Scheduled maintenance on April 20, 2025 from 2-4 AM EST.
                </p>
              </div>
              <div className="border-l-4 border-secondary-500 pl-2 py-1">
                <h4 className="font-medium text-xs">New Feature: Bulk Processing</h4>
                <p className="text-xs text-muted-foreground">You can now process multiple background checks at once.</p>
              </div>
              <Button variant="outline" size="sm" className="w-full text-xs h-7 mt-1">
                View All
              </Button>
            </CardContent>
          </Card>

          {/* Resources Section */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-base">
                <BookOpen className="mr-2 h-4 w-4 text-primary-500" />
                Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              <div className="space-y-2">
                <div className="flex items-start gap-1">
                  <Video className="h-3 w-3 mt-0.5 text-primary-500" />
                  <div>
                    <h4 className="text-xs font-medium">Training Videos</h4>
                    <p className="text-xs text-muted-foreground">Learn how to use the platform</p>
                  </div>
                </div>
                <div className="flex items-start gap-1">
                  <FileText className="h-3 w-3 mt-0.5 text-primary-500" />
                  <div>
                    <h4 className="text-xs font-medium">User Guides</h4>
                    <p className="text-xs text-muted-foreground">Detailed documentation</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full text-xs h-7 mt-1">
                Help Center
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
