"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Cartao, TituloPagina } from "@/components/Base";
import { Cronometro } from "@/components/Cronometro";
import { Respiracao } from "@/components/Respiracao";
import { SeletorGatilho } from "@/components/SeletorGatilho";
import { CONSELHO_POR_GATILHO } from "@/lib/gatilhos";
import { LINKS } from "@/lib/links";
import { useEstado } from "@/lib/estado";

const MINUTOS = 15;

/**
 * O que a pessoa lê enquanto o tempo passa. O conteúdo é sempre o mesmo e na
 * mesma ordem: quem está com a cabeça quente não precisa de novidade,
 * precisa de chão.
 */
const RECADOS: { ate: number; texto: string }[] = [
  {
    ate: 120,
    texto:
      "A vontade acabou de bater e ela está no volume máximo. Não tente discutir com ela — só fique aqui.",
  },
  {
    ate: 300,
    texto:
      "Respire junto com o círculo. Você não precisa fazer mais nada nos próximos minutos além de respirar.",
  },
  {
    ate: 480,
    texto:
      "É mais ou menos por aqui que a vontade costuma chegar no ponto mais alto. Ela sobe, chega no pico e desce — sempre.",
  },
  {
    ate: 720,
    texto:
      "Daqui para frente ela normalmente começa a ceder. Repare se o aperto no peito já não está um pouco menor.",
  },
  {
    ate: 900,
    texto:
      "Você está do outro lado do pico. Faltam poucos minutos e você atravessou a parte pior.",
  },
];

function recadoDoMomento(segundosPassados: number): string {
  return (
    RECADOS.find((r) => segundosPassados < r.ate)?.texto ??
    RECADOS[RECADOS.length - 1].texto
  );
}

type Fase = "inicio" | "correndo" | "perguntando" | "fim";

