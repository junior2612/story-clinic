// app/gerador/page.tsx
'use client';

import { useMemo, useState } from 'react';
import CardButton from '@/components/CardButton';
import Link from 'next/link';

const CATEGORIES = [
  { slug: 'venda',        title: 'Venda de', subtitle: 'Produto/Serviço', icon: '💄' },
  { slug: 'lancamento',   title: 'Lançamento',           icon: '🥳' },
  { slug: 'lifestyle',    title: 'Lifestyle', subtitle: '(Dia a Dia)',     icon: '🌸' },
  { slug: 'autoridade',   title: 'Autoridade',           icon: '👩🏻‍⚕️' },
  { slug: 'desejo',       title: 'Desejo',               icon: '✨' },
  { slug: 'prova-social', title: 'Prova Social',         icon: '⭐️' },
];

export default function GeradorPage() {
  // troque por nome real vindo do perfil supabase, se quiser
  const userName = 'Damaris';

  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return CATEGORIES;
    return CATEGORIES.filter(
      c =>
        c.title.toLowerCase().includes(term) ||
        (c.subtitle ?? '').toLowerCase().includes(term),
    );
  }, [q]);

  return (
    <main className="min-h-screen bg-offWhite text-ink">
      <div className="container max-w-[64rem] mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Saudações */}
        <section className="mb-8 md:mb-10">
          <h1 className="text-[40px] leading-tight md:text-[52px] font-semibold tracking-tight">
            Oi, {userName}
            <br />
            Crie seus stories hoje?
          </h1>
        </section>

        {/* Busca */}
        <section className="mb-6 md:mb-8">
          <label
            className="
              flex items-center gap-3 bg-cacao/10 rounded-2xl
              px-4 py-4 md:px-5 md:py-4
              focus-within:ring-2 focus-within:ring-cacao/30
            "
          >
            <span className="text-2xl">🔍</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por tipo de story…"
              className="w-full bg-transparent outline-none text-base md:text-lg placeholder:text-ink/60"
            />
          </label>
        </section>

        {/* Grid de categorias */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {filtered.map((c) => (
            <CardButton
              key={c.slug}
              href={`/gerador/${c.slug}`}
              icon={c.icon}
              title={c.title}
              subtitle={c.subtitle}
            />
          ))}
        </section>

        {/* Meus Projetos */}
        <section className="mt-6 md:mt-8">
          <Link
            href="/projetos"
            className="
              flex items-center gap-3 text-ink
              bg-cacao/10 hover:bg-cacao/20 active:bg-cacao/25
              rounded-2xl px-5 py-5 md:px-6 md:py-6
              transition-colors
            "
          >
            <span className="text-2xl">📁</span>
            <span className="text-lg md:text-xl font-semibold">Meus Projetos</span>
          </Link>
        </section>
      </div>
    </main>
  );
}
