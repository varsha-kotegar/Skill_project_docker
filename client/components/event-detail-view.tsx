"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Event } from "@/lib/api"

interface EventDetailViewProps {
  event: Event
}

export function EventDetailView({ event }: EventDetailViewProps) {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">(
    "idle"
  )
  const [formData, setFormData] = useState({
    name: "",
    usn: "",
    email: "",
    phone: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("submitting")

    try {
      // POST to the /api/register route
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, eventId: event.id }),
      })

      if (res.ok) {
        setFormState("success")
        setFormData({ name: "", usn: "", email: "", phone: "" })
      } else {
        setFormState("idle")
      }
    } catch {
      setFormState("idle")
    }
  }

  const spotsLeft = event.capacity - event.registered
  const isFull = spotsLeft <= 0

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      {/* Back button */}
      <Link
        href="/events"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Events
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Event details (left) */}
        <div className="lg:col-span-2">
          <div className="relative mb-6 h-64 overflow-hidden rounded-xl md:h-80">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-foreground/30" />
            <div className="absolute bottom-4 left-4">
              <Badge className="bg-primary text-primary-foreground">
                {event.category}
              </Badge>
            </div>
          </div>

          <h1 className="mb-4 text-3xl font-bold text-foreground">
            {event.title}
          </h1>

          <div className="mb-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarDays className="size-4 text-primary" />
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-primary" />
              {event.time}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" />
              {event.location}
            </div>
            <div className="flex items-center gap-2">
              <Users className="size-4 text-primary" />
              {event.registered}/{event.capacity} registered
            </div>
          </div>

          <div className="prose prose-sm max-w-none">
            <p className="leading-relaxed text-foreground">
              {event.fullDescription}
            </p>
          </div>
        </div>

        {/* Registration form (right sidebar) */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Register for this Event</CardTitle>
              {isFull ? (
                <p className="text-sm text-destructive">
                  This event is fully booked.
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {spotsLeft} spots remaining
                </p>
              )}
            </CardHeader>
            <CardContent>
              {formState === "success" ? (
                <div className="flex flex-col items-center gap-3 py-6 text-center">
                  <CheckCircle2 className="size-12 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">
                    Registration Successful!
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    You have been registered for {event.title}. Check your email
                    for confirmation details.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setFormState("idle")}
                    className="mt-2"
                  >
                    Register Another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="usn">USN (University Seat Number)</Label>
                    <Input
                      id="usn"
                      required
                      placeholder="1MS21CS001"
                      value={formData.usn}
                      onChange={(e) =>
                        setFormData({ ...formData, usn: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="you@campus.edu"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={formState === "submitting" || isFull}
                  >
                    {formState === "submitting"
                      ? "Registering..."
                      : isFull
                        ? "Event Full"
                        : "Register Now"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
