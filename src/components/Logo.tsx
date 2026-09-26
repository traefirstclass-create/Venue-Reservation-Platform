import Image from "next/image";
import { site } from "@/lib/site";

/** The Spotlit wordmark. Height is set by the caller (e.g. "h-10"); width follows the image ratio. */
export function Logo({ className = "h-10", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/brand/spotlit-wordmark-v2.png"
      alt={site.name}
      width={1000}
      height={324}
      priority={priority}
      className={`w-auto ${className}`}
    />
  );
}
