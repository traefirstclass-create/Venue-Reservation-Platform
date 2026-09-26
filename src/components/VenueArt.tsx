import Image from "next/image";
import type { Venue } from "@/lib/data/venues";

/** The venue's lead photo, or gradient artwork when it has no photos yet. */
export function VenueArt({
  venue,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw",
}: {
  venue: Venue;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const [a, b] = venue.palette;
  const lead = venue.images?.[0];
  return (
    <div
      role={lead ? undefined : "img"}
      aria-label={lead ? undefined : `${venue.name} preview`}
      className={`relative overflow-hidden ${className}`}
      style={lead ? undefined : { background: `radial-gradient(70% 90% at 30% 20%, ${a}, ${b})` }}
    >
      {lead && <Image src={lead.src} alt={lead.alt} fill sizes={sizes} priority={priority} className="object-cover" />}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <span className="absolute bottom-3 left-4 text-sm font-medium text-white/90">
        {venue.area ? `${venue.area} · ` : ""}{venue.city}, {venue.state}
      </span>
    </div>
  );
}
