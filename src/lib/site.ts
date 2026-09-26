export const site = {
  name: "Spotlit",
  tagline: "Find the venue. Plan the night. Book it in one place.",
  description:
    "Spotlit by Brand Vision Pros: browse partner venues, explore the space, build your event plan and request a quote, all in one place.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://spotlit.brandvisionpros.com",
  parent: "Brand Vision Pros",
  parentUrl: "https://brandvisionpros.com",
} as const;
