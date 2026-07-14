const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");
const Event = require("../models/Event");
const { generateTicketCode } = require("../utils/generateCode");

// POST /api/tickets — buy one or more tickets for an event
router.post("/", async (req, res) => {
  try {
    const { eventId, buyerName, buyerEmail, quantity } = req.body;

    if (!eventId || !buyerName || !buyerEmail || !quantity) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ error: "Event not found" });

    const alreadySold = await Ticket.countDocuments({ event: event._id });
    const qty = Number(quantity);

    if (alreadySold + qty > event.totalTickets) {
      return res.status(400).json({
        error: `Only ${event.totalTickets - alreadySold} tickets left for this event`,
      });
    }

    const ticketsToCreate = Array.from({ length: qty }).map(() => ({
      event: event._id,
      code: generateTicketCode(),
      buyerName,
      buyerEmail,
      pricePaid: event.price,
    }));

    const tickets = await Ticket.insertMany(ticketsToCreate);
    res.status(201).json(tickets);
  } catch (err) {
    res.status(500).json({ error: "Failed to create ticket(s)" });
  }
});

// GET /api/tickets/validate/:code — check if a ticket code is valid
router.get("/validate/:code", async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ code: req.params.code }).populate(
      "event",
      "title date venue"
    );

    if (!ticket) {
      return res.status(404).json({ valid: false, error: "Kodi nuk ekziston" });
    }

    res.json({
      valid: true,
      used: ticket.used,
      ticket,
    });
  } catch (err) {
    res.status(500).json({ error: "Validation failed" });
  }
});

// PATCH /api/tickets/validate/:code — mark a ticket as used (check-in at the door)
router.patch("/validate/:code", async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ code: req.params.code });

    if (!ticket) {
      return res.status(404).json({ error: "Kodi nuk ekziston" });
    }

    if (ticket.used) {
      return res.status(400).json({ error: "Kjo biletë është përdorur tashmë", usedAt: ticket.usedAt });
    }

    ticket.used = true;
    ticket.usedAt = new Date();
    await ticket.save();

    res.json({ message: "Check-in i suksesshëm", ticket });
  } catch (err) {
    res.status(500).json({ error: "Failed to update ticket" });
  }
});

module.exports = router;
