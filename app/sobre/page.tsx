"use client";

export default function Sobre() {
  return (
    <main className="container py-8">
      <h1 className="text-2xl font-semibold">Sobre</h1>

      <p className="mt-4 text-sm text-zinc-700">
        Este é o Story Clinic — um app simples para criar roteiros/ideias.
        Funciona bem em desktop e celular. 
      </p>

      {/* Exemplo: se quiser interações, já está habilitado por ser "use client" */}
      {/* <button onClick={() => alert("Oi!") } className="mt-6 px-4 py-2 rounded bg-black text-white">
        Testar botão
      </button> */}
    </main>
  );
}
