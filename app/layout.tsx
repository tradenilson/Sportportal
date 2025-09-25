import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sportportalen",
  description: "Frölunda HC, Brynäs IF, V75 & Stryktipset – senaste rubrikerna",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body>
        <div className="container">
          <header style={{ marginBottom: 16, display: "flex", alignItems: "end", justifyContent: "space-between", gap: 12 }}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <img src="/logo.svg" className="logo" alt="Logo" />
              <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.2 }}>
                <span>Sport</span><span style={{color:"var(--accent)"}}>portalen</span>
              </h1>
            </div>
            <p className="muted" style={{ fontSize: 13 }}>Frölunda HC, Brynäs IF, V75 & Stryktipset • uppdateras var 45:e minut</p>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
