import Parser from "rss-parser"; import { prisma } from "./db"; import { normalizeUrl, isAllowedSource, parsePublishedAt } from "./filters";
type QueryConf = { name: string; googleNews: string; topics: string[] };
export async function fetchAndUpsert(queries: QueryConf[], allowedSources: string[]) {
  const parser = new Parser({ timeout: 15000 });
  for (const q of queries) {
    const feedUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(q.googleNews)}&hl=sv&gl=SE&ceid=SE:sv`;
    const feed = await parser.parseURL(feedUrl);
    for (const item of feed.items ?? []) {
      const url = normalizeUrl(item.link || ""); if (!url) continue; if (!isAllowedSource(url, allowedSources)) continue;
      try {
        await prisma.newsItem.create({ data: { source: new URL(url).hostname.replace(/^www\./,""), sourceUrl: url, title: item.title ?? "", excerpt: item.contentSnippet ?? "", publishedAt: parsePublishedAt(item.pubDate ?? undefined), topics: q.topics as any } });
      } catch (e:any) { if (!String(e?.message).includes("Unique constraint failed")) console.error("Upsert error", e); }
    }
  }
}
