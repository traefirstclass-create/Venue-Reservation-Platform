import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "./Logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-ink/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
          <Logo className="h-14" priority />
        </Link>
        <nav className="flex items-center gap-5 text-sm text-muted">
          <Link href="/venues" className="hidden hover:text-fg sm:inline">Browse venues</Link>
          <Link
            href="/venues"
            className="rounded-full bg-cta px-4 py-1.5 font-semibold text-ctafg hover:brightness-110"
          >
            Plan an event
          </Link>
        </nav>
      </div>
    </header>
  );
}
