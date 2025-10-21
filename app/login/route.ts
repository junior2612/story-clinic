import { NextResponse, NextRequest } from "next/server";
export function GET(req:NextRequest){ const url = req.nextUrl.clone(); url.pathname='/entrar'; return NextResponse.redirect(url); }
