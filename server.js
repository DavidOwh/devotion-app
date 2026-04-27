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
  console.log("[verse] ref:", reference);
  if (!reference) return res.status(400).json({ error: "Reference required" });
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "No API key" });
  console.log("[verse] key:", apiKey.substring(0, 8));
  try {
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey;
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: 'Bible lookup: "' + reference + '". Return ONLY JSON: {"zh":"Chinese Union Version","en":"ESV","found":true}. If invalid: {"found":false}' }] }] })
    });
    console.log("[verse] status:", r.status);
    if (!r.ok) { const e = await r.text(); console.log("[verse] err:", e); return res.status(502).json({ error: e }); }
    const d = await r.json();
    let t = d.candidates?.[0]?.content?.parts?.[0]?.text || "";
    console.log("[verse] raw:", t.substring(0, 100));
    t = t.replace(/```json/gi, "").replace(/```/g, "").trim();
    const i = t.indexOf("{"), j = t.lastIndexOf("}");
    if (i === -1) return res.status(502).json({ error: "No JSON" });
    const p = JSON.parse(t.slice(i, j + 1));
    if (!p.found) return res.status(404).json({ error: "not_found" });
    res.json({ zh: p.zh || "", en: p.en || "" });
  } catch (e) {
    console.log("[verse] exception:", e.message);
    res.status(500).json({ error: e.message });
  }
});
app.get("*", (req, res) => { res.sendFile(path.join(__dirname, "public", "index.html")); });
app.listen(PORT, () => console.log("running on " + PORT));
