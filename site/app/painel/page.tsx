"use client";

import Link from "next/link";
import { Cartao, TituloPagina } from "@/components/Base";
import { SalvarRestaurar } from "@/components/SalvarRestaurar";
import {
  diasSeguidos,
  formatarData,
  formatarReais,
  plural,
  situacaoCompromisso,
  totalSomado,
  valorPreservado,
} from "@/lib/calculos";
import { equivalencia } from "@/lib/equivalencias";
import { useEstado } from "@/lib/estado";
import { MARCOS, marcoAtual, proximoMarco } from "@/lib/marcos";

function BotaoVontade() {
  return (
    <Link
      href="/vontade/"
      className="block rounded-2xl bg-acento px-6 py-6 text-center text-2xl font-bold text-white no-underline"
    >
      Estou com vontade
      <span className="mt-1 block text-[15px] font-normal opacity-90">
        Toque aqui antes de abrir qualquer outra coisa
      </span>
    </Link>
  );
}

export default function PaginaPainel() {
  const { estado, pronto } = useEstado();

  if (!pronto || !estado) {
    return (
      <>
        <TituloPagina titulo="Meu painel" />
        <div className="h-40 animate-pulse rounded-2xl bg-superficie-2" />
      </>
    );
  }

  // Ninguém começou ainda: o painel vazio não pode parecer uma cobrança.
  if (!estado.inicioEm) {
    return (
      <>
        <TituloPagina
          titulo="Meu painel"
          linha="Aqui vão ficar os seus dias, o valor que você preserva e o seu compromisso."
        />
        <Cartao>
          <p className="text-tinta">
            Você ainda não começou. Não tem pressa e não tem cobrança: o passo a
            passo tem quatro etapas e você pode fazer uma hoje e as outras
            quando der.
          </p>
          <p className="mt-4">
            <Link
              href="/comecar/"
              className="inline-flex rounded-xl bg-acento px-5 py-3 font-semibold text-white no-underline"
            >
              Ver o passo a passo
            </Link>
          </p>
        </Cartao>
        <div className="mt-6">
          <BotaoVontade />
        </div>

        {/*
          Quem limpou o navegador ou trocou de celular cai exatamente aqui.
          Se o botão de restaurar só aparecesse depois de já ter progresso,
          o arquivo de backup não serviria para nada.
        */}
        <Cartao className="mt-6 bg-superficie-2">
          <h2 className="mb-2 text-lg font-semibold text-tinta">
            Já usou este site antes?
          </h2>
          <p className="mb-4 text-tinta">
            Se você tem o arquivo de progresso que baixou de outro celular ou
            antes de limpar o navegador, dá para voltar tudo de onde parou.
          </p>
          <SalvarRestaurar somenteRestaurar />
        </Cartao>
      </>
    );
  }

  const dias = diasSeguidos(estado);
  const total = totalSomado(estado);
  const valor = valorPreservado(estado);
  const emReais = estado.mediaSemanal !== null && estado.mediaSemanal > 0;
  const coisa = equivalencia(valor);
  const compromisso = situacaoCompromisso(estado);
  const carta = marcoAtual(dias);
  const proximo = proximoMarco(dias);
  const teveRecaida = estado.recaidas.length > 0;
  const atravessou = estado.episodios.filter((e) => e.atravessou).length;

  return (
    <>
      <TituloPagina titulo="Meu painel" />

      {/* Contador */}
      <Cartao className="text-center">
        {dias === 0 ? (
          <>
            <p className="text-4xl font-bold text-acento">Você começou hoje</p>
            <p className="mt-2 text-tinta">
              Hoje é o dia mais difícil e o mais importante. Amanhã este número
              vira 1.
            </p>
          </>
        ) : (
          <>
            <p className="text-6xl font-bold leading-none text-acento">
              {dias.toLocaleString("pt-BR")}
            </p>
            <p className="mt-2 text-xl font-semibold text-tinta">
              {dias === 1 ? "dia sem apostar" : "dias sem apostar"}
            </p>
          </>
        )}
        <p className="mt-3 text-[15px] text-tinta-fraca">
          Desde {formatarData(estado.inicioEm)}
        </p>

        {teveRecaida && (
          <p className="mt-4 rounded-xl bg-calma-fundo px-4 py-3 text-[15px] text-tinta">
            No total você já somou{" "}
            <strong>{plural(total, "dia", "dias")}</strong> sem apostar. Isso
            não se perde.
          </p>
        )}
      </Cartao>

      {/* Valor preservado */}
      <Cartao className="mt-4">
        <h2 className="text-lg font-semibold text-tinta">Valor preservado</h2>
        {emReais ? (
          <>
            <p className="mt-2 text-4xl font-bold text-tinta">
              {formatarReais(valor)}
            </p>
            {coisa ? (
              <p className="mt-2 text-tinta">
                Dá para pagar <strong>{coisa}</strong>.
              </p>
            ) : (
              <p className="mt-2 text-tinta-fraca">
                Ainda é pouco para comparar com alguma coisa. Daqui a alguns
                dias já dá.
              </p>
            )}
            <p className="mt-3 text-[14px] text-tinta-fraca">
              Conta simples: {formatarReais(estado.mediaSemanal! / 7)} por dia,
              a partir do valor que você informou. Os preços de comparação são
              aproximados e mudam muito de cidade para cidade.
            </p>
          </>
        ) : (
          <p className="mt-2 text-tinta">
            Você não informou quanto costumava apostar por semana.{" "}
            <Link href="/comecar/" className="font-semibold text-acento">
              Dá para informar agora
            </Link>{" "}
            — o valor fica só neste celular.
          </p>
        )}
      </Cartao>

      {/* Compromisso */}
      {estado.compromisso && compromisso && (
        <Cartao className="mt-4">
          <h2 className="text-lg font-semibold text-tinta">Meu compromisso</h2>
          <p className="mt-2 text-xl font-semibold text-tinta">
            “{estado.compromisso.texto}”
          </p>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-superficie-2">
            <div
              className="h-full rounded-full bg-acento transition-[width] duration-500"
              style={{ width: `${compromisso.percentual}%` }}
            />
          </div>
          <p className="mt-2 text-tinta">
            {compromisso.cumprido ? (
              <>
                <strong>Cumprido.</strong> Você fechou os{" "}
                {estado.compromisso.prazoDias} dias que prometeu.{" "}
                <Link href="/comecar/" className="font-semibold text-acento">
                  Assumir o próximo
                </Link>
                .
              </>
            ) : (
              <>
                Dia {compromisso.diasCumpridos} de{" "}
                {estado.compromisso.prazoDias}. Faltam{" "}
                <strong>{plural(compromisso.diasRestantes, "dia", "dias")}</strong>
                .
              </>
            )}
          </p>
        </Cartao>
      )}

      <div className="mt-6">
        <BotaoVontade />
      </div>

      {/* Marcos */}
      <h2 className="mb-3 mt-10 text-2xl font-bold text-tinta">Marcos</h2>
      <p className="mb-4 text-tinta">
        São sempre estes cinco, sempre a mesma coisa em cada um, e você já sabe
        desde agora o que vem em cada um deles. Aqui não tem sorteio nem
        surpresa — surpresa é o que a aposta faz.
      </p>

      {carta && (
        <Cartao className="mb-4 border-acento bg-acento-suave">
          <p className="text-[15px] font-semibold uppercase tracking-wide text-acento">
            {carta.nome} — alcançado
          </p>
          <p className="mt-3 whitespace-pre-line text-tinta">{carta.carta}</p>
        </Cartao>
      )}

      <ol className="list-none space-y-2 p-0">
        {MARCOS.map((marco) => {
          const alcancado = dias >= marco.dias;
          const eProximo = proximo?.dias === marco.dias;
          return (
            <li
              key={marco.dias}
              className={`flex items-start gap-3 rounded-xl border p-4 ${
                alcancado
                  ? "border-acento bg-acento-suave"
                  : eProximo
                    ? "border-borda bg-superficie"
                    : "border-borda bg-superficie opacity-70"
              }`}
            >
              <span
                aria-hidden="true"
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[14px] font-bold ${
                  alcancado
                    ? "bg-acento text-white"
                    : "bg-superficie-2 text-tinta-fraca"
                }`}
              >
                {alcancado ? "✓" : marco.dias}
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-tinta">
                  {marco.nome}
                  {!alcancado && (
                    <span className="font-normal text-tinta-fraca">
                      {" "}
                      — faltam {plural(marco.dias - dias, "dia", "dias")}
                    </span>
                  )}
                </p>
                <p className="text-[15px] text-tinta-fraca">{marco.promessa}</p>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Histórico curto */}
      {(atravessou > 0 || teveRecaida) && (
        <Cartao className="mt-8">
          <h2 className="mb-2 text-lg font-semibold text-tinta">
            O que já aconteceu
          </h2>
          {atravessou > 0 && (
            <p className="text-tinta">
              A vontade apertou e você atravessou{" "}
              <strong>{plural(atravessou, "vez", "vezes")}</strong>. Cada uma
              dessas é uma aposta que não aconteceu.
            </p>
          )}
          {teveRecaida && (
            <p className="mt-2 text-tinta">
              Você registrou{" "}
              {plural(estado.recaidas.length, "recaída", "recaídas")} e voltou
              depois de {estado.recaidas.length === 1 ? "ela" : "cada uma"}. O
              total de {plural(total, "dia", "dias")} continua contando.
            </p>
          )}
        </Cartao>
      )}

      {/* Saídas de emergência e manutenção */}
      <div className="mt-8 space-y-4">
        <Cartao>
          <h2 className="mb-2 text-lg font-semibold text-tinta">
            Se você apostou
          </h2>
          <p className="text-tinta">
            Registrar não zera o seu total nem apaga o que você construiu. Serve
            para entender o que aconteceu e para o site continuar te ajudando de
            verdade.
          </p>
          <p className="mt-3">
            <Link
              href="/recaida/"
              className="inline-flex rounded-xl border border-borda bg-superficie px-4 py-2.5 font-semibold text-tinta no-underline"
            >
              Registrar uma recaída
            </Link>
          </p>
        </Cartao>

        <Cartao>
          <h2 className="mb-2 text-lg font-semibold text-tinta">
            Proteja o seu progresso
          </h2>
          <p className="mb-4 text-tinta">
            Tudo isto vive só neste navegador. Limpou os dados, trocou de
            celular, usou a aba anônima: acabou. Baixe o arquivo de vez em
            quando.
          </p>
          <SalvarRestaurar />
        </Cartao>
      </div>
    </>
  );
}
