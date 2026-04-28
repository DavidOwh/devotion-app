import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const MAP = {"约":"JHN","约翰福音":"JHN","太":"MAT","马太福音":"MAT","可":"MRK","马可福音":"MRK","路":"LUK","路加福音":"LUK","徒":"ACT","使徒行传":"ACT","罗":"ROM","罗马书":"ROM","林前":"1CO","哥林多前书":"1CO","林后":"2CO","哥林多后书":"2CO","加":"GAL","加拉太书":"GAL","弗":"EPH","以弗所书":"EPH","腓":"PHP","腓立比书":"PHP","西":"COL","歌罗西书":"COL","帖前":"1TH","帖撒罗尼迦前书":"1TH","帖后":"2TH","帖撒罗尼迦后书":"2TH","提前":"1TI","提摩太前书":"1TI","提后":"2TI","提摩太后书":"2TI","多":"TIT","提多书":"TIT","来":"HEB","希伯来书":"HEB","雅":"JAS","雅各书":"JAS","彼前":"1PE","彼得前书":"1PE","彼后":"2PE","彼得后书":"2PE","约一":"1JO","约翰一书":"1JO","约二":"2JO","约翰二书":"2JO","约三":"3JO","约翰三书":"3JO","犹":"JDE","犹大书":"JDE","启":"REV","启示录":"REV","诗":"PSA","诗篇":"PSA","箴":"PRO","箴言":"PRO","传":"ECC","传道书":"ECC","创":"GEN","创世记":"GEN","出":"EXO","出埃及记":"EXO","利":"LEV","利未记":"LEV","民":"NUM","民数记":"NUM","申":"DEU","申命记":"DEU","书":"JOS","约书亚记":"JOS","士":"JDG","士师记":"JDG","得":"RUT","路得记":"RUT","撒上":"1SA","撒母耳记上":"1SA","撒下":"2SA","撒母耳记下":"2SA","王上":"1KI","列王纪上":"1KI","王下":"2KI","列王纪下":"2KI","代上":"1CH","历代志上":"1CH","代下":"2CH","历代志下":"2CH","拉":"EZR","以斯拉记":"EZR","尼":"NEH","尼希米记":"NEH","斯":"EST","以斯帖记":"EST","伯":"JOB","约伯记":"JOB","赛":"ISA","以赛亚书":"ISA","耶":"JER","耶利米书":"JER","哀":"LAM","耶利米哀歌":"LAM","结":"EZK","以西结书":"EZK","但":"DAN","但以理书":"DAN","何":"HOS","何西阿书":"HOS","珥":"JOL","约珥书":"JOL","摩":"AMO","阿摩司书":"AMO","弥":"MIC","弥迦书":"MIC","哈":"HAB","哈巴谷书":"HAB","玛":"MAL","玛拉基书":"MAL","john":"JHN","jhn":"JHN","jn":"JHN","matt":"MAT","mat":"MAT","matthew":"MAT","mark":"MRK","mrk":"MRK","luke":"LUK","luk":"LUK","acts":"ACT","act":"ACT","romans":"ROM","rom":"ROM","genesis":"GEN","gen":"GEN","exodus":"EXO","exo":"EXO","psalms":"PSA","psalm":"PSA","ps":"PSA","psa":"PSA","proverbs":"PRO","pro":"PRO","prov":"PRO","isaiah":"ISA","isa":"ISA","jeremiah":"JER","jer":"JER","revelation":"REV","rev":"REV","hebrews":"HEB","heb":"HEB","james":"JAS","jas":"JAS","philippians":"PHP","phil":"PHP","php":"PHP","ephesians":"EPH","eph":"EPH","colossians":"COL","col":"COL","galatians":"GAL","gal":"GAL","1corinthians":"1CO","1cor":"1CO","1co":"1CO","2corinthians":"2CO","2cor":"2CO","2co":"2CO","1thessalonians":"1TH","1thess":"1TH","1th":"1TH","2thessalonians":"2TH","2thess":"2TH","2th":"2TH","1timothy":"1TI","1tim":"1TI","1ti":"1TI","2timothy":"2TI","2tim":"2TI","2ti":"2TI","titus":"TIT","tit":"TIT","1peter":"1PE","1pet":"1PE","1pe":"1PE","2peter":"2PE","2pet":"2PE","2pe":"2PE","1john":"1JO","1jn":"1JO","2john":"2JO","2jn":"2JO","3john":"3JO","3jn":"3JO","jude":"JDE","jud":"JDE"};

const ZHN = {"JHN":"约翰福音","MAT":"马太福音","MRK":"马可福音","LUK":"路加福音","ACT":"使徒行传","ROM":"罗马书","1CO":"哥林多前书","2CO":"哥林多后书","GAL":"加拉太书","EPH":"以弗所书","PHP":"腓立比书","COL":"歌罗西书","1TH":"帖撒罗尼迦前书","2TH":"帖撒罗尼迦后书","1TI":"提摩太前书","2TI":"提摩太后书","TIT":"提多书","HEB":"希伯来书","JAS":"雅各书","1PE":"彼得前书","2PE":"彼得后书","1JO":"约翰一书","2JO":"约翰二书","3JO":"约翰三书","JDE":"犹大书","REV":"启示录","PSA":"诗篇","PRO":"箴言","ECC":"传道书","GEN":"创世记","EXO":"出埃及记","LEV":"利未记","NUM":"民数记","DEU":"申命记","JOS":"约书亚记","JDG":"士师记","RUT":"路得记","1SA":"撒母耳记上","2SA":"撒母耳记下","1KI":"列王纪上","2KI":"列王纪下","1CH":"历代志上","2CH":"历代志下","EZR":"以斯拉记","NEH":"尼希米记","EST":"以斯帖记","JOB":"约伯记","ISA":"以赛亚书","JER":"耶利米书","LAM":"耶利米哀歌","EZK":"以西结书","DAN":"但以理书","HOS":"何西阿书","JOL":"约珥书","AMO":"阿摩司书","MIC":"弥迦书","HAB":"哈巴谷书","MAL":"玛拉基书"};

