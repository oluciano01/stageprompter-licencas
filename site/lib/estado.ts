"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { APP } from "./config";

export type Etapa = "valor" | "autoexclusao" | "bloqueio" | "compromisso";

export type Episodio = {
  /** Quando a vontade apertou. */
  em: string;
  gatilho: string | null;
  /** Se ela chegou até o fim dos 15 minutos. */
  atravessou: boolean;
};

export type Recaida = {
  em: string;
  gatilho: string | null;
  /** Quantos dias a sequência tinha quando foi interrompida. */
  diasNaEpoca: number;
};

export type Estado = {
  versao: 1;
  criadoEm: string;
  /** Início da sequência atual. Nulo enquanto a pessoa ainda não começou. */
  inicioEm: string | null;
  /** Dias já somados em sequências anteriores. Isto nunca diminui. */
  totalHistorico: number;
  /** Quanto ela costumava apostar por semana, em reais. */
  mediaSemanal: number | null;
  etapas: Record<Etapa, boolean>;
  compromisso: { texto: string; prazoDias: number; iniciadoEm: string } | null;
  episodios: Episodio[];
  recaidas: Recaida[];
};

export function estadoInicial(): Estado {
  return {
    versao: 1,
    criadoEm: new Date().toISOString(),
    inicioEm: null,
    totalHistorico: 0,
    mediaSemanal: null,
    etapas: {
      valor: false,
      autoexclusao: false,
      bloqueio: false,
      compromisso: false,
    },
    compromisso: null,
    episodios: [],
    recaidas: [],
  };
}

/* ------------------------------------------------------------------ *
 * Leitura e escrita no localStorage
 * ------------------------------------------------------------------ */

/**
 * Aceita só o que tem cara de estado nosso, e completa o que faltar com o
 * padrão. Vale tanto para o que está gravado no navegador quanto para o
 * arquivo que a pessoa restaura — em nenhum dos dois casos dá para confiar
 * cegamente no conteúdo.
 */
export function validar(dados: unknown): Estado | null {
  if (typeof dados !== "object" || dados === null) return null;
  const bruto = dados as Record<string, unknown>;
  if (bruto.versao !== 1) return null;

  const padrao = estadoInicial();
  const texto = (v: unknown, alternativa: string) =>
    typeof v === "string" ? v : alternativa;
  const booleano = (v: unknown) => v === true;

  const etapasBrutas =
    typeof bruto.etapas === "object" && bruto.etapas !== null
      ? (bruto.etapas as Record<string, unknown>)
      : {};

  const compromissoBruto =
    typeof bruto.compromisso === "object" && bruto.compromisso !== null
      ? (bruto.compromisso as Record<string, unknown>)
      : null;

  return {
    versao: 1,
    criadoEm: texto(bruto.criadoEm, padrao.criadoEm),
    inicioEm: typeof bruto.inicioEm === "string" ? bruto.inicioEm : null,
    totalHistorico:
      typeof bruto.totalHistorico === "number" && bruto.totalHistorico >= 0
        ? Math.floor(bruto.totalHistorico)
        : 0,
    mediaSemanal:
      typeof bruto.mediaSemanal === "number" && bruto.mediaSemanal >= 0
        ? bruto.mediaSemanal
        : null,
    etapas: {
      valor: booleano(etapasBrutas.valor),
      autoexclusao: booleano(etapasBrutas.autoexclusao),
      bloqueio: booleano(etapasBrutas.bloqueio),
      compromisso: booleano(etapasBrutas.compromisso),
    },
    compromisso:
      compromissoBruto && typeof compromissoBruto.texto === "string"
        ? {
            texto: compromissoBruto.texto,
            prazoDias:
              typeof compromissoBruto.prazoDias === "number"
                ? Math.max(1, Math.floor(compromissoBruto.prazoDias))
                : 30,
            iniciadoEm: texto(compromissoBruto.iniciadoEm, padrao.criadoEm),
          }
        : null,
    episodios: Array.isArray(bruto.episodios)
      ? bruto.episodios.flatMap((item) => {
          if (typeof item !== "object" || item === null) return [];
          const e = item as Record<string, unknown>;
          if (typeof e.em !== "string") return [];
          return [
            {
              em: e.em,
              gatilho: typeof e.gatilho === "string" ? e.gatilho : null,
              atravessou: e.atravessou === true,
            },
          ];
        })
      : [],
    recaidas: Array.isArray(bruto.recaidas)
      ? bruto.recaidas.flatMap((item) => {
          if (typeof item !== "object" || item === null) return [];
          const r = item as Record<string, unknown>;
          if (typeof r.em !== "string") return [];
          return [
            {
              em: r.em,
              gatilho: typeof r.gatilho === "string" ? r.gatilho : null,
              diasNaEpoca:
                typeof r.diasNaEpoca === "number" && r.diasNaEpoca >= 0
                  ? Math.floor(r.diasNaEpoca)
                  : 0,
            },
          ];
        })
      : [],
  };
}

function lerDoNavegador(): Estado {
  try {
    const cru = window.localStorage.getItem(APP.chaveArmazenamento);
    if (!cru) return estadoInicial();
    return validar(JSON.parse(cru)) ?? estadoInicial();
  } catch {
    // Navegação anônima, armazenamento bloqueado, JSON corrompido: em todos
    // os casos o site continua funcionando, só sem lembrar de nada.
    return estadoInicial();
  }
}

