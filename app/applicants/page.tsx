import { ApplicantsList } from "@/components/applicants-list"

export default function ApplicantsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Applicants</h1>
        <p className="text-muted-foreground">View and manage all your applicants and their background checks.</p>
      </div>

      <ApplicantsList />
    </div>
  )
}
