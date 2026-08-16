// Used as an offline fallback if the Express API isn't running.
export const mockJobs = [
  {
    id: "j1",
    title: "Frontend Engineer",
    company: "Northwind Labs",
    location: "Remote",
    type: "Full-time",
    level: "Mid",
    salary: "$90k - $120k",
    tags: ["React", "TypeScript", "Tailwind"],
    postedAt: "2026-08-01",
    description:
      "Build and maintain customer-facing interfaces used by thousands of teams daily. Own features end to end, from design review to production rollout.",
  },
  {
    id: "j2",
    title: "Backend Engineer (Node.js)",
    company: "Riverstone Analytics",
    location: "Bengaluru, IN",
    type: "Full-time",
    level: "Senior",
    salary: "22L - 30L",
    tags: ["Node.js", "Express", "PostgreSQL"],
    postedAt: "2026-08-05",
    description:
      "Design scalable APIs and data pipelines that power our analytics dashboards. Mentor junior engineers and drive architecture decisions.",
  },
  {
    id: "j3",
    title: "Product Designer",
    company: "Peregrine",
    location: "Hybrid — Pune",
    type: "Full-time",
    level: "Mid",
    salary: "14L - 20L",
    tags: ["Figma", "Design Systems"],
    postedAt: "2026-08-09",
    description:
      "Partner with PMs and engineers to design intuitive workflows for our recruiter dashboard and candidate experience.",
  },
  {
    id: "j4",
    title: "Data Analyst Intern",
    company: "Northwind Labs",
    location: "Remote",
    type: "Internship",
    level: "Entry",
    salary: "25k/mo",
    tags: ["SQL", "Excel", "Python"],
    postedAt: "2026-08-11",
    description:
      "Support the growth team with weekly reporting, cohort analysis, and dashboard maintenance. Great fit for a final-year student.",
  },
];
