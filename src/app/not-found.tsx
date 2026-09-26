import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      <p className="text-5xl font-extrabold text-goldtext">404</p>
      <h1 className="mt-4 text-2xl font-bold">That page isn&apos;t in the spotlight.</h1>
      <p className="mt-2 text-muted">It may have moved. Let&apos;s get you back to finding a venue.</p>
      <Link href="/venues" className="mt-8 inline-block rounded-full bg-cta px-7 py-3 font-semibold text-ctafg hover:brightness-110">
        Browse venues
      </Link>
    </div>
  );
}
