import Link from "next/link";
import { adFor, type PlacementId } from "@/lib/data/ads";

/** A clearly labeled vendor placement. Shows an "advertise here" prompt when the slot is open. */
export function AdSlot({ placement, className = "" }: { placement: PlacementId; className?: string }) {
  const ad = adFor(placement);

  if (!ad) {
    return (
      <aside aria-label="Advertising opportunity" className={`rounded-2xl border border-dashed border-line p-5 text-sm ${className}`}>
        <p className="text-xs uppercase tracking-widest text-muted">Your business here</p>
        <p className="mt-2 text-muted">Florists, caterers, DJs and more reach guests planning events on Spotlit.</p>
        <Link href="/advertise" className="mt-3 inline-block font-semibold text-goldtext hover:underline">
          Advertise with us →
        </Link>
      </aside>
    );
  }

  return (
    <aside aria-label="Sponsored" className={`rounded-2xl border border-line bg-panel p-5 text-sm ${className}`}>
      <p className="text-xs uppercase tracking-widest text-muted">Sponsored · {ad.category}</p>
      <p className="mt-2 font-semibold">{ad.vendor}</p>
      <p className="mt-1 text-muted">{ad.headline}</p>
      <a href={ad.url} target="_blank" rel="sponsored noopener noreferrer" className="mt-3 inline-block font-semibold text-goldtext hover:underline">
        Learn more →
      </a>
    </aside>
  );
}
