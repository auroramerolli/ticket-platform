"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const initialForm = {
  title: "",
  category: "Koncert",
  description: "",
  venue: "",
  city: "",
  date: "",
  price: "",
  totalTickets: "",
  organizerName: "",
};

export default function CreateEventForm({ onCreated }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(`${API_URL}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          totalTickets: Number(form.totalTickets),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Diçka shkoi keq.");
        return;
      }

      setForm(initialForm);
      setStatus("success");
      onCreated?.(data);
    } catch (err) {
      setStatus("error");
      setErrorMsg("Nuk u lidhëm dot me serverin.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-body text-ink/70 mb-1">
            Titulli i eventit
          </label>
          <input
            name="title"
            required
            value={form.title}
            onChange={handleChange}
            className="w-full rounded-md border-2 border-ink/20 px-3 py-2 font-body bg-kraft/70 focus:border-stamp outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-body text-ink/70 mb-1">
            Kategoria
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-md border-2 border-ink/20 px-3 py-2 font-body bg-kraft/70 focus:border-stamp outline-none"
          >
            <option>Koncert</option>
            <option>Festival</option>
            <option>Konferencë</option>
            <option>Teatër</option>
            <option>Sport</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-body text-ink/70 mb-1">
            Emri i organizatorit
          </label>
          <input
            name="organizerName"
            required
            value={form.organizerName}
            onChange={handleChange}
            className="w-full rounded-md border-2 border-ink/20 px-3 py-2 font-body bg-kraft/70 focus:border-stamp outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-body text-ink/70 mb-1">Salla</label>
          <input
            name="venue"
            required
            value={form.venue}
            onChange={handleChange}
            className="w-full rounded-md border-2 border-ink/20 px-3 py-2 font-body bg-kraft/70 focus:border-stamp outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-body text-ink/70 mb-1">Qyteti</label>
          <input
            name="city"
            required
            value={form.city}
            onChange={handleChange}
            className="w-full rounded-md border-2 border-ink/20 px-3 py-2 font-body bg-kraft/70 focus:border-stamp outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-body text-ink/70 mb-1">Data</label>
          <input
            type="date"
            name="date"
            required
            value={form.date}
            onChange={handleChange}
            className="w-full rounded-md border-2 border-ink/20 px-3 py-2 font-body bg-kraft/70 focus:border-stamp outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-body text-ink/70 mb-1">
            Çmimi (EUR)
          </label>
          <input
            type="number"
            name="price"
            min={0}
            required
            value={form.price}
            onChange={handleChange}
            className="w-full rounded-md border-2 border-ink/20 px-3 py-2 font-body bg-kraft/70 focus:border-stamp outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-body text-ink/70 mb-1">
            Total bileta
          </label>
          <input
            type="number"
            name="totalTickets"
            min={1}
            required
            value={form.totalTickets}
            onChange={handleChange}
            className="w-full rounded-md border-2 border-ink/20 px-3 py-2 font-body bg-kraft/70 focus:border-stamp outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-body text-ink/70 mb-1">
            Përshkrimi
          </label>
          <textarea
            name="description"
            required
            rows={3}
            value={form.description}
            onChange={handleChange}
            className="w-full rounded-md border-2 border-ink/20 px-3 py-2 font-body bg-kraft/70 focus:border-stamp outline-none"
          />
        </div>
      </div>

      {status === "error" && (
        <p className="text-sm text-stamp font-body">{errorMsg}</p>
      )}
      {status === "success" && (
        <p className="text-sm text-green-700 font-body">Eventi u krijua!</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-md bg-ink text-kraft font-body font-semibold px-6 py-3 hover:bg-ink/90 transition-colors disabled:opacity-60"
      >
        {status === "loading" ? "Duke krijuar..." : "Krijo Eventin"}
      </button>
    </form>
  );
}
