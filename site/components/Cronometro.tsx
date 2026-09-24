"use client";

import { useEffect, useState } from "react";

function formatarTempo(segundos: number): string {
  const m = Math.floor(segundos / 60);
  const s = segundos % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

/**
 * Conta o tempo pelo relógio do sistema, não somando ticks: se a pessoa
 * bloquear a tela ou trocar de aplicativo no meio, os minutos continuam
 * correndo do mesmo jeito.
 */
export function Cronometro({
  totalSegundos,
  aoTerminar,
}: {
  totalSegundos: number;
  aoTerminar: () => void;
}) {
  const [inicio] = useState(() => Date.now());
  const [agora, setAgora] = useState(() => Date.now());

  const passados = Math.floor((agora - inicio) / 1000);
  const restantes = Math.max(0, totalSegundos - passados);
  const acabou = restantes === 0;

  useEffect(() => {
    if (acabou) return;
    const relogio = setInterval(() => setAgora(Date.now()), 250);
    return () => clearInterval(relogio);
  }, [acabou]);

  useEffect(() => {
    if (acabou) aoTerminar();
  }, [acabou, aoTerminar]);

  const percentual = Math.min(100, (passados / totalSegundos) * 100);

  return (
    <div>
      <p
        className="text-center text-6xl font-bold tabular-nums leading-none text-tinta"
        role="timer"
        aria-live="off"
      >
        {formatarTempo(restantes)}
      </p>
      <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-superficie-2">
        <div
          className="h-full rounded-full bg-acento"
          style={{ width: `${percentual}%`, transition: "width 250ms linear" }}
        />
      </div>
      <p className="mt-2 text-center text-[15px] text-tinta-fraca">
        {restantes > 0
          ? "Pode bloquear a tela. O tempo continua correndo."
          : "Acabou."}
      </p>
    </div>
  );
}
