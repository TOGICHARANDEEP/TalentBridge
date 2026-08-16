import express from "express";
import cors from "cors";
import jobsRouter from "./routes/jobs.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/jobs", jobsRouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`TalentBridge API running on http://localhost:${PORT}`);
});
