import { categoryStyle, type Category } from "@/lib/data/venues";

export function CategoryTag({ category }: { category: Category }) {
  const s = categoryStyle[category];
  return (
    <span
      className="bounce inline-block rounded-full px-3 py-1 text-xs font-semibold"
      style={{ background: s.bg, color: s.text }}
    >
      {category}
    </span>
  );
}
