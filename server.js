import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/verse", async (req, res) => {
  const { reference } = req.body || {};
  console.log(`[verse] Request: ${JSON.stringify(req.body)}`);
  if (!reference) return res.status(400).json({ error: "Reference required" });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.log("[verse] ERROR: No API key");
    return res.status(500).json({ error: "API key not configured" });
  }
  console.log(`[verse] Key starts: ${apiKey.substring(0,8)}`);

  const prompt = `Bible lookup: "${reference}". Return ONLY JSON: {"zh":"Chinese Union Version text","en":"ESV text","found":true}. For ranges, each verse on new line. If invalid: {"found":false}`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    console.log("[verse] Calling Gemini...");
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.1, maxOutputTokens: 1500 } })
    });
    console.log(`[verse] Status: ${response.status}`);
    if (!response.ok) {
      const err = await response.text();
      console.log(`[verse] Error: ${err.substring(0,300)}`);
      return res.status(502).json({ error: "Gemini error", detail: err.substring(0,300) });