export default function PaginaVontade() {
  const { registrarEpisodio } = useEstado();
  const [fase, setFase] = useState<Fase>("inicio");
  const [gatilho, setGatilho] = useState<string | null>(null);
  const [atravessou, setAtravessou] = useState(true);
  const [inicio, setInicio] = useState<number | null>(null);
  const [segundosPassados, setSegundosPassados] = useState(0);

  // O recado da tela muda com o tempo; é isto que faz a página acompanhar.
  useEffect(() => {
    if (fase !== "correndo" || inicio === null) return;
    const atualizar = () =>
      setSegundosPassados(Math.floor((Date.now() - inicio) / 1000));
    atualizar();
    const relogio = setInterval(atualizar, 1000);
    return () => clearInterval(relogio);
  }, [fase, inicio]);

  const aoTerminar = useCallback(() => {
    setAtravessou(true);
    setFase("perguntando");
  }, []);

  function comecar() {
    setInicio(Date.now());
    setFase("correndo");
  }

  function finalizar() {
    registrarEpisodio(gatilho, atravessou);
    setFase("fim");
  }

  return (
    <>
      {fase === "inicio" && (
        <>
          <TituloPagina
            titulo="Estou com vontade"
            linha="Você fez a coisa certa vindo para cá. Agora são quinze minutos, e eles são a única coisa que você precisa fazer."
          />

          <Cartao className="mb-4">
            <h2 className="mb-2 text-lg font-semibold text-tinta">
              O que vai acontecer
            </h2>
            <p className="text-tinta">
              A vontade de apostar não fica alta para sempre. Ela sobe rápido,
              chega num pico e desce — mesmo que você não faça nada. Quase
              sempre isso leva menos de quinze minutos.
            </p>
            <p className="mt-3 text-tinta">
              Você não vai lutar contra ela. Você só vai esperar ela passar,
              respirando, com uma tela na sua frente contando o tempo.
            </p>
          </Cartao>

          <button
            type="button"
            onClick={comecar}
            className="w-full rounded-2xl bg-acento px-6 py-6 text-2xl font-bold text-white"
          >
            Começar os 15 minutos
          </button>

          <Cartao className="mt-6 bg-superficie-2">
            <p className="text-tinta">
              Se ficar insuportável, ligue para o{" "}
              <a
                href={LINKS.cvvTelefone}
                className="text-xl font-bold text-acento"
              >
                188
              </a>{" "}
              — CVV, gratuito, 24 horas. Falar com alguém funciona melhor do
              que qualquer contador.
            </p>
          </Cartao>
        </>
      )}

      {fase === "correndo" && (
        <>
          <h1 className="sr-only">Atravessando a vontade</h1>
          <Cronometro totalSegundos={MINUTOS * 60} aoTerminar={aoTerminar} />

          <Cartao className="mt-6" aria-live="polite">
            <p className="text-lg text-tinta">
              {recadoDoMomento(segundosPassados)}
            </p>
          </Cartao>

          <Respiracao ativa />

          <Cartao className="bg-superficie-2">
            <p className="text-tinta">
              Se puder, faça uma destas agora, sem sair desta tela: beba um copo
              de água, saia do cômodo, abra a janela, mande mensagem para
              alguém.
            </p>
            <p className="mt-3 text-tinta">
              Está muito difícil? Ligue{" "}
              <a
                href={LINKS.cvvTelefone}
                className="text-lg font-bold text-acento"
              >
                188
              </a>
              .
            </p>
          </Cartao>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setAtravessou(false);
                setFase("perguntando");
              }}
              className="text-[15px] font-semibold text-tinta-fraca underline"
            >
              Preciso parar antes do fim
            </button>
          </div>
        </>
      )}

      {fase === "perguntando" && (
        <>
          <TituloPagina
            titulo={atravessou ? "Você atravessou" : "Tudo bem"}
            linha={
              atravessou
                ? "Quinze minutos inteiros. A vontade veio e foi embora, e você continuou onde estava."
                : "Ter vindo até aqui já muda alguma coisa. Antes de sair, uma pergunta só."
            }
          />

          <Cartao>
            <SeletorGatilho valor={gatilho} aoEscolher={setGatilho} />
            <button
              type="button"
              onClick={finalizar}
              className="mt-5 w-full rounded-xl bg-acento px-5 py-3.5 text-lg font-semibold text-white"
            >
              {gatilho ? "Anotar e terminar" : "Terminar sem anotar"}
            </button>
          </Cartao>
        </>
      )}

      {fase === "fim" && (
        <>
          <TituloPagina
            titulo="Registrado"
            linha={
              atravessou
                ? "Esta foi uma aposta que não aconteceu. Elas contam, mesmo que ninguém veja."
                : "Você registrou o episódio. Isso já é diferente de fingir que não aconteceu."
            }
          />

          {gatilho && CONSELHO_POR_GATILHO[gatilho] && (
            <Cartao className="mb-4 border-acento bg-acento-suave">
              <p className="text-tinta">{CONSELHO_POR_GATILHO[gatilho]}</p>
            </Cartao>
          )}

          <Cartao className="mb-4">
            <h2 className="mb-2 text-lg font-semibold text-tinta">
              Antes de fechar o site
            </h2>
            <p className="text-tinta">
              Se a vontade voltar hoje — e pode voltar — volte para cá. Não tem
              limite de vezes e não tem nada de errado em usar isto três vezes
              no mesmo dia.
            </p>
          </Cartao>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/painel/"
              className="inline-flex rounded-xl bg-acento px-5 py-3 font-semibold text-white no-underline"
            >
              Ver o meu painel
            </Link>
            <Link
              href="/ajuda/"
              className="inline-flex rounded-xl border border-borda bg-superficie px-5 py-3 font-semibold text-tinta no-underline"
            >
              Falar com alguém
            </Link>
          </div>

          {!atravessou && (
            <Cartao className="mt-6 bg-superficie-2">
              <p className="text-tinta">
                Se você acabou apostando, registrar ajuda mais do que esconder —
                e o seu total de dias não é apagado.{" "}
                <Link href="/recaida/" className="font-semibold text-acento">
                  Registrar uma recaída
                </Link>
                .
              </p>
            </Cartao>
          )}
        </>
      )}
    </>
  );
}
