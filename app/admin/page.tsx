import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, CheckSquare, Clock, AlertCircle, Users, FileSearch, MessageSquare } from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the Reference Services Inc. admin portal.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Building className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
            <Users className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,856</div>
            <p className="text-xs text-muted-foreground">+143 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Searches</CardTitle>
            <FileSearch className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,429</div>
            <p className="text-xs text-muted-foreground">+28 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">-3 from yesterday</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Search Status</CardTitle>
            <CardDescription>Overview of all background checks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium flex items-center">
                      <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                      Completed
                    </span>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium flex items-center">
                      <Clock className="h-4 w-4 text-amber-500 mr-2" />
                      In Progress
                    </span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "25%" }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium flex items-center">
                      <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                      Pending Information
                    </span>
                    <span className="text-sm font-medium">10%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-red-500 h-2.5 rounded-full" style={{ width: "10%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "New client registered",
                  details: "Acme Corporation signed up",
                  time: "2 hours ago",
                },
                {
                  action: "Background check completed",
                  details: "John Smith's state check cleared",
                  time: "4 hours ago",
                },
                {
                  action: "New message received",
                  details: "Client question about verification",
                  time: "Yesterday",
                },
                {
                  action: "Search status updated",
                  details: "County check for Sarah Johnson in progress",
                  time: "Yesterday",
                },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-start pb-3 border-b last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-sm">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.details}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
