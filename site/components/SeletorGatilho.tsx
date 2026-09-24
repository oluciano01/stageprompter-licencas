"use client";

import { GATILHOS } from "@/lib/gatilhos";

/** Lista de gatilhos em botões grandes — dedo apressado, cabeça quente. */
export function SeletorGatilho({
  valor,
  aoEscolher,
  legenda = "O que estava acontecendo?",
}: {
  valor: string | null;
  aoEscolher: (id: string | null) => void;
  legenda?: string;
}) {
  return (
    <fieldset>
      <legend className="mb-3 font-semibold text-tinta">{legenda}</legend>
      <div className="flex flex-wrap gap-2">
        {GATILHOS.map((gatilho) => {
          const escolhido = valor === gatilho.id;
          return (
            <button
              key={gatilho.id}
              type="button"
              onClick={() => aoEscolher(escolhido ? null : gatilho.id)}
              aria-pressed={escolhido}
              className={`rounded-xl border px-4 py-2.5 text-left font-medium ${
                escolhido
                  ? "border-acento bg-acento text-white"
                  : "border-borda bg-superficie text-tinta"
              }`}
            >
              {gatilho.rotulo}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-[15px] text-tinta-fraca">
        Pode pular. Isto fica só no seu celular e serve para você reconhecer o
        padrão depois.
      </p>
    </fieldset>
  );
}
