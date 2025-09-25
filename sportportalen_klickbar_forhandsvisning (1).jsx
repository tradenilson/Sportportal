import React, { useState } from "react";

const routes = [
  { key: "home", label: "Hem" },
  { key: "tidningar", label: "Tidningar" },
  { key: "tidningarWeb", label: "Tidningar: Från webben" },
  { key: "hockey", label: "Hockey" },
  { key: "hockeyWeb", label: "Hockey: Från webben" },
];

const sampleTidningarWeb = [
  { title: "SHL-premiären: heta snackisar", source: "SVT Sport", time: "2025-09-22 21:05", url: "#" },
  { title: "Färjestad värvar back – klar idag", source: "HockeyNews", time: "2025-09-22 18:12", url: "#" },
  { title: "SHL publicerar nya spelschemat", source: "SHL.se", time: "2025-09-22 12:34", url: "#" },
];

const sampleHockeyWeb = [
  { title: "Frölunda HC vände i tredje", source: "Frölunda HC – Nyheter", team: "Frölunda HC", time: "2025-09-21 20:10", url: "#" },
  { title: "Djurgården testar ny formation", source: "Djurgården – Nyheter", team: "Djurgården", time: "2025-09-21 18:22", url: "#" },
  { title: "Färjestad: lägesuppdatering från tränaren", source: "Färjestad – Nyheter", team: "Färjestad", time: "2025-09-21 15:05", url: "#" },
];

const teams = [
  { name: "Frölunda HC", url: "https://www.frolundahockey.com", feeds: ["/api/articles/rss"] },
  { name: "Djurgården", url: "https://www.difhockey.se", feeds: ["/api/articles/rss"] },
  { name: "Färjestad", url: "https://www.farjestadbk.se", feeds: ["(rss bekräftas)"] },
];

export default function Preview() {
  const [route, setRoute] = useState("home");
  const [toast, setToast] = useState("");

  const importNow = () => {
    setToast("Importerade 23 nya artiklar.");
    setTimeout(() => setToast(""), 2400);
  };

  return (
    <div className="min-h-screen bg-[#0b0f14] text-[#e8f0ff]">
      <header className="bg-[#101826] border-b border-black/30 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Sportportalen</h1>
          <nav className="flex gap-2 text-sm">
            {routes.map((r) => (
              <button
                key={r.key}
                onClick={() => setRoute(r.key)}
                className={`px-3 py-1.5 rounded-full border ${
                  route === r.key
                    ? "bg-blue-600 border-blue-600"
                    : "bg-[#0f1624] border-[#1c2638] hover:border-blue-600/60"
                }`}
              >
                {r.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {route === "home" && <Home importNow={importNow} />}
        {route === "tidningar" && <TidningarManual />}
        {route === "tidningarWeb" && <TidningarWeb />}
        {route === "hockey" && <Hockey />}
        {route === "hockeyWeb" && <HockeyWeb />}
      </main>

      <footer className="bg-[#101826] border-t border-black/30">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={importNow} className="px-3 py-1.5 rounded-md bg-[#1e2a41] border border-[#2a3b5b] hover:brightness-110 text-sm">
            ↻ Importera nu
          </button>
          <small className="text-[#9db2d3]">© 2025 Sportportalen – förhandsvisning</small>
        </div>
      </footer>

      {toast && (
        <div className="fixed bottom-16 right-4 bg-[#17304e] border border-[#2a4b7a] text-[#bfe1ff] px-3 py-2 rounded-md shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}

function Card({ children }) {
  return (
    <div className="bg-[#0f1624] border border-[#1c2638] rounded-2xl p-4 shadow">
      {children}
    </div>
  );
}

function Grid({ children }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
  );
}

function Home({ importNow }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Hem</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <a onClick={importNow} className="cursor-pointer card">
          <Card>
            <h3 className="font-semibold mb-1">↻ Importera nu</h3>
            <p className="text-[#9db2d3] text-sm">Hämtar artiklar från alla RSS-källor.</p>
          </Card>
        </a>
        <Card>
          <h3 className="font-semibold mb-1">Tidningar: Från webben</h3>
          <p className="text-[#9db2d3] text-sm">Senaste importerade artiklar visas som kort.</p>
        </Card>
        <Card>
          <h3 className="font-semibold mb-1">Hockey: Lagsidor</h3>
          <p className="text-[#9db2d3] text-sm">Varje lag får feeds + resuméer.</p>
        </Card>
      </div>
    </div>
  );
}

function TidningarManual() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Tidningar – Senaste (manuella)</h2>
      <Card>
        <p className="text-[#9db2d3] text-sm">Här hamnar manuellt tillagda länkar. (I driften kommer de blandas med importer från RSS.)</p>
      </Card>
    </div>
  );
}

function TidningarWeb() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Tidningar – Från webben (RSS)</h2>
      <Grid>
        {sampleTidningarWeb.map((it, idx) => (
          <Card key={idx}>
            <h3 className="font-medium leading-snug"><a href={it.url}>{it.title}</a></h3>
            <p className="text-[#9db2d3] text-xs mt-1">{it.source} • {it.time}</p>
          </Card>
        ))}
      </Grid>
    </div>
  );
}

function Hockey() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Hockey – Lagsidor</h2>
      <Grid>
        {teams.map((t) => (
          <Card key={t.name}>
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{t.name}</h3>
              <span className="text-[#9db2d3] text-xs">{t.feeds.length} feed</span>
            </div>
            <p className="text-[#9db2d3] text-xs mt-1 truncate">{t.url}</p>
            <ul className="mt-3 space-y-1 text-sm list-disc pl-4">
              {t.feeds.map((f) => (
                <li key={f}><span className="text-[#9db2d3]">{f}</span></li>
              ))}
            </ul>
          </Card>
        ))}
      </Grid>
    </div>
  );
}

function HockeyWeb() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Hockey – Från webben (RSS)</h2>
      <Grid>
        {sampleHockeyWeb.map((it, idx) => (
          <Card key={idx}>
            <h3 className="font-medium leading-snug"><a href={it.url}>{it.title}</a></h3>
            <p className="text-[#9db2d3] text-xs mt-1">{it.source} • {it.time}</p>
            {it.team && <p className="text-[#9db2d3] text-xs mt-1">Lag: {it.team}</p>}
          </Card>
        ))}
      </Grid>
    </div>
  );
}
