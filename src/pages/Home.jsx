import React from "react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Live roles", value: "1,240+" },
  { label: "Hiring companies", value: "380" },
  { label: "Avg. time to hire", value: "9 days" },
];

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden bg-ink-950">
        <div className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_20%_20%,theme(colors.gold.500),transparent_45%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
          <p className="eyebrow text-gold-400">Job search, without the noise</p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-tight text-sand md:text-6xl">
            Find the role that actually fits your next chapter.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-sand/70">
            TalentBridge connects candidates with recruiters through fast search,
            transparent listings, and a dashboard built for hiring teams —
            not spreadsheets.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/jobs"
              className="rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-ink-950 hover:bg-gold-400 transition-colors"
            >
              Browse open roles
            </Link>
            <Link
              to="/register"
              className="rounded-full border border-sand/25 px-6 py-3 text-sm font-semibold text-sand hover:bg-sand/10 transition-colors"
            >
              I'm hiring
            </Link>
          </div>

          <dl className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-sand/10 pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-xs uppercase tracking-wide text-sand/50">
                  {s.label}
                </dt>
                <dd className="mt-1 font-display text-2xl font-semibold text-sand">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            {
              title: "Search that respects your time",
              body: "Filter by role, location, seniority, and tags to skip the listings that don't fit.",
            },
            {
              title: "Recruiter dashboard built-in",
              body: "Post roles, edit listings, and track applicant interest from one clean workspace.",
            },
            {
              title: "No account walls to browse",
              body: "Explore every open role first — create an account only when you're ready to apply or hire.",
            },
          ].map((f) => (
            <div key={f.title}>
              <div className="h-1 w-10 rounded-full bg-gold-500" />
              <h3 className="mt-4 font-display text-lg font-semibold">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-slate2">{f.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
