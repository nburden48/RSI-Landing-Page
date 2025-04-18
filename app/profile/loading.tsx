import { DashboardShell } from "@/components/dashboard-shell"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <div>
          <Skeleton className="h-10 w-[200px] mb-2" />
          <Skeleton className="h-5 w-[350px]" />
        </div>
        <Skeleton className="h-[400px] w-full" />
      </div>
    </DashboardShell>
  )
}
