require("dotenv").config();
const dns = require("dns");
const mongoose = require("mongoose");
const Event = require("../models/Event");

dns.setServers(["8.8.8.8", "8.8.4.4"]);


const events = [
  {
    title: "Kala Festival",
    category: "Festival",
    description:
      "Festivali më i madh i muzikës elektronike në Shqipëri, në brigjet e Dhërmit. Tre ditë muzikë, det dhe diell.",
    venue: "Kalaja e Ali Pashës",
    city: "Dhërmi",
    date: new Date("2026-08-14"),
    imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3",
    price: 65,
    totalTickets: 500,
    organizerName: "Kala Events",
  },
  {
    title: "Sunny Hill Tirana",
    category: "Koncert",
    description:
      "Koncert live me artistë ndërkombëtarë dhe lokalë, në amfiteatrin e hapur të Tiranës.",
    venue: "Amfiteatri Kombëtar",
    city: "Tiranë",
    date: new Date("2026-07-25"),
    imageUrl: "https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf",
    price: 40,
    totalTickets: 800,
    organizerName: "Sunny Hill Productions",
  },
  {
    title: "Tech Summit Albania",
    category: "Konferencë",
    description:
      "Konferenca më e madhe teknologjike në vend, me folës nga startup-e dhe kompani ndërkombëtare.",
    venue: "Pallati i Kongreseve",
    city: "Tiranë",
    date: new Date("2026-09-10"),
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
    price: 30,
    totalTickets: 300,
    organizerName: "Tech Albania",
  },
  {
    title: "Gjirokastra Folk Festival",
    category: "Festival",
    description:
      "Festivali kombëtar i folklorit, me grupe nga e gjithë Shqipëria dhe diaspora, në qytetin e gurtë.",
    venue: "Kalaja e Gjirokastrës",
    city: "Gjirokastër",
    date: new Date("2026-08-30"),
    imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3",
    price: 15,
    totalTickets: 1000,
    organizerName: "Ministria e Kulturës",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB, seeding...");

    await Event.deleteMany({});
    await Event.insertMany(events);

    console.log(`Seeded ${events.length} events successfully.`);
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
}

seed();
