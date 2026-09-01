import type { Metadata } from "next";
import Link from "next/link";
import { Cartao, CartaoHonestidade, LinkExterno } from "@/components/Base";
import { APP } from "@/lib/config";
import { LINKS } from "@/lib/links";

export const metadata: Metadata = {
  description: APP.descricao,
};

const NUMEROS = [
  {
    numero: "15,2 milhões",
    texto:
      "de CPFs diferentes apostaram em casas autorizadas só nos três primeiros meses de 2026.",
  },
  {
    numero: "R$ 30 bilhões",
    texto:
      "por mês é o que o Banco Central estima que sai do bolso dos brasileiros para as bets.",
  },
  {
    numero: "31 a 40 anos",
    texto:
      "é a faixa com mais apostadores cadastrados. Não é adolescente: é gente com conta para pagar.",
  },
];

const PASSOS = [
  {
    titulo: "Entender o que está acontecendo",
    texto:
      "Aposta prende porque a recompensa é imprevisível — é isso que fisga, não a falta de caráter.",
  },
  {
    titulo: "Se autoexcluir no gov.br",
    texto:
      "Um pedido bloqueia o seu CPF em todas as casas autorizadas do país de uma vez.",
    href: "/autoexclusao/",
  },
  {
    titulo: "Ligar um bloqueio no celular",
    texto:
      "Meia hora de configuração e site e aplicativo de aposta param de abrir. Gratuito.",
    href: "/bloqueio/",
  },
  {
    titulo: "Assumir um compromisso com prazo",
    texto:
      "Curto, escrito por você e com data para fechar. E um contador para você olhar nos dias ruins.",
    href: "/comecar/",
  },
];

export default function PaginaInicial() {
  return (
    <>
      <section className="mb-10">
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-tinta sm:text-5xl">
          Parar de apostar, um passo de cada vez
        </h1>
        <p className="mt-4 text-xl text-tinta">
          Não é uma prisão. É uma barreira que dá tempo para a vontade passar —
          e a vontade sempre passa.
        </p>
        <p className="mt-4 text-tinta">
          Este site te ajuda a montar as barreiras que funcionam, com o passo a
          passo escrito para quem não é técnico. Sem cadastro, sem senha, sem
          mensalidade. Nada do que você escrever aqui sai do seu celular.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/comecar/"
            className="inline-flex items-center justify-center rounded-xl bg-acento px-6 py-4 text-lg font-semibold text-white no-underline"
          >
            Começar agora
          </Link>
          <Link
            href="/vontade/"
            className="inline-flex items-center justify-center rounded-xl border-2 border-acento bg-superficie px-6 py-4 text-lg font-semibold text-acento no-underline"
          >
            Estou com vontade agora
          </Link>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-tinta">
          Você não é exceção
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {NUMEROS.map((item) => (
            <div
              key={item.numero}
              className="rounded-2xl border border-borda bg-superficie p-5"
            >
              <p className="text-2xl font-bold text-acento">{item.numero}</p>
              <p className="mt-2 text-[15px] text-tinta">{item.texto}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[14px] text-tinta-fraca">
          Fontes:{" "}
          <LinkExterno href={LINKS.estudoBancoCentral}>
            estudo do Banco Central sobre o mercado de apostas
          </LinkExterno>{" "}
          e{" "}
          <LinkExterno href={LINKS.dadosSpa}>
            relatórios da Secretaria de Prêmios e Apostas
          </LinkExterno>
          .
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-2 text-2xl font-bold text-tinta">
          O que a gente faz aqui
        </h2>
        <p className="mb-4 text-tinta">
          Quatro coisas, nesta ordem. Você pode fazer uma hoje e as outras
          quando der — não precisa fazer tudo de uma vez.
        </p>
        <ol className="list-none space-y-3 p-0">
          {PASSOS.map((passo, i) => (
            <li
              key={passo.titulo}
              className="flex gap-4 rounded-2xl border border-borda bg-superficie p-5"
            >
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-acento-suave text-[17px] font-bold text-acento"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-tinta">
                  {passo.href ? (
                    <Link href={passo.href} className="text-tinta">
                      {passo.titulo}
                    </Link>
                  ) : (
                    passo.titulo
                  )}
                </h3>
                <p className="mt-1 text-[15px] text-tinta-fraca">
                  {passo.texto}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-10">
        <CartaoHonestidade
          titulo="O que este site não é"
          pontos={[
            <>
              <strong>Não é um bloqueio impossível de burlar.</strong> Você
              mesmo consegue desligar tudo o que montar aqui, em poucos toques.
              A ideia não é te trancar: é pôr alguns minutos e algum trabalho
              entre a vontade e a aposta. Na maior parte das vezes, isso basta.
            </>,
            <>
              A autoexclusão do gov.br só alcança as casas autorizadas. Site sem
              licença continua aberto — por isso o bloqueio no celular também
              importa.
            </>,
            <>
              Navegador com DNS próprio e aplicativo de VPN passam por cima do
              bloqueio.
            </>,
            <>
              <strong>Isto não é tratamento.</strong> Se você precisa de ajuda
              profissional, procure o CAPS da sua cidade — é gratuito e não
              precisa de encaminhamento. Está tudo na{" "}
              <Link href="/ajuda/" className="font-semibold text-acento">
                página de ajuda
              </Link>
              .
            </>,
          ]}
        />
      </section>

      <Cartao className="bg-superficie-2">
        <h2 className="mb-2 text-lg font-semibold text-tinta">
          Sobre a sua privacidade, em duas linhas
        </h2>
        <p className="text-tinta">
          Não existe cadastro, não existe senha e nenhum dado seu é enviado para
          lugar nenhum. O que você anota fica guardado no seu próprio navegador,
          e some se você limpar os dados dele.{" "}
          <Link href="/sobre/" className="font-semibold text-acento">
            Como isso funciona
          </Link>
          .
        </p>
      </Cartao>
    </>
  );
}
