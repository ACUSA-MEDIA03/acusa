"use client";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Animation from "@/assets/Animation/animation.gif"
// import { Events } from "@/assets/data/Events";
import EventCards from "@/components/Card/EventCards";
import { Button } from "@/components/ui/button";

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

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/admin/events');

      if (!response.ok) {
        throw new Error("Failed to fetch events")
      }

      const data = await response.json();
      setEvents(data.publications || data);
      setLoading(false)
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to load events");
      setLoading(false);
    }
  }
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchEvents();
    }
  }, [status]);
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  if (session.user.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-main">Account Pending</h1>
          <p className="mt-2 text-sub">
            Thanks for registering! An admin must verify your account before you can access the dashboard.
          </p>
          <p className="mb-4 text-sub">
            You will be redirected to the login page.
          </p>

          <Button onClick={() => signOut({ callbackUrl: "/admin/signin" })}>
            Sign out
          </Button>
        </div>
      </div>
    );
  }




  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={() => signOut({ callbackUrl: "/admin" })}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Good {new Date().getHours() < 12 ? "Morning" : "Evening"}, {session.user.name}!
          </h2>
          <p className="text-gray-600">Email: {session.user.email}</p>
          <p className="text-gray-600">Role: {session.user.role}</p>
          <p className="text-gray-600">ID: {session.user.id}</p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Events
            </h3>
            <p className="text-gray-600 mb-4">Manage campus events</p>
            {/* <p>{ session.event}</p> */}

          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Publications
            </h3>
            <p className="text-gray-600 mb-4">
              Manage articles, newsletters, and more
            </p>
            <a
              href="/admin/publications"
              className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              View Publications
            </a>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Feedback
            </h3>
            <p className="text-gray-600 mb-4">View student feedback</p>
            <a
              href="/admin/feedback"
              className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              View Feedback
            </a>
          </div>
        </div>
      </main>


      {/* Events */}
      <div className="lg:grid-cols-5 lg:grid lg:p-10 gap-4 p-5">
        <div className="lg:col-span-3 flex-col flex justify-center items-left lg:p-5 space-y-7">
          <div className="">
            <b className="font-rubik lg:text-[56px] text-[40px] text-main">
              Upcoming Events{" "}
            </b>
            <p className="font-grotesk font-light lg:text-[25px] text-[15px]">
              These is the schedule of events coming up in school
            </p>
          </div>

          {/* Event Card */}
          <div className="grid gap-7">
            {events.slice(0, 1).map((event) => {
              return (
                <EventCards
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  location={event.location}
                  startDateTime={event.startDateTime}
                  description={event.description}
                />
              );
            })}
          </div>
          {/* Event Card */}
        </div>

        <div className="lg:col-span-2 lg:grid  place-content-center lg:mt-0 mt-5">
          <Image src={Animation} alt="Calendar Animation" className="lg:w-162.5" unoptimized />
        </div>
      </div>
    </div>
  );
}