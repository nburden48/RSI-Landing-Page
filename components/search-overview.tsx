import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckSquare, Clock, AlertCircle } from "lucide-react"

export const SearchOverview = React.memo(function SearchOverview() {
  return (
    <div>
      <h2 className="text-xl font-bold tracking-tight">Background Check Overview</h2>
      <p className="text-muted-foreground text-sm mb-3">Here's a summary of your current background checks.</p>

      <div className="grid gap-3 md:grid-cols-3 max-w-4xl">
        <Card className="border-t-4 border-t-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-3 px-3">
            <CardTitle className="text-sm font-medium">Completed Searches</CardTitle>
            <CheckSquare className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent className="px-3 pb-3 pt-0">
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+5 from last week</p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-amber-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-3 px-3">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent className="px-3 pb-3 pt-0">
            <div className="text-2xl font-bold">13</div>
            <p className="text-xs text-muted-foreground">-2 from last week</p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-3 px-3">
            <CardTitle className="text-sm font-medium">Pending Information</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent className="px-3 pb-3 pt-0">
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">+1 from last week</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
})
