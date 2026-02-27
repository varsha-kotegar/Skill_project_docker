export interface Event {
    id: string
    title: string
    date: string
    time: string
    location: string
    description: string
    fullDescription: string
    category: string
    capacity: number
    registered: number
    image: string
}

export interface Registration {
    id: string
    eventId: string
    name: string
    usn: string
    email: string
    phone: string
    registeredAt: string
}

// In Next.js Server Components running in Docker, the API is available at http://backend:5000/api
// On the client browser, requests simply go to /api
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || (typeof window === 'undefined' ? "http://backend:5000/api" : "/api");

export async function getAllEvents(): Promise<Event[]> {
    try {
        const res = await fetch(`${API_BASE_URL}/events`, { cache: 'no-store' });
        if (!res.ok) return [];
        return res.json();
    } catch (err) {
        console.error("Fetch all events error:", err);
        return [];
    }
}

export async function getEventById(id: string): Promise<Event | undefined> {
    try {
        const res = await fetch(`${API_BASE_URL}/events/${id}`, { cache: 'no-store' });
        if (!res.ok) return undefined;
        return res.json();
    } catch (err) {
        console.error("Fetch event error:", err);
        return undefined;
    }
}
