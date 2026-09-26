import { placements } from "@/lib/data/ads";
import { pageMetadata } from "@/lib/seo";
import { AdvertiseForm } from "@/components/AdvertiseForm";

export const metadata = pageMetadata({
  title: "Advertise with Spotlit",
  description: "Event vendors: florists, caterers, DJs and more can reach guests planning events on Spotlit.",
  path: "/advertise",
});

export default function AdvertisePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl font-bold">Put your business in front of people planning events.</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Spotlit guests are actively choosing venues, guest counts and add-ons. Sponsored placements are clearly
        labeled and shown only where they help.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {placements.map((p) => (
          <div key={p.id} className="rounded-2xl border border-line bg-panel p-5">
            <h2 className="font-semibold text-goldtext">{p.name}</h2>
            <p className="mt-1 text-xs uppercase tracking-widest text-muted">{p.where}</p>
            <p className="mt-3 text-sm text-muted">{p.blurb}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-14 text-2xl font-bold">Request availability</h2>
      <div className="mt-6 max-w-2xl"><AdvertiseForm /></div>
    </div>
  );
}
