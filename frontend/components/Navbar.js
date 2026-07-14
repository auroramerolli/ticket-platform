import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 bg-kraft/95 backdrop-blur border-b-2 border-ink">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-3xl tracking-wide text-ink">
          My Ticket<span className="text-stamp">.</span>
        </Link>
        <nav className="flex items-center gap-6 font-body text-sm font-medium text-ink/80">
          <Link href="/" className="hover:text-stamp transition-colors">
            Evente
          </Link>
          <Link href="/organizer" className="hover:text-stamp transition-colors">
            Organizator
          </Link>
          <Link href="/validate" className="hover:text-stamp transition-colors">
            Kontrollo Biletën
          </Link>
        </nav>
      </div>
    </header>
  );
}
