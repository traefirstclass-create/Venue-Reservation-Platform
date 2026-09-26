"use client";

import { useState } from "react";

export function NewsletterForm({ source = "site" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const website = String(new FormData(e.currentTarget).get("website") ?? "");
    setStatus("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, website }),
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
    return <p role="status" className="font-semibold text-goldtext">You&apos;re on the list! We&apos;ll email you when new venues land.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
      <label htmlFor={`nl-${source}`} className="sr-only">Email address</label>
      <input
        id={`nl-${source}`}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        autoComplete="email"
        className="min-w-0 flex-1 rounded-full border border-line bg-panel px-5 py-3 text-sm"
      />
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <button
        disabled={status === "sending"}
        className="rounded-full bg-cta px-6 py-3 text-sm font-semibold text-ctafg hover:brightness-110 disabled:opacity-50"
      >
        {status === "sending" ? "Joining…" : "Notify me"}
      </button>
      {status === "error" && <p role="alert" className="text-sm text-danger sm:basis-full">{error}</p>}
    </form>
  );
}
