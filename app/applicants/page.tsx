import { ApplicantsList } from "@/components/applicants-list"
import { RsiBanner } from "@/components/rsi-banner"
import { RsiCta } from "@/components/rsi-cta"
import { Button } from "@/components/ui/button"
import { UserPlus, Download } from "lucide-react"
import Link from "next/link"

export default function ApplicantsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Applicants</h1>
        <p className="text-muted-foreground">View and manage all your applicants and their background checks.</p>
      </div>

      <RsiBanner
        title="Applicant Management"
        description="Add new applicants, view existing profiles, and track background check progress. Our system makes it easy to manage all your applicant information in one place."
      >
        <div className="flex flex-wrap gap-3">
          <Button className="bg-white text-primary-500 hover:bg-gray-100" asChild>
            <Link href="#">
              <UserPlus className="mr-2 h-4 w-4" />
              Add New Applicant
            </Link>
          </Button>

          <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" asChild>
            <Link href="#">
              <Download className="mr-2 h-4 w-4" />
              Export Applicants
            </Link>
          </Button>
        </div>
      </RsiBanner>

      <ApplicantsList />

      <RsiCta
        title="Need to run background checks on multiple applicants?"
        description="Our bulk processing feature allows you to efficiently manage multiple background checks at once."
        primaryButtonText="Learn More"
        secondaryButtonText="Contact Sales"
      />
    </div>
  )
}
