/**
 * Saves a row to Supabase through its REST API (server-side only, service role key).
 * Returns "skipped" when Supabase env vars are not set (local dev before setup).
 */
export async function saveRecord(
  table: string,
  row: Record<string, unknown>,
  opts: { onConflict?: string } = {},
): Promise<"saved" | "skipped"> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    // Never pretend to save on the live site.
    if (process.env.NODE_ENV === "production") throw new Error("Supabase is not configured");
    console.warn(`[store] Supabase not configured; ${table} row NOT saved`, Object.keys(row));
    return "skipped";
  }

  const query = opts.onConflict ? `?on_conflict=${opts.onConflict}` : "";
  const res = await fetch(`${url}/rest/v1/${table}${query}`, {
    method: "POST",
    headers: {
      apikey: key,
      // Legacy service_role keys are JWTs and go in Authorization too; new sb_secret_ keys are apikey-only.
      ...(key.startsWith("eyJ") && { Authorization: `Bearer ${key}` }),
      "Content-Type": "application/json",
      Prefer: `return=minimal${opts.onConflict ? ",resolution=ignore-duplicates" : ""}`,
    },
    body: JSON.stringify(row),
  });
  if (!res.ok) throw new Error(`Supabase insert into ${table} failed: ${res.status}`);
  return "saved";
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
