"use client";

import { useId, useState, type ReactNode } from "react";

/**
 * Abas Android / iPhone. Uma pessoa só tem um celular — mostrar as duas
 * trilhas ao mesmo tempo faz ela se perder no meio do caminho.
 */
export function Trilha({
  abas,
}: {
  abas: { chave: string; rotulo: string; conteudo: ReactNode }[];
}) {
  const [atual, setAtual] = useState(abas[0].chave);
  const id = useId();

  return (
    <div>
      <div
        role="tablist"
        aria-label="Escolha o seu celular"
        className="mb-6 flex gap-2 rounded-xl bg-superficie-2 p-1.5"
      >
        {abas.map((aba) => {
          const selecionada = aba.chave === atual;
          return (
            <button
              key={aba.chave}
              type="button"
              role="tab"
              id={`${id}-aba-${aba.chave}`}
              aria-selected={selecionada}
              aria-controls={`${id}-painel-${aba.chave}`}
              onClick={() => setAtual(aba.chave)}
              className={`flex-1 rounded-lg px-4 py-2.5 text-[16px] font-semibold ${
                selecionada
                  ? "bg-superficie text-acento shadow-sm"
                  : "text-tinta-fraca"
              }`}
            >
              {aba.rotulo}
            </button>
          );
        })}
      </div>

      {abas.map((aba) => (
        <div
          key={aba.chave}
          role="tabpanel"
          id={`${id}-painel-${aba.chave}`}
          aria-labelledby={`${id}-aba-${aba.chave}`}
          hidden={aba.chave !== atual}
        >
          {aba.conteudo}
        </div>
      ))}
    </div>
  );
}
