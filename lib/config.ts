import { prisma } from "./db";
export type Settings = { pollIntervalMinutes: number; allowedSources: string[]; queries: { name: string; googleNews: string; topics: string[] }[]; };
const DEFAULTS: Settings = {
  pollIntervalMinutes: 45, allowedSources: ["gp.se","dn.se","svd.se","expressen.se","aftonbladet.se"],
  queries: [
    { name:"Frölunda HC", googleNews:'("Frölunda HC" OR "Västra Frölunda" OR "Frölunda")', topics:["ishockey","frolunda"] },
    { name:"Brynäs IF", googleNews:'("Brynäs IF" OR "Brynäs")', topics:["ishockey","brynas"] },
    { name:"V75", googleNews:'("V75" OR "trav")', topics:["trav","v75"] },
    { name:"Stryktipset", googleNews:'("Stryktipset")', topics:["stryktipset"] }
  ]
};
const KEY="core.settings";
export async function getSettings(){ const row=await prisma.config.findUnique({where:{key:KEY}}); if(!row){ await prisma.config.create({data:{key:KEY, value: DEFAULTS as any}}); return DEFAULTS;} return (row.value as any as Settings) ?? DEFAULTS; }
export async function setSettings(value: Settings){ await prisma.config.upsert({ where:{key:KEY}, create:{ key:KEY, value: value as any }, update:{ value: value as any } }); }
