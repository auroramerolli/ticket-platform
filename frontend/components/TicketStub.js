import Image from "next/image";

export default function TicketStub({ ticket, event }) {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
    ticket.code
  )}`;

  return (
    <div className="flex rounded-lg border-2 border-ink bg-kraft/60 overflow-hidden shadow-[4px_4px_0_0_#1A1A1A]">
      <div className="flex-1 p-5">
        <p className="font-mono text-[11px] uppercase tracking-wider text-stamp">
          {event.category}
        </p>
        <h3 className="font-display text-2xl tracking-wide text-ink leading-tight">
          {event.title}
        </h3>
        <p className="text-sm text-ink/60 font-body mt-1">
          {event.venue}, {event.city} —{" "}
          {new Date(event.date).toLocaleDateString("sq-AL")}
        </p>
        <p className="mt-3 text-sm font-body text-ink/80">{ticket.buyerName}</p>
      </div>

      <div className="perforated w-px border-t-0 border-l-2 border-dashed border-ink/30" />

      <div className="flex flex-col items-center justify-center gap-2 p-4 w-40 shrink-0 bg-mustard/10">
        <div className="relative h-24 w-24">
          <Image src={qrUrl} alt={`QR ${ticket.code}`} fill unoptimized />
        </div>
        <p className="font-mono text-xs text-ink text-center break-all">
          {ticket.code}
        </p>
      </div>
    </div>
  );
}
