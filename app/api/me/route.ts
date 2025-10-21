import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(){
  const email = (await cookies()).get("sc_email")?.value || "";
  if(!email) return NextResponse.json({ email:"", name:"" });
  const sb = supabaseAdmin();
  const { data: prof } = await sb.from("profiles").select("first_name,last_name").eq("email", email).maybeSingle();
  const name = [prof?.first_name || "", prof?.last_name || ""].filter(Boolean).join(" ").trim();
  return NextResponse.json({ email, name });
}
