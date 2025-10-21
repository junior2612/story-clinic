'use client';
import { useState } from 'react';
import { supabaseClient } from '@/lib/supabaseClient';

export default function Entrar(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState<string|null>(null);

  async function onSubmit(e:any){
    e.preventDefault(); setLoading(true); setErr(null);
    const sb = supabaseClient();
    const { error } = await sb.auth.signInWithPassword({ email, password });
    if(error){ setErr(error.message); setLoading(false); return; }
    // After auth, set cookie if membership is active
    const r = await fetch('/api/login',{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email }) });
    const d = await r.json();
    setLoading(false);
    if(!r.ok){ setErr(d.error || 'Assinatura não ativa'); return; }
    const red=new URLSearchParams(location.search).get('redirect')||'/';
    location.href = red;
  }

  return (
    <div className="max-w-md mx-auto card">
      <h1 className="text-xl font-semibold mb-2">Entrar</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border rounded-xl px-3 py-2" type="email" placeholder="E-mail" value={email} onChange={e=>setEmail(e.target.value)} required/>
        <input className="w-full border rounded-xl px-3 py-2" type="password" placeholder="Senha" value={password} onChange={e=>setPassword(e.target.value)} required/>
        <button className="btn w-full" disabled={loading}>{loading?'Entrando...':'Entrar'}</button>
        {err && <p className="text-red-600 text-sm">{err}</p>}
      </form>
      <p className="text-sm mt-3">Ainda não tem conta? <a className="underline" href="/registrar">Crie agora</a></p>
    </div>
  )
}