const ENN = {"JHN":"John","MAT":"Matthew","MRK":"Mark","LUK":"Luke","ACT":"Acts","ROM":"Romans","1CO":"1 Corinthians","2CO":"2 Corinthians","GAL":"Galatians","EPH":"Ephesians","PHP":"Philippians","COL":"Colossians","1TH":"1 Thessalonians","2TH":"2 Thessalonians","1TI":"1 Timothy","2TI":"2 Timothy","TIT":"Titus","HEB":"Hebrews","JAS":"James","1PE":"1 Peter","2PE":"2 Peter","1JO":"1 John","2JO":"2 John","3JO":"3 John","JDE":"Jude","REV":"Revelation","PSA":"Psalms","PRO":"Proverbs","ECC":"Ecclesiastes","GEN":"Genesis","EXO":"Exodus","LEV":"Leviticus","NUM":"Numbers","DEU":"Deuteronomy","JOS":"Joshua","JDG":"Judges","RUT":"Ruth","1SA":"1 Samuel","2SA":"2 Samuel","1KI":"1 Kings","2KI":"2 Kings","1CH":"1 Chronicles","2CH":"2 Chronicles","EZR":"Ezra","NEH":"Nehemiah","EST":"Esther","JOB":"Job","ISA":"Isaiah","JER":"Jeremiah","LAM":"Lamentations","EZK":"Ezekiel","DAN":"Daniel","HOS":"Hosea","JOL":"Joel","AMO":"Amos","MIC":"Micah","HAB":"Habakkuk","MAL":"Malachi"};

// getBible book number map
const BOOK_NUM = {"GEN":1,"EXO":2,"LEV":3,"NUM":4,"DEU":5,"JOS":6,"JDG":7,"RUT":8,"1SA":9,"2SA":10,"1KI":11,"2KI":12,"1CH":13,"2CH":14,"EZR":15,"NEH":16,"EST":17,"JOB":18,"PSA":19,"PRO":20,"ECC":21,"SNG":22,"ISA":23,"JER":24,"LAM":25,"EZK":26,"DAN":27,"HOS":28,"JOL":29,"AMO":30,"OBA":31,"JNA":32,"MIC":33,"NAM":34,"HAB":35,"ZEP":36,"HAG":37,"ZEC":38,"MAL":39,"MAT":40,"MRK":41,"LUK":42,"JHN":43,"ACT":44,"ROM":45,"1CO":46,"2CO":47,"GAL":48,"EPH":49,"PHP":50,"COL":51,"1TH":52,"2TH":53,"1TI":54,"2TI":55,"TIT":56,"PHM":57,"HEB":58,"JAS":59,"1PE":60,"2PE":61,"1JO":62,"2JO":63,"3JO":64,"JDE":65,"REV":66};

app.post("/api/verse", async (req, res) => {
  const { reference } = req.body || {};
  if (!reference) return res.status(400).json({ error: "Reference required" });
  let s = reference.trim().replace(/：/g,':').replace(/\s+/g,' ');
  const rng = s.match(/(\d+):(\d+)-(\d+)$/);
  const single = s.match(/(\d+):(\d+)$/);
  if (!rng && !single) return res.status(400).json({ error: "格式错误" });
  const isR = !!rng;
  const ch = parseInt(isR ? rng[1] : single[1]);
  const v1 = parseInt(isR ? rng[2] : single[2]);
  const v2 = isR ? parseInt(rng[3]) : v1;
  const bookRaw = s.slice(0, s.lastIndexOf(isR ? rng[0] : single[0])).trim().replace(/\s+/g,'');
  const bookCode = MAP[bookRaw] || MAP[bookRaw.toLowerCase()] || null;
  if (!bookCode) return res.status(404).json({ error: "not_found" });

  const zhName = ZHN[bookCode] || bookCode;
  const enName = ENN[bookCode] || bookCode;
  const bookNum = BOOK_NUM[bookCode];
  if (!bookNum) return res.status(404).json({ error: "not_found" });

  try {
    const lines_zh = [], lines_en = [];
    for (let v = v1; v <= v2; v++) {
      const [r1, r2] = await Promise.all([
        // getBible API - simplified Chinese (zh_cuv)
        fetch(`https://getbible.net/v2/zh_cuv/${bookNum}/${ch}.json`),
        // bolls.life for ESV
        fetch(`https://bolls.life/get-verse/ESV/${bookCode}/${ch}/${v}/`)
      ]);
      if (r1.ok) {
        const chData = await r1.json();
        const verseText = chData.verses?.[v-1]?.verse || chData.verses?.[String(v)]?.verse || '';
        if (verseText) lines_zh.push(`${zhName}${ch}:${v} ${verseText.trim()}`);
      }
      if (r2.ok) {
        const d = await r2.json();
        if (d.text) lines_en.push(`${enName} ${ch}:${v} ${d.text.replace(/<[^>]*>/g,'').trim()}`);
      }
    }
    if (!lines_zh.length && !lines_en.length) return res.status(404).json({ error: "not_found" });
    res.json({ zh: lines_zh.join('\n'), en: lines_en.join('\n') });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("*", (req, res) => { res.sendFile(path.join(__dirname, "public", "index.html")); });
app.listen(PORT, () => console.log(`✝️ 三点灵修分享 running on port ${PORT}`));
