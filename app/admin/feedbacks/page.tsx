"use client"


import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Trash2, Check, Mail, User } from "lucide-react"
import { useState, useEffect } from "react"

interface Feedback {
  id: string
  name: string
  email: string
  message: string
  isAnonymous: boolean
  createdAt: string
  status: "unread" | "read"
}

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "unread" | "read">("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    // loadFeedbacks()
  }, [])

  const loadFeedbacks = () => {
    const storedFeedback = localStorage.getItem("feedback")
    if (storedFeedback) {
      const parsed = JSON.parse(storedFeedback)
      // Sort by newest first
      const sorted = parsed.sort(
        (a: Feedback, b: Feedback) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      setFeedbacks(sorted)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this feedback?")) {
      const updated = feedbacks.filter((f) => f.id !== id)
      localStorage.setItem("feedback", JSON.stringify(updated))
      setFeedbacks(updated)
    }
  }

  const handleMarkAsRead = (id: string) => {
    const updated = feedbacks.map((f) => (f.id === id ? { ...f, status: "read" as const } : f))
    localStorage.setItem("feedback", JSON.stringify(updated))
    setFeedbacks(updated)
  }

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    // Filter by status
    if (filterStatus !== "all" && feedback.status !== filterStatus) {
      return false
    }

    // Filter by search query (name, email, message)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      return (
        feedback.name.toLowerCase().includes(query) ||
        feedback.email.toLowerCase().includes(query) ||
        feedback.message.toLowerCase().includes(query)
      )
    }

    return true
  })

  const stats = {
    total: feedbacks.length,
    unread: feedbacks.filter((f) => f.status === "unread").length,
    anonymous: feedbacks.filter((f) => f.isAnonymous).length,
  }

  return (
  
        <div className="space-y-6 mt-20 font-mono">
          <div>
            <h1 className="text-3xl font-bold text-main">Student Feedback</h1>
            <p className="text-black mt-1">View and manage feedback submissions from students</p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-black">Total Feedback</p>
                    <p className="text-2xl font-bold mt-2">{stats.total}</p>
                  </div>
                  <div className="p-3 rounded-full bg-blue-50">
                    <MessageCircle className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Unread</p>
                    <p className="text-2xl font-bold mt-2 text-orange-600">{stats.unread}</p>
                  </div>
                  <div className="p-3 rounded-full bg-orange-50">
                    <Mail className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Anonymous</p>
                    <p className="text-2xl font-bold mt-2 text-purple-600">{stats.anonymous}</p>
                  </div>
                  <div className="p-3 rounded-full bg-purple-50">
                    <User className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filter and Search */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <Input
                placeholder="Search by name, email, or message..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {(["all", "unread", "read"] as const).map((status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? "default" : "outline"}
                  onClick={() => setFilterStatus(status)}
                  size="sm"
                >
                  {status === "all" && "All"}
                  {status === "unread" && "Unread"}
                  {status === "read" && "Read"}
                </Button>
              ))}
            </div>
          </div>

          {/* Feedback List */}
          <div className="space-y-3">
            {filteredFeedbacks.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <MessageCircle className="w-12 h-12 text-slate-300 mb-3" />
                  <p className="text-slate-600 mb-4">
                    {feedbacks.length === 0 ? "No feedback submissions yet" : "No feedback matches your search"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredFeedbacks.map((feedback) => (
                <Card key={feedback.id} className={feedback.status === "unread" ? "border-blue-200 bg-blue-50" : ""}>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      {/* Header with status badge */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {feedback.isAnonymous ? (
                              <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                                Anonymous
                              </span>
                            ) : (
                              <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                                Named
                              </span>
                            )}
                            {feedback.status === "unread" && (
                              <span className="text-xs font-medium px-2 py-1 rounded-full bg-orange-100 text-orange-700">
                                Unread
                              </span>
                            )}
                          </div>
                          <h3 className="font-semibold text-slate-900">{feedback.name}</h3>
                          {!feedback.isAnonymous && feedback.email && (
                            <p className="text-sm text-slate-600 flex items-center gap-1 mt-1">
                              <Mail className="w-4 h-4" />
                              {feedback.email}
                            </p>
                          )}
                        </div>

                        {/* Delete Button */}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(feedback.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Timestamp */}
                      <p className="text-xs text-slate-500">
                        {new Date(feedback.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        at{" "}
                        {new Date(feedback.createdAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>

                      {/* Message Preview / Full */}
                      <div>
                        {expandedId === feedback.id ? (
                          <p className="text-slate-700 whitespace-pre-wrap wrap-break-word">{feedback.message}</p>
                        ) : (
                          <p className="text-slate-700 line-clamp-2">{feedback.message}</p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        {feedback.message.length > 150 && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setExpandedId(expandedId === feedback.id ? null : feedback.id)}
                          >
                            {expandedId === feedback.id ? "Show Less" : "Show More"}
                          </Button>
                        )}
                        {feedback.status === "unread" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleMarkAsRead(feedback.id)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Mark as Read
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
    
  )
}
