import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-ink-950" : "text-slate2 hover:text-ink-950"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-ink-950/10 bg-sand/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-950 font-display text-sm font-bold text-gold-400">
            TB
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            TalentBridge
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/jobs" className={linkClass}>
            Browse Jobs
          </NavLink>
          {user?.role === "recruiter" && (
            <NavLink to="/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden text-sm text-slate2 sm:inline">
                Hi, {user.name.split(" ")[0]}
              </span>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="rounded-full border border-ink-950/15 px-4 py-2 text-sm font-medium hover:bg-ink-950 hover:text-sand transition-colors"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-slate2 hover:text-ink-950"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-ink-950 px-4 py-2 text-sm font-medium text-sand hover:bg-ink-800 transition-colors"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
