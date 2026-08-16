import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { mockJobs } from "../data/mockJobs.js";

const empty = {
  title: "",
  company: "",
  location: "",
  type: "Full-time",
  level: "Mid",
  salary: "",
  tags: "",
  description: "",
};

export default function RecruiterDashboard() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("");

  function loadJobs() {
    fetch("/api/jobs")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setJobs(data.length ? data : mockJobs))
      .catch(() => setJobs(mockJobs));
  }

  useEffect(loadJobs, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      postedBy: user.email,
    };
    try {
      const res = await fetch(
        editingId ? `/api/jobs/${editingId}` : "/api/jobs",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) throw new Error();
      setStatus(editingId ? "Listing updated." : "Listing posted.");
      setForm(empty);
      setEditingId(null);
      loadJobs();
    } catch {
      setStatus("Couldn't reach the API — start the Express server (see README) to persist changes.");
    }
  }

  async function handleDelete(id) {
    try {
      const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      loadJobs();
    } catch {
      setStatus("Couldn't reach the API — start the Express server to delete listings.");
    }
  }

  function startEdit(job) {
    setEditingId(job.id);
    setForm({
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      level: job.level,
      salary: job.salary,
      tags: job.tags?.join(", ") || "",
      description: job.description,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <p className="eyebrow text-gold-600">Recruiter dashboard</p>
      <h1 className="mt-2 font-display text-3xl font-bold">Manage your listings</h1>
      <p className="mt-2 text-sm text-slate2">
        Signed in as {user?.email}. Posting requires the Express API in{" "}
        <code>/server</code> to be running on port 4000.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[380px_1fr]">
        <form
          onSubmit={handleSubmit}
          className="h-fit space-y-3 rounded-2xl border border-ink-950/10 bg-white p-6 shadow-card"
        >
          <h2 className="font-display text-lg font-semibold">
            {editingId ? "Edit listing" : "Post a new role"}
          </h2>
          {status && <p className="text-xs text-gold-600">{status}</p>}
          {[
            ["title", "Job title"],
            ["company", "Company"],
            ["location", "Location"],
            ["salary", "Salary range"],
            ["tags", "Tags (comma separated)"],
          ].map(([key, label]) => (
            <div key={key}>
              <label className="text-xs font-medium text-slate2">{label}</label>
              <input
                required={key !== "tags"}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="mt-1 w-full rounded-lg border border-ink-950/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
              />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate2">Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="mt-1 w-full rounded-lg border border-ink-950/15 px-3 py-2 text-sm"
              >
                {["Full-time", "Part-time", "Internship", "Contract"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate2">Level</label>
              <select
                value={form.level}
                onChange={(e) => setForm({ ...form, level: e.target.value })}
                className="mt-1 w-full rounded-lg border border-ink-950/15 px-3 py-2 text-sm"
              >
                {["Entry", "Mid", "Senior", "Lead"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-slate2">Description</label>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="mt-1 w-full rounded-lg border border-ink-950/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
            />
          </div>
          <div className="flex gap-2 pt-1">
            <button
              type="submit"
              className="flex-1 rounded-lg bg-ink-950 py-2.5 text-sm font-semibold text-sand hover:bg-ink-800"
            >
              {editingId ? "Save changes" : "Post listing"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm(empty);
                }}
                className="rounded-lg border border-ink-950/15 px-4 text-sm font-medium"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="flex items-start justify-between gap-4 rounded-2xl border border-ink-950/10 bg-white p-5 shadow-card"
            >
              <div>
                <h3 className="font-display font-semibold">{job.title}</h3>
                <p className="text-sm text-slate2">
                  {job.company} · {job.location} · {job.type}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => startEdit(job)}
                  className="rounded-lg border border-ink-950/15 px-3 py-1.5 text-xs font-medium hover:bg-ink-950/5"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
