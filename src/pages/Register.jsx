import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
  });
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    try {
      const session = register(form);
      navigate(session.role === "recruiter" ? "/dashboard" : "/jobs");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
      <p className="eyebrow text-gold-600">Join TalentBridge</p>
      <h1 className="mt-2 font-display text-3xl font-bold">Create your account</h1>
      <p className="mt-2 text-sm text-slate2">
        Already have one?{" "}
        <Link to="/login" className="font-medium text-ink-950 underline underline-offset-4">
          Log in
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
        )}

        <div className="grid grid-cols-2 gap-3">
          {[
            { key: "candidate", label: "I'm job hunting" },
            { key: "recruiter", label: "I'm hiring" },
          ].map((opt) => (
            <button
              type="button"
              key={opt.key}
              onClick={() => setForm({ ...form, role: opt.key })}
              className={`rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                form.role === opt.key
                  ? "border-ink-950 bg-ink-950 text-sand"
                  : "border-ink-950/15 text-slate2 hover:border-ink-950/40"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div>
          <label className="text-sm font-medium">Full name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1 w-full rounded-xl border border-ink-950/15 bg-white px-4 py-3 text-sm outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
            placeholder="Jordan Patel"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1 w-full rounded-xl border border-ink-950/15 bg-white px-4 py-3 text-sm outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            required
            minLength={6}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mt-1 w-full rounded-xl border border-ink-950/15 bg-white px-4 py-3 text-sm outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
            placeholder="At least 6 characters"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-ink-950 py-3 text-sm font-semibold text-sand hover:bg-ink-800 transition-colors"
        >
          Create account
        </button>
      </form>
    </div>
  );
}
