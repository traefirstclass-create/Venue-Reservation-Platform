import { NextResponse } from "next/server";
import { isEmail, saveRecord } from "@/lib/store";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (body.website) return NextResponse.json({ ok: true });

  const email = String(body.email ?? "").trim().toLowerCase();
  if (!isEmail(email) || email.length > 254) {
    return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
  }

  try {
    await saveRecord("subscribers", { email, source: String(body.source ?? "site").slice(0, 40) }, { onConflict: "email" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Could not subscribe right now. Please try again." }, { status: 500 });
  }
  return NextResponse.json({ ok: true }, { status: 201 });
}
