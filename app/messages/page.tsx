"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { MessageSquare, Search, Plus, Mail, MailOpen, Send, Clock, ArrowLeft, Trash2, FileText } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import type { Message } from "@/types/api"

// Mock data for orders and applicants for reference selection
const mockOrders = [
  { orderGuid: "ord-a1b2c3d4-e5f6-g7h8-i9j0", reference: "JOB123", applicantName: "John Smith" },
  { orderGuid: "ord-b2c3d4e5-f6g7-h8i9-j0k1", reference: "JOB124", applicantName: "Sarah Johnson" },
  { orderGuid: "ord-c3d4e5f6-g7h8-i9j0-k1l2", reference: "JOB125", applicantName: "Michael Chen" },
]

const mockApplicants = [
  { applicantGuid: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6", name: "John Smith" },
  { applicantGuid: "b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7", name: "Sarah Johnson" },
  { applicantGuid: "c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8", name: "Michael Chen" },
]

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isReadFilter, setIsReadFilter] = useState("all")
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [isViewMessageOpen, setIsViewMessageOpen] = useState(false)
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false)
  const [isReferenceDialogOpen, setIsReferenceDialogOpen] = useState(false)
  const [newMessage, setNewMessage] = useState({
    subject: "",
    content: "",
    orderGuid: "",
    applicantGuid: "",
  })

  // Fetch messages data
  useEffect(() => {
    async function fetchMessages() {
      try {
        setLoading(true)
        // In a real app, this would be an API call
        // const response = await fetch('/api/clients/{clientGuid}/messages')
        // const data = await response.json()

        // For now, use mock data
        const mockMessages: Message[] = [
          {
            messageGuid: "msg-a1b2c3d4-e5f6-g7h8-i9j0",
            clientGuid: "c1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
            orderGuid: "ord-a1b2c3d4-e5f6-g7h8-i9j0",
            applicantGuid: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
            subject: "Additional information needed",
            content:
              "We need additional information for the employment verification. Please provide the correct phone number for your previous employer.",
            dateCreated: "2025-04-03",
            isRead: true,
            fromClient: false,
          },
          {
            messageGuid: "msg-b2c3d4e5-f6g7-h8i9-j0k1",
            clientGuid: "c1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
            orderGuid: "ord-a1b2c3d4-e5f6-g7h8-i9j0",
            applicantGuid: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
            subject: "Updated contact information",
            content: "Here is the updated phone number for my previous employer: (555) 999-8888",
            dateCreated: "2025-04-04",
            isRead: true,
            fromClient: true,
          },
          {
            messageGuid: "msg-c3d4e5f6-g7h8-i9j0-k1l2",
            clientGuid: "c1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
            orderGuid: "ord-b2c3d4e5-f6g7-h8i9-j0k1",
            applicantGuid: "b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7",
            subject: "Background check completed",
            content:
              "The background check for Sarah Johnson has been completed. All searches have returned clear results.",
            dateCreated: "2025-04-05",
            isRead: false,
            fromClient: false,
          },
          {
            messageGuid: "msg-d4e5f6g7-h8i9-j0k1-l2m3",
            clientGuid: "c1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
            orderGuid: "ord-c3d4e5f6-g7h8-i9j0-k1l2",
            applicantGuid: "c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8",
            subject: "Credit check issue",
            content:
              "There is an issue with the credit check for Michael Chen. Please have the applicant provide authorization for this search.",
            dateCreated: "2025-04-06",
            isRead: false,
            fromClient: false,
          },
        ]

        setMessages(mockMessages)
      } catch (error) {
        console.error("Error fetching messages:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [])

  // Filter messages based on search term and read status
  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesReadStatus =
      isReadFilter === "all" ||
      (isReadFilter === "read" && message.isRead) ||
      (isReadFilter === "unread" && !message.isRead)

    return matchesSearch && matchesReadStatus
  })

  // View message details
  const viewMessage = (message: Message) => {
    setSelectedMessage(message)
    setIsViewMessageOpen(true)

    // Mark as read if not already
    if (!message.isRead) {
      const updatedMessages = messages.map((m) => (m.messageGuid === message.messageGuid ? { ...m, isRead: true } : m))
      setMessages(updatedMessages)
    }
  }

  // Send a new message
  const sendMessage = () => {
    // In a real app, this would be an API call
    // const response = await fetch('/api/clients/{clientGuid}/messages', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(newMessage)
    // })

    // For now, just add to the local state
    const newMessageObj: Message = {
      messageGuid: `msg-new-${Date.now()}`,
      clientGuid: "c1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
      orderGuid: newMessage.orderGuid || undefined,
      applicantGuid: newMessage.applicantGuid || undefined,
      subject: newMessage.subject,
      content: newMessage.content,
      dateCreated: new Date().toISOString().split("T")[0],
      isRead: true,
      fromClient: true,
    }

    setMessages([newMessageObj, ...messages])
    setIsNewMessageOpen(false)
    setNewMessage({
      subject: "",
      content: "",
      orderGuid: "",
      applicantGuid: "",
    })
  }

  // Add reference to message
  const addReference = (type: "order" | "applicant", id: string) => {
    let referenceText = ""

    if (type === "order") {
      const order = mockOrders.find((o) => o.orderGuid === id)
      if (order) {
        referenceText = `Order ID: ${id}\nReference: ${order.reference}\nApplicant: ${order.applicantName}\n\n`
      }
    } else if (type === "applicant") {
      const applicant = mockApplicants.find((a) => a.applicantGuid === id)
      if (applicant) {
        referenceText = `Applicant ID: ${id}\nApplicant Name: ${applicant.name}\n\n`
      }
    }

    setNewMessage({
      ...newMessage,
      content: newMessage.content + referenceText,
      orderGuid: type === "order" ? id : newMessage.orderGuid,
      applicantGuid: type === "applicant" ? id : newMessage.applicantGuid,
    })

    setIsReferenceDialogOpen(false)
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <Skeleton className="h-10 w-[150px] mb-2" />
          <Skeleton className="h-5 w-[350px]" />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <Skeleton className="h-10 w-[250px]" />
            <Skeleton className="h-10 w-[150px]" />
          </div>
          <Skeleton className="h-10 w-[120px]" />
        </div>
        <Skeleton className="h-10 w-[400px]" />
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">View and manage your communication with Reference Services Inc.</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-[250px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-full"
            />
          </div>
          <Select value={isReadFilter} onValueChange={setIsReadFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Messages</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Dialog open={isNewMessageOpen} onOpenChange={setIsNewMessageOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Message
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>New Message</DialogTitle>
              <DialogDescription>Send a message to Reference Services Inc.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={newMessage.subject}
                  onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                  placeholder="Message subject"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="content">Message</Label>
                  <Button variant="outline" size="sm" onClick={() => setIsReferenceDialogOpen(true)}>
                    <FileText className="h-3.5 w-3.5 mr-1" /> Add Reference
                  </Button>
                </div>
                <Textarea
                  id="content"
                  value={newMessage.content}
                  onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                  placeholder="Type your message here..."
                  rows={5}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewMessageOpen(false)}>
                Cancel
              </Button>
              <Button onClick={sendMessage} disabled={!newMessage.subject || !newMessage.content}>
                <Send className="mr-2 h-4 w-4" /> Send Message
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Reference Selection Dialog */}
        <Dialog open={isReferenceDialogOpen} onOpenChange={setIsReferenceDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Reference</DialogTitle>
              <DialogDescription>Select an order or applicant to reference in your message</DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="orders">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="applicants">Applicants</TabsTrigger>
              </TabsList>
              <TabsContent value="orders" className="mt-4">
                <div className="space-y-2">
                  {mockOrders.map((order) => (
                    <div
                      key={order.orderGuid}
                      className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50 cursor-pointer"
                      onClick={() => addReference("order", order.orderGuid)}
                    >
                      <div>
                        <div className="font-medium text-sm">{order.reference}</div>
                        <div className="text-xs text-muted-foreground">{order.applicantName}</div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="applicants" className="mt-4">
                <div className="space-y-2">
                  {mockApplicants.map((applicant) => (
                    <div
                      key={applicant.applicantGuid}
                      className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50 cursor-pointer"
                      onClick={() => addReference("applicant", applicant.applicantGuid)}
                    >
                      <div className="font-medium text-sm">{applicant.name}</div>
                      <Button variant="ghost" size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsReferenceDialogOpen(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="inbox" className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2">
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
        </TabsList>
        <TabsContent value="inbox" className="mt-4">
          <Card>
            <CardContent className="p-6">
              {filteredMessages.filter((m) => !m.fromClient).length > 0 ? (
                <div className="space-y-4">
                  {filteredMessages
                    .filter((m) => !m.fromClient)
                    .map((message) => (
                      <div
                        key={message.messageGuid}
                        className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${
                          message.isRead ? "bg-background" : "bg-blue-50"
                        }`}
                        onClick={() => viewMessage(message)}
                      >
                        <div className="flex-shrink-0">
                          {message.isRead ? (
                            <MailOpen className="h-6 w-6 text-muted-foreground" />
                          ) : (
                            <Mail className="h-6 w-6 text-blue-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h3 className={`text-sm font-medium ${!message.isRead && "font-semibold"}`}>
                              {message.subject}
                            </h3>
                            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                              {new Date(message.dateCreated).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{message.content}</p>
                          {(message.orderGuid || message.applicantGuid) && (
                            <div className="flex gap-2 mt-2">
                              {message.orderGuid && (
                                <Badge variant="outline" className="text-xs">
                                  Order: {message.orderGuid.substring(0, 8)}...
                                </Badge>
                              )}
                              {message.applicantGuid && (
                                <Badge variant="outline" className="text-xs">
                                  Applicant: {message.applicantGuid.substring(0, 8)}...
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No messages found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm || isReadFilter !== "all"
                      ? "No messages match your current filters."
                      : "Your inbox is empty."}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sent" className="mt-4">
          <Card>
            <CardContent className="p-6">
              {filteredMessages.filter((m) => m.fromClient).length > 0 ? (
                <div className="space-y-4">
                  {filteredMessages
                    .filter((m) => m.fromClient)
                    .map((message) => (
                      <div
                        key={message.messageGuid}
                        className="flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-colors bg-background"
                        onClick={() => viewMessage(message)}
                      >
                        <div className="flex-shrink-0">
                          <Send className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h3 className="text-sm font-medium">{message.subject}</h3>
                            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                              {new Date(message.dateCreated).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{message.content}</p>
                          {(message.orderGuid || message.applicantGuid) && (
                            <div className="flex gap-2 mt-2">
                              {message.orderGuid && (
                                <Badge variant="outline" className="text-xs">
                                  Order: {message.orderGuid.substring(0, 8)}...
                                </Badge>
                              )}
                              {message.applicantGuid && (
                                <Badge variant="outline" className="text-xs">
                                  Applicant: {message.applicantGuid.substring(0, 8)}...
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Send className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No sent messages</h3>
                  <p className="text-muted-foreground">
                    {searchTerm || isReadFilter !== "all"
                      ? "No messages match your current filters."
                      : "You haven't sent any messages yet."}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Message Dialog */}
      <Dialog open={isViewMessageOpen} onOpenChange={setIsViewMessageOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedMessage && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle>{selectedMessage.subject}</DialogTitle>
                  <Badge variant={selectedMessage.fromClient ? "outline" : "secondary"}>
                    {selectedMessage.fromClient ? "Sent" : "Received"}
                  </Badge>
                </div>
                <DialogDescription className="flex items-center justify-between">
                  <span>{new Date(selectedMessage.dateCreated).toLocaleDateString()}</span>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs">
                    <Clock className="h-3.5 w-3.5" />
                    {new Date(selectedMessage.dateCreated).toLocaleTimeString()}
                  </div>
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="rounded-lg border p-4 bg-muted/30">
                  <p className="whitespace-pre-line">{selectedMessage.content}</p>
                </div>

                {(selectedMessage.orderGuid || selectedMessage.applicantGuid) && (
                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Related Information</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMessage.orderGuid && (
                        <Badge variant="outline">Order ID: {selectedMessage.orderGuid}</Badge>
                      )}
                      {selectedMessage.applicantGuid && (
                        <Badge variant="outline">Applicant ID: {selectedMessage.applicantGuid}</Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter className="flex justify-between sm:justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setIsViewMessageOpen(false)}>
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </div>
                {!selectedMessage.fromClient && (
                  <Button
                    size="sm"
                    onClick={() => {
                      setIsViewMessageOpen(false)
                      setIsNewMessageOpen(true)
                      setNewMessage({
                        subject: `Re: ${selectedMessage.subject}`,
                        content: "",
                        orderGuid: selectedMessage.orderGuid || "",
                        applicantGuid: selectedMessage.applicantGuid || "",
                      })
                    }}
                  >
                    <Send className="h-4 w-4 mr-1" /> Reply
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
