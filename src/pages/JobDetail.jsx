import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { mockJobs } from "../data/mockJobs.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function JobDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    fetch(`/api/jobs/${id}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then(setJob)
      .catch(() => setJob(mockJobs.find((j) => j.id === id) || null));
  }, [id]);

  if (!job) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center text-slate2">
        Job not found.{" "}
        <Link to="/jobs" className="underline">
          Back to listings
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link to="/jobs" className="text-sm text-slate2 hover:text-ink-950">
        ← Back to listings
      </Link>

      <div className="mt-6 rounded-2xl border border-ink-950/10 bg-white p-8 shadow-card">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold">{job.title}</h1>
            <p className="mt-1 text-slate2">
              {job.company} · {job.location}
            </p>
          </div>
          <span className="rounded-full bg-ink-950/5 px-3 py-1 text-xs font-medium text-slate2">
            {job.type}
          </span>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {job.tags?.map((t) => (
            <span
              key={t}
              className="rounded-full bg-gold-500/10 px-3 py-1 text-xs font-medium text-gold-600"
            >
              {t}
            </span>
          ))}
        </div>

        <p className="mt-6 leading-relaxed text-slate2">{job.description}</p>

        <div className="mt-8 flex items-center justify-between border-t border-ink-950/10 pt-6">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate2">Salary</p>
            <p className="font-display text-lg font-semibold">{job.salary}</p>
          </div>
          <button
            disabled={applied}
            onClick={() => setApplied(true)}
            className="rounded-full bg-ink-950 px-6 py-3 text-sm font-semibold text-sand hover:bg-ink-800 disabled:opacity-50 transition-colors"
          >
            {applied ? "Application sent ✓" : user ? "Apply now" : "Log in to apply"}
          </button>
        </div>
      </div>
    </div>
  );
}
