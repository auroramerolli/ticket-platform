"use client";

import { useState } from "react";
import TicketStub from "./TicketStub";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function PurchaseForm({ event }) {
  const [form, setForm] = useState({ buyerName: "", buyerEmail: "", quantity: 1 });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [tickets, setTickets] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(`${API_URL}/tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: event._id,
          ...form,
          quantity: Number(form.quantity),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Diçka shkoi keq. Provo përsëri.");
        return;
      }

      setTickets(data);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg("Nuk u lidhëm dot me serverin. Provo përsëri më vonë.");
    }
  };

  if (status === "success") {
    return (
      <div className="space-y-4">
        <p className="font-display text-2xl text-ink tracking-wide">
          Bileta{tickets.length > 1 ? "t" : ""} u lëshua{tickets.length > 1 ? "n" : ""}!
        </p>
        <p className="text-sm text-ink/60 font-body">
          Ruaj kodin ose bëj screenshot — do të duhet për hyrje te dera.
        </p>
        {tickets.map((ticket) => (
          <TicketStub key={ticket._id} ticket={ticket} event={event} />
        ))}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-body text-ink/70 mb-1">Emri</label>
        <input
          type="text"
          name="buyerName"
          required
          value={form.buyerName}
          onChange={handleChange}
          className="w-full rounded-md border-2 border-ink/20 px-3 py-2 font-body bg-kraft/70 focus:border-stamp outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-body text-ink/70 mb-1">Email</label>
        <input
          type="email"
          name="buyerEmail"
          required
          value={form.buyerEmail}
          onChange={handleChange}
          className="w-full rounded-md border-2 border-ink/20 px-3 py-2 font-body bg-kraft/70 focus:border-stamp outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-body text-ink/70 mb-1">
          Numri i biletave
        </label>
        <input
          type="number"
          name="quantity"
          min={1}
          max={10}
          required
          value={form.quantity}
          onChange={handleChange}
          className="w-full rounded-md border-2 border-ink/20 px-3 py-2 font-body bg-kraft/70 focus:border-stamp outline-none"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-stamp font-body">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-md bg-stamp text-kraft font-body font-semibold py-3 hover:bg-stamp/90 transition-colors disabled:opacity-60"
      >
        {status === "loading" ? "Duke procesuar..." : "Blej Biletën"}
      </button>
    </form>
  );
}
