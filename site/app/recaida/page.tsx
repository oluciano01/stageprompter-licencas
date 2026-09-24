"use client";

import Link from "next/link";
import { useState } from "react";
import { Cartao, TituloPagina } from "@/components/Base";
import { SeletorGatilho } from "@/components/SeletorGatilho";
import { diasSeguidos, plural, totalSomado } from "@/lib/calculos";
import { CONSELHO_POR_GATILHO } from "@/lib/gatilhos";
import { useEstado } from "@/lib/estado";

export default function PaginaRecaida() {
  const { estado, pronto, registrarRecaida } = useEstado();
  const [gatilho, setGatilho] = useState<string | null>(null);
  const [registrada, setRegistrada] = useState(false);

  if (!pronto || !estado) {
    return (
      <>
        <TituloPagina titulo="Registrar uma recaída" />
        <div className="h-40 animate-pulse rounded-2xl bg-superficie-2" />
      </>
    );
  }

  const diasAtuais = diasSeguidos(estado);
  const total = totalSomado(estado);

  if (registrada) {
    return (
      <>
        <TituloPagina
          titulo="Registrado. Você continua aqui."
          linha="Isso é o que importa: você apostou e voltou para o site em vez de sumir dele."
        />

        <Cartao className="border-acento bg-acento-suave">
          <p className="text-tinta">
            O seu total continua sendo{" "}
            <strong>{plural(total, "dia", "dias")}</strong> sem apostar. Esse
            número não foi apagado e não vai ser — ele é o que você já fez, e o
            que já foi feito é seu.
          </p>
          <p className="mt-3 text-tinta">
            A contagem seguida recomeça de hoje. Não é uma punição, é só uma
            contagem.
          </p>
        </Cartao>

        {gatilho && CONSELHO_POR_GATILHO[gatilho] && (
          <Cartao className="mt-4">
            <h2 className="mb-2 text-lg font-semibold text-tinta">
              Sobre o que aconteceu
            </h2>
            <p className="text-tinta">{CONSELHO_POR_GATILHO[gatilho]}</p>
          </Cartao>
        )}

        <Cartao className="mt-4">
          <h2 className="mb-2 text-lg font-semibold text-tinta">
            Vale reforçar a barreira agora
          </h2>
          <p className="text-tinta">
            Recaída quase sempre passa por um buraco no cerco. Vale conferir, na
            calma de agora:
          </p>
          <ul className="mt-3 space-y-2 text-tinta">
            <li>
              •{" "}
              <Link href="/bloqueio/" className="font-semibold text-acento">
                O bloqueio do celular
              </Link>{" "}
              continua ligado? Testou depois da última atualização do sistema?
            </li>
            <li>
              •{" "}
              <Link href="/autoexclusao/" className="font-semibold text-acento">
                A autoexclusão
              </Link>{" "}
              já venceu? Dá para renovar por mais tempo.
            </li>
            <li>
              • Sobrou algum aplicativo de aposta instalado, ou algum atalho na
              tela?
            </li>
            <li>
              • Foi por um site sem licença? Aí o único freio é o bloqueio do
              celular — e talvez ele precise de reforço.
            </li>
          </ul>
        </Cartao>

        <Cartao className="mt-4 bg-superficie-2">
          <p className="text-tinta">
            Se isso está se repetindo, não é falta de força de vontade. Jogo
            compulsivo tem tratamento gratuito no SUS, e grupo de apoio é de
            graça e anônimo.{" "}
            <Link href="/ajuda/" className="font-semibold text-acento">
              Ver onde procurar ajuda
            </Link>
            .
          </p>
        </Cartao>

        <div className="mt-6">
          <Link
            href="/painel/"
            className="inline-flex rounded-xl bg-acento px-5 py-3 font-semibold text-white no-underline"
          >
            Voltar para o painel
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <TituloPagina
        titulo="Registrar uma recaída"
        linha="Sem sermão e sem cobrança. Recaída faz parte de parar — quase todo mundo que parou de vez teve alguma."
      />

      <Cartao className="mb-6">
        <h2 className="mb-2 text-lg font-semibold text-tinta">
          O que vai acontecer com os seus números
        </h2>
        <p className="text-tinta">
          A contagem seguida vai recomeçar de hoje. Mas os{" "}
          <strong>{plural(total, "dia", "dias")}</strong> que você já somou
          continuam no painel, e continuam contando como seus.
        </p>
        {diasAtuais > 0 && (
          <p className="mt-3 text-tinta-fraca">
            Os {plural(diasAtuais, "dia", "dias")} desta sequência entram no
            total antes de ela recomeçar.
          </p>
        )}
      </Cartao>

      <Cartao>
        <SeletorGatilho
          valor={gatilho}
          aoEscolher={setGatilho}
          legenda="O que aconteceu antes?"
        />
        <button
          type="button"
          onClick={() => {
            registrarRecaida(gatilho, diasAtuais);
            setRegistrada(true);
          }}
          className="mt-5 w-full rounded-xl bg-acento px-5 py-3.5 text-lg font-semibold text-white"
        >
          Registrar
        </button>
      </Cartao>

      <div className="mt-6 text-center">
        <Link href="/painel/" className="text-[15px] text-tinta-fraca underline">
          Voltar sem registrar
        </Link>
      </div>
    </>
  );
}
