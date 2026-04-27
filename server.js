import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const MAP = {"约":"43","约翰福音":"43","太":"40","马太福音":"40","可":"41","马可福音":"41","路":"42","路加福音":"42","徒":"44","使徒行传":"44","罗":"45","罗马书":"45","林前":"46","哥林多前书":"46","林后":"47","哥林多后书":"47","加":"48","加拉太书":"48","弗":"49","以弗所书":"49","腓":"50","腓立比书":"50","西":"51","歌罗西书":"51","帖前":"52","帖后":"53","提前":"54","提后":"55","多":"56","提多书":"56","来":"58","希伯来书":"58","雅":"59","雅各书":"59","彼前":"60","彼后":"61","约一":"62","约二":"63","约三":"64","犹":"65","犹大书":"65","启":"66","启示录":"66","诗":"19","诗篇":"19","箴":"20","箴言":"20","传":"21","传道书":"21","创":"1","创世记":"1","出":"2","出埃及记":"2","利":"3","利未记":"3","民":"4","民数记":"4","申":"5","申命记":"5","书":"6","约书亚记":"6","士":"7","士师记":"7","得":"8","路得记":"8","撒上":"9","撒下":"10","王上":"11","王下":"12","代上":"13","代下":"14","拉":"15","以斯拉记":"15","尼":"16","尼希米记":"16","斯":"17","以斯帖记":"17","伯":"18","约伯记":"18","赛":"23","以赛亚书":"23","耶":"24","耶利米书":"24","哀":"25","结":"26","以西结书":"26","但":"27","但以理书":"27","何":"28","何西阿书":"28","珥":"29","约珥书":"29","摩":"30","阿摩司书":"30","弥":"33","弥迦书":"33","哈":"35","哈巴谷书":"35","玛":"39","玛拉基书":"39","john":"43","jhn":"43","jn":"43","matt":"40","mat":"40","matthew":"40","mark":"41","mrk":"41","luke":"42","luk":"42","acts":"44","act":"44","romans":"45","rom":"45","genesis":"1","gen":"1","exodus":"2","exo":"2","psalms":"19","psalm":"19","ps":"19","psa":"19","proverbs":"20","pro":"20","prov":"20","isaiah":"23","isa":"23","jeremiah":"24","jer":"24","revelation":"66","rev":"66","hebrews":"58","heb":"58","james":"59","jas":"59","philippians":"50","phil":"50","php":"50","ephesians":"49","eph":"49","colossians":"51","col":"51","galatians":"48","gal":"48"};

const ZHN = {"1":"创世记","2":"出埃及记","3":"利未记","4":"民数记","5":"申命记","6":"约书亚记","7":"士师记","8":"路得记","9":"撒母耳记上","10":"撒母耳记下","11":"列王纪上","12":"列王纪下","13":"历代志上","14":"历代志下","15":"以斯拉记","16":"尼希米记","17":"以斯帖记","18":"约伯记","19":"诗篇","20":"箴言","21":"传道书","22":"雅歌","23":"以赛亚书","24":"耶利米书","25":"耶利米哀歌","26":"以西结书","27":"但以理书","28":"何西阿书","29":"约珥书","30":"阿摩司书","33":"弥迦书","35":"哈巴谷书","39":"玛拉基书","40":"马太福音","41":"马可福音","42":"路加福音","43":"约翰福音","44":"使徒行传","45":"罗马书","46":"哥林多前书","47":"哥林多后书","48":"加拉太书","49":"以弗所书","50":"腓立比书","51":"歌罗西书","52":"帖撒罗尼迦前书","53":"帖撒罗尼迦后书","54":"提摩太前书","55":"提摩太后书","56":"提多书","58":"希伯来书","59":"雅各书","60":"彼得前书","61":"彼得后书","62":"约翰一书","63":"约翰二书","64":"约翰三书","65":"犹大书","66":"启示录"};

app.post("/api/verse", async (req, res) => {
  const { reference } = req.body || {};
  if (!reference) return res.status(400).json({ error: "Reference required" });
  let s = reference.trim().replace(/：/g,':');
  const rng = s.match(/(\d+):(\d+)-(\d+)$/);
  const single = s.match(/(\d+):(\d+)$/);
  if (!rng && !single) return res.status(400).json({ error: "格式错误" });
  const isR = !!rng;
  const ch = parseInt(isR ? rng[1] : single[1]);
  const v1 = parseInt(isR ? rng[2] : single[2]);
  const v2 = isR ? parseInt(rng[3]) : v1;
  const bookRaw = s.slice(0, s.lastIndexOf(isR ? rng[0] : single[0])).trim().replace(/\s+/g,'');
  const bookNum = MAP[bookRaw] || MAP[bookRaw.toLowerCase()] || null;
  if (!bookNum) return res.status(404).json({ error: "not_found" });
  const zhName = ZHN[bookNum] || bookRaw;
  console.log("[verse]", bookNum, ch, v1, v2);
  try {
    const lines_zh = [], lines_en = [];
    for (let v = v1; v <= v2; v++) {
      const [r1, r2] = await Promise.all([
        fetch(`https://bolls.life/get-verse/CUV/${bookNum}/${ch}/${v}/`),
        fetch(`https://bolls.life/get-verse/ESV/${bookNum}/${ch}/${v}/`)
      ]);
      if (r1.ok) {
        const d = await r1.json();
        console.log("[zh raw]", JSON.stringify(d).substring(0,100));
        if(d.text) lines_zh.push(`${zhName}${ch}:${v} ${d.text.replace(/<[^>]*>/g,'').trim()}`);
      }
      if (r2.ok) {
        const d = await r2.json();
        if(d.text) lines_en.push(`${zhName}${ch}:${v} ${d.text.replace(/<[^>]*>/g,'').trim()}`);
      }
    }
    if (!lines_zh.length && !lines_en.length) return res.status(404).json({ error: "not_found" });
    res.json({ zh: lines_zh.join('\n'), en: lines_en.join('\n') });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("*", (req, res) => { res.sendFile(path.join(__dirname, "public", "index.html")); });
app.listen(PORT, () => console.log("running on " + PORT));
