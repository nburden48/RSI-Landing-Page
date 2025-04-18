import { DashboardShell } from "@/components/dashboard-shell"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <div>
          <Skeleton className="h-10 w-[150px] mb-2" />
          <Skeleton className="h-5 w-[350px]" />
        </div>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Skeleton className="h-10 w-[180px]" />
            <div className="flex flex-col sm:flex-row gap-2">
              <Skeleton className="h-10 w-full sm:w-[250px]" />
              <Skeleton className="h-10 w-full sm:w-[150px]" />
              <Skeleton className="h-10 w-full sm:w-[180px]" />
            </div>
          </div>

          <Skeleton className="h-10 w-[400px]" />

          <div className="grid gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-[120px] w-full" />
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
