"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Clock, AlertCircle, Calendar, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Sample task data
const tasks = [
  {
    id: 1,
    title: "Website Redesign",
    description: "Update the company website with new branding elements",
    dueDate: "2025-04-15",
    status: "in-progress",
    priority: "high",
    assignedBy: "Sarah Johnson",
  },
  {
    id: 2,
    title: "Content Review",
    description: "Review and approve new marketing content for Q2 campaign",
    dueDate: "2025-04-10",
    status: "pending",
    priority: "medium",
    assignedBy: "Michael Chen",
  },
  {
    id: 3,
    title: "Feedback Implementation",
    description: "Implement changes based on user feedback from last survey",
    dueDate: "2025-04-20",
    status: "completed",
    priority: "medium",
    assignedBy: "Sarah Johnson",
  },
  {
    id: 4,
    title: "Product Demo Preparation",
    description: "Prepare materials for upcoming product demonstration",
    dueDate: "2025-04-12",
    status: "in-progress",
    priority: "high",
    assignedBy: "David Wilson",
  },
  {
    id: 5,
    title: "Budget Approval",
    description: "Review and approve Q2 marketing budget",
    dueDate: "2025-04-08",
    status: "completed",
    priority: "high",
    assignedBy: "Lisa Rodriguez",
  },
  {
    id: 6,
    title: "Social Media Strategy",
    description: "Develop social media strategy for new product launch",
    dueDate: "2025-04-25",
    status: "pending",
    priority: "low",
    assignedBy: "Michael Chen",
  },
]

export function TaskList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  // Filter tasks based on search term and filters
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-amber-500" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Completed
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            In Progress
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Pending Review
          </Badge>
        )
      default:
        return null
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100">
            High
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
            Low
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Your Tasks</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-[250px]"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="pending">Pending Review</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="board">Board View</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="mt-4">
          <div className="grid gap-4">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <Card key={task.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2">
                          {getStatusIcon(task.status)}
                          {task.title}
                        </CardTitle>
                        <CardDescription>{task.description}</CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
                          <DropdownMenuItem>Request Update</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {getStatusBadge(task.status)}
                      {getPriorityBadge(task.priority)}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                    <div>Assigned by: {task.assignedBy}</div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No tasks found matching your filters.</p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="board" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Completed Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <h3 className="font-medium">Completed</h3>
                <Badge variant="secondary" className="ml-auto">
                  {filteredTasks.filter((t) => t.status === "completed").length}
                </Badge>
              </div>
              <div className="space-y-3">
                {filteredTasks
                  .filter((task) => task.status === "completed")
                  .map((task) => (
                    <Card key={task.id} className="shadow-sm">
                      <CardHeader className="p-3 pb-1">
                        <CardTitle className="text-sm">{task.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 pt-1 text-xs">
                        <p className="text-muted-foreground line-clamp-2">{task.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          {getPriorityBadge(task.priority)}
                          <span className="text-xs text-muted-foreground">
                            {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>

            {/* In Progress Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-500" />
                <h3 className="font-medium">In Progress</h3>
                <Badge variant="secondary" className="ml-auto">
                  {filteredTasks.filter((t) => t.status === "in-progress").length}
                </Badge>
              </div>
              <div className="space-y-3">
                {filteredTasks
                  .filter((task) => task.status === "in-progress")
                  .map((task) => (
                    <Card key={task.id} className="shadow-sm">
                      <CardHeader className="p-3 pb-1">
                        <CardTitle className="text-sm">{task.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 pt-1 text-xs">
                        <p className="text-muted-foreground line-clamp-2">{task.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          {getPriorityBadge(task.priority)}
                          <span className="text-xs text-muted-foreground">
                            {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>

            {/* Pending Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <h3 className="font-medium">Pending Review</h3>
                <Badge variant="secondary" className="ml-auto">
                  {filteredTasks.filter((t) => t.status === "pending").length}
                </Badge>
              </div>
              <div className="space-y-3">
                {filteredTasks
                  .filter((task) => task.status === "pending")
                  .map((task) => (
                    <Card key={task.id} className="shadow-sm">
                      <CardHeader className="p-3 pb-1">
                        <CardTitle className="text-sm">{task.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 pt-1 text-xs">
                        <p className="text-muted-foreground line-clamp-2">{task.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          {getPriorityBadge(task.priority)}
                          <span className="text-xs text-muted-foreground">
                            {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
