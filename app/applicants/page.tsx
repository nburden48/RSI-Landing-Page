import { ApplicantsList } from "@/components/applicants-list"
import { Button } from "@/components/ui/button"
import { Download, HelpCircle, Video, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function ApplicantsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Applicants</h1>
        <p className="text-muted-foreground">View and manage all your applicants and their background checks.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6 max-w-3xl">
          <ApplicantsList />
        </div>

        {/* Right side - Resources and Help */}
        <div className="w-full md:w-80 space-y-6">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-2">
                <Download className="h-5 w-5 text-primary-500" />
                <h3 className="font-medium">Export Applicants</h3>
              </div>
              <p className="text-sm text-muted-foreground">Download a CSV file of your applicants for your records.</p>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Export Applicants
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary-500" />
                <h3 className="font-medium">Need Help?</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Video className="h-4 w-4 mt-1 text-primary-500" />
                  <div>
                    <h4 className="text-sm font-medium">Managing Applicants</h4>
                    <p className="text-xs text-muted-foreground">Watch our tutorial video</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <FileText className="h-4 w-4 mt-1 text-primary-500" />
                  <div>
                    <h4 className="text-sm font-medium">Applicant Best Practices</h4>
                    <p className="text-xs text-muted-foreground">Read our guide</p>
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
