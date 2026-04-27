import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const BOOKS = {"创世记":"Genesis","创":"Genesis","gen":"Genesis","出埃及记":"Exodus","出":"Exodus","利未记":"Leviticus","利":"Leviticus","民数记":"Numbers","民":"Numbers","申命记":"Deuteronomy","申":"Deuteronomy","约书亚记":"Joshua","书":"Joshua","士师记":"Judges","士":"Judges","路得记":"Ruth","得":"Ruth","撒母耳记上":"1Samuel","撒上":"1Samuel","撒母耳记下":"2Samuel","撒下":"2Samuel","列王纪上":"1Kings","王上":"1Kings","列王纪下":"2Kings","王下":"2Kings","历代志上":"1Chronicles","代上":"1Chronicles","历代志下":"2Chronicles","代下":"2Chronicles","以斯拉记":"Ezra","拉":"Ezra","尼希米记":"Nehemiah","尼":"Nehemiah","以斯帖记":"Esther","斯":"Esther","约伯记":"Job","伯":"Job","诗篇":"Psalms","诗":"Psalms","ps":"Psalms","psa":"Psalms","箴言":"Proverbs","箴":"Proverbs","传道书":"Ecclesiastes","传":"Ecclesiastes","雅歌":"SongofSolomon","歌":"SongofSolomon","以赛亚书":"Isaiah","赛":"Isaiah","耶利米书":"Jeremiah","耶":"Jeremiah","耶利米哀歌":"Lamentations","哀":"Lamentations","以西结书":"Ezekiel","结":"Ezekiel","但以理书":"Daniel","但":"Daniel","何西阿书":"Hosea","何":"Hosea","约珥书":"Joel","珥":"Joel","阿摩司书":"Amos","摩":"Amos","俄巴底亚书":"Obadiah","俄":"Obadiah","约拿书":"Jonah","拿":"Jonah","弥迦书":"Micah","弥":"Micah","那鸿书":"Nahum","鸿":"Nahum","哈巴谷书":"Habakkuk","哈":"Habakkuk","西番雅书":"Zephaniah","番":"Zephaniah","哈该书":"Haggai","该":"Haggai","撒迦利亚书":"Zechariah","亚":"Zechariah","玛拉基书":"Malachi","玛":"Malachi","马太福音":"Matthew","太":"Matthew","mat":"Matthew","matt":"Matthew","马可福音":"Mark","可":"Mark","mrk":"Mark","路加福音":"Luke","路":"Luke","luk":"Luke","约翰福音":"John","约":"John","jhn":"John","jn":"John","使徒行传":"Acts","徒":"Acts","act":"Acts","罗马书":"Romans","罗":"Romans","rom":"Romans","哥林多前书":"1Corinthians","林前":"1Corinthians","哥林多后书":"2Corinthians","林后":"2Corinthians","加拉太书":"Galatians","加":"Galatians","gal":"Galatians","以弗所书":"Ephesians","弗":"Ephesians","eph":"Ephesians","腓立比书":"Philippians","腓":"Philippians","php":"Philippians","phil":"Philippians","歌罗西书":"Colossians","西":"Colossians","col":"Colossians","帖撒罗尼迦前书":"1Thessalonians","帖前":"1Thessalonians","帖撒罗尼迦后书":"2Thessalonians","帖后":"2Thessalonians","提摩太前书":"1Timothy","提前":"1Timothy","提摩太后书":"2Timothy","提后":"2Timothy","提多书":"Titus","多":"Titus","tit":"Titus","腓利门书":"Philemon","门":"Philemon","希伯来书":"Hebrews","来":"Hebrews","heb":"Hebrews","雅各书":"James","雅":"James","jas":"James","彼得前书":"1Peter","彼前":"1Peter","彼得后书":"2Peter","彼后":"2Peter","约翰一书":"1John","约一":"1John","约翰二书":"2John","约二":"2John","约翰三书":"3John","约三":"3John","犹大书":"Jude","犹":"Jude","jud":"Jude","启示录":"Revelation","启":"Revelation","rev":"Revelation"};

