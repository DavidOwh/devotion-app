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

  const MAP = {"创世记":"Genesis","创":"Genesis","出埃及记":"Exodus","出":"Exodus","利未记":"Leviticus","利":"Leviticus","民数记":"Numbers","民":"Numbers","申命记":"Deuteronomy","申":"Deuteronomy","约书亚记":"Joshua","书":"Joshua","士师记":"Judges","士":"Judges","路得记":"Ruth","得":"Ruth","撒母耳记上":"1Samuel","撒上":"1Samuel","撒母耳记下":"2Samuel","撒下":"2Samuel","列王纪上":"1Kings","王上":"1Kings","列王纪下":"2Kings","王下":"2Kings","历代志上":"1Chronicles","代上":"1Chronicles","历代志下":"2Chronicles","代下":"2Chronicles","以斯拉记":"Ezra","拉":"Ezra","尼希米记":"Nehemiah","尼":"Nehemiah","以斯帖记":"Esther","斯":"Esther","约伯记":"Job","伯":"Job","诗篇":"Psalms","诗":"Psalms","箴言":"Proverbs","箴":"Proverbs","传道书":"Ecclesiastes","传":"Ecclesiastes","雅歌":"SongofSolomon","歌":"SongofSolomon","以赛亚书":"Isaiah","赛":"Isaiah","耶利米书":"Jeremiah","耶":"Jeremiah","耶利米哀歌":"Lamentations","哀":"Lamentations","以西结书":"Ezekiel","结":"Ezekiel","但以理书":"Daniel","但":"Daniel","何西阿书":"Hosea","何":"Hosea","约珥书":"Joel","珥":"Joel","阿摩司书":"Amos","摩":"Amos","弥迦书":"Micah","弥":"Micah","哈巴谷书":"Habakkuk","哈":"Habakkuk","玛拉基书":"Malachi","玛":"Malachi","马太福音":"Matthew","太":"Matthew","马可福音":"Mark","可":"Mark","路加福音":"Luke","路":"Luke","约翰福音":"John","约":"John","使徒行传":"Acts","徒":"Acts","罗马书":"Romans","罗":"Romans","哥林多前书":"1Corinthians","林前":"1Corinthians","哥林多后书":"2Corinthians","林后":"2Corinthians","加拉太书":"Galatians","加":"Galatians","以弗所书":"Ephesians","弗":"Ephesians","腓立比书":"Philippians","腓":"Philippians","歌罗西书":"Colossians","西":"Colossians","帖撒罗尼迦前书":"1Thessalonians","帖前":"1Thessalonians","帖撒罗尼迦后书":"2Thessalonians","帖后":"2Thessalonians","提摩太前书":"1Timothy","提前":"1Timothy","提摩太后书":"2Timothy","提后":"2Timothy","提多书":"Titus","多":"Titus","希伯来书":"Hebrews","来":"Hebrews","雅各书":"James","雅":"James","彼得前书":"1Peter","彼前":"1Peter","彼得后书":"2Peter","彼后":"2Peter","约翰一书":"1John","约一":"1John","约翰二书":"2John","约二":"2John","约翰三书":"3John","约三":"3John","犹大书":"Jude","犹":"Jude","启示录":"Revelation","启":"Revelation","genesis":"Genesis","gen":"Genesis","exodus":"Exodus","exo":"Exodus","leviticus":"Leviticus","lev":"Leviticus","numbers":"Numbers","num":"Numbers","deuteronomy":"Deuteronomy","deu":"Deuteronomy","joshua":"Joshua","jos":"Joshua","judges":"Judges","jdg":"Judges","ruth":"Ruth","rut":"Ruth","1samuel":"1Samuel","1sam":"1Samuel","1sa":"1Samuel","2samuel":"2Samuel","2sam":"2Samuel","2sa":"2Samuel","1kings":"1Kings","1ki":"1Kings","2kings":"2Kings","2ki":"2Kings","1chronicles":"1Chronicles","1ch":"1Chronicles","2chronicles":"2Chronicles","2ch":"2Chronicles","ezra":"Ezra","ezr":"Ezra","nehemiah":"Nehemiah","neh":"Nehemiah","esther":"Esther","est":"Esther","job":"Job","psalms":"Psalms","psalm":"Psalms","psa":"Psalms","ps":"Psalms","proverbs":"Proverbs","pro":"Proverbs","prov":"Proverbs","ecclesiastes":"Ecclesiastes","ecc":"Ecclesiastes","isaiah":"Isaiah","isa":"Isaiah","jeremiah":"Jeremiah","jer":"Jeremiah","lamentations":"Lamentations","lam":"Lamentations","ezekiel":"Ezekiel","ezk":"Ezekiel","daniel":"Daniel","dan":"Daniel","hosea":"Hosea","hos":"Hosea","joel":"Joel","amos":"Amos","micah":"Micah","mic":"Micah","habakkuk":"Habakkuk","hab":"Habakkuk","malachi":"Malachi","mal":"Malachi","matthew":"Matthew","matt":"Matthew","mat":"Matthew","mark":"Mark","mrk":"Mark","luke":"Luke","luk":"Luke","john":"John","jhn":"John","jn":"John","acts":"Acts","act":"Acts","romans":"Romans","rom":"Romans","1corinthians":"1Corinthians","1cor":"1Corinthians","1co":"1Corinthians","2corinthians":"2Corinthians","2cor":"2Corinthians","2co":"2Corinthians","galatians":"Galatians","gal":"Galatians","ephesians":"Ephesians","eph":"Ephesians","philippians":"Philippians","phil":"Philippians","php":"Philippians","colossians":"Colossians","col":"Colossians","1thessalonians":"1Thessalonians","1thess":"1Thessalonians","1th":"1Thessalonians","2thessalonians":"2Thessalonians","2thess":"2Thessalonians","2th":"2Thessalonians","1timothy":"1Timothy","1tim":"1Timothy","1ti":"1Timothy","2timothy":"2Timothy","2tim":"2Timothy","2ti":"2Timothy","titus":"Titus","tit":"Titus","hebrews":"Hebrews","heb":"Hebrews","james":"James","jas":"James","1peter":"1Peter","1pet":"1Peter","1pe":"1Peter","2peter":"2Peter","2pet":"2Peter","2pe":"2Peter","1john":"1John","1jn":"1John","2john":"2John","2jn":"2John","3john":"3John","3jn":"3John","jude":"Jude","jud":"Jude","revelation":"Revelation","rev":"Revelation"};

  const ZHN = {"Genesis":"创世记","Exodus":"出埃及记","Leviticus":"利未记","Numbers":"民数记","Deuteronomy":"申命记","Joshua":"约书亚记","Judges":"士师记","Ruth":"路得记","1Samuel":"撒母耳记上","2Samuel":"撒母耳记下","1Kings":"列王纪上","2Kings":"列王纪下","1Chronicles":"历代志上","2Chronicles":"历代志下","Ezra":"以斯拉记","Nehemiah":"尼希米记","Esther":"以斯帖记","Job":"约伯记","Psalms":"诗篇","Proverbs":"箴言","Ecclesiastes":"传道书","SongofSolomon":"雅歌","Isaiah":"以赛亚书","Jeremiah":"耶利米书","Lamentations":"耶利米哀歌","Ezekiel":"以西结书","Daniel":"但以理书","Hosea":"何西阿书","Joel":"约珥书","Amos":"阿摩司书","Micah":"弥迦书","Habakkuk":"哈巴谷书","Malachi":"玛拉基书","Matthew":"马太福音","Mark":"马可福音","Luke":"路加福音","John":"约翰福音","Acts":"使徒行传","Romans":"罗马书","1Corinthians":"哥林多前书","2Corinthians":"哥林多后书","Galatians":"加拉太书","Ephesians":"以弗所书","Philippians":"腓立比书","Colossians":"歌罗西书","1Thessalonians":"帖撒罗尼迦前书","2Thessalonians":"帖撒罗尼迦后书","1Timothy":"提摩太前书","2Timothy":"提摩太后书","Titus":"提多书","Hebrews":"希伯来书","James":"雅各书","1Peter":"彼得前书","2Peter":"彼得后书","1John":"约翰一书","2John":"约翰二书","3John":"约翰三书","Jude":"犹大书","Revelation":"启示录"};

  let s = reference.trim().replace(/：/g,':');
  const rng = s.match(/(\d+):(\d+)-(\d+)$/);
  const single = s.match(/(\d+):(\d+)$/);
  if (!rng && !single) return res.status(400).json({ error: "格式错误" });
  const isR = !!rng;
  const ch = parseInt(isR ? rng[1] : single[1]);
  const v1 = parseInt(isR ? rng[2] : single[2]);
  const v2 = isR ? parseInt(rng[3]) : v1;
  const bookRaw = s.slice(0, s.lastIndexOf(isR ? rng[0] : single[0])).trim().replace(/\s+/g,'');
  const engBook = MAP[bookRaw] || MAP[bookRaw.toLowerCase()] || null;
  if (!engBook) { console.log("[verse] unknown book:", bookRaw); return res.status(404).json({ error: "not_found" }); }
  const zhName = ZHN[engBook] || engBook;
  console.log("[verse]", engBook, ch, v1, v2);

  try {
    const lines_zh = [], lines_en = [];
    for (let v = v1; v <= v2; v++) {
      const [r1, r2] = await Promise.all([
        fetch(`https://bible-api.com/${e
