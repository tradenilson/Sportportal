"use client";
import { useEffect, useState } from "react";
export default function Admin() {
  const [raw, setRaw] = useState("{}"); const [loading, setLoading] = useState(true);
  useEffect(()=>{(async()=>{const r=await fetch("/api/admin/config",{cache:"no-store"}); const j=await r.json(); setRaw(JSON.stringify(j,null,2)); setLoading(false);})()},[]);
  async function save(){ const parsed=JSON.parse(raw); await fetch("/api/admin/config",{method:"PUT", headers:{"Content-Type":"application/json"}, body: JSON.stringify(parsed)}); alert("Sparat!"); }
  if (loading) return <div className="muted">Laddar…</div>;
  return (<div><h1 style={{fontSize:24,fontWeight:700,marginBottom:8}}>Admin</h1><p className="muted" style={{marginBottom:12}}>Redigera config</p>
    <textarea value={raw} onChange={e=>setRaw(e.target.value)} style={{width:"100%",height:400,fontFamily:"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",fontSize:14,padding:12,borderRadius:12}}/>
    <div style={{marginTop:12}}><button onClick={save} style={{padding:"8px 14px",borderRadius:10,background:"#2563eb",color:"white",border:0}}>Spara</button></div></div>);
}
