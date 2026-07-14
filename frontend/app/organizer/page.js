"use client";

import { useEffect, useState } from "react";
import CreateEventForm from "../../components/CreateEventForm";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function OrganizerPage() {
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [sales, setSales] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/events`, { cache: "no-store" });
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      // silent — the empty state below handles this
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const viewSales = async (eventId) => {
    setSelected(eventId);
    setSales(null);
    try {
      const res = await fetch(`${API_URL}/events/${eventId}/sales`, {
        cache: "no-store",
      });
      const data = await res.json();
      setSales(data);
    } catch (err) {
      setSales({ error: "Nuk u ngarkuan dot shitjet" });
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="font-display text-4xl tracking-wide text-ink">
          Paneli i Organizatorit
        </h1>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="rounded-md bg-stamp text-kraft font-body font-semibold px-5 py-2.5 hover:bg-stamp/90 transition-colors"
        >
          {showForm ? "Mbyll formën" : "+ Krijo Event"}
        </button>
      </div>

      {showForm && (
        <div className="mt-8 rounded-lg border-2 border-ink bg-kraft/50 p-6">
          <CreateEventForm
            onCreated={() => {
              fetchEvents();
              setShowForm(false);
            }}
          />
        </div>
      )}

      <div className="perforated my-10" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-3">
          <h2 className="font-display text-2xl tracking-wide text-ink mb-2">
            Eventet e mia
          </h2>
          {loading && <p className="font-body text-ink/60">Duke ngarkuar...</p>}
          {!loading && events.length === 0 && (
            <p className="font-body text-ink/50 text-sm">Ende s'ka evente.</p>
          )}
          {events.map((event) => (
            <button
              key={event._id}
              onClick={() => viewSales(event._id)}
              className={`w-full text-left rounded-md border-2 px-4 py-3 font-body transition-colors ${
                selected === event._id
                  ? "border-stamp bg-stamp/10"
                  : "border-ink/15 bg-white/40 hover:border-ink/40"
              }`}
            >
              <div className="font-medium text-ink">{event.title}</div>
              <div className="text-xs text-ink/50">
                {event.city} — {new Date(event.date).toLocaleDateString("sq-AL")}
              </div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2">
          {!selected && (
            <div className="rounded-lg border-2 border-dashed border-ink/20 p-12 text-center text-ink/50 font-body">
              Zgjidh një event nga lista për të parë shitjet.
            </div>
          )}

          {selected && !sales && (
            <p className="font-body text-ink/60">Duke ngarkuar shitjet...</p>
          )}

          {sales && !sales.error && (
            <div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="rounded-lg border-2 border-ink bg-white/50 p-4 text-center">
                  <p className="font-display text-3xl text-ink">{sales.ticketsSold}</p>
                  <p className="text-xs font-body text-ink/60 uppercase tracking-wide">
                    Bileta të shitura
                  </p>
                </div>
                <div className="rounded-lg border-2 border-ink bg-white/50 p-4 text-center">
                  <p className="font-display text-3xl text-ink">{sales.revenue} €</p>
                  <p className="text-xs font-body text-ink/60 uppercase tracking-wide">
                    Të ardhura
                  </p>
                </div>
                <div className="rounded-lg border-2 border-ink bg-white/50 p-4 text-center">
                  <p className="font-display text-3xl text-ink">{sales.usedCount}</p>
                  <p className="text-xs font-body text-ink/60 uppercase tracking-wide">
                    Check-in
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-lg border-2 border-ink">
                <table className="w-full text-left font-body text-sm">
                  <thead className="bg-ink text-kraft">
                    <tr>
                      <th className="px-4 py-3">Kodi</th>
                      <th className="px-4 py-3">Blerësi</th>
                      <th className="px-4 py-3">Statusi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sales.tickets.map((t) => (
                      <tr key={t._id} className="border-t border-ink/10 bg-white/40">
                        <td className="px-4 py-3 font-mono text-xs">{t.code}</td>
                        <td className="px-4 py-3">{t.buyerName}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              t.used
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {t.used ? "përdorur" : "e pashfrytëzuar"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
