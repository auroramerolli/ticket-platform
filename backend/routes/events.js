const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const Ticket = require("../models/Ticket");

// GET /api/events — list all upcoming events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// GET /api/events/:id — get one event
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    const ticketsSold = await Ticket.countDocuments({ event: event._id });
    res.json({ ...event.toObject(), ticketsSold, ticketsLeft: event.totalTickets - ticketsSold });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch event" });
  }
});

// POST /api/events — create a new event (organizer)
router.post("/", async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      venue,
      city,
      date,
      imageUrl,
      price,
      totalTickets,
      organizerName,
    } = req.body;

    if (!title || !category || !description || !venue || !city || !date || !price || !totalTickets || !organizerName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const event = await Event.create({
      title,
      category,
      description,
      venue,
      city,
      date,
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3",
      price,
      totalTickets,
      organizerName,
    });

    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: "Failed to create event" });
  }
});

// GET /api/events/:id/sales — sales summary for an event (organizer dashboard)
router.get("/:id/sales", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    const tickets = await Ticket.find({ event: event._id }).sort({ createdAt: -1 });
    const revenue = tickets.reduce((sum, t) => sum + t.pricePaid, 0);
    const usedCount = tickets.filter((t) => t.used).length;

    res.json({
      event,
      ticketsSold: tickets.length,
      ticketsLeft: event.totalTickets - tickets.length,
      revenue,
      usedCount,
      tickets,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sales data" });
  }
});

module.exports = router;
