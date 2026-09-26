export const categories = [
  "Family & Kids",
  "Pool & Day Parties",
  "Weddings & Galas",
  "Corporate",
  "Nightlife & Lounges",
] as const;
export type Category = (typeof categories)[number];

/** Tag colors from the brand palette. `text` is the readable text color on that background. */
export const categoryStyle: Record<Category, { bg: string; text: string }> = {
  "Family & Kids": { bg: "#ffb547", text: "#14182b" },
  "Pool & Day Parties": { bg: "#2ec4b6", text: "#14182b" },
  "Weddings & Galas": { bg: "#c9a45c", text: "#14182b" },
  Corporate: { bg: "#14182b", text: "#fbf8f3" },
  "Nightlife & Lounges": { bg: "#8b5cf6", text: "#ffffff" },
};

export const NIGHTLIFE: Category = "Nightlife & Lounges";

export type VenueImage = { src: string; alt: string };

const photo = (slug: string, file: string, alt: string): VenueImage => ({
  src: `/venues/${slug}/${file}.jpg`,
  alt,
});

export type Layout = { name: string; capacity: number };
export type AddOn = { id: string; label: string; price: number; perHour?: boolean };

export type Venue = {
  slug: string;
  name: string;
  city: string;
  state: string;
  tagline: string;
  description: string;
  hourlyRate: number;
  minHours: number;
  seated: number;
  standing: number;
  eventTypes: string[];
  amenities: string[];
  layouts: Layout[];
  addOns: AddOn[];
  /** Photos in display order; the first is the card, hero and social-share image. */
  images?: VenueImage[];
  /** Two CSS colors for the placeholder art when a venue has no photos. */
  palette: [string, string];
  categories: Category[];
  /** Renders the venue's pages in After Dark mode (nightlife, lounges, 21+). */
  afterDark?: boolean;
  /** e.g. "21+ with valid ID". Shown prominently on the venue page. */
  ageNote?: string;
  featured?: boolean;
  /** Neighborhood shown alongside the city. */
  area?: string;
  /** Fraction off the room rate for bookings of 8+ hours, e.g. 0.15 = 15%. */
  longBookingDiscount?: number;
  /** Shown under the price when the rate varies. */
  rateNote?: string;
  cancellation?: string;
  /** Marks illustrative venues that are not real partners. */
  sample?: boolean;
};

