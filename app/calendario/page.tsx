'use client'; import { useState } from 'react'; import { STORY_TYPES } from '@/lib/ui'; const dias=['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];
export default function Page(){ const [plan,setPlan]=useState(Array.from({length:7},(_,i)=>({dia:dias[i],tipo:STORY_TYPES[i%STORY_TYPES.length].key,tema:''})));
function upd(i:number,field:'tipo'|'tema',val:string){ const n=[...plan]; (n[i] as any)[field]=val; setPlan(n); }
function copiar(){ const t=plan.map(p=>`${p.dia}: ${STORY_TYPES.find(t=>t.key===p.tipo)?.label} — ${p.tema||'sem tema'}`).join('\n'); navigator.clipboard.writeText(t); alert('Planejamento copiado!'); }
return (<div className="card"><div className="flex items-center justify-between mb-3"><h1 className="text-xl font-semibold">Calendário de 7 dias</h1><button className="btn" onClick={copiar}>Copiar</button></div>
<div className="grid md:grid-cols-7 gap-3">{plan.map((p,i)=>(<div key={i} className="border rounded-xl p-3 bg-white"><div className="text-xs mb-2">{p.dia}</div>
<label className="block text-sm">Tipo<select value={p.tipo} onChange={e=>upd(i,'tipo',e.target.value)} className="w-full border rounded-xl px-2 py-1 bg-white mt-1">{STORY_TYPES.map(t=><option key={t.key} value={t.key}>{t.label}</option>)}</select></label>
<label className="block text-sm mt-2">Tema<input value={p.tema} onChange={e=>upd(i,'tema',e.target.value)} className="w-full border rounded-xl px-2 py-1 bg-white mt-1" placeholder="Ex.: Skinbooster para verão"/></label></div>))}</div></div>)}
