import Link from "next/link";
import { site } from "@/lib/site";
import { venues, categories, categoryStyle, NIGHTLIFE } from "@/lib/data/venues";
import { VenueCard } from "@/components/VenueCard";
import { NewsletterSection } from "@/components/NewsletterSection";

const steps = [
  { n: "1", title: "Explore", body: "Browse partner venues, see layouts, capacity and amenities." },
  { n: "2", title: "Plan", body: "Build your event: date, guests, setup and add-ons with a live estimate." },
  { n: "3", title: "Book", body: "Send your request, get a quote, and pay securely once it's approved." },
];

export default function Home() {
  const featured = venues.filter((v) => v.featured);
  return (
    <>
      <section className="spotlight">
        <div className="rise mx-auto max-w-4xl px-4 pb-20 pt-24 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-goldtext">By {site.parent}</p>
          <h1 className="mt-4 text-5xl font-bold sm:text-7xl">
            Put your event in the <span className="italic text-goldtext">spotlight</span>.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">{site.tagline}</p>
          <div className="mt-10 flex justify-center gap-3">
            <Link href="/venues" className="rounded-full bg-cta px-7 py-3 font-semibold text-ctafg hover:brightness-110">
              Browse venues
            </Link>
            <a href="#how" className="rounded-full border border-line px-7 py-3 font-semibold hover:border-gold">
              How it works
            </a>
          </div>
        </div>
      </section>

      <section aria-label="Event types" className="mx-auto mb-20 flex max-w-6xl flex-wrap justify-center gap-3 px-4">
        {categories.map((c) => (
          <Link
            key={c}
            href={`/venues?category=${encodeURIComponent(c)}`}
            className="bounce rounded-full px-5 py-2 text-sm font-semibold"
            style={{ background: categoryStyle[c].bg, color: categoryStyle[c].text }}
          >
            {c}
          </Link>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold">Featured venues</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((v) => (
            <VenueCard key={v.slug} venue={v} />
          ))}
        </div>
      </section>

      <section id="how" className="mx-auto mt-24 max-w-6xl px-4">
        <h2 className="text-3xl font-bold">How it works</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-line bg-panel p-6">
              <span className="text-3xl font-extrabold text-goldtext">{s.n}</span>
              <h3 className="mt-3 font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section data-mode="dark" className="mode-surface mt-24 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-goldtext">21+ · Nightlife & Lounges</p>
          <h2 className="mt-3 text-4xl font-bold">
            When the sun goes down, <span className="italic" style={{ color: "var(--magenta)" }}>the night begins</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">Explore lounges and late-night spaces for birthdays, promoter nights and private parties.</p>
          <Link href={`/venues?category=${encodeURIComponent(NIGHTLIFE)}`} className="mt-8 inline-block rounded-full bg-cta px-7 py-3 font-semibold text-ctafg hover:brightness-110">
            Enter After Dark
          </Link>
        </div>
      </section>

      <NewsletterSection source="home" />
    </>
  );
}
