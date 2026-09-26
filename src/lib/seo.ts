import type { Metadata } from "next";
import { site } from "./site";
import type { Venue } from "./data/venues";

export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  image?: { src: string; alt: string };
}): Metadata {
  const url = `${site.url}${opts.path}`;
  const images = opts.image ? [{ url: opts.image.src, alt: opts.image.alt }] : undefined;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: { title: opts.title, description: opts.description, url, siteName: site.name, type: "website", images },
    twitter: { card: "summary_large_image", title: opts.title, description: opts.description, images },
  };
}

export function venueJsonLd(v: Venue) {
  return {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    name: v.name,
    description: v.description,
    url: `${site.url}/venues/${v.slug}`,
    ...(v.images?.length && { image: v.images.map((i) => `${site.url}${i.src}`) }),
    address: { "@type": "PostalAddress", addressLocality: v.city, addressRegion: v.state, addressCountry: "US" },
    maximumAttendeeCapacity: v.standing,
    amenityFeature: v.amenities.map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}
