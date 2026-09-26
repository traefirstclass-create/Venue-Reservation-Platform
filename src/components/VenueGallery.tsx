"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { VenueImage } from "@/lib/data/venues";

/** Hero photo with a thumbnail strip and a full-screen viewer (arrow keys, Esc, swipe-friendly buttons). */
export function VenueGallery({ images, name }: { images: VenueImage[]; name: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const count = images.length;

  const open = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };
  const step = useCallback((d: number) => setIndex((i) => (i + d + count) % count), [count]);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [step]);

  const thumbs = images.slice(1, 5);
  const extra = count - 5;

  return (
    <div className="mt-4">
      <div className="grid gap-2 lg:grid-cols-[2fr_1fr]">
        <button
          onClick={() => open(0)}
          aria-label={`Open ${name} photo gallery`}
          className="relative h-72 overflow-hidden rounded-3xl sm:h-[28rem]"
        >
          <Image src={images[0].src} alt={images[0].alt} fill priority sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover transition-transform duration-500 hover:scale-105" />
        </button>
        <div className="hidden grid-cols-2 gap-2 lg:grid">
          {thumbs.map((img, i) => (
            <button key={img.src} onClick={() => open(i + 1)} aria-label={`View photo ${i + 2} of ${count}`} className="relative overflow-hidden rounded-2xl">
              <Image src={img.src} alt={img.alt} fill sizes="17vw" className="object-cover transition-transform duration-500 hover:scale-105" />
              {i === thumbs.length - 1 && extra > 0 && (
                <span className="absolute inset-0 grid place-items-center bg-black/55 text-lg font-semibold text-white">+{extra} photos</span>
              )}
            </button>
          ))}
        </div>
      </div>
      <button onClick={() => open(0)} className="mt-3 text-sm font-semibold text-goldtext hover:underline lg:hidden">
        View all {count} photos
      </button>

      <dialog
        ref={dialog}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        aria-label={`${name} photos`}
        className="m-auto h-[92vh] w-[96vw] max-w-6xl overflow-hidden rounded-2xl bg-black p-0 text-white backdrop:bg-black/80"
      >
        <div className="relative h-full w-full">
          <Image key={images[index].src} src={images[index].src} alt={images[index].alt} fill sizes="96vw" className="object-contain" />
          <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-center text-sm">
            {index + 1} / {count} · {images[index].alt}
          </p>
          <button onClick={() => dialog.current?.close()} aria-label="Close gallery" className="absolute right-3 top-3 rounded-full bg-black/60 px-4 py-2 text-sm font-semibold">Close</button>
          <button onClick={() => step(-1)} aria-label="Previous photo" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 px-4 py-3 text-xl">‹</button>
          <button onClick={() => step(1)} aria-label="Next photo" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 px-4 py-3 text-xl">›</button>
        </div>
      </dialog>
    </div>
  );
}
