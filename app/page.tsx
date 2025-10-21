'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { STORY_TYPES } from '@/lib/ui';

type Tile = { key:string; label:string; icon:string };
const TILES: Tile[] = [
  { key:'venda', label:'Venda de Produto/Serviço', icon:'/icons/venda.svg' },
  { key:'lancamento', label:'Lançamento', icon:'/icons/lancamento.svg' },
  { key:'lifestyle', label:'Lifestyle (Dia a Dia)', icon:'/icons/lifestyle.svg' },
  { key:'autoridade', label:'Autoridade', icon:'/icons/autoridade.svg' },
  { key:'desejo', label:'Desejo', icon:'/icons/desejo.svg' },
  { key:'prova_social', label:'Prova Social', icon:'/icons/provasocial.svg' },
];

function firstNameFromEmail(email:string){
  if(!email) return '';
  const left = email.split('@')[0];
  const cleaned = left.replace(/[._-]+/g,' ');
  return cleaned.split(' ').filter(Boolean)[0]?.replace(/^./, c=>c.toUpperCase()) || '';
}

export default function Home(){
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [query, setQuery] = useState('');
  const [tipoSelecionado, setTipoSelecionado] = useState<string|null>(null);

  useEffect(()=>{
    fetch('/api/me').then(r=>r.json()).then(d=>{ setEmail(d.email||''); const n = (d.name && d.name.trim()) ? d.name.trim().split(' ')[0] : firstNameFromEmail(d.email||''); setNome(n); }).catch(()=>{}); },[]);

  const filtrados = useMemo(()=>{
    if(!query.trim()) return TILES;
    const q = query.toLowerCase();
    return TILES.filter(t => t.label.toLowerCase().includes(q));
  },[query]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
          Oi{nome?`, ${nome}`:''},<br/>Crie seus stories hoje?
        </h1>
      </div>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-60">
          <img src="/icons/buscar.svg" alt="" className="w-5 h-5"/>
        </span>
        <input
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          placeholder="Buscar por tipo de story..."
          className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[#E7DFD8] border border-[#D3C6B8] placeholder:opacity-60"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        {filtrados.map(t => (
          <button
            key={t.key}
            onClick={()=>setTipoSelecionado(t.key)}
            className="bg-[#E7DFD8] hover:bg-[#E7DFD8]/80 border border-[#D3C6B8] rounded-2xl p-5 text-left flex items-center gap-3"
          >
            <span className="w-7 h-7 shrink-0"><img src={t.icon} alt="" className="w-7 h-7 opacity-80"/></span>
            <span className="font-medium">{t.label}</span>
          </button>
        ))}
      </div>

      <Link href="/projetos" className="flex items-center gap-3 bg-[#2F2A26] text-white rounded-2xl p-4">
        <img src="/icons/pasta.svg" className="w-6 h-6 invert" alt=""/>
        <span className="font-medium">Meus Projetos</span>
      </Link>

      {tipoSelecionado && (
        <div className="card">
          <h2 className="text-lg font-semibold mb-3">Gerar rapidamente: {STORY_TYPES.find(s=>s.key===tipoSelecionado)?.label}</h2>
          <p className="text-sm opacity-80 mb-3">Atalho direto sem sair da tela (MVP). Clique para abrir o gerador focado.</p>
          <Link href={`/?tipo=${tipoSelecionado}`} className="btn">Abrir gerador</Link>
        </div>
      )}
    </div>
  );
}
