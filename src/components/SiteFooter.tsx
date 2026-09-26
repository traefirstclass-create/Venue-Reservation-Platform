import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line py-10 text-sm text-muted">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:justify-between">
        <div>
          <Logo className="h-12" />
          <p className="mt-2">
            © {new Date().getFullYear()} {site.name}, powered by{" "}
            <a href={site.parentUrl} className="text-fg hover:text-goldtext">{site.parent}</a>.
          </p>
        </div>
        <nav aria-label="Footer" className="flex gap-8">
          <div className="flex flex-col gap-2">
            <Link href="/venues" className="hover:text-fg">Browse venues</Link>
            <Link href="/#how" className="hover:text-fg">How it works</Link>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/advertise" className="hover:text-fg">Advertise with us</Link>
            <a href={site.parentUrl} className="hover:text-fg">{site.parent}</a>
          </div>
        </nav>
      </div>
    </footer>
  );
}
