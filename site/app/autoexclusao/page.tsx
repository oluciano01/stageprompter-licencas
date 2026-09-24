import type { Metadata } from "next";
import Link from "next/link";
import {
  Cartao,
  CartaoHonestidade,
  LinkExterno,
  Passo,
  TituloPagina,
} from "@/components/Base";
import { MarcarEtapa } from "@/components/MarcarEtapa";
import { LINKS } from "@/lib/links";

export const metadata: Metadata = {
  title: "Autoexclusão no gov.br",
  description:
    "Como bloquear o seu CPF em todas as casas de aposta autorizadas do Brasil de uma vez só, pela plataforma oficial do governo. O que acontece, quanto dura e o que ela não alcança.",
};

export default function PaginaAutoexclusao() {
  return (
    <>
      <TituloPagina
        titulo="Autoexclusão no gov.br"
        linha="Um pedido, dez minutos, e todas as casas de aposta autorizadas no Brasil são obrigadas a fechar a porta para o seu CPF."
      />

      <Cartao className="mb-8">
        <h2 className="mb-2 text-lg font-semibold text-tinta">
          O que é isso
        </h2>
        <p className="text-tinta">
          Desde dezembro de 2025 o governo federal mantém a{" "}
          <strong>Plataforma Centralizada de Autoexclusão</strong>. Você entra
          com a sua conta gov.br, escolhe por quanto tempo quer ficar fora, e o
          seu CPF é comunicado a todas as casas de aposta autorizadas do país
          ao mesmo tempo.
        </p>
        <p className="mt-3 text-tinta">
          Não é a mesma coisa que pedir bloqueio site por site. É uma vez só,
          para todas.
        </p>
      </Cartao>

      <h2 className="mb-4 text-2xl font-bold text-tinta">
        O que acontece depois que você pede
      </h2>
      <Cartao>
        <ul className="space-y-3 text-tinta">
          <li className="flex gap-3">
            <span aria-hidden="true" className="font-bold text-acento">
              →
            </span>
            <span>
              Em até <strong>72 horas</strong>, as casas autorizadas bloqueiam o
              seu acesso aos sites e aos aplicativos delas.
            </span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden="true" className="font-bold text-acento">
              →
            </span>
            <span>
              O seu CPF fica <strong>indisponível para novo cadastro</strong> em
              qualquer uma delas. Abrir outra conta deixa de ser uma saída.
            </span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden="true" className="font-bold text-acento">
              →
            </span>
            <span>
              Elas são obrigadas a <strong>parar a publicidade dirigida a
              você</strong> — aquele e-mail de bônus, o SMS de "sua conta sente
              sua falta", a notificação de odd.
            </span>
          </li>
        </ul>
      </Cartao>

      <h2 className="mb-4 mt-10 text-2xl font-bold text-tinta">
        Antes de clicar, decida duas coisas
      </h2>

      <Cartao className="mb-4">
        <h3 className="text-lg font-semibold text-tinta">
          1. Por quanto tempo
        </h3>
        <p className="mt-2 text-tinta">
          Você escolhe de <strong>1 a 12 meses</strong>, ou{" "}
          <strong>por tempo indeterminado</strong>.
        </p>
        <p className="mt-3 text-tinta">
          Escolhendo um prazo fixo,{" "}
          <strong>não dá para encurtar nem cancelar antes do fim</strong> — nem
          se você mudar de ideia amanhã. Isso não é defeito, é o ponto: é você
          hoje protegendo você de daqui a três semanas.
        </p>
        <p className="mt-3 text-tinta">
          No indeterminado existe uma janela de arrependimento: você tem até um
          mês para voltar atrás. Depois disso, vale até você pedir para sair.
        </p>
        <p className="mt-3 rounded-xl bg-acento-suave px-4 py-3 text-tinta">
          Se estiver em dúvida, escolha mais tempo do que parece confortável. A
          vontade de encurtar o prazo vem depois — e é justamente contra ela que
          serve o prazo.
        </p>
      </Cartao>

      <Cartao>
        <h3 className="text-lg font-semibold text-tinta">
          2. O dinheiro que está lá dentro
        </h3>
        <p className="mt-2 text-tinta">
          Se você tem saldo em alguma conta de aposta, resolva isso antes de
          pedir a autoexclusão: sacar depois do bloqueio dá muito mais trabalho,
          e você vai precisar falar com o suporte de cada casa.
        </p>
        <p className="mt-3 text-tinta-fraca">
          Saque para a sua conta bancária e, se der, use o dinheiro no mesmo dia
          em alguma coisa que não volte — uma conta atrasada, o mercado do mês.
          Dinheiro parado em conta é dinheiro esperando a próxima ideia ruim.
        </p>
      </Cartao>

      <h2 className="mb-4 mt-10 text-2xl font-bold text-tinta">
        O passo a passo
      </h2>
      <ol className="mt-6 list-none space-y-6 p-0">
        <Passo numero={1} titulo="Confira a sua conta gov.br">
          <p>
            A plataforma exige conta <strong>nível prata ou ouro</strong>. Se a
            sua é bronze, dá para subir de nível pelo aplicativo gov.br com
            reconhecimento facial, ou entrando com o banco em que você já tem
            conta.
          </p>
          <p>
            <LinkExterno href={LINKS.govbrConta}>
              Como aumentar o nível da conta gov.br
            </LinkExterno>
          </p>
        </Passo>

        <Passo numero={2} titulo="Entre na plataforma e faça o pedido">
          <p>
            O endereço é{" "}
            <strong className="font-mono">gov.br/autoexclusaoapostas</strong>.
            Você entra com a conta gov.br, escolhe o prazo e confirma.
          </p>
          <p>
            <LinkExterno href={LINKS.autoexclusao} botao>
              Abrir a plataforma de autoexclusão
            </LinkExterno>
          </p>
          <p className="text-tinta-fraca">
            Também dá para chegar pela{" "}
            <LinkExterno href={LINKS.autoexclusaoServico}>
              página do serviço no gov.br
            </LinkExterno>{" "}
            ou pela{" "}
            <LinkExterno href={LINKS.autoexclusaoExplicacao}>
              explicação do Ministério da Fazenda
            </LinkExterno>
            .
          </p>
        </Passo>

        <Passo numero={3} titulo="Volte aqui e marque como feito">
          <p>
            O bloqueio nas casas leva até 72 horas para entrar em vigor. Você
            não precisa esperar para marcar — o que importa é que o pedido foi
            feito.
          </p>
        </Passo>
      </ol>

      <div className="mt-10">
        <MarcarEtapa
          etapa="autoexclusao"
          rotulo="Pedi a minha autoexclusão"
          proximo={{ href: "/bloqueio/", texto: "Agora o bloqueio no celular" }}
        />
      </div>

      <div className="mt-10">
        <CartaoHonestidade
          pontos={[
            <>
              <strong>A autoexclusão só alcança as casas autorizadas.</strong>{" "}
              Site sem licença — e existe muito — não recebe a sua lista e não
              vai te bloquear. Por isso ela sozinha não basta.
            </>,
            <>
              É aí que entra o{" "}
              <Link href="/bloqueio/" className="font-semibold text-acento">
                bloqueio no celular
              </Link>
              : ele não separa legal de ilegal, derruba os dois. Os dois juntos
              cobrem quase tudo; um só deixa buraco.
            </>,
            <>
              A autoexclusão não apaga dívida nem devolve o que já foi. Para
              isso, o caminho é o Procon ou a Defensoria — está na{" "}
              <Link href="/ajuda/" className="font-semibold text-acento">
                página de ajuda
              </Link>
              .
            </>,
          ]}
        />
      </div>
    </>
  );
}
