import { notFound } from "next/navigation"
import { getEventById } from "@/lib/api"
import { EventDetailView } from "@/components/event-detail-view"

export const dynamic = "force-dynamic"

interface EventDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function EventPage({
  params,
}: {
  params: { id: string }
}) {
  const resolvedParams = await params
  const event = await getEventById(resolvedParams.id)

  if (!event) {
    notFound()
  }

  return <EventDetailView event={event} />
}
