import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-6xl font-bold text-ink-950/10">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold">Page not found</h1>
      <Link to="/" className="mt-4 text-sm font-medium text-gold-600 underline">
        Back home
      </Link>
    </div>
  );
}