// Real partners first, then illustrative samples (sample: true). Later loaded from Supabase.
// Partner details below come from their public Peerspace listings; confirm direct-booking terms.
const allVenues: Venue[] = [
  {
    slug: "alibaba-hookah-lounge",
    name: "Alibaba Hookah Lounge",
    city: "Tampa",
    state: "FL",
    area: "Forest Hills",
    tagline: "A stylish lounge for meetings, parties and shoots.",
    description:
      "An 850 sq ft modern lounge with dark leather seating, wall-mounted screens, decorative lighting and wood paneling. Flexible enough for business meetings, parties, cultural celebrations, photo and video shoots, and podcast recordings, with catering available.",
    hourlyRate: 75,
    minHours: 2,
    seated: 10,
    standing: 10,
    longBookingDiscount: 0.15,
    cancellation: "Full refund up to 7 days before; 50% refund from 7 days to 24 hours before.",
    eventTypes: ["Meeting", "Party", "Wedding", "Cultural celebration", "Photo or video shoot", "Podcast"],
    amenities: [
      "Bluetooth sound system",
      "Customizable lighting",
      "High-speed Wi-Fi",
      "Wall-mounted screens",
      "Bar area",
      "Kitchen access",
      "On-site parking",
      "Wheelchair-accessible restrooms",
    ],
    layouts: [{ name: "Lounge seating", capacity: 10 }],
    addOns: [
      { id: "photo", label: "Professional photography", price: 400 },
      { id: "video", label: "Videography", price: 750 },
      { id: "dj", label: "DJ services", price: 500 },
      { id: "catering", label: "Food and drink catering", price: 80 },
      { id: "podcast", label: "Podcast production", price: 150, perHour: true },
    ],
    images: [
      photo("alibaba-hookah-lounge", "07", "Black leather lounge chairs facing a black-and-white mural under rope and lantern ceiling lights"),
      photo("alibaba-hookah-lounge", "04", "Mural wall of a bearded man with a pipe beside the Shisha Ali Baba logo, with leather lounge chairs in front"),
      photo("alibaba-hookah-lounge", "01", "Lounge seating with a wall TV, fireplace and neon Alibaba sign"),
      photo("alibaba-hookah-lounge", "08", "Wall TV above an electric fireplace between wood-slat walls with neon signs"),
      photo("alibaba-hookah-lounge", "03", "Leather armchairs and a hookah beside a wood-slat wall with a lit sign"),
      photo("alibaba-hookah-lounge", "05", "Moody, dimly lit view of the lounge with the mural and street-facing windows"),
    ],
    palette: ["#e83e8c", "#1b1035"],
    categories: ["Nightlife & Lounges", "Corporate"],
    afterDark: true,
    featured: true,
  },
  {
    slug: "fusion-hookah-lounge",
    name: "Fusion Hookah Lounge",
    city: "Tampa",
    state: "FL",
    area: "County Line Coalition",
    tagline: "Neon-lit lounge with a DJ booth and backlit bar.",
    description:
      "An upscale urban lounge of 1,400 sq ft with black leather seating, marble tables, 3D wall panels and RGB lighting. Built for DJ nights, mixers, brand events, parties and shoots, with a pro DJ booth, seven smart TVs and a backlit bar.",
    hourlyRate: 150,
    minHours: 4,
    seated: 75,
    standing: 75,
    longBookingDiscount: 0.1,
    rateNote: "Rates run $150 to $200 per hour. Your quote confirms the final rate.",
    cancellation: "Full refund if cancelled 7+ days before; 50% refund from 7 days to 24 hours before; non-refundable within 24 hours.",
    eventTypes: ["Party", "DJ night", "Mixer", "Brand event", "Photo or video shoot"],
    amenities: [
      "DJ booth with pro loudspeakers",
      "Portable PA system",
      "Bluetooth audio",
      "7 smart TVs (HDMI and AirPlay)",
      "Backlit bar",
      "Breakout space",
      "Plaza parking",
      "Wheelchair accessible",
      "Professional cleaning included",
    ],
    layouts: [{ name: "Lounge seating", capacity: 75 }],
    addOns: [],
    images: [
      photo("fusion-hookah-lounge", "02", "Wide view of the lounge with leather sofas, orange pillows, marble tables and wall TVs under neon lighting"),
      photo("fusion-hookah-lounge", "07", "Lounge hall lit in red and violet with wall TVs and rows of leather sofas"),
      photo("fusion-hookah-lounge", "01", "Purple-lit leather sofas and marble tables along the lounge wall"),
      photo("fusion-hookah-lounge", "03", "Stone-front bar and lounge seating with the Fusion Fam sign on the right"),
      photo("fusion-hookah-lounge", "04", "Pink-lit lounge with leather sofas, tables and the backlit bar in the distance"),
      photo("fusion-hookah-lounge", "09", "Backlit bar with the Fusion sign, a neon hello and hookahs on the shelf"),
      photo("fusion-hookah-lounge", "06", "Stone-front bar with a hookah shelf and lounge seating behind it"),
      photo("fusion-hookah-lounge", "10", "Backlit back bar with hookahs, bottles and glassware"),
      photo("fusion-hookah-lounge", "05", "Wood and 3D wall panels with wall TVs above a leather sofa"),
    ],
    palette: ["#8b5cf6", "#0e0f1a"],
    categories: ["Nightlife & Lounges"],
    afterDark: true,
    featured: true,
  },
  {
    slug: "the-grand-hall",
    name: "The Grand Hall",
    city: "Atlanta",
    state: "GA",
    tagline: "Soaring ceilings for weddings and galas.",
    description:
      "A historic ballroom with 24-foot ceilings, a built-in stage and a dedicated bridal suite. Ideal for weddings, galas and large corporate events.",
    hourlyRate: 450,
    minHours: 4,
    seated: 220,
    standing: 350,
    eventTypes: ["Wedding", "Gala", "Corporate", "Quinceañera"],
    amenities: ["Stage", "Bridal suite", "Catering kitchen", "Valet parking", "Sound system", "Wheelchair accessible"],
    layouts: [
      { name: "Banquet rounds", capacity: 220 },
      { name: "Theater", capacity: 300 },
      { name: "Cocktail", capacity: 350 },
    ],
    addOns: [
      { id: "av", label: "AV and lighting package", price: 400 },
      { id: "linens", label: "Premium linens", price: 250 },
      { id: "security", label: "Event security", price: 300 },
    ],
    palette: ["#e2b76a", "#7c4a1d"],
    categories: ["Weddings & Galas", "Corporate"],
    sample: true,
  },
  {
    slug: "loft-on-fifth",
    name: "Loft on Fifth",
    city: "Atlanta",
    state: "GA",
    tagline: "Industrial-chic loft with skyline views.",
    description:
      "An open loft with exposed brick, floor-to-ceiling windows and a rooftop terrace. Great for launches, photo shoots and private parties.",
    hourlyRate: 250,
    minHours: 3,
    seated: 80,
    standing: 140,
    eventTypes: ["Party", "Product launch", "Photo shoot", "Corporate"],
    amenities: ["Rooftop terrace", "Bar area", "Wi-Fi", "Projector", "Sound system"],
    layouts: [
      { name: "Lounge", capacity: 90 },
      { name: "Classroom", capacity: 60 },
      { name: "Cocktail", capacity: 140 },
    ],
    addOns: [
      { id: "bartender", label: "Bartender service", price: 350 },
      { id: "av", label: "AV package", price: 200 },
    ],
    palette: ["#8b5cf6", "#1e1b4b"],
    categories: ["Nightlife & Lounges", "Corporate"],
    afterDark: true,
    ageNote: "21+ with valid ID after 9pm",
    sample: true,
  },
  {
    slug: "garden-terrace",
    name: "Garden Terrace",
    city: "Decatur",
    state: "GA",
    tagline: "Outdoor garden with a covered pavilion.",
    description:
      "A landscaped garden with a covered pavilion, string lights and a fountain. Weather-ready for showers, receptions and reunions.",
    hourlyRate: 320,
    minHours: 4,
    seated: 150,
    standing: 200,
    eventTypes: ["Wedding", "Bridal shower", "Reunion", "Party"],
    amenities: ["Covered pavilion", "Restrooms", "Parking", "Fountain", "Wheelchair accessible"],
    layouts: [
      { name: "Banquet rounds", capacity: 150 },
      { name: "Ceremony rows", capacity: 180 },
      { name: "Cocktail", capacity: 200 },
    ],
    addOns: [
      { id: "tent", label: "Heated tent", price: 600 },
      { id: "chairs", label: "Chair and table rental", price: 300 },
    ],
    palette: ["#7ad6c4", "#1f5f57"],
    categories: ["Weddings & Galas", "Family & Kids", "Pool & Day Parties"],
    sample: true,
  },
];

// Illustrative samples show in dev only, never on the live site.
export const venues = allVenues.filter((v) => !v.sample || process.env.NODE_ENV !== "production");
export const getVenue = (slug: string) => venues.find((v) => v.slug === slug);
export const cities = [...new Set(venues.map((v) => v.city))].sort();
export const eventTypes = [...new Set(venues.flatMap((v) => v.eventTypes))].sort();
