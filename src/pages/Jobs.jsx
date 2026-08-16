import React, { useEffect, useMemo, useState } from "react";
import JobCard from "../components/JobCard.jsx";
import { mockJobs } from "../data/mockJobs.js";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("all");
  const [type, setType] = useState("all");

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => {
        if (!res.ok) throw new Error("API unavailable");
        return res.json();
      })
      .then((data) => setJobs(data.length ? data : mockJobs))
      .catch(() => setJobs(mockJobs));
  }, []);

  const locations = useMemo(
    () => ["all", ...new Set(jobs.map((j) => j.location))],
    [jobs]
  );
  const types = useMemo(() => ["all", ...new Set(jobs.map((j) => j.type))], [jobs]);

  const filtered = jobs.filter((job) => {
    const matchesQuery =
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase()) ||
      job.tags?.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    const matchesLocation = location === "all" || job.location === location;
    const matchesType = type === "all" || job.type === type;
    return matchesQuery && matchesLocation && matchesType;
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <p className="eyebrow text-gold-600">{jobs.length} open roles</p>
      <h1 className="mt-2 font-display text-3xl font-bold">Browse jobs</h1>

      <div className="mt-6 flex flex-col gap-3 md:flex-row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, company, or skill…"
          className="flex-1 rounded-xl border border-ink-950/15 bg-white px-4 py-3 text-sm outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
        />
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="rounded-xl border border-ink-950/15 bg-white px-4 py-3 text-sm outline-none focus:border-gold-500"
        >
          {locations.map((l) => (
            <option key={l} value={l}>
              {l === "all" ? "All locations" : l}
            </option>
          ))}
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-xl border border-ink-950/15 bg-white px-4 py-3 text-sm outline-none focus:border-gold-500"
        >
          {types.map((t) => (
            <option key={t} value={t}>
              {t === "all" ? "All types" : t}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-slate2">
          No roles match those filters yet. Try widening your search.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
