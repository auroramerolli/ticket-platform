import Image from "next/image";
import { notFound } from "next/navigation";
import PurchaseForm from "../../../components/PurchaseForm";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function getEvent(id) {
  try {
    const res = await fetch(`${API_URL}/events/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    return null;
  }
}

export default async function EventPage({ params }) {
  const event = await getEvent(params.id);

  if (!event) notFound();

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="relative h-72 md:h-96 w-full overflow-hidden rounded-lg border-2 border-ink">
        <Image
          src={`${event.imageUrl}?auto=format&fit=crop&w=1200&q=75`}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <span className="font-mono text-xs uppercase tracking-widest text-stamp">
            {event.category}
          </span>
          <h1 className="mt-2 font-display text-5xl tracking-wide text-ink leading-tight">
            {event.title}
          </h1>
          <p className="mt-3 text-ink/60 font-body">
            {event.venue}, {event.city} —{" "}
            {new Date(event.date).toLocaleDateString("sq-AL", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p className="mt-5 text-ink/80 font-body leading-relaxed">
            {event.description}
          </p>

          <div className="mt-6 flex items-center gap-6 font-mono text-sm text-ink/60">
            <span>Organizuar nga {event.organizerName}</span>
            <span>{event.ticketsLeft} bileta të mbetura</span>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-lg border-2 border-ink bg-kraft/50 p-6">
            <p className="font-mono text-3xl text-ink font-medium">
              {event.price} {event.currency || "EUR"}
            </p>
            <div className="perforated my-5" />
            <PurchaseForm event={event} />
          </div>
        </div>
      </div>
    </div>
  );
}
