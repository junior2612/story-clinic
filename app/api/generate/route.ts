import { NextResponse } from "next/server"; import OpenAI from "openai"; import { supabaseAdmin } from "@/lib/supabase";
export async function POST(req:Request){ try{
 const { tipo, nicho='Clínica de estética', tom='amigável e profissional', ofertas='' } = await req.json();
 const sb = supabaseAdmin(); const { data: persona } = await sb.from('personas').select('*').eq('is_default',true).maybeSingle();
 const { data: tpl } = await sb.from('templates').select('*').eq('type_key', tipo).maybeSingle();
 const system = "Você é o Story Clinic, um gerador de sequências de Stories para clínicas de estética. Entregue 4-6 cards com título curto, texto de 2-3 linhas e CTA curto. Evite promessas médicas.";

 const prompt = `Persona: ${persona?.name||'Padrão'} - ${persona?.voice||''}
 Regras: ${persona?.rules||''}
 Tipo: ${tpl?.type_label||tipo}
 Nicho: ${nicho}
 Tom: ${tom}
 Oferta: ${ofertas||'n/d'}
 Estrutura: ${tpl?.structure||'Abertura • Benefício • Prova/Autoridade • Oferta/CTA'}
 Responda em JSON: [{"titulo":"","texto":"","cta":""}]`;

 const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
 const r = await openai.chat.completions.create({ model:"gpt-4o-mini", temperature:0.8, response_format:{type:'json_object'}, messages:[{role:'system',content:system},{role:'user',content:prompt}] });
 const content = r.choices[0].message.content || "[]";
 let items:any; try{ items=JSON.parse(content);}catch{ items=[]; }
 return NextResponse.json({ items });
 }catch(e:any){ return NextResponse.json({error:e.message||'Erro'},{status:500}); } }
