import { PrismaClient } from "@prisma/client"; const prisma = new PrismaClient();
async function main(){ const c=await prisma.newsItem.count(); if(c>0){ console.log(`Already ${c} rows; skipping seed.`); return; }
  const now=new Date(); const items=[
    { source:"GP", title:"Frölunda vände i tredje perioden och vann hemma", sourceUrl:"https://example.com/frolunda/1", publishedAt:now, topics:["ishockey","frolunda"]},
    { source:"DN", title:"Skadeläget inför bortamötet i SHL", sourceUrl:"https://example.com/frolunda/2", publishedAt:now, topics:["ishockey","frolunda"]},
    { source:"Aftonbladet", title:"Brynäs tog viktig seger i toppstriden", sourceUrl:"https://example.com/brynas/1", publishedAt:now, topics:["ishockey","brynas"]},
    { source:"Expressen", title:"V75-analys: Spikförslag från Åby", sourceUrl:"https://example.com/v75/1", publishedAt:now, topics:["trav","v75"]},
    { source:"SvD", title:"Kupongläget: skador och avstängningar", sourceUrl:"https://example.com/stryktipset/1", publishedAt:now, topics:["stryktipset"]},
  ]; for(const it of items) await prisma.newsItem.create({data:{...it, excerpt:"", visible:true, pinned:false} as any}); console.log("Seed complete.");
}
main().finally(()=>prisma.$disconnect());
