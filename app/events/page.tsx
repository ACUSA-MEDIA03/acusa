import EventCards from "@/components/Card/EventCards"
import Navbar from "@/components/Navbar"
interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  startDateTime: string;
}

async function getPublicEvents() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events`, {
    cache: 'no-store', // Always get fresh data
  });

  if (!res.ok) {
    throw new Error('Failed to fetch events');
  }

  return res.json();
}

export default async function EventsPage() {
  const events: Event[] = await getPublicEvents();

    return (
        <>
         <Navbar />
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Upcoming Events</h1>

        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No upcoming events at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        )}
      </div>
    </div></>
  );
}