import { prisma } from "./db";
async function triggerExists(name: string){ const r=await prisma.$queryRawUnsafe<{name:string}[]>(`SELECT name FROM sqlite_master WHERE type='trigger' AND name = ?`, name); return r.length>0; }
async function tableExists(name: string){ const r=await prisma.$queryRawUnsafe<{name:string}[]>(`SELECT name FROM sqlite_master WHERE type IN ('table','view','virtual') AND name = ?`, name); return r.length>0; }
export async function ensureFts(){
  if(!(await tableExists("news_item_fts"))){ await prisma.$executeRawUnsafe(`CREATE VIRTUAL TABLE news_item_fts USING fts5(title, excerpt, content='NewsItem', content_rowid='id')`); }
  if(!(await triggerExists("news_item_ai"))){ await prisma.$executeRawUnsafe(`CREATE TRIGGER news_item_ai AFTER INSERT ON NewsItem BEGIN INSERT INTO news_item_fts(rowid,title,excerpt) VALUES (new.id, new.title, coalesce(new.excerpt,'')); END;`); }
  if(!(await triggerExists("news_item_ad"))){ await prisma.$executeRawUnsafe(`CREATE TRIGGER news_item_ad AFTER DELETE ON NewsItem BEGIN INSERT INTO news_item_fts(news_item_fts,rowid,title,excerpt) VALUES('delete', old.id, old.title, coalesce(old.excerpt,'')); END;`); }
  if(!(await triggerExists("news_item_au"))){ await prisma.$executeRawUnsafe(`CREATE TRIGGER news_item_au AFTER UPDATE ON NewsItem BEGIN INSERT INTO news_item_fts(news_item_fts,rowid,title,excerpt) VALUES('delete', old.id, old.title, coalesce(old.excerpt,'')); INSERT INTO news_item_fts(rowid,title,excerpt) VALUES (new.id, new.title, coalesce(new.excerpt,'')); END;`); }
}
export async function searchFts(q: string){
  await ensureFts(); const rows = await prisma.$queryRawUnsafe<any[]>(`SELECT n.id,n.title,n.source,n.sourceUrl,n.publishedAt FROM news_item_fts f JOIN NewsItem n ON n.id=f.rowid WHERE news_item_fts MATCH ? ORDER BY rank LIMIT 50`, q); return rows;
}
