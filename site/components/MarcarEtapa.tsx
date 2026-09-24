"use client";

import Link from "next/link";
import { useEstado, type Etapa } from "@/lib/estado";

/**
 * Botão de "já fiz isso" no fim dos guias. Fica no fim de propósito: a
 * pessoa sai do site, resolve a coisa lá fora e volta para marcar.
 */
export function MarcarEtapa({
  etapa,
  rotulo,
  proximo,
}: {
  etapa: Etapa;
  rotulo: string;
  proximo?: { href: string; texto: string };
}) {
  const { estado, pronto, marcarEtapa } = useEstado();
  const feita = estado?.etapas[etapa] ?? false;

  if (!pronto) {
    // Espaço reservado até o navegador ler o que estava guardado.
    return <div className="h-[86px] rounded-2xl bg-superficie-2" aria-hidden />;
  }

  return (
    <div
      className={`rounded-2xl border p-5 ${
        feita
          ? "border-acento bg-acento-suave"
          : "border-borda bg-superficie"
      }`}
    >
      <button
        type="button"
        onClick={() => marcarEtapa(etapa, !feita)}
        aria-pressed={feita}
        className="flex w-full items-center gap-3 text-left"
      >
        <span
          aria-hidden="true"
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-2 ${
            feita
              ? "border-acento bg-acento text-white"
              : "border-tinta-fraca bg-superficie"
          }`}
        >
          {feita ? "✓" : ""}
        </span>
        <span className="text-[17px] font-semibold text-tinta">
          {feita ? `Feito: ${rotulo}` : rotulo}
        </span>
      </button>

      {feita && (
        <p className="mt-3 text-[15px] text-tinta">
          Marcado. Se quiser desfazer, é só tocar de novo.
          {proximo && (
            <>
              {" "}
              <Link href={proximo.href} className="font-semibold text-acento">
                {proximo.texto}
              </Link>
            </>
          )}
        </p>
      )}
    </div>
  );
}
