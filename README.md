# TalentBridge — Job Portal Web Application

A responsive job portal with candidate and recruiter experiences, built with
React, Tailwind CSS, and a small Express API.

## Features

- **Job search & filtering** — search by title, company, or skill, and filter by location and job type.
- **Recruiter dashboard** — post, edit, and delete job listings from a dedicated workspace.
- **Client-side auth** — registration and login backed by `localStorage`, with a `candidate` / `recruiter` role split and protected routes.
- **REST API** — Express + JSON file storage exposes `GET/POST/PUT/DELETE /api/jobs`, with a mock-data fallback in the UI if the API isn't running.
- **Responsive UI** — mobile-first layouts, custom Tailwind theme, and a distinct navy/gold visual identity.

## Tech stack

React 18 · Vite · JavaScript · Tailwind CSS · React Router · Node.js · Express

## Project structure

```
job-portal/
├─ src/               # React app (Vite)
│  ├─ components/     # Navbar, Footer, JobCard, ProtectedRoute
│  ├─ context/         # AuthContext (localStorage-backed)
│  ├─ data/            # mockJobs.js — offline fallback data
│  └─ pages/           # Home, Login, Register, Jobs, JobDetail, RecruiterDashboard
└─ server/             # Express API
   ├─ data/jobs.json   # File-based job store
   └─ routes/jobs.js   # CRUD endpoints
```

## Getting started

**1. Start the API (optional but recommended):**

```bash
cd server
npm install
npm run dev        # http://localhost:4000
```

**2. Start the frontend (in a new terminal):**

```bash
npm install
npm run dev         # http://localhost:5173
```

The Vite dev server proxies `/api/*` to `http://localhost:4000`. If the API
isn't running, the app gracefully falls back to bundled mock job data so the
UI is always browsable.

## Notes

- Auth is intentionally client-side (`localStorage`) to keep the demo
  dependency-free — see `src/context/AuthContext.jsx` for the implementation.
  In a production build this would be swapped for JWT/session auth on the
  Express server.
- Only users who register with the **"I'm hiring"** role can access
  `/dashboard`.
