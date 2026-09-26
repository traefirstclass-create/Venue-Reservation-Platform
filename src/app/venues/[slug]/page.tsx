import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getVenue, venues } from "@/lib/data/venues";
import { breadcrumbJsonLd, pageMetadata, venueJsonLd } from "@/lib/seo";
import { VenueArt } from "@/components/VenueArt";
import { LayoutVisualizer } from "@/components/LayoutVisualizer";
import { AdSlot } from "@/components/AdSlot";
import { CategoryTag } from "@/components/CategoryTag";
import { VenueGallery } from "@/components/VenueGallery";
import { Mode } from "@/components/Mode";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return venues.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const venue = getVenue((await params).slug);
  if (!venue) return {};
  return pageMetadata({
    title: `${venue.name} in ${venue.city}, ${venue.state}`,
    description: `${venue.tagline} Up to ${venue.standing} guests, from $${venue.hourlyRate}/hr. Plan your event on Spotlit.`,
    path: `/venues/${venue.slug}`,
    image: venue.images?.[0],
  });
}

export default async function VenuePage({ params }: Params) {
  const venue = getVenue((await params).slug);
  if (!venue) notFound();

  const ld = [
    venueJsonLd(venue),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Venues", path: "/venues" },
      { name: venue.name, path: `/venues/${venue.slug}` },
    ]),
  ];

  return (
    <Mode dark={venue.afterDark}>
    <article className="mx-auto max-w-6xl px-4 pb-28 pt-10 lg:pb-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/venues" className="hover:text-fg">Venues</Link> / {venue.name}
      </nav>

      {venue.images?.length ? (
        <VenueGallery images={venue.images} name={venue.name} />
      ) : (
        <VenueArt venue={venue} priority className="mt-4 h-72 rounded-3xl sm:h-96" />
      )}

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="flex flex-wrap gap-2">
            {venue.categories.map((c) => <CategoryTag key={c} category={c} />)}
          </div>
          <h1 className="mt-4 text-4xl font-bold">{venue.name}</h1>
          {venue.ageNote && (
            <p className="mt-3 inline-block rounded-full border border-magenta px-3 py-1 text-sm font-semibold">{venue.ageNote}</p>
          )}
          <p className="mt-2 text-lg text-goldtext">{venue.tagline}</p>
          <p className="mt-4 text-muted">{venue.description}</p>

          <h2 className="mt-10 text-xl font-semibold">Layouts and capacity</h2>
          <div className="mt-4"><LayoutVisualizer layouts={venue.layouts} /></div>

          <h2 className="mt-10 text-xl font-semibold">Amenities</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {venue.amenities.map((a) => (
              <li key={a} className="rounded-lg border border-line bg-panel px-4 py-2 text-sm">{a}</li>
            ))}
          </ul>

          <h2 className="mt-10 text-xl font-semibold">Great for</h2>
          <p className="mt-2 text-muted">{venue.eventTypes.join(" · ")}</p>

          {venue.cancellation && (
            <>
              <h2 className="mt-10 text-xl font-semibold">Cancellation policy</h2>
              <p className="mt-2 text-muted">{venue.cancellation}</p>
            </>
          )}
        </div>

        <aside className="h-fit rounded-2xl border border-line bg-panel p-6 lg:sticky lg:top-20">
          <p className="text-sm text-muted">Starting at</p>
          <p className="text-3xl font-bold">${venue.hourlyRate}<span className="text-base font-normal text-muted">/hr</span></p>
          <p className="mt-1 text-sm text-muted">{venue.minHours}-hour minimum · up to {venue.standing} guests</p>
          {venue.rateNote && <p className="mt-2 text-sm text-muted">{venue.rateNote}</p>}
          {venue.longBookingDiscount && (
            <p className="mt-2 text-sm text-goldtext">{Math.round(venue.longBookingDiscount * 100)}% off bookings of 8+ hours</p>
          )}
          <Link
            href={`/plan/${venue.slug}`}
            className="mt-5 block rounded-full bg-cta py-3 text-center font-semibold text-ctafg hover:brightness-110"
          >
            Plan your event
          </Link>
          <p className="mt-3 text-center text-xs text-muted">No payment until your booking is approved.</p>
          <AdSlot placement="venue-sidebar" className="mt-5" />
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-ink/95 p-3 backdrop-blur lg:hidden">
        <Link href={`/plan/${venue.slug}`} className="block rounded-full bg-cta py-3 text-center font-semibold text-ctafg">
          Plan your event · from ${venue.hourlyRate}/hr
        </Link>
      </div>
    </article>
    </Mode>
  );
}
