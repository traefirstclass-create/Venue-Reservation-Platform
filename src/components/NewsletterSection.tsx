import { NewsletterForm } from "./NewsletterForm";

export function NewsletterSection({ source }: { source: string }) {
  return (
    <section className="mx-auto mt-24 max-w-3xl px-4">
      <div className="spotlight rounded-3xl border border-line bg-panel p-8 text-center sm:p-12">
        <h2 className="text-2xl font-bold">Be first to know</h2>
        <p className="mx-auto mt-2 max-w-md text-muted">
          Get an email when new venues join Spotlit, plus planning tips and updates. No spam, unsubscribe anytime.
        </p>
        <div className="mx-auto mt-6 max-w-md text-left"><NewsletterForm source={source} /></div>
      </div>
    </section>
  );
}
