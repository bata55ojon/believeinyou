import type { ReactNode } from "react";

export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: { heading: string; body: ReactNode }[];
}) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">{intro}</p>
      <div className="mt-10 space-y-6">
        {sections.map((s) => (
          <div
            key={s.heading}
            className="rounded-2xl border border-border bg-gradient-card p-5"
          >
            <h2 className="text-lg font-bold">{s.heading}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
