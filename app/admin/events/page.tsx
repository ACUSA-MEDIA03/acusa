"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import EventCard from "@/components/Card/EventCard";
import { Button } from "@/components/ui/button";
import { Calendar, Pencil, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

export default function AdminEventsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
    location: "",
  })
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

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/admin/events");
      
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      setEvents(data.publications || data); // Handle both response formats
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load events");
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ title: "", date: "", description: "", time: "", location: "" })
    setEditingEvent(null);
    setShowForm(false);
  }
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
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
<div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-mono text-main">Events</h1>
              <p className="text-slate-600 mt-1">Manage your upcoming events</p>
            </div>

          {!showForm && (
            <Button
            className="px-6 py-3 bg-main  rounded-lg hover:bg-main-900 transition text-white font-mono" onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4 mr-2" /> Add Event
            </Button>
          )}
        </div>

        {/*  Form Field  Section*/}
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sub">{ editingEvent ? "Edit Event" : "Create New Event "}</CardTitle>
            </CardHeader>

            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sub font-mono">Event Title</Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Enter Event Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required/>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sub font-mono">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    placeholder="Input event date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required/>
                </div>
                  <div className="space-y-2">
                  <Label htmlFor="date" className="text-sub font-mono">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    placeholder="Input event time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required/>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sub font-mono">Location</Label>
                  <Input
                    id="location"
                    placeholder="Enter event location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>


                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sub font-mono">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter event description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    required
                  />
                </div>



                <div className=" flex gap-2 ">
                  <Button type="submit" className="bg-main font-mono">
                    {editingEvent ? "Update Event": "Create Event"}
                  </Button>
                  
                  <Button type="button" variant="outline" className="text-sub font-mono"
                  onClick={resetForm}> Cancel
                    </Button>
                </div>
              </form>
            </CardContent>
          </Card>
)}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="grid gap-4 ">
          {events.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 ">
                <Calendar className=" w-12 h-12 bg-sub mb-3" />
                <p className="text-sub mb-4 font-mono">No Events created yet</p>
                <Button onClick={() => setShowForm(true)}>
                  <Plus  className="w-4 h-4 mr-2"/>
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
                  actions={(
                    <>
                      <Button size="sm" variant="outline"
                      >
                        <Pencil className="w-4 h-4 " />
                      </Button>
                      <Button variant="destructive" size="sm"
                        // onClick={() => handleDelete(event.id)}
                      >
                        <Trash2  className="w-4 h-4 "/>
                      </Button>
                    </>
                  )}
                />
              ))
          )}
        </div>
      </div>
    </div>
  
  
);
}
