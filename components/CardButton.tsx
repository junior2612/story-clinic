// components/CardButton.tsx
'use client';

import { ReactNode } from 'react';
import Link from 'next/link';

type Props = {
  href?: string;
  icon: ReactNode;
  title: string;
  subtitle?: string;
  onClick?: () => void;
};

export default function CardButton({ href, icon, title, subtitle, onClick }: Props) {
  const content = (
    <div
      className="
        flex items-center justify-center gap-3 text-ink
        bg-cacao/10 hover:bg-cacao/20 active:bg-cacao/25
        rounded-2xl p-6 md:p-7
        transition-colors
        min-h-[120px]
      "
      onClick={onClick}
    >
      <div className="text-3xl md:text-4xl">{icon}</div>
      <div className="text-center">
        <div className="text-lg md:text-xl font-semibold">{title}</div>
        {subtitle ? (
          <div className="text-sm md:text-base text-ink/80 -mt-0.5">{subtitle}</div>
        ) : null}
      </div>
    </div>
  );

  return href ? <Link href={href} className="block">{content}</Link> : content;
}
