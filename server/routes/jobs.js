import { Router } from "express";
import { randomUUID } from "crypto";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, "..", "data", "jobs.json");

async function readJobs() {
  const raw = await readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

async function writeJobs(jobs) {
  await writeFile(DATA_FILE, JSON.stringify(jobs, null, 2));
}

const router = Router();

// GET /api/jobs
router.get("/", async (req, res) => {
  const jobs = await readJobs();
  res.json(jobs);
});

// GET /api/jobs/:id
router.get("/:id", async (req, res) => {
  const jobs = await readJobs();
  const job = jobs.find((j) => j.id === req.params.id);
  if (!job) return res.status(404).json({ error: "Job not found" });
  res.json(job);
});

// POST /api/jobs
router.post("/", async (req, res) => {
  const jobs = await readJobs();
  const newJob = {
    id: randomUUID(),
    postedAt: new Date().toISOString().slice(0, 10),
    ...req.body,
  };
  jobs.unshift(newJob);
  await writeJobs(jobs);
  res.status(201).json(newJob);
});

// PUT /api/jobs/:id
router.put("/:id", async (req, res) => {
  const jobs = await readJobs();
  const idx = jobs.findIndex((j) => j.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Job not found" });
  jobs[idx] = { ...jobs[idx], ...req.body, id: jobs[idx].id };
  await writeJobs(jobs);
  res.json(jobs[idx]);
});

// DELETE /api/jobs/:id
router.delete("/:id", async (req, res) => {
  const jobs = await readJobs();
  const filtered = jobs.filter((j) => j.id !== req.params.id);
  if (filtered.length === jobs.length)
    return res.status(404).json({ error: "Job not found" });
  await writeJobs(filtered);
  res.status(204).end();
});

export default router;
