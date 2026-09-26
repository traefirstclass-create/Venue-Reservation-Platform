import Link from "next/link";
import { venues, cities, categories, categoryStyle, NIGHTLIFE, type Category } from "@/lib/data/venues";
import { pageMetadata } from "@/lib/seo";
import { VenueCard } from "@/components/VenueCard";
import { AdSlot } from "@/components/AdSlot";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Mode } from "@/components/Mode";

export const metadata = pageMetadata({
  title: "Browse venues",
  description: "Explore partner event venues by city, event type and guest count on Spotlit.",
  path: "/venues",
});

type Search = { city?: string; category?: string; guests?: string };

export default async function VenuesPage({ searchParams }: { searchParams: Promise<Search> }) {
  const { city, category, guests } = await searchParams;
  const active = categories.find((c) => c === category) as Category | undefined;
  const minGuests = Number(guests) || 0;
  const results = venues.filter(
    (v) =>
      (!city || v.city === city) &&
      (!active || v.categories.includes(active)) &&
      v.standing >= minGuests,
  );
  const dark = active === NIGHTLIFE;

  const chipHref = (c?: Category) => {
    const q = new URLSearchParams();
    if (c) q.set("category", c);
    if (city) q.set("city", city);
    if (guests) q.set("guests", guests);
    const s = q.toString();
    return s ? `/venues?${s}` : "/venues";
  };

  const field = "rounded-lg border border-line bg-panel px-3 py-2 text-sm";
  return (
    <Mode dark={dark}>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-4xl font-bold">{dark ? "After Dark" : "Browse venues"}</h1>
        {dark && <p className="mt-2 text-muted">Lounges and nightlife spaces. Most are 21+, so check each venue&apos;s age policy.</p>}

        <nav aria-label="Event type" className="mt-6 flex flex-wrap gap-2">
          <Link
            href={chipHref()}
            aria-current={!active ? "page" : undefined}
            className={`bounce rounded-full border px-4 py-1.5 text-sm font-medium ${!active ? "border-fg bg-fg text-ink" : "border-line hover:border-gold"}`}
          >
            All
          </Link>
          {categories.map((c) => {
            const on = c === active;
            return (
              <Link
                key={c}
                href={chipHref(c)}
                aria-current={on ? "page" : undefined}
                className="bounce rounded-full border px-4 py-1.5 text-sm font-medium"
                style={on ? { background: categoryStyle[c].bg, color: categoryStyle[c].text, borderColor: categoryStyle[c].bg } : undefined}
              >
                {c}
              </Link>
            );
          })}
        </nav>

        <form className="mt-6 flex flex-wrap items-end gap-3" action="/venues">
          {active && <input type="hidden" name="category" value={active} />}
          <label className="text-sm text-muted">
            City
            <select name="city" defaultValue={city ?? ""} className={`${field} mt-1 block`}>
              <option value="">Any</option>
              {cities.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label className="text-sm text-muted">
            Guests
            <input name="guests" type="number" min={1} defaultValue={guests ?? ""} placeholder="e.g. 100" className={`${field} mt-1 block w-28`} />
          </label>
          <button className="rounded-full bg-cta px-6 py-2 text-sm font-semibold text-ctafg hover:brightness-110">Search</button>
        </form>

        {results.length ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((v) => <VenueCard key={v.slug} venue={v} />)}
          </div>
        ) : (
          <p className="mt-10 text-muted">No venues match those filters. Try widening your search.</p>
        )}

        <AdSlot placement="venues-list" className="mt-10" />
      </div>
      <NewsletterSection source="venues" />
    </Mode>
  );
}
