import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// SQLite database
const dbPath = join(__dirname, "..", "db", "app.db");
const db = new Database(dbPath);

app.use(cors());
app.use(express.json());

// POST /api/personality-results - Submit personality test results
app.post("/api/personality-results", (req, res) => {
  try {
    const { q1, q2, q3, q4 } = req.body;

    if (
      typeof q1 !== "number" ||
      typeof q2 !== "number" ||
      typeof q3 !== "number" ||
      typeof q4 !== "number"
    ) {
      return res.status(400).json({
        error: "Invalid input. q1, q2, q3, q4 must be numbers.",
      });
    }

    const stmt = db.prepare(
      `INSERT INTO personality_results (q1, q2, q3, q4) VALUES (?, ?, ?, ?)`
    );
    const result = stmt.run(q1, q2, q3, q4);

    const row = db
      .prepare("SELECT * FROM personality_results WHERE id = ?")
      .get(result.lastInsertRowid);

    const countRow = db
      .prepare("SELECT COUNT(*) as total FROM personality_results")
      .get();

    res.status(201).json({
      ...row,
      totalSubmissions: countRow.total,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save personality results." });
  }
});

// GET /api/personality-results/count - Get total submission count
app.get("/api/personality-results/count", (req, res) => {
  try {
    const row = db
      .prepare("SELECT COUNT(*) as total FROM personality_results")
      .get();
    res.json({ total: row.total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch count." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
