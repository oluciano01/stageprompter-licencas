import type { Metadata } from "next";
import { Cartao, LinkExterno, TituloPagina } from "@/components/Base";
import { LINKS } from "@/lib/links";

export const metadata: Metadata = {
  title: "Ajuda agora",
  description:
    "CVV 188, CAPS e Jogadores Anônimos. Telefones e endereços de quem atende de graça, sem cadastro e sem formulário.",
};

export default function PaginaAjuda() {
  return (
    <>
      <TituloPagina
        titulo="Ajuda agora"
        linha="Sem formulário, sem cadastro, sem espera. Os contatos estão logo abaixo."
      />

      {/* O CVV vem primeiro e sozinho, com o número clicável e grande. */}
      <Cartao className="border-acento bg-acento-suave">
        <p className="text-[15px] font-semibold uppercase tracking-wide text-acento">
          Se você está pensando em se machucar
        </p>
        <a
          href={LINKS.cvvTelefone}
          className="mt-2 block text-5xl font-bold tracking-tight text-acento no-underline"
        >
          188
        </a>
        <p className="mt-3 text-tinta">
          CVV — Centro de Valorização da Vida. Ligação gratuita, 24 horas por
          dia, todos os dias, de qualquer lugar do Brasil. Você não precisa
          estar em crise para ligar, e não precisa saber o que dizer.
        </p>
        <p className="mt-3 text-tinta">
          Prefere escrever?{" "}
          <LinkExterno href={LINKS.cvvChat}>Chat do CVV</LinkExterno> ou{" "}
          <LinkExterno href={LINKS.cvvSite}>cvv.org.br</LinkExterno>.
        </p>
      </Cartao>

      <h2 className="mb-4 mt-10 text-2xl font-bold text-tinta">
        Ajuda para o jogo, especificamente
      </h2>

      <div className="space-y-4">
        <Cartao>
          <h3 className="text-lg font-semibold text-tinta">
            Jogadores Anônimos
          </h3>
          <p className="mt-2 text-tinta">
            Grupos de pessoas que pararam de apostar e se reúnem para continuar
            paradas. É de graça, é anônimo e ninguém pede seu documento. Existe
            desde 1993 no Brasil.
          </p>
          <ul className="mt-3 space-y-1">
            <li>
              <LinkExterno href={LINKS.jogadoresAnonimos}>
                Reuniões presenciais e endereços
              </LinkExterno>
            </li>
            <li>
              <LinkExterno href={LINKS.jogadoresAnonimosOnline}>
                Reuniões online (terças, 21h, horário de Brasília)
              </LinkExterno>
            </li>
          </ul>
        </Cartao>

        <Cartao>
          <h3 className="text-lg font-semibold text-tinta">
            CAPS — atendimento gratuito pelo SUS
          </h3>
          <p className="mt-2 text-tinta">
            O CAPS é o serviço público de saúde mental. Atende jogo patológico,
            é gratuito e você <strong>não precisa de encaminhamento</strong>:
            pode chegar e pedir atendimento. Se a sua cidade não tiver CAPS,
            procure a UBS (o postinho) mais perto e diga que é para saúde
            mental.
          </p>
          <p className="mt-3 text-tinta-fraca">
            Para achar o mais perto, busque{" "}
            <span className="rounded bg-superficie-2 px-1.5 py-0.5 font-medium text-tinta">
              CAPS + o nome da sua cidade
            </span>{" "}
            — ou ligue para a prefeitura e pergunte.
          </p>
          <p className="mt-3">
            <LinkExterno href={LINKS.capsBusca}>
              O que é o CAPS, no site do Ministério da Saúde
            </LinkExterno>
          </p>
        </Cartao>

        <Cartao>
          <h3 className="text-lg font-semibold text-tinta">
            Se quem aposta é outra pessoa
          </h3>
          <p className="mt-2 text-tinta">
            O Jog-Anon é para familiares e amigos de quem joga compulsivamente.
            A pessoa que aposta não precisa querer parar para você poder ser
            ajudado.
          </p>
          <p className="mt-3">
            <LinkExterno href={LINKS.jogAnon}>jog-anon.com.br</LinkExterno>
          </p>
        </Cartao>

        <Cartao>
          <h3 className="text-lg font-semibold text-tinta">
            Se a dívida é o que está sufocando
          </h3>
          <p className="mt-2 text-tinta">
            Procure o Procon da sua cidade ou a Defensoria Pública do seu
            estado. Os dois são gratuitos e conseguem renegociar dívida. Não
            pegue empréstimo novo para cobrir aposta — é o caminho mais rápido
            para o buraco fundo.
          </p>
        </Cartao>
      </div>

      <Cartao className="mt-10 bg-superficie-2">
        <p className="text-tinta">
          Este site não é tratamento e não substitui profissional de saúde. Ele
          te ajuda a montar barreiras e a atravessar a vontade. O resto é com
          gente de verdade — e procurar essa gente não é fraqueza.
        </p>
      </Cartao>
    </>
  );
}