const ZH_NAMES = {"Genesis":"创世记","Exodus":"出埃及记","Leviticus":"利未记","Numbers":"民数记","Deuteronomy":"申命记","Joshua":"约书亚记","Judges":"士师记","Ruth":"路得记","1Samuel":"撒母耳记上","2Samuel":"撒母耳记下","1Kings":"列王纪上","2Kings":"列王纪下","1Chronicles":"历代志上","2Chronicles":"历代志下","Ezra":"以斯拉记","Nehemiah":"尼希米记","Esther":"以斯帖记","Job":"约伯记","Psalms":"诗篇","Proverbs":"箴言","Ecclesiastes":"传道书","SongofSolomon":"雅歌","Isaiah":"以赛亚书","Jeremiah":"耶利米书","Lamentations":"耶利米哀歌","Ezekiel":"以西结书","Daniel":"但以理书","Hosea":"何西阿书","Joel":"约珥书","Amos":"阿摩司书","Obadiah":"俄巴底亚书","Jonah":"约拿书","Micah":"弥迦书","Nahum":"那鸿书","Habakkuk":"哈巴谷书","Zephaniah":"西番雅书","Haggai":"哈该书","Zechariah":"撒迦利亚书","Malachi":"玛拉基书","Matthew":"马太福音","Mark":"马可福音","Luke":"路加福音","John":"约翰福音","Acts":"使徒行传","Romans":"罗马书","1Corinthians":"哥林多前书","2Corinthians":"哥林多后书","Galatians":"加拉太书","Ephesians":"以弗所书","Philippians":"腓立比书","Colossians":"歌罗西书","1Thessalonians":"帖撒罗尼迦前书","2Thessalonians":"帖撒罗尼迦后书","1Timothy":"提摩太前书","2Timothy":"提摩太后书","Titus":"提多书","Philemon":"腓利门书","Hebrews":"希伯来书","James":"雅各书","1Peter":"彼得前书","2Peter":"彼得后书","1John":"约翰一书","2John":"约翰二书","3John":"约翰三书","Jude":"犹大书","Revelation":"启示录"};

function parseRef(raw) {
  let s = raw.trim().replace(/：/g,':').replace(/\s+/g,' ');
  const rng = s.match(/(\d+):(\d+)-(\d+)$/);
  const single = s.match(/(\d+):(\d+)$/);
  if (!rng && !single) return null;
  const isR = !!rng;
  const ch = parseInt(isR ? rng[1] : single[1]);
  const v1 = parseInt(isR ? rng[2] : single[2]);
  const v2 = isR ? parseInt(rng[3]) : v1;
  const bookRaw = s.slice(0, s.lastIndexOf(isR ? rng[0] : single[0])).trim().replace(/\s+/g,'').toLowerCase();
  const engBook = BOOKS[bookRaw] || BOOKS[bookRaw.replace(/福音|书|记$/,'')] || null;
  if (!engBook) return null;
  return { engBook, ch, v1, v2 };
}

app.post("/api/verse", async (req, res) => {
  const { reference } = req.body || {};
  console.log("[verse] ref:", reference);
  if (!reference) return res.status(400).json({ error: "Reference required" });
  const parsed = parseRef(reference);
  if (!parsed) return res.status(400).json({ error: "Cannot parse reference" });
  const { engBook, ch, v1, v2 } = parsed;
  const zhName = ZH_NAMES[engBook] || engBook;
  try {
    const verses_en = [], verses_zh = [];
    for (let v = v1; v <= v2; v++) {
      const url_en = `https://bible-api.com/${engBook}+${ch}:${v}?translation=kjv`;
      const url_zh = `https://bible-api.com/${engBook}+${ch}:${v}?translation=cuv`;
      const [r_en, r_zh] = await Promise.all([fetch(url_en), fetch(url_zh)]);
      if (r_en.ok && r_zh.ok) {
        const d_en = await r_en.json();
        const d_zh = await r_zh.json();
        const txt_en = d_en.verses?.[0]?.text?.trim() || "";
        const txt_zh = d_zh.verses?.[0]?.text?.trim() || "";
        if (txt_en) verses_en.push(`${zhName}${ch}:${v} ${txt_en}`);
        if (txt_zh) verses_zh.push(`${zhName}${ch}:${v} ${txt_zh}`);
      }
    }
    if (!verses_en.length) return res.status(404).json({ error: "not_found" });
    console.log("[verse] SUCCESS");
    res.json({ zh: verses_zh.join('\n'), en: verses_en.join('\n') });
  } catch(e) {
    console.log("[verse] err:", e.message);
    res.status(500).json({ error: e.message });
  }
});

app.get("*", (req, res) => { res.sendFile(path.join(__dirname, "public", "index.html")); });
app.listen(PORT, () => console.log("running on " + PORT));
