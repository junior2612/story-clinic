import "./globals.css"; import Link from "next/link";
export const metadata = { title: "Story Clinic", description: "Gerador de sequências de Stories para clínicas de estética." };
export default function RootLayout({ children }:{children:React.ReactNode}){
  return (<html lang="pt-BR"><head><link rel="manifest" href="/manifest.webmanifest"/><meta name="theme-color" content="#E7DFD8"/><link rel="apple-touch-icon" href="/icons/icon-192.png"/></head>
  <body><header className="border-b border-[#E7DFD8] sticky top-0 backdrop-blur bg-[#FAF7F2]/80">
  <div className="container flex items-center justify-between py-3"><Link href="/" className="font-semibold">Story Clinic</Link>
  <nav className="flex gap-3 text-sm"><Link className="btn" href="/">Gerador</Link><Link className="btn" href="/calendario">Calendário 7 dias</Link><Link className="btn" href="/sobre">Sobre</Link><Link className="btn" href="/projetos">Meus Projetos</Link></nav></div></header>
  <main className="container py-6">{children}</main>
  <script dangerouslySetInnerHTML={{__html:`if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js');}`}} /></body></html>)}
