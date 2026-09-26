import { NextResponse } from "next/server";
import { pingDatabase } from "@/lib/store";

export const dynamic = "force-dynamic";

// Called daily by the Vercel cron in vercel.json. If CRON_SECRET is set, Vercel sends it as a bearer token.
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await pingDatabase();
    return NextResponse.json({ ok: true, at: new Date().toISOString() });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
