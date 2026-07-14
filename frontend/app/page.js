import EventsExplorer from "../components/EventsExplorer";
import HeroTicket from "../components/HeroTicket";
import HowItWorks from "../components/HowItWorks";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function getEvents() {
  try {
    const res = await fetch(`${API_URL}/events`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    return [];
  }
}

export default async function HomePage() {
  const events = await getEvents();

  const totalTickets = events.reduce((sum, e) => sum + (e.totalTickets || 0), 0);
  const cities = new Set(events.map((e) => e.city)).size;

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10 grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
        <div className="lg:col-span-3">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-stamp">
            Bli biletën tënde
          </p>
          <h1 className="mt-3 font-display text-6xl md:text-7xl text-ink tracking-wide leading-[0.95]">
            Evente që meritojnë biletën e tyre.
          </h1>
          <p className="mt-4 max-w-xl text-ink/70 font-body">
            Koncerte, festivale dhe konferenca në të gjithë Shqipërinë — çdo biletë
            vjen me kod unik dhe QR për hyrje të shpejtë.
          </p>

          <div className="mt-8 flex flex-wrap gap-8">
            <div>
              <p className="font-display text-4xl text-ink">{events.length}</p>
              <p className="text-xs font-mono uppercase tracking-wide text-ink/50">
                Evente aktive
              </p>
            </div>
            <div>
              <p className="font-display text-4xl text-ink">{totalTickets}</p>
              <p className="text-xs font-mono uppercase tracking-wide text-ink/50">
                Bileta gjithsej
              </p>
            </div>
            <div>
              <p className="font-display text-4xl text-ink">{cities}</p>
              <p className="text-xs font-mono uppercase tracking-wide text-ink/50">
                Qytete
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <HeroTicket />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="perforated mb-10" />
        <h2 className="font-display text-3xl tracking-wide text-ink mb-6">
          Evente të disponueshme
        </h2>
        <EventsExplorer events={events} />
      </section>

      <div className="bg-ink/5">
        <HowItWorks />
      </div>
    </>
  );
}
