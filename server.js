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
  if (!reference) return res.status(400).json({ error: "Reference required" });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  const prompt = `You are a Bible verse lookup tool. Reference: "${reference}"

Provide BOTH Chinese Union Version (和合本) and English ESV.
For verse ranges like 诗23:1-6, show each verse on its own line.

Return ONLY valid JSON, no markdown, no explanation:
{"zh":"Chinese text","en":"English text","found":true}

For ranges use newline between verses. Example for 诗23:1-2:
{"zh":"诗篇23:1 耶和华是我的牧者，我必不至缺乏。\n诗篇23:2 他使我躺卧在青草地上，领我在可安歇的水边。","en":"Psalm 23:1 The Lord is my shepherd; I shall not want.\nPsalm 23:2 He makes me lie down in green pastures.","found":true}

If invalid reference: {"found":false}`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.1, maxOutputTokens: 1500 }
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(502).json({ error: "Gemini error", detail: err });
    }

    const data = await response.json();
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    text = text.replace(/```json/gi, "").replace(/```/g, "").trim();
    const i = text.indexOf("{"), j = text.lastIndexOf("}");
    if (i === -1 || j === -1) return res.status(502).json({ error: "Invalid response" });
    const parsed = JSON.parse(text.slice(i, j + 1));
    if (!parsed.found) return res.status(404).json({ error: "not_found" });
    res.json({ zh: parsed.zh || "", en: parsed.en || "" });
  } catch (err) {
    res.status(500).json({ error: "lookup_failed", message: err.message });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => console.log(`✝️ 三点灵修分享 running on port ${PORT}`));
