async function fetchNews(topic?: string) {
  const url = topic ? `/api/news?topic=${topic}` : `/api/news`;
  const res = await fetch(url, { cache: "no-store" });
  return res.json();
}

function Card({ title, items }: { title: string; items: any[] }) {
  return (
    <div className="card">
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>{title}</h2>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((it: any) => (
          <li key={it.id} style={{ marginBottom: 12 }}>
            <a href={it.sourceUrl} target="_blank" rel="noreferrer">{it.title}</a>
            <div style={{ fontSize: 12 }} className="muted">
              {it.source} • {it.publishedAt ? new Date(it.publishedAt).toLocaleString("sv-SE") : "okänt datum"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function Page() {
  const [frolunda, brynas, v75, stryktipset] = await Promise.all([
    fetchNews("frolunda"), fetchNews("brynas"), fetchNews("v75"), fetchNews("stryktipset")
  ]);
  return (
    <main className="grid">
      <Card title="Ishockey – Frölunda HC" items={frolunda} />
      <Card title="Ishockey – Brynäs IF" items={brynas} />
      <Card title="V75 / Trav" items={v75} />
      <Card title="Stryktipset" items={stryktipset} />
    </main>
  );
}