function gravarNoNavegador(estado: Estado) {
  try {
    window.localStorage.setItem(
      APP.chaveArmazenamento,
      JSON.stringify(estado),
    );
  } catch {
    /* sem espaço ou sem permissão: nada a fazer, e nada que valha travar a tela */
  }
}

/* ------------------------------------------------------------------ *
 * Loja mínima, para que duas partes da mesma tela nunca discordem
 * ------------------------------------------------------------------ */

let cache: Estado | null = null;
const ouvintes = new Set<() => void>();

function avisar() {
  for (const ouvinte of ouvintes) ouvinte();
}

function inscrever(ouvinte: () => void) {
  ouvintes.add(ouvinte);
  return () => {
    ouvintes.delete(ouvinte);
  };
}

/** Antes de carregar, o valor é nulo tanto no servidor quanto no navegador —
 *  é isso que evita erro de hidratação no site estático. */
const lerCache = () => cache;
const lerNoServidor = () => null;

function carregar() {
  if (cache === null) {
    cache = lerDoNavegador();
    avisar();
  }
}

function definir(proximo: Estado) {
  cache = proximo;
  gravarNoNavegador(proximo);
  avisar();
}

export type Acoes = {
  atualizar: (mudar: (atual: Estado) => Estado) => void;
  marcarEtapa: (etapa: Etapa, feita: boolean) => void;
  definirMediaSemanal: (valor: number) => void;
  definirCompromisso: (texto: string, prazoDias: number) => void;
  registrarEpisodio: (gatilho: string | null, atravessou: boolean) => void;
  registrarRecaida: (gatilho: string | null, diasNaEpoca: number) => void;
  restaurar: (estado: Estado) => void;
  apagarTudo: () => void;
};

/**
 * Marca o início da contagem na primeira coisa que a pessoa faz de fato.
 * Assim o contador nasce sozinho, sem pedir mais um clique.
 */
function comInicio(estado: Estado): Estado {
  if (estado.inicioEm) return estado;
  return { ...estado, inicioEm: new Date().toISOString() };
}

export function useEstado(): { estado: Estado | null; pronto: boolean } & Acoes {
  const estado = useSyncExternalStore(inscrever, lerCache, lerNoServidor);

  useEffect(() => {
    carregar();
  }, []);

  const atualizar = useCallback((mudar: (atual: Estado) => Estado) => {
    definir(mudar(cache ?? estadoInicial()));
  }, []);

  const marcarEtapa = useCallback(
    (etapa: Etapa, feita: boolean) => {
      atualizar((atual) =>
        comInicio({
          ...atual,
          etapas: { ...atual.etapas, [etapa]: feita },
        }),
      );
    },
    [atualizar],
  );

  const definirMediaSemanal = useCallback(
    (valor: number) => {
      atualizar((atual) =>
        comInicio({
          ...atual,
          mediaSemanal: Math.max(0, valor),
          etapas: { ...atual.etapas, valor: true },
        }),
      );
    },
    [atualizar],
  );

  const definirCompromisso = useCallback(
    (texto: string, prazoDias: number) => {
      atualizar((atual) =>
        comInicio({
          ...atual,
          compromisso: {
            texto,
            prazoDias,
            iniciadoEm: new Date().toISOString(),
          },
          etapas: { ...atual.etapas, compromisso: true },
        }),
      );
    },
    [atualizar],
  );

  const registrarEpisodio = useCallback(
    (gatilho: string | null, atravessou: boolean) => {
      atualizar((atual) =>
        comInicio({
          ...atual,
          episodios: [
            ...atual.episodios,
            { em: new Date().toISOString(), gatilho, atravessou },
          ],
        }),
      );
    },
    [atualizar],
  );

  /**
   * Recaída não zera nada com cara de derrota: os dias que ela somou entram
   * no total histórico antes de a sequência recomeçar.
   */
  const registrarRecaida = useCallback(
    (gatilho: string | null, diasNaEpoca: number) => {
      atualizar((atual) => ({
        ...atual,
        totalHistorico: atual.totalHistorico + Math.max(0, diasNaEpoca),
        inicioEm: new Date().toISOString(),
        recaidas: [
          ...atual.recaidas,
          {
            em: new Date().toISOString(),
            gatilho,
            diasNaEpoca: Math.max(0, diasNaEpoca),
          },
        ],
      }));
    },
    [atualizar],
  );

  const restaurar = useCallback((novo: Estado) => {
    definir(novo);
  }, []);

  const apagarTudo = useCallback(() => {
    try {
      window.localStorage.removeItem(APP.chaveArmazenamento);
    } catch {
      /* sem permissão de escrita: o estado em memória já foi trocado abaixo */
    }
    cache = estadoInicial();
    avisar();
  }, []);

  return {
    estado,
    pronto: estado !== null,
    atualizar,
    marcarEtapa,
    definirMediaSemanal,
    definirCompromisso,
    registrarEpisodio,
    registrarRecaida,
    restaurar,
    apagarTudo,
  };
}
