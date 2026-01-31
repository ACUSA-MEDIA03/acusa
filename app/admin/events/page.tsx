"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import EventCard from "@/components/card/EventCard";
import { Button } from "@/components/ui/button";
import { Calendar, Pencil, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { toast } from "sonner";

interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  startDateTime: string;
  published: boolean;
  createdBy: {
    name: string;
    email: string;
  };
}

export default function EventsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
    location: "",
    published: false,
  });

  // Fetch events
  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/admin/events");

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      setEvents(data.publications || data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load events");
      setLoading(false);
    }
  };

  // Handle submit event logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      // Determine if we're editing or creating
      const url = editingEvent
        ? `/api/admin/events/${editingEvent.id}`
        : "/api/admin/events";

      const method = editingEvent ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          location: formData.location,
          eventDate: formData.date, // API expects 'eventDate'
          time: formData.time,
          published: formData.published,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save event");
      }

      // Success! Reset form and refresh events
      resetForm();
      fetchEvents();

      // Show success message
      toast.success(
        editingEvent
          ? "Event updated successfully!"
          : "Event created successfully!"
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to submit an event");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      description: "",
      time: "",
      location: "",
      published: false,
    });
    setEditingEvent(null);
    setShowForm(false);
  };

  // Handle edit
  const handleEdit = (event: Event) => {
    // Convert ISO datetime to date and time inputs
    const startDate = new Date(event.startDateTime);
    const date = startDate.toISOString().split("T")[0];
    const time = startDate.toTimeString().slice(0, 5);

    setFormData({
      title: event.title,
      description: event.description || "",
      location: event.location,
      date: date,
      time: time,
      published: event.published,
    });
    setEditingEvent(event);
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    toast.error("Are you sure you want to delete this event?", {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            const res = await fetch(`/api/admin/events/${id}`, {
              method: "DELETE",
            });

            if (!res.ok) {
              throw new Error("Failed to delete");
            }

            // Update UI
            setEvents((prev) => prev.filter((event) => event.id !== id));
            toast.success("Event deleted successfully!");
          } catch (error) {
            console.error(error);
            toast.error("Failed to delete event");
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {
          toast.dismiss();
        },
      },
    });
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/signin");
    }
  }, [status, router]);

  // Fetch events
  useEffect(() => {
    if (status === "authenticated") {
      fetchEvents();
    }
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-main"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Events Management
              </h1>
              <p className="text-slate-600">
                Create and manage your upcoming events
              </p>
            </div>
            {!showForm && (
              <Button
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
                className="bg-main hover:bg-main/90 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Event
              </Button>
            )}
          </div>
        </div>

        {/* Form Section */}
        {showForm && (
          <Card className="mb-8 animate-in fade-in slide-in-from-top-4 duration-300 shadow-xl">
            <CardHeader className="bg-main">
              <CardTitle className="text-2xl text-white">
                {editingEvent ? "Edit Event" : "Create New Event"}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Alert */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-sm font-medium">{error}</p>
                  </div>
                )}

                {/* Title Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="title"
                    className="block text-sm font-semibold text-main"
                  >
                    Event Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Enter event title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    disabled={submitting}
                    className="w-full px-4 py-3 border border-par rounded-lg focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-200 disabled:bg-slate-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Date and Time Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="date"
                      className="block text-sm font-semibold text-main"
                    >
                      Date <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      required
                      disabled={submitting}
                      className="w-full px-4 py-3 border border-par rounded-lg focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-200 disabled:bg-slate-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="time"
                      className="block text-sm font-semibold text-main"
                    >
                      Time <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                      }
                      required
                      disabled={submitting}
                      className="w-full px-4 py-3 border border-par rounded-lg focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-200 disabled:bg-slate-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Location Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="location"
                    className="block text-sm font-semibold text-main"
                  >
                    Location <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="Enter event location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    required
                    disabled={submitting}
                    className="w-full px-4 py-3 border border-par rounded-lg focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-200 disabled:bg-slate-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Description Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="block text-sm font-semibold text-main"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Enter event description (optional)"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={4}
                    disabled={submitting}
                    className="w-full px-4 py-3 border border-par rounded-lg focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-200 resize-y disabled:bg-par/50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Published Checkbox */}
                <div className="flex items-center space-x-3 p-4">
                  <Checkbox
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked: CheckedState) =>
                      setFormData({
                        ...formData,
                        published: checked as boolean,
                      })
                    }
                    disabled={submitting}
                    className="h-5 w-5 border-par data-[state=checked]:bg-main data-[state=checked]:border-main"
                  />
                  <Label
                    htmlFor="published"
                    className="text-sm font-medium text-main cursor-pointer"
                  >
                    Publish immediately (visible to public)
                  </Label>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 sm:flex-none bg-main hover:bg-main/90 focus:ring-4 focus:ring-purple-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    {submitting
                      ? "Saving..."
                      : editingEvent
                        ? "Update Event"
                        : "Create Event"}
                  </Button>
                  <Button
                    type="button"
                    onClick={resetForm}
                    variant="outline"
                    disabled={submitting}
                    className="flex-1 sm:flex-none border-2 transition-all duration-200"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Events List Section */}
        {!showForm && (
          <>
            {events.length === 0 ? (
              <Card className="shadow-xl">
                <CardContent className="flex flex-col items-center justify-center py-16 px-6">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <Calendar className="w-10 h-10 text-main" />
                  </div>
                  <h3 className="text-xl font-semibold text-par mb-2">
                    No events yet
                  </h3>
                  <p className="text-par mb-6 text-center max-w-md">
                    Get started by creating your first event
                  </p>
                  <Button
                    onClick={() => setShowForm(true)}
                    className="bg-main hover:bg-main/90 transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create your first event
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {events.map((event) => (
                  <EventCard
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    location={event.location}
                    startDateTime={event.startDateTime}
                    description={event.description}
                    createdBy={event.createdBy}
                    published={event.published}
                    actions={
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(event)}
                          className="bg-slate-100 hover:bg-slate-200"
                        >
                          <Pencil className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(event.id)}
                          className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    }
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}