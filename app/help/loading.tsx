import { Skeleton } from "@/components/ui/skeleton"

export default function HelpCenterLoading() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <Skeleton className="h-10 w-[250px] mb-2" />
        <Skeleton className="h-5 w-[350px]" />
      </div>

      <Skeleton className="h-10 w-full max-w-xl mx-auto" />

      <Skeleton className="h-10 w-full max-w-2xl mx-auto" />

      <Skeleton className="h-[600px] w-full" />
    </div>
  )
}
