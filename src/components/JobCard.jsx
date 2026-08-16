import React from "react";
import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <Link
      to={`/jobs/${job.id}`}
      className="group block rounded-2xl border border-ink-950/10 bg-white p-6 shadow-card transition-transform hover:-translate-y-1"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-semibold text-ink-950 group-hover:text-gold-600 transition-colors">
            {job.title}
          </h3>
          <p className="mt-1 text-sm text-slate2">
            {job.company} · {job.location}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-ink-950/5 px-3 py-1 text-xs font-medium text-slate2">
          {job.type}
        </span>
      </div>

      <p className="mt-4 line-clamp-2 text-sm text-slate2">{job.description}</p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {job.tags?.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-gold-500/10 px-3 py-1 text-xs font-medium text-gold-600"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-ink-950/5 pt-4 text-sm">
        <span className="font-semibold text-ink-950">{job.salary}</span>
        <span className="text-slate2">{job.level} level</span>
      </div>
    </Link>
  );
}
