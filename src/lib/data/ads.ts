export type PlacementId = "venue-sidebar" | "venues-list" | "planner-partner";

export const placements: { id: PlacementId; name: string; where: string; blurb: string }[] = [
  {
    id: "venue-sidebar",
    name: "Venue page spotlight",
    where: "Beside every venue's details",
    blurb: "Reach guests while they compare spaces and layouts.",
  },
  {
    id: "venues-list",
    name: "Browse page feature",
    where: "Inside the venue search results",
    blurb: "Get seen by everyone actively searching for a venue.",
  },
  {
    id: "planner-partner",
    name: "Planner partner slot",
    where: "In the event planner, next to the estimate",
    blurb: "Reach guests at the moment they decide what their event needs.",
  },
];

export type Ad = {
  placement: PlacementId;
  vendor: string;
  category: string;
  headline: string;
  url: string;
};

// Active sponsors. Leave empty until a vendor books a slot; empty slots show the "advertise" prompt.
// Example: { placement: "venue-sidebar", vendor: "Bloom & Co", category: "Florist", headline: "Event florals, delivered and styled.", url: "https://example.com" }
export const ads: Ad[] = [];

export const adFor = (placement: PlacementId) => ads.find((a) => a.placement === placement);
