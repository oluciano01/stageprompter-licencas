"use client";

import { useEffect, useState } from "react";

/** Inspirar 4, segurar 4, soltar 6. Ciclo de 14 segundos. */
const FASES = [
  { nome: "Puxe o ar", segundos: 4 },
  { nome: "Segure", segundos: 4 },
  { nome: "Solte devagar", segundos: 6 },
] as const;

const CICLO = FASES.reduce((total, fase) => total + fase.segundos, 0);

function faseEm(segundoDoCiclo: number) {
  let acumulado = 0;
  for (let i = 0; i < FASES.length; i++) {
    acumulado += FASES[i].segundos;
    if (segundoDoCiclo < acumulado) {
      const inicio = acumulado - FASES[i].segundos;
      return {
        indice: i,
        nome: FASES[i].nome,
        restante: Math.ceil(acumulado - segundoDoCiclo),
        progresso: (segundoDoCiclo - inicio) / FASES[i].segundos,
      };
    }
  }
  const ultima = FASES[FASES.length - 1];
  return { indice: 2, nome: ultima.nome, restante: 1, progresso: 1 };
}

/**
 * Respiração guiada. Não é técnica de tratamento: é uma coisa concreta para
 * a pessoa fazer com o corpo enquanto os minutos passam.
 */
export function Respiracao({ ativa }: { ativa: boolean }) {
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    if (!ativa) return;
    const relogio = setInterval(() => setSegundos((s) => s + 0.1), 100);
    return () => clearInterval(relogio);
  }, [ativa]);

  const fase = faseEm(segundos % CICLO);

  // Cresce ao puxar, fica cheio ao segurar, encolhe ao soltar.
  const escala =
    fase.indice === 0
      ? 0.6 + fase.progresso * 0.4
      : fase.indice === 1
        ? 1
        : 1 - fase.progresso * 0.4;

  return (
    <div className="flex flex-col items-center py-6">
      <div className="relative flex h-52 w-52 items-center justify-center">
        <div
          className="absolute h-52 w-52 rounded-full bg-acento-suave"
          style={{
            transform: `scale(${escala})`,
            transition: "transform 120ms linear",
          }}
          aria-hidden="true"
        />
        <div className="relative text-center">
          <p className="text-2xl font-bold text-acento">{fase.nome}</p>
          <p className="mt-1 text-4xl font-bold tabular-nums text-acento">
            {fase.restante}
          </p>
        </div>
      </div>
      <p className="mt-4 max-w-sm text-center text-[15px] text-tinta-fraca">
        Puxe o ar contando até 4, segure contando até 4, solte devagar contando
        até 6. Se ficar tonto, respire normal — o importante é o tempo passar.
      </p>
    </div>
  );
}
