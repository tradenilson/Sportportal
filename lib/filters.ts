export function normalizeUrl(link: string): string | null {
  if (!link) return null; try { const u=new URL(link); const direct=u.searchParams.get("url"); const finalUrl=direct?decodeURIComponent(direct):link; return new URL(finalUrl).toString(); } catch { return null; }
}
export function isAllowedSource(url: string, allowed: string[]){ const host=new URL(url).hostname.replace(/^www\./,""); return allowed.some(a=>host===a || host.endsWith(`.${a}`)); }
export function parsePublishedAt(pub?: string | Date | null){ if(!pub) return null; try { return new Date(pub as string); } catch { return null; } }
