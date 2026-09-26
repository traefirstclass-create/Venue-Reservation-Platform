import { NextResponse } from "next/server";
import { isEmail, saveRecord } from "@/lib/store";
import { placements } from "@/lib/data/ads";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (body.website) return NextResponse.json({ ok: true });

  const business = String(body.business ?? "").trim().slice(0, 120);
  const name = String(body.name ?? "").trim().slice(0, 120);
  const email = String(body.email ?? "").trim().toLowerCase();
  const category = String(body.category ?? "").trim().slice(0, 60);
  const placement = String(body.placement ?? "");
  const message = String(body.message ?? "").trim().slice(0, 2000);

  if (!business || !name || !isEmail(email)) {
    return NextResponse.json({ error: "Business, name and a valid email are required" }, { status: 400 });
  }
  if (!placements.some((p) => p.id === placement)) {
    return NextResponse.json({ error: "Choose a placement" }, { status: 400 });
  }

  try {
    await saveRecord("ad_inquiries", { business, name, email, category, placement, message });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Could not send right now. Please try again." }, { status: 500 });
  }
  return NextResponse.json({ ok: true }, { status: 201 });
}
