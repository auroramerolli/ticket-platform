import Image from "next/image";
import Link from "next/link";

export default function EventCard({ event }) {
  const date = new Date(event.date);
  const day = date.toLocaleDateString("sq-AL", { day: "2-digit" });
  const month = date.toLocaleDateString("sq-AL", { month: "short" }).toUpperCase();

  return (
    <Link
      href={`/events/${event._id}`}
      className="group flex overflow-hidden rounded-lg border-2 border-ink bg-kraft/40 hover:shadow-[4px_4px_0_0_#1A1A1A] transition-shadow"
    >
      <div className="flex flex-col items-center justify-center w-20 shrink-0 border-r-2 border-dashed border-ink/30 bg-mustard/20 font-display text-ink">
        <span className="text-3xl leading-none">{day}</span>
        <span className="text-sm tracking-widest">{month}</span>
      </div>

      <div className="relative w-32 shrink-0 hidden sm:block">
        <Image
          src={`${event.imageUrl}?auto=format&fit=crop&w=400&q=70`}
          alt={event.title}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
        />
      </div>

      <div className="p-4 flex-1">
        <span className="font-mono text-[11px] uppercase tracking-wider text-stamp">
          {event.category}
        </span>
        <h3 className="font-display text-2xl tracking-wide text-ink leading-tight mt-0.5">
          {event.title}
        </h3>
        <p className="text-sm text-ink/60 font-body mt-1">
          {event.venue}, {event.city}
        </p>
        <p className="mt-2 font-mono text-sm text-ink">
          {event.price} {event.currency || "EUR"}
        </p>
      </div>
    </Link>
  );
}
