import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    try {
      login(form);
      navigate("/jobs");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
      <p className="eyebrow text-gold-600">Welcome back</p>
      <h1 className="mt-2 font-display text-3xl font-bold">Log in to TalentBridge</h1>
      <p className="mt-2 text-sm text-slate2">
        New here?{" "}
        <Link to="/register" className="font-medium text-ink-950 underline underline-offset-4">
          Create an account
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
        )}
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
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mt-1 w-full rounded-xl border border-ink-950/15 bg-white px-4 py-3 text-sm outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-ink-950 py-3 text-sm font-semibold text-sand hover:bg-ink-800 transition-colors"
        >
          Log in
        </button>
      </form>
      <p className="mt-6 text-xs text-slate2">
        Demo note: accounts are stored in your browser's localStorage for this
        portfolio build — no real backend auth is involved.
      </p>
    </div>
  );
}
