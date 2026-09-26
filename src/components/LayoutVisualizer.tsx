"use client";

import { useState } from "react";
import type { Layout } from "@/lib/data/venues";

export function LayoutVisualizer({ layouts }: { layouts: Layout[] }) {
  const [active, setActive] = useState(0);
  const max = Math.max(...layouts.map((l) => l.capacity));
  const dots = Math.min(layouts[active].capacity, 120);

  return (
    <div>
      <div role="tablist" aria-label="Room layouts" className="flex flex-wrap gap-2">
        {layouts.map((l, i) => (
          <button
            key={l.name}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`rounded-full border px-4 py-1.5 text-sm ${
              i === active ? "border-gold bg-cta text-ctafg" : "border-line hover:border-gold"
            }`}
          >
            {l.name}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-2xl border border-line bg-panel p-4">
        <div className="flex flex-wrap gap-1.5" aria-hidden="true">
          {Array.from({ length: dots }).map((_, i) => (
            <span key={i} className="h-2.5 w-2.5 rounded-full bg-gold" />
          ))}
        </div>
        <p className="mt-3 text-sm text-muted">
          {layouts[active].name}: <strong className="text-fg">{layouts[active].capacity}</strong> guests
          {layouts[active].capacity < max ? "" : " (max capacity)"}
        </p>
      </div>
    </div>
  );
}
