import Link from "next/link";
import type { Venue } from "@/lib/data/venues";
import { VenueArt } from "./VenueArt";
import { CategoryTag } from "./CategoryTag";

export function VenueCard({ venue }: { venue: Venue }) {
  return (
    <Link
      href={`/venues/${venue.slug}`}
      className="card-lift group overflow-hidden rounded-2xl border border-line bg-panel hover:border-gold"
    >
      <VenueArt venue={venue} className="h-48" />
      <div className="p-5">
        <div className="flex flex-wrap gap-1.5">
          {venue.categories.map((c) => <CategoryTag key={c} category={c} />)}
        </div>
        <h3 className="mt-3 text-xl font-semibold group-hover:text-goldtext">{venue.name}</h3>
        <p className="mt-1 text-sm text-muted">{venue.tagline}</p>
        <p className="mt-4 text-sm">
          Up to <strong>{venue.standing}</strong> guests · from <strong>${venue.hourlyRate}</strong>/hr
        </p>
      </div>
    </Link>
  );
}
