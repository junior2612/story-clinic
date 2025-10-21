'use client';
import { useState } from 'react';
import { supabaseClient } from '@/lib/supabaseClient';

export default function Registrar(){
  const [firstName,setFirstName]=useState('');
  const [lastName,setLastName]=useState('');
  const [phone,setPhone]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [loading,setLoading]=useState(false);
  const [msg,setMsg]=useState<string|null>(null);
  const [err,setErr]=useState<string|null>(null);

  async function onSubmit(e:any){
    e.preventDefault(); setLoading(true); setErr(null); setMsg(null);
    const sb = supabaseClient();
    const { data, error } = await sb.auth.signUp({ email, password });
    if(error){ setErr(error.message); setLoading(false); return; }
    const user = data.user;
    if(!user){ setErr('Falha ao criar conta.'); setLoading(false); return; }
    // Create profile row (RLS allows insert for own id)
    await sb.from('profiles').insert({ id: user.id, email, first_name:firstName, last_name:lastName, phone });
    setMsg('Conta criada! Faça login para continuar.');
    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto card">
      <h1 className="text-xl font-semibold mb-2">Criar conta</h1>
      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-3">
        <input className="w-full border rounded-xl px-3 py-2" placeholder="Nome" value={firstName} onChange={e=>setFirstName(e.target.value)} required/>
        <input className="w-full border rounded-xl px-3 py-2" placeholder="Sobrenome" value={lastName} onChange={e=>setLastName(e.target.value)} required/>
        <input className="w-full border rounded-xl px-3 py-2" placeholder="Telefone (opcional)" value={phone} onChange={e=>setPhone(e.target.value)} />
        <input className="w-full border rounded-xl px-3 py-2" type="email" placeholder="E-mail" value={email} onChange={e=>setEmail(e.target.value)} required/>
        <input className="w-full border rounded-xl px-3 py-2" type="password" placeholder="Senha" value={password} onChange={e=>setPassword(e.target.value)} required/>
        <button className="btn w-full" disabled={loading}>{loading?'Criando...':'Criar conta'}</button>
        {err && <p className="text-red-600 text-sm">{err}</p>}
        {msg && <p className="text-green-700 text-sm">{msg}</p>}
      </form>
      <p className="text-sm mt-3">Já possui conta? <a className="underline" href="/entrar">Entrar</a></p>
    </div>
  )
}
