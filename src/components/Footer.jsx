import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-ink-950/10 bg-ink-950 text-sand/70">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gold-500 font-display text-xs font-bold text-ink-950">
              TB
            </span>
            <span className="font-display text-sand">TalentBridge</span>
          </div>
          <p>Built with React, Tailwind CSS, and Express — © 2026 TalentBridge.</p>
        </div>
      </div>
    </footer>
  );
}
