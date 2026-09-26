import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getVenue } from "@/lib/data/venues";
import { Planner } from "@/components/planner/Planner";
import { Mode } from "@/components/Mode";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const venue = getVenue((await params).slug);
  return { title: venue ? `Plan your event at ${venue.name}` : "Plan your event", robots: { index: false } };
}

export default async function PlanPage({ params }: Params) {
  const venue = getVenue((await params).slug);
  if (!venue) notFound();
  return (
    <Mode dark={venue.afterDark}>
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-bold">Plan your event at {venue.name}</h1>
        <p className="mt-2 text-muted">Build your plan, see a live estimate, then send your request. No payment yet.</p>
        <Planner venue={venue} />
      </div>
    </Mode>
  );
}
