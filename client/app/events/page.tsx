import { getAllEvents } from "@/lib/api"
import { EventGrid } from "@/components/event-grid"

export const dynamic = "force-dynamic"

export default async function EventsPage() {
  const events = await getAllEvents()

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground">Upcoming Events</h1>
        <p className="mt-2 text-muted-foreground">
          Browse and register for campus events happening soon.
        </p>
      </div>
      <EventGrid events={events} />
    </div>
  )
}
