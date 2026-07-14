import "./globals.css";
import Navbar from "../components/Navbar";
import SideDecor from "../components/SideDecor";

export const metadata = {
  title: "My Ticket — Bli Bileta për Evente në Shqipëri",
  description: "Platformë biletash për koncerte, festivale dhe konferenca.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="sq">
      <body>
        <div className="edge-strip left hidden lg:block" aria-hidden="true" />
        <div className="edge-strip right hidden lg:block" aria-hidden="true" />
        <SideDecor />
        <Navbar />
        <main>{children}</main>
        <footer className="mt-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="perforated" />
          </div>

          <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <p className="font-display text-2xl tracking-wide text-ink">
                My Ticket<span className="text-stamp">.</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="mailto:hello@myticket.al"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink/15 bg-kraft/[0.06] text-ink/60 hover:border-stamp hover:text-stamp hover:-translate-y-0.5 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 6-10 7L2 6" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink/15 bg-kraft/[0.06] text-ink/60 hover:border-stamp hover:text-stamp hover:-translate-y-0.5 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink/15 bg-kraft/[0.06] text-ink/60 hover:border-stamp hover:text-stamp hover:-translate-y-0.5 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
