import Link from "next/link"
import { Calendar } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-10 md:flex-row md:justify-between lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <Calendar className="size-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">EventSphere</span>
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <Link href="/events" className="transition-colors hover:text-foreground">
            Events
          </Link>
          <Link href="/admin" className="transition-colors hover:text-foreground">
            Admin
          </Link>
        </div>

        <p className="text-sm text-muted-foreground">
          {"© 2026 EventSphere. All rights reserved."}
        </p>
      </div>
    </footer>
  )
}
