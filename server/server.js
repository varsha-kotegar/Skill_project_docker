const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// =============================================================================
// Data Layer (In-memory for Database simulation)
// =============================================================================
const initialEvents = [
    {
        id: "evt-001",
        title: "Annual Tech Symposium 2026",
        date: "2026-03-15",
        time: "10:00 AM",
        location: "Main Auditorium, Block A",
        description: "A full-day symposium featuring talks on AI, Cloud Computing, and Cybersecurity.",
        fullDescription: "Join us for the Annual Tech Symposium 2026, a full-day event featuring keynote speakers from leading tech companies. Topics include Artificial Intelligence, Cloud Computing, Cybersecurity, and the future of Web Development. Network with industry professionals and participate in interactive workshops. Lunch and refreshments will be provided.",
        category: "Technology",
        capacity: 300,
        registered: 142,
        image: "/images/hero-campus.jpg",
    },
    {
        id: "evt-002",
        title: "Cultural Fest - Resonance",
        date: "2026-03-22",
        time: "9:00 AM",
        location: "Open Air Theatre",
        description: "Three days of music, dance, drama, and art celebrating campus creativity.",
        fullDescription: "Resonance is our annual cultural extravaganza spanning three days of non-stop entertainment. From classical dance competitions to rock band battles, stand-up comedy to theatrical performances, there's something for everyone. Participate in art exhibitions, photography contests, and creative writing workshops. Special guest performances to be announced soon!",
        category: "Cultural",
        capacity: 500,
        registered: 287,
        image: "/images/hero-campus.jpg",
    },
    // Adding just one more for brevity in the code, or standard 3
    {
        id: "evt-003",
        title: "Hackathon: Code Sprint 5.0",
        date: "2026-04-05",
        time: "8:00 AM",
        location: "CS Lab Complex, Block C",
        description: "24-hour coding marathon with exciting prizes and mentorship opportunities.",
        fullDescription: "Code Sprint 5.0 is a 24-hour hackathon where teams of 2-4 build innovative solutions to real-world problems. Categories include HealthTech, EdTech, FinTech, and Sustainability. Industry mentors will guide you throughout the event. Top 3 teams win cash prizes, internship opportunities, and swag kits. All participants receive certificates and meals.",
        category: "Technology",
        capacity: 200,
        registered: 156,
        image: "/images/hero-campus.jpg",
    }
];

const initialRegistrations = [
    {
        id: "reg-001",
        eventId: "evt-001",
        name: "Priya Sharma",
        usn: "1MS21CS045",
        email: "priya.sharma@campus.edu",
        phone: "9876543210",
        registeredAt: "2026-02-20T10:30:00Z",
    }
];

let events = [...initialEvents];
let registrations = [...initialRegistrations];

// Admin Credentials Verification
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "eventsphere2026";

// =============================================================================
// API Routes
// =============================================================================

// GET /api/events
app.get('/api/events', (req, res) => {
    res.json(events);
});

// POST /api/events (Admin Create)
app.post('/api/events', (req, res) => {
    const data = req.body;
    const newEvent = {
        ...data,
        id: `evt-${Date.now()}`,
        registered: 0,
        image: "/images/hero-campus.jpg",
    };
    events.push(newEvent);
    res.status(201).json(newEvent);
});

// GET /api/events/:id
app.get('/api/events/:id', (req, res) => {
    const event = events.find((e) => e.id === req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
});

// PUT /api/events/:id (Admin Edit)
app.put('/api/events/:id', (req, res) => {
    const index = events.findIndex((e) => e.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Event not found" });

    events[index] = { ...events[index], ...req.body };
    res.json(events[index]);
});

// DELETE /api/events/:id (Admin Delete)
app.delete('/api/events/:id', (req, res) => {
    const initialLength = events.length;
    events = events.filter((e) => e.id !== req.params.id);
    if (events.length < initialLength) {
        res.json({ success: true });
    } else {
        res.status(404).json({ error: "Event not found" });
    }
});

// GET /api/register
app.get('/api/register', (req, res) => {
    res.json(registrations);
});

// POST /api/register (Student Registration)
app.post('/api/register', (req, res) => {
    const { eventId, name, usn, email, phone } = req.body;

    if (!eventId || !name || !usn || !email || !phone) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const event = events.find(e => e.id === eventId);
    if (!event) return res.status(404).json({ error: "Event not found" });
    if (event.registered >= event.capacity) {
        return res.status(400).json({ error: "Event is at full capacity" });
    }

    const newReg = {
        eventId, name, usn, email, phone,
        id: `reg-${Date.now()}`,
        registeredAt: new Date().toISOString(),
    };
    registrations.push(newReg);
    event.registered += 1;

    res.status(201).json(newReg);
});

// POST /api/admin
app.post('/api/admin', (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        res.json({ success: true });
    } else {
        res.status(401).json({ error: "Invalid credentials" });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: "OK", timestamp: new Date() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend Server API running on port ${PORT}`);
});
