"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function ValidatePage() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkTicket = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`${API_URL}/tickets/validate/${code.trim()}`);
      const data = await res.json();
      setResult({ ok: res.ok, ...data });
    } catch (err) {
      setResult({ ok: false, error: "Nuk u lidhëm dot me serverin" });
    } finally {
      setLoading(false);
    }
  };

  const checkIn = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/tickets/validate/${code.trim()}`, {
        method: "PATCH",
      });
      const data = await res.json();
      setResult({ ok: res.ok, ...data, checkedIn: res.ok });
    } catch (err) {
      setResult({ ok: false, error: "Nuk u lidhëm dot me serverin" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <h1 className="font-display text-4xl tracking-wide text-ink">
        Kontrollo Biletën
      </h1>
      <p className="mt-2 text-ink/60 font-body">
        Vendos kodin e biletës për ta verifikuar.
      </p>

      <form onSubmit={checkTicket} className="mt-8 flex gap-3">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="TKT-XXXX-XXXX"
          className="flex-1 rounded-md border-2 border-ink/20 px-4 py-3 font-mono bg-kraft/70 focus:border-stamp outline-none"
        />
        <button
          type="submit"
          disabled={loading || !code}
          className="rounded-md bg-ink text-kraft font-body font-semibold px-6 hover:bg-ink/90 transition-colors disabled:opacity-50"
        >
          Kontrollo
        </button>
      </form>

      {result && (
        <div
          className={`mt-6 rounded-lg border-2 p-5 font-body ${
            result.ok && result.valid
              ? "border-green-100/40 bg-green-100/2"
              : "border-stamp/40 bg-stamp/5"
          }`}
        >
          {!result.ok || !result.valid ? (
            <p className="text-stamp font-medium">
              {result.error || "Kodi nuk është i vlefshëm"}
            </p>
          ) : (
            <>
              <p className="font-display text-2xl text-ink tracking-wide">
                {result.ticket.event.title}
              </p>
              <p className="text-sm text-ink/60 mt-1">
                Blerësi: {result.ticket.buyerName}
              </p>
              <p className="mt-3">
                Statusi:{" "}
                <span
                  className={`font-medium ${
                    result.used ? "text-yellow-700" : "text-green-700"
                  }`}
                >
                  {result.used ? "Tashmë e përdorur" : "E vlefshme, gati për hyrje"}
                </span>
              </p>

              {!result.used && (
                <button
                  onClick={checkIn}
                  disabled={loading}
                  className="mt-4 rounded-md bg-stamp text-kraft font-semibold px-5 py-2.5 hover:bg-stamp/90 transition-colors disabled:opacity-60"
                >
                  Bëj Check-in
                </button>
              )}

              {result.checkedIn && (
                <p className="mt-3 text-green-700 font-medium">
                  Check-in u krye me sukses ✓
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
