"use client";

import { useState } from "react";
import { placements } from "@/lib/data/ads";

export function AdvertiseForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/advertise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong");
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="rounded-2xl border border-gold/50 bg-panel p-8 text-center">
        <h2 className="text-xl font-bold text-goldtext">Thanks! We&apos;ll be in touch.</h2>
        <p className="mt-2 text-muted">We&apos;ll reply with availability and pricing for your placement.</p>
      </div>
    );
  }

  const field = "mt-1 w-full rounded-lg border border-line bg-panel px-3 py-2";
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">Business name
          <input name="business" required className={field} autoComplete="organization" />
        </label>
        <label className="block text-sm">Category
          <input name="category" placeholder="Florist, caterer, DJ…" className={field} />
        </label>
        <label className="block text-sm">Your name
          <input name="name" required className={field} autoComplete="name" />
        </label>
        <label className="block text-sm">Email
          <input name="email" type="email" required className={field} autoComplete="email" />
        </label>
      </div>
      <label className="block text-sm">Placement
        <select name="placement" required className={field} defaultValue={placements[0].id}>
          {placements.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </label>
      <label className="block text-sm">Anything else? (optional)
        <textarea name="message" rows={3} className={field} />
      </label>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      {status === "error" && <p role="alert" className="text-sm text-danger">{error}</p>}
      <button disabled={status === "sending"} className="rounded-full bg-cta px-7 py-3 font-semibold text-ctafg hover:brightness-110 disabled:opacity-50">
        {status === "sending" ? "Sending…" : "Request availability"}
      </button>
    </form>
  );
}
