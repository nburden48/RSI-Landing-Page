import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function HelpCenterLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Skeleton className="h-10 w-[200px] mb-2" />
        <Skeleton className="h-5 w-[350px]" />
      </div>

      <Skeleton className="h-10 w-full max-w-md" />

      <Skeleton className="h-[120px] w-full rounded-lg" />

      <Skeleton className="h-10 w-[600px]" />

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-[250px] mb-2" />
          <Skeleton className="h-4 w-[350px]" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
