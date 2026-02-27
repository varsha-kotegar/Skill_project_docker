import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CalendarDays, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  { icon: CalendarDays, label: "Events This Year", value: "120+" },
  { icon: Users, label: "Active Students", value: "5,000+" },
  { icon: MapPin, label: "Campus Venues", value: "25+" },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-campus.jpg"
            alt="Campus event atmosphere"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-36">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground/80">
              Campus Events Platform
            </p>
            <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
              Discover & Register for Campus Events
            </h1>
            <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-primary-foreground/80">
              Your one-stop platform for exploring university events, registering
              with ease, and staying connected with campus life.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/events">
                <Button size="lg" className="gap-2">
                  View Events <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link href="/admin">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
                >
                  Admin Portal
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {stats.map((stat) => (
              <Card
                key={stat.label}
                className="border-0 bg-secondary/50 shadow-none"
              >
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <stat.icon className="size-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-balance text-3xl font-bold text-foreground">
              Everything You Need for Campus Events
            </h2>
            <p className="mt-3 text-muted-foreground">
              From discovery to registration, we make it seamless.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "Browse Events",
                desc: "Explore a curated list of upcoming campus events across all departments and categories.",
              },
              {
                title: "Quick Registration",
                desc: "Register for events in seconds with a simple form. No complex sign-ups required.",
              },
              {
                title: "Admin Dashboard",
                desc: "Event organizers can create, manage events, and track registrations effortlessly.",
              },
            ].map((feature) => (
              <Card
                key={feature.title}
                className="border bg-card shadow-sm transition-shadow hover:shadow-md"
              >
                <CardContent className="p-6">
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-primary">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center lg:px-8">
          <h2 className="text-balance text-3xl font-bold text-primary-foreground">
            Ready to explore campus events?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-primary-foreground/80">
            Browse upcoming events and register today. It only takes a few seconds.
          </p>
          <Link href="/events" className="mt-8 inline-block">
            <Button
              size="lg"
              className="gap-2 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              Explore All Events <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
