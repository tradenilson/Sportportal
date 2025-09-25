// Fetch Google News RSS, filter allowed sources, write to data/news.json
import Parser from "rss-parser";
import fs from "fs"; import path from "path";

const allowedSources = ["gp.se","dn.se","svd.se","expressen.se","aftonbladet.se"];
const queries = [
  { key: "frolunda",   q: '("Frölunda HC" OR "Västra Frölunda" OR "Frölunda")' },
  { key: "brynas",     q: '("Brynäs IF" OR "Brynäs")' },
  { key: "v75",        q: '("V75" OR "trav")' },
  { key: "stryktipset",q: '("Stryktipset")' },
];

function normalizeUrl(link) {
  try {
    const u = new URL(link);
    const direct = u.searchParams.get("url");
    const finalUrl = direct ? decodeURIComponent(direct) : link;
    return new URL(finalUrl).toString();
  } catch { return null; }
}
function allowed(url) {
  try { const host=new URL(url).hostname.replace(/^www\./,"");
    return allowedSources.some(a => host===a || host.endsWith(`.${a}`));
  } catch { return false; }
}

const parser = new Parser({ timeout: 15000 });
const out = { generatedAt: new Date().toISOString(), items: { frolunda: [], brynas: [], v75: [], stryktipset: [] } };
const dedup = new Set();

for (const q of queries) {
  const feedUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(q.q)}&hl=sv&gl=SE&ceid=SE:sv`;
  // eslint-disable-next-line no-await-in-loop
  const feed = await parser.parseURL(feedUrl);
  for (const item of feed.items || []) {
    const url = normalizeUrl(item.link||""); if (!url || !allowed(url)) continue;
    if (dedup.has(url)) continue; dedup.add(url);
    out.items[q.key].push({
      title: item.title||"",
      source: (new URL(url).hostname||"").replace(/^www\./,""),
      sourceUrl: url,
      publishedAt: item.pubDate ? new Date(item.pubDate).toISOString() : null
    });
  }
}
// Sort by newest
for (const k of Object.keys(out.items)) {
  out.items[k].sort((a,b) => (new Date(b.publishedAt||0) - new Date(a.publishedAt||0)) || a.title.localeCompare(b.title));
}
fs.mkdirSync("data", { recursive: true });
fs.writeFileSync(path.join("data","news.json"), JSON.stringify(out,null,2));
console.log("Wrote data/news.json");
