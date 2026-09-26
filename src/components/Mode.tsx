/** Wraps a section in After Dark mode (midnight base, violet/magenta glow) when `dark` is true. */
export function Mode({ dark, children }: { dark?: boolean; children: React.ReactNode }) {
  if (!dark) return <>{children}</>;
  return (
    <div data-mode="dark" className="mode-surface min-h-[70vh] pb-1">
      {children}
    </div>
  );
}
