"use client";

import Link from "next/link";
import { useState } from "react";
import { Cartao, TituloPagina } from "@/components/Base";
import { SalvarRestaurar } from "@/components/SalvarRestaurar";
import { formatarReais } from "@/lib/calculos";
import { useEstado, type Etapa } from "@/lib/estado";

const COMPROMISSOS = [
  "Não apostar nenhum real",
  "Não abrir site nem aplicativo de aposta",
  "Contar para uma pessoa de confiança que estou parando",
  "Não pegar dinheiro emprestado nem adiantar salário",
];

const PRAZOS = [
  { dias: 7, rotulo: "7 dias" },
  { dias: 30, rotulo: "30 dias" },
  { dias: 90, rotulo: "90 dias" },
];

const VALORES_RAPIDOS = [50, 100, 200, 500];

function CartaoEtapa({
  numero,
  titulo,
  feita,
  children,
}: {
  numero: number;
  titulo: string;
  feita: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`rounded-2xl border p-5 ${
        feita ? "border-acento bg-acento-suave" : "border-borda bg-superficie"
      }`}
    >
      <div className="mb-3 flex items-start gap-3">
        <span
          aria-hidden="true"
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[16px] font-bold ${
            feita
              ? "bg-acento text-white"
              : "bg-superficie-2 text-tinta-fraca"
          }`}
        >
          {feita ? "✓" : numero}
        </span>
        <h2 className="mt-0.5 text-lg font-semibold text-tinta">
          <span className="sr-only">
            Etapa {numero}
            {feita ? ", concluída" : ""}:{" "}
          </span>
          {titulo}
        </h2>
      </div>
      <div className="space-y-3 text-tinta">{children}</div>
    </section>
  );
}

/** Etapa 1 — a única pergunta que o site faz. */
function EtapaValor() {
  const { estado, marcarEtapa, definirMediaSemanal } = useEstado();
  const [rascunho, setRascunho] = useState("");

  const feita = estado?.etapas.valor ?? false;
  const media = estado?.mediaSemanal ?? null;

  const numero = Number(rascunho.replace(/\./g, "").replace(",", "."));
  const valido = rascunho.trim() !== "" && Number.isFinite(numero) && numero >= 0;

  function salvar(valor: number) {
    definirMediaSemanal(valor);
    setRascunho("");
  }

  return (
    <CartaoEtapa numero={1} titulo="Quanto você costuma apostar por semana?" feita={feita}>
      {feita && media !== null ? (
        <>
          <p>
            Você anotou <strong>{formatarReais(media)}</strong> por semana. É a
            partir daí que o painel calcula o quanto você preserva a cada dia.
          </p>
          <p className="text-tinta-fraca">
            Ao longo de um ano isso dá {formatarReais(media * 52)}.
          </p>
          <button
            type="button"
            onClick={() => marcarEtapa("valor", false)}
            className="text-[15px] font-semibold text-acento underline"
          >
            Corrigir o valor
          </button>
        </>
      ) : feita ? (
        <>
          <p>Você preferiu não dizer. Tudo bem — o resto funciona igual.</p>
          <button
            type="button"
            onClick={() => marcarEtapa("valor", false)}
            className="text-[15px] font-semibold text-acento underline"
          >
            Quero informar o valor
          </button>
        </>
      ) : (
        <>
          <p>
            Um chute honesto serve. Se a semana varia muito, pense num mês ruim
            e divida por quatro.
          </p>

          <div className="flex flex-wrap gap-2">
            {VALORES_RAPIDOS.map((valor) => (
              <button
                key={valor}
                type="button"
                onClick={() => salvar(valor)}
                className="rounded-xl border border-borda bg-superficie px-4 py-2 font-semibold text-tinta"
              >
                {formatarReais(valor)}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="valor-semana" className="sr-only">
              Valor em reais por semana
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-borda bg-superficie px-3 py-2">
              <span className="text-tinta-fraca">R$</span>
              <input
                id="valor-semana"
                type="text"
                inputMode="decimal"
                value={rascunho}
                onChange={(e) => setRascunho(e.target.value)}
                placeholder="outro valor"
                className="w-32 bg-transparent text-tinta outline-none"
              />
            </div>
            <button
              type="button"
              disabled={!valido}
              onClick={() => salvar(numero)}
              className="rounded-xl bg-acento px-4 py-2.5 font-semibold text-white disabled:opacity-40"
            >
              Salvar
            </button>
          </div>

          <button
            type="button"
            onClick={() => marcarEtapa("valor", true)}
            className="text-[15px] font-semibold text-tinta-fraca underline"
          >
            Prefiro não dizer
          </button>
        </>
      )}
    </CartaoEtapa>
  );
}

/** Etapas 2 e 3 — o trabalho acontece fora do site; aqui só fica o registro. */
function EtapaGuia({
  numero,
  titulo,
  etapa,
  href,
  chamada,
  children,
}: {
  numero: number;
  titulo: string;
  etapa: Etapa;
  href: string;
  chamada: string;
  children: React.ReactNode;
}) {
  const { estado, marcarEtapa } = useEstado();
  const feita = estado?.etapas[etapa] ?? false;

  return (
    <CartaoEtapa numero={numero} titulo={titulo} feita={feita}>
      {children}
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Link
          href={href}
          className="inline-flex items-center rounded-xl bg-acento px-4 py-2.5 font-semibold text-white no-underline"
        >
          {chamada}
        </Link>
        <button
          type="button"
          onClick={() => marcarEtapa(etapa, !feita)}
          aria-pressed={feita}
          className="text-[15px] font-semibold text-acento underline"
        >
          {feita ? "Desmarcar" : "Já fiz isso"}
        </button>
      </div>
    </CartaoEtapa>
  );
}

/** Etapa 4 — o compromisso e o prazo. */
function EtapaCompromisso() {
  const { estado, marcarEtapa, definirCompromisso } = useEstado();
  const [escolha, setEscolha] = useState<string>(COMPROMISSOS[0]);
  const [proprio, setProprio] = useState("");
  const [prazo, setPrazo] = useState(30);

  const feita = estado?.etapas.compromisso ?? false;
  const compromisso = estado?.compromisso ?? null;

  const usandoProprio = escolha === "__proprio__";
  const texto = usandoProprio ? proprio.trim() : escolha;

  return (
    <CartaoEtapa
      numero={4}
      titulo="Escolha o seu compromisso e o prazo"
      feita={feita}
    >
      {feita && compromisso ? (
        <>
          <p className="text-lg font-semibold text-tinta">
            “{compromisso.texto}”
          </p>
          <p>
            Por <strong>{compromisso.prazoDias} dias</strong>. O painel mostra
            quanto falta.
          </p>
          <button
            type="button"
            onClick={() => marcarEtapa("compromisso", false)}
            className="text-[15px] font-semibold text-acento underline"
          >
            Trocar o compromisso
          </button>
        </>
      ) : (
        <>
          <p>
            Um só, e escrito com as suas palavras se preferir. Compromisso curto
            e cumprido vale mais do que compromisso grande e abandonado.
          </p>

          <fieldset className="space-y-2">
            <legend className="mb-2 font-semibold text-tinta">
              O compromisso
            </legend>
            {COMPROMISSOS.map((opcao) => (
              <label
                key={opcao}
                className="flex cursor-pointer items-start gap-3 rounded-xl border border-borda bg-superficie p-3"
              >
                <input
                  type="radio"
                  name="compromisso"
                  checked={escolha === opcao}
                  onChange={() => setEscolha(opcao)}
                  className="mt-1.5 h-4 w-4 accent-[var(--cor-acento)]"
                />
                <span className="text-tinta">{opcao}</span>
              </label>
            ))}
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-borda bg-superficie p-3">
              <input
                type="radio"
                name="compromisso"
                checked={usandoProprio}
                onChange={() => setEscolha("__proprio__")}
                className="mt-1.5 h-4 w-4 accent-[var(--cor-acento)]"
              />
              <span className="w-full text-tinta">
                Escrever o meu
                {usandoProprio && (
                  <input
                    type="text"
                    value={proprio}
                    onChange={(e) => setProprio(e.target.value)}
                    maxLength={120}
                    placeholder="Eu me comprometo a…"
                    className="mt-2 w-full rounded-lg border border-borda bg-fundo px-3 py-2 text-tinta outline-none"
                  />
                )}
              </span>
            </label>
          </fieldset>

          <fieldset>
            <legend className="mb-2 font-semibold text-tinta">Por quanto tempo</legend>
            <div className="flex flex-wrap gap-2">
              {PRAZOS.map((opcao) => (
                <button
                  key={opcao.dias}
                  type="button"
                  onClick={() => setPrazo(opcao.dias)}
                  aria-pressed={prazo === opcao.dias}
                  className={`rounded-xl border px-4 py-2 font-semibold ${
                    prazo === opcao.dias
                      ? "border-acento bg-acento text-white"
                      : "border-borda bg-superficie text-tinta"
                  }`}
                >
                  {opcao.rotulo}
                </button>
              ))}
            </div>
          </fieldset>

          <button
            type="button"
            disabled={texto.length === 0}
            onClick={() => definirCompromisso(texto, prazo)}
            className="rounded-xl bg-acento px-5 py-3 font-semibold text-white disabled:opacity-40"
          >
            Assumir este compromisso
          </button>
        </>
      )}
    </CartaoEtapa>
  );
}

export default function PaginaComecar() {
  const { estado, pronto } = useEstado();
  const feitas = estado
    ? Object.values(estado.etapas).filter(Boolean).length
    : 0;

  return (
    <>
      <TituloPagina
        titulo="Começar"
        linha="Quatro etapas. Você pode parar no meio, fechar o site e voltar amanhã — o que estiver marcado continua marcado."
      />

      <div
        className="mb-8 rounded-2xl border border-borda bg-superficie p-4"
        aria-live="polite"
      >
        <p className="font-semibold text-tinta">
          {pronto ? `${feitas} de 4 etapas concluídas` : "Carregando…"}
        </p>
        <div
          className="mt-2 h-2.5 overflow-hidden rounded-full bg-superficie-2"
          role="presentation"
        >
          <div
            className="h-full rounded-full bg-acento transition-[width] duration-500"
            style={{ width: `${(feitas / 4) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        <EtapaValor />

        <EtapaGuia
          numero={2}
          titulo="Peça a autoexclusão no gov.br"
          etapa="autoexclusao"
          href="/autoexclusao/"
          chamada="Ver o guia"
        >
          <p>
            Um pedido só bloqueia o seu CPF em todas as casas de aposta
            autorizadas do país. Leva uns dez minutos e é de graça.
          </p>
        </EtapaGuia>

        <EtapaGuia
          numero={3}
          titulo="Ligue o bloqueio no celular"
          etapa="bloqueio"
          href="/bloqueio/"
          chamada="Ver o guia"
        >
          <p>
            É a etapa mais trabalhosa e a que mais segura. Meia hora, uma vez
            só, e site e app de aposta param de abrir no seu celular.
          </p>
        </EtapaGuia>

        <EtapaCompromisso />
      </div>

      {feitas > 0 && (
        <Cartao className="mt-8">
          <h2 className="mb-2 text-lg font-semibold text-tinta">
            Não perca o que você já fez
          </h2>
          <p className="mb-4 text-tinta">
            Seu progresso está guardado só neste navegador. Se você limpar os
            dados dele, ou trocar de celular, ele some. Baixe o arquivo de vez
            em quando e guarde no seu e-mail.
          </p>
          <SalvarRestaurar />
          <p className="mt-4 text-[15px] text-tinta-fraca">
            Vale também adicionar este site à tela de início do celular: no
            Android, menu do navegador ›{" "}
            <strong>Adicionar à tela inicial</strong>; no iPhone, botão de
            compartilhar › <strong>Adicionar à Tela de Início</strong>.
          </p>
        </Cartao>
      )}

      <div className="mt-8 text-center">
        <Link
          href="/painel/"
          className="text-[17px] font-semibold text-acento underline"
        >
          Ir para o meu painel
        </Link>
      </div>
    </>
  );
}
