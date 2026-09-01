import type { Estado } from "./estado";

/** Meia-noite local do dia da data informada. */
function inicioDoDia(data: Date): number {
  return new Date(
    data.getFullYear(),
    data.getMonth(),
    data.getDate(),
  ).getTime();
}

/**
 * Dias inteiros entre duas datas, contando viradas de meia-noite e não
 * períodos de 24 horas. Quem começa às 23h quer ver "1 dia" no dia seguinte
 * de manhã, e está certo em querer.
 */
export function diasEntre(inicioISO: string, agora: Date = new Date()): number {
  const inicio = new Date(inicioISO);
  if (Number.isNaN(inicio.getTime())) return 0;
  const dias = Math.round(
    (inicioDoDia(agora) - inicioDoDia(inicio)) / 86_400_000,
  );
  return Math.max(0, dias);
}

/** Dias da sequência atual. */
export function diasSeguidos(estado: Estado, agora?: Date): number {
  if (!estado.inicioEm) return 0;
  return diasEntre(estado.inicioEm, agora);
}

/** Tudo que a pessoa já somou, incluindo o que veio antes das recaídas. */
export function totalSomado(estado: Estado, agora?: Date): number {
  return estado.totalHistorico + diasSeguidos(estado, agora);
}

export function mediaDiaria(estado: Estado): number {
  return estado.mediaSemanal === null ? 0 : estado.mediaSemanal / 7;
}

/** Quanto ela deixou de apostar na sequência atual. */
export function valorPreservado(estado: Estado, agora?: Date): number {
  return diasSeguidos(estado, agora) * mediaDiaria(estado);
}

export function formatarReais(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: valor >= 100 ? 0 : 2,
  });
}

export function formatarData(iso: string): string {
  const data = new Date(iso);
  if (Number.isNaN(data.getTime())) return "";
  return data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

/** Plural sem gambiarra, para as poucas palavras que o site repete. */
export function plural(n: number, singular: string, plural_: string): string {
  return `${n.toLocaleString("pt-BR")} ${n === 1 ? singular : plural_}`;
}

export type EstadoCompromisso = {
  diasCumpridos: number;
  diasRestantes: number;
  cumprido: boolean;
  percentual: number;
};

export function situacaoCompromisso(
  estado: Estado,
  agora?: Date,
): EstadoCompromisso | null {
  if (!estado.compromisso) return null;
  const { prazoDias, iniciadoEm } = estado.compromisso;
  const cumpridos = Math.min(diasEntre(iniciadoEm, agora), prazoDias);
  return {
    diasCumpridos: cumpridos,
    diasRestantes: Math.max(0, prazoDias - cumpridos),
    cumprido: cumpridos >= prazoDias,
    percentual: prazoDias === 0 ? 100 : Math.round((cumpridos / prazoDias) * 100),
  };
}
