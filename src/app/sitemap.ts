import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { venues } from "@/lib/data/venues";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/venues`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/advertise`, changeFrequency: "monthly", priority: 0.5 },
    ...venues.map((v) => ({
      url: `${site.url}/venues/${v.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
