import EventCards from "@/components/card/EventCards";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Calendar, MapPin, Clock } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  startDateTime: string;
}

async function getPublicEvents() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events`, {
    cache: "no-store", // Always get fresh data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  return res.json();
}

export default async function EventsPage() {
  const events: Event[] = await getPublicEvents();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#0C1657] to-[#0C1657]/90 text-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
                <Calendar className="w-8 h-8 text-sub" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 font-grotesk">
                Upcoming Events
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto font-[family-name:var(--font-mont)]">
                Join us for exciting events and connect with the ACUSA community
              </p>
              
              {/* Stats */}
              <div className="mt-8 flex flex-wrap justify-center gap-6 sm:gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-sub">
                    {events.length}
                  </div>
                  <div className="text-sm text-blue-100 mt-1">
                    {events.length === 1 ? "Event" : "Events"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-sub">
                    <Calendar className="w-8 h-8 mx-auto" />
                  </div>
                  <div className="text-sm text-blue-100 mt-1">This Session</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-sub">
                    <MapPin className="w-8 h-8 mx-auto" />
                  </div>
                  <div className="text-sm text-blue-100 mt-1">Multiple Locations</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Events Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {events.length === 0 ? (
            <div className="text-center py-16 sm:py-20">
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-12 sm:p-16 max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-[#0C1657] to-[#0C1657]/80 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-10 h-10 text-sub" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0C1657] mb-4 font-[family-name:var(--font-grotesk)]">
                  No Upcoming Events
                </h2>
                <p className="text-[#808080] text-lg mb-6 font-[family-name:var(--font-mont)]">
                  We don&apos;t have any events scheduled at the moment, but check
                  back soon! We&apos;re always planning exciting new events for our
                  community.
                </p>
                <div className="inline-flex items-center gap-2 text-sm text-[#0C1657] bg-blue-50 px-4 py-2 rounded-full">
                  <Clock className="w-4 h-4" />
                  Stay tuned for updates
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Section Header */}
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0C1657] mb-2 font-[family-name:var(--font-grotesk)]">
                  All Events
                </h2>
                <p className="text-[#808080] font-[family-name:var(--font-mont)]">
                  Discover and join our upcoming events
                </p>
              </div>

              {/* Events Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <EventCards
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    location={event.location}
                    startDateTime={event.startDateTime}
                    description={event.description}
                  />
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="mt-12 text-center">
                <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-[#0C1657] to-[#0C1657]/90 text-white px-8 py-6 rounded-2xl shadow-lg">
                  <Calendar className="w-8 h-8 text-sub" />
                  <div className="text-center sm:text-left">
                    <p className="font-semibold text-lg">
                      Don&apos;t miss out on any events!
                    </p>
                    <p className="text-sm text-blue-100">
                      Follow us on social media to stay updated
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Decorative Background Elements */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-20 right-10 w-72 h-72 bg-sub/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#0C1657]/5 rounded-full blur-3xl"></div>
        </div>
      </div>

      <Footer />
    </>
  );
}