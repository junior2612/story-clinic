import { NextResponse } from "next/server"; import { supabaseAdmin } from "@/lib/supabase"; import { cookies } from "next/headers";
export async function POST(req:Request){ const {email}=await req.json(); if(!email) return NextResponse.json({error:"E-mail obrigatório"},{status:400});
 const sb=supabaseAdmin(); const { data, error } = await sb.from('members').select('email,active').eq('email',String(email).toLowerCase()).maybeSingle();
 if(error) return NextResponse.json({error:"Falha na verificação"},{status:500});
 if(!data||!data.active) return NextResponse.json({error:"Assinatura não ativa"},{status:403});
 (await cookies()).set('sc_email', String(email).toLowerCase(), { httpOnly:true, path:'/', maxAge:60*60*24*30 });
 return NextResponse.json({ok:true}); }
