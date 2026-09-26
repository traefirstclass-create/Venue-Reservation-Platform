import { NextResponse } from "next/server";
import { getVenue } from "@/lib/data/venues";
import { saveRecord } from "@/lib/store";

// Validates a planner request and saves it to Supabase. Admin email notification comes in Phase 4.
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const venue = getVenue(String(body.venueSlug ?? ""));
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const date = String(body.date ?? "");
  const guests = Number(body.guests);
  const hours = Number(body.hours);

  if (!venue) return NextResponse.json({ error: "Unknown venue" }, { status: 400 });
  if (!name || !/\S+@\S+\.\S+/.test(email)) return NextResponse.json({ error: "Name and a valid email are required" }, { status: 400 });
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return NextResponse.json({ error: "Choose an event date" }, { status: 400 });
  if (!(guests > 0 && guests <= venue.standing)) return NextResponse.json({ error: "Guest count is out of range" }, { status: 400 });
  if (!(hours >= venue.minHours)) return NextResponse.json({ error: `Minimum ${venue.minHours} hours` }, { status: 400 });

  const reference = `SPL-${Date.now().toString(36).toUpperCase()}`;
  const addOns = Array.isArray(body.addOns)
    ? body.addOns.map(String).filter((id) => venue.addOns.some((a) => a.id === id))
    : [];

  try {
    await saveRecord("event_requests", {
      reference,
      venue_slug: venue.slug,
      name: name.slice(0, 120),
      email: email.toLowerCase(),
      event_type: String(body.eventType ?? "").slice(0, 60),
      event_date: date,
      hours,
      guests,
      layout: String(body.layout ?? "").slice(0, 60),
      add_ons: addOns,
      notes: String(body.notes ?? "").slice(0, 2000),
      estimate: Math.round(Number(body.estimate)) || null,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Could not send your request right now. Please try again." }, { status: 500 });
  }
  return NextResponse.json({ reference }, { status: 201 });
}
