const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true }, // e.g. "Koncert", "Festival", "Konferencë"
    description: { type: String, required: true },
    venue: { type: String, required: true },
    city: { type: String, required: true },
    date: { type: Date, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: "EUR" },
    totalTickets: { type: Number, required: true },
    organizerName: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
