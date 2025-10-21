import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(req: NextRequest){
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/api") || pathname.startsWith("/sobre") || pathname.startsWith("/manifest") || pathname.startsWith("/icons") || pathname==="/sw.js") return NextResponse.next();
  if (pathname.startsWith("/login")) return NextResponse.next();
  const email = req.cookies.get("sc_email")?.value;
  if(!email){
    const url = req.nextUrl.clone(); url.pathname="/login"; url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
