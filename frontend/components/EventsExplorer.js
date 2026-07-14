"use client";

import { useMemo, useState } from "react";
import EventCard from "./EventCard";

export default function EventsExplorer({ events }) {
  const [activeCategory, setActiveCategory] = useState("Të gjitha");

  const categories = useMemo(() => {
    const unique = Array.from(new Set(events.map((e) => e.category)));
    return ["Të gjitha", ...unique];
  }, [events]);

  const filtered = useMemo(() => {
    if (activeCategory === "Të gjitha") return events;
    return events.filter((e) => e.category === activeCategory);
  }, [events, activeCategory]);

  if (events.length === 0) {
    return (
      <div className="rounded-lg border-2 border-dashed border-ink/20 p-12 text-center text-ink/50 font-body">
        Backend-i nuk është i lidhur ende. Nis serverin Express dhe ekzekuto{" "}
        <code className="font-mono text-sm">npm run seed</code> për të shtuar
        evente shembull.
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full border-2 px-4 py-1.5 font-body text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "border-stamp bg-stamp text-kraft"
                : "border-ink/20 bg-kraft/50 text-ink/70 hover:border-ink/40"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-ink/50 font-body">
          Ende s'ka evente në këtë kategori.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
