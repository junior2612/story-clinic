// app/sobre/page.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Informações sobre o projeto",
};

export default function Sobre() {
  return (
    <main className="container py-8">
      <h1 className="text-2xl font-semibold">Sobre</h1>
      <p className="mt-4">
        Bem-vindo à página Sobre. Aqui vão as informações da sua clínica/projeto.
      </p>
    </main>
  );
}
