"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import EventCard from "@/components/card/eventcard";
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

      // Show success message (optional)
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
    if (!confirm("Are you sure you want to delete this event?")) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/events/${id}`, {
        // Fixed template literal
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
      alert("Failed to delete event");
    }
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className=" spaced-y-6 mt-20 font-mono">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-mono text-main">Events</h1>
            <p className="text-slate-600 mt-1">Manage your upcoming events</p>
          </div>

          {!showForm && (
            <Button
              type="button"
              className="px-6 py-3 bg-main rounded-lg hover:bg-main-900 transition text-white font-mono z-20"
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
            >
              <Plus className="w-4 h-4 mr-2" /> Add Event
            </Button>
          )}
        </div>

        {/* Form Field Section */}
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-sub">
                {editingEvent ? "Edit Event" : "Create New Event"}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sub font-mono">
                    Event Title *
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Enter Event Title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-sub font-mono">
                      Date *
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      placeholder="Input event date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      required
                      disabled={submitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-sub font-mono">
                      Time *
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      placeholder="Input event time"
                      value={formData.time}
                      onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                      }
                      required
                      disabled={submitting}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sub font-mono">
                    Location *
                  </Label>
                  <Input
                    id="location"
                    placeholder="Enter event location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sub font-mono">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Enter event description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={4}
                    disabled={submitting}
                  />
                </div>

                <div className="flex items-center space-x-2">
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
                  />
                  <Label
                    htmlFor="published"
                    className="text-sub font-mono cursor-pointer"
                  >
                    Publish immediately (visible to public)
                  </Label>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    type="submit"
                    className="bg-main font-mono"
                    disabled={submitting}
                  >
                    {submitting
                      ? "Saving..."
                      : editingEvent
                      ? "Update Event"
                      : "Create Event"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="text-sub font-mono"
                    onClick={resetForm}
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Events List */}
        <div className="grid gap-4">
          {events.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="w-12 h-12 text-sub mb-3" />
                <p className="text-sub mb-4 font-mono">No Events created yet</p>
                <Button type="button" onClick={() => setShowForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create your first event
                </Button>
              </CardContent>
            </Card>
          ) : (
            events.map((event) => (
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
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(event)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(event.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </>
                }
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
