import { SearchOverview } from "@/components/search-overview"
import { ApplicantList } from "@/components/applicant-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Users, MessageSquare, ArrowRight } from "lucide-react"
import { RsiServices } from "@/components/rsi-services"
import { Testimonials } from "@/components/testimonials"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Welcome Banner */}
      <div className="rsi-pattern-bg rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to Reference Services Inc.</h1>
        <p className="text-lg opacity-90 max-w-2xl">
          Your trusted partner for comprehensive background screening solutions. Manage your applicants, track
          background checks, and access reports all in one place.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button className="bg-white text-primary-500 hover:bg-gray-100">
            <Users className="mr-2 h-4 w-4" />
            Add New Applicant
          </Button>
          <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
            <FileText className="mr-2 h-4 w-4" />
            View Reports
          </Button>
        </div>
      </div>

      {/* Background Check Overview - First section as requested */}
      <SearchOverview />

      {/* Applicant List - Second section as requested */}
      <ApplicantList />

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="rsi-card">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Users className="mr-2 h-5 w-5 text-primary-500" />
              Applicants
            </CardTitle>
            <CardDescription>Manage your applicants</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Add new applicants, view existing profiles, and track background check progress.
            </p>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/applicants">
                View Applicants
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="rsi-card-secondary">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <FileText className="mr-2 h-5 w-5 text-secondary-500" />
              Background Checks
            </CardTitle>
            <CardDescription>Track your searches</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Monitor the status of background checks, view results, and order new searches.
            </p>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/searches">
                View Searches
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="rsi-card-accent">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <MessageSquare className="mr-2 h-5 w-5 text-accent-500" />
              Messages
            </CardTitle>
            <CardDescription>Communication center</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">Stay in touch with our team, ask questions, and receive important updates.</p>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/messages">
                View Messages
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* RSI Services - Moved down as requested */}
      <RsiServices />

      {/* Testimonials */}
      <Testimonials />

      <div className="bg-muted rounded-lg p-6 border">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold mb-1">Need Assistance?</h2>
            <p className="text-muted-foreground">
              Our support team is here to help you with any questions or concerns.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">View Help Center</Button>
            <Button>Contact Support</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
