"use client";

import { useEffect, useState } from "react";
import type { Venue } from "@/lib/data/venues";
import { AdSlot } from "@/components/AdSlot";

type Draft = {
  eventType: string;
  date: string;
  hours: number;
  guests: number;
  layout: string;
  addOns: string[];
  name: string;
  email: string;
  notes: string;
};

const STEPS = ["Event", "Setup", "Add-ons", "Contact"];
const money = (n: number) => `$${n.toLocaleString()}`;

export function Planner({ venue }: { venue: Venue }) {
  const storageKey = `spotlit-draft-${venue.slug}`;
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [ref, setRef] = useState("");
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [d, setD] = useState<Draft>({
    eventType: venue.eventTypes[0],
    date: "",
    hours: venue.minHours,
    guests: Math.min(50, venue.standing),
    layout: venue.layouts[0].name,
    addOns: [],
    name: "",
    email: "",
    notes: "",
  });

  // Restore a saved draft after mount to avoid hydration mismatches.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setD((prev) => ({ ...prev, ...JSON.parse(saved) }));
    } catch {}
    setLoaded(true);
  }, [storageKey]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(d));
    } catch {}
  }, [d, loaded, storageKey]);

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setD((p) => ({ ...p, [k]: v }));
  const layoutCap = venue.layouts.find((l) => l.name === d.layout)?.capacity ?? venue.standing;
  const overCap = d.guests > layoutCap;
  const hours = Math.max(d.hours, venue.minHours);
  const room = venue.hourlyRate * hours;
  const discount = venue.longBookingDiscount && hours >= 8 ? Math.round(room * venue.longBookingDiscount) : 0;
  const base = room - discount;
  const extras = venue.addOns
    .filter((a) => d.addOns.includes(a.id))
    .reduce((s, a) => s + a.price * (a.perHour ? hours : 1), 0);
  const total = base + extras;

  const canNext =
    step === 0 ? !!d.date && d.guests > 0 && d.hours >= venue.minHours :
    step === 1 ? !overCap :
    step === 3 ? !!d.name.trim() && /\S+@\S+\.\S+/.test(d.email) : true;

  async function submit() {
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ venueSlug: venue.slug, ...d, estimate: total }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong");
      setRef(json.reference);
      setStatus("done");
      try { localStorage.removeItem(storageKey); } catch {}
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="mt-8 rounded-2xl border border-gold/50 bg-panel p-8 text-center">
        <h2 className="text-2xl font-bold text-goldtext">Request sent!</h2>
        <p className="mt-2 text-muted">
          Reference <strong className="text-fg">{ref}</strong>. We&apos;ll review it and send your quote
          to {d.email}. Payment opens once your booking is approved.
        </p>
      </div>
    );
  }

  const field = "mt-1 w-full rounded-lg border border-line bg-panel px-3 py-2";
  return (
    <div className="mt-8 grid gap-8 md:grid-cols-[1fr_240px]">
      <div>
        <ol className="flex gap-2 text-xs">
          {STEPS.map((s, i) => (
            <li key={s} className={`flex-1 rounded-full py-1 text-center ${i <= step ? "bg-cta text-ctafg" : "bg-panel text-muted"}`}>
              {s}
            </li>
          ))}
        </ol>

        <div className="mt-6 space-y-4">
          {step === 0 && (
            <>
              <label className="block text-sm">Event type
                <select className={field} value={d.eventType} onChange={(e) => set("eventType", e.target.value)}>
                  {venue.eventTypes.map((t) => <option key={t}>{t}</option>)}
                </select>
              </label>
              <label className="block text-sm">Date
                <input type="date" className={field} value={d.date} onChange={(e) => set("date", e.target.value)} />
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="block text-sm">Hours (min {venue.minHours})
                  <input type="number" min={venue.minHours} className={field} value={d.hours} onChange={(e) => set("hours", Number(e.target.value))} />
                </label>
                <label className="block text-sm">Guests
                  <input type="number" min={1} max={venue.standing} className={field} value={d.guests} onChange={(e) => set("guests", Number(e.target.value))} />
                </label>
              </div>
            </>
          )}

          {step === 1 && (
            <fieldset>
              <legend className="text-sm">Room layout</legend>
              <div className="mt-2 grid gap-2">
                {venue.layouts.map((l) => (
                  <label key={l.name} className={`flex cursor-pointer justify-between rounded-lg border px-4 py-3 text-sm ${d.layout === l.name ? "border-gold" : "border-line"}`}>
                    <span><input type="radio" name="layout" className="mr-2" checked={d.layout === l.name} onChange={() => set("layout", l.name)} />{l.name}</span>
                    <span className="text-muted">up to {l.capacity}</span>
                  </label>
                ))}
              </div>
              {overCap && <p role="alert" className="mt-3 text-sm text-danger">{d.guests} guests exceeds this layout&apos;s capacity of {layoutCap}.</p>}
            </fieldset>
          )}

          {step === 2 && (
            <fieldset>
              <legend className="text-sm">Optional extras</legend>
              {venue.addOns.length === 0 && (
                <p className="mt-2 text-sm text-muted">No add-ons are listed for this venue. Mention anything you need in the notes on the next step.</p>
              )}
              <div className="mt-2 grid gap-2">
                {venue.addOns.map((a) => (
                  <label key={a.id} className="flex cursor-pointer justify-between rounded-lg border border-line px-4 py-3 text-sm">
                    <span>
                      <input type="checkbox" className="mr-2" checked={d.addOns.includes(a.id)}
                        onChange={(e) => set("addOns", e.target.checked ? [...d.addOns, a.id] : d.addOns.filter((x) => x !== a.id))} />
                      {a.label}
                    </span>
                    <span className="text-muted">{money(a.price)}{a.perHour ? "/hr" : ""}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {step === 3 && (
            <>
              <label className="block text-sm">Your name
                <input className={field} value={d.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
              </label>
              <label className="block text-sm">Email
                <input type="email" className={field} value={d.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
              </label>
              <label className="block text-sm">Notes or special requests
                <textarea rows={4} className={field} value={d.notes} onChange={(e) => set("notes", e.target.value)} />
              </label>
              {status === "error" && <p role="alert" className="text-sm text-danger">{error}</p>}
            </>
          )}
        </div>

        <div className="mt-8 flex justify-between">
          <button disabled={step === 0} onClick={() => setStep(step - 1)} className="rounded-full border border-line px-6 py-2 text-sm disabled:opacity-30">Back</button>
          {step < STEPS.length - 1 ? (
            <button disabled={!canNext} onClick={() => setStep(step + 1)} className="rounded-full bg-cta px-6 py-2 text-sm font-semibold text-ctafg disabled:opacity-40">Next</button>
          ) : (
            <button disabled={!canNext || status === "sending"} onClick={submit} className="rounded-full bg-cta px-6 py-2 text-sm font-semibold text-ctafg disabled:opacity-40">
              {status === "sending" ? "Sending…" : "Send request"}
            </button>
          )}
        </div>
      </div>

      <aside aria-live="polite" className="h-fit rounded-2xl border border-line bg-panel p-5 text-sm md:sticky md:top-20">
        <h2 className="font-semibold">Estimate</h2>
        <dl className="mt-3 space-y-1 text-muted">
          <div className="flex justify-between"><dt>{hours} hrs × {money(venue.hourlyRate)}</dt><dd>{money(room)}</dd></div>
          {discount > 0 && (
            <div className="flex justify-between"><dt>{Math.round((venue.longBookingDiscount ?? 0) * 100)}% long-booking discount</dt><dd>−{money(discount)}</dd></div>
          )}
          <div className="flex justify-between"><dt>Add-ons</dt><dd>{money(extras)}</dd></div>
        </dl>
        <p className="mt-3 flex justify-between border-t border-line pt-3 text-base font-bold"><span>Total</span><span className="text-goldtext">{money(total)}</span></p>
        <p className="mt-2 text-xs text-muted">Final quote may vary. You pay only after approval.</p>
        <AdSlot placement="planner-partner" className="mt-4" />
      </aside>
    </div>
  );
}
