import { NextResponse } from "next/server"; 
import { supabaseAdmin } from "@/lib/supabase";

/**
 * Body esperado (exemplo):
 * { "email":"cliente@dominio.com", "status":"active"|"canceled", "name":"Damaris" }
 * Header: x-kiwify-secret = <KIWIFY_WEBHOOK_SECRET>
 */
export async function POST(req:Request){
  const secret=process.env.KIWIFY_WEBHOOK_SECRET;
  const got=req.headers.get('x-kiwify-secret');
  if(!secret || got !== secret) return NextResponse.json({error:'Unauthorized'},{status:401});

  const body = await req.json().catch(()=>({}));
  const email = String(body.email||'').toLowerCase();
  const status = body.status;
  const name = String(body.name||'').trim();
  if(!email || !status) return NextResponse.json({error:'missing fields'},{status:400});

  const active = status === 'active';
  const sb = supabaseAdmin();
  await sb.from('members').upsert({ email, active, name }, { onConflict:'email' });
  return NextResponse.json({ ok:true });
}
