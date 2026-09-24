import type { Metadata } from "next";
import Link from "next/link";
import {
  Caminho,
  Cartao,
  CartaoHonestidade,
  LinkExterno,
  TituloPagina,
} from "@/components/Base";
import { LINKS } from "@/lib/links";

export const metadata: Metadata = {
  title: "Limpar o feed",
  description:
    "Como desligar anúncio de aposta no Instagram e no Facebook, filtrar palavras no TikTok e tirar o assunto das recomendações do YouTube.",
};

export default function PaginaFeed() {
  return (
    <>
      <TituloPagina
        titulo="Limpar o feed"
        linha="De nada adianta bloquear os sites se o celular continua te oferecendo aposta o dia inteiro. Esta parte é de graça e quase ninguém sabe que existe."
      />

      <Cartao className="mb-8">
        <p className="text-tinta">
          Os aplicativos aprenderam que você para de rolar quando aparece
          palpite, odd e "múltipla do dia" — e por isso te mostram mais disso.
          Enquanto o feed continuar assim, você vai gastar força de vontade
          toda hora, sem precisar.
        </p>
        <p className="mt-3 text-tinta">
          Reserve vinte minutos e faça os quatro daqui de baixo. Não fica
          perfeito, mas fica muito melhor.
        </p>
      </Cartao>

      <div className="space-y-6">
        <Cartao>
          <h2 className="mb-3 text-xl font-bold text-tinta">
            1. Instagram e Facebook — desligar o assunto na publicidade
          </h2>
          <p className="text-tinta">
            A Meta tem um controle específico para anúncio de jogo de azar. Ele
            fica escondido em três telas de profundidade, mas existe e funciona.
          </p>
          <Caminho
            partes={[
              "Configurações",
              "Central de Contas",
              "Preferências de anúncios",
              "Tópicos de anúncios",
            ]}
          />
          <p className="mt-3 text-tinta">
            Procure o tópico <strong>Jogos de azar e apostas</strong> e escolha{" "}
            <strong>Ver menos</strong>.
          </p>
          <p className="mt-3">
            <LinkExterno href={LINKS.metaPreferenciasAnuncios}>
              Abrir as preferências de anúncios da Meta
            </LinkExterno>
          </p>
          <p className="mt-3 text-tinta-fraca">
            No mesmo lugar, em <strong>Anunciantes</strong>, dá para bloquear
            casa por casa as que já te acharam. Vale o trabalho: são justamente
            as que mais insistem.
          </p>
        </Cartao>

        <Cartao>
          <h2 className="mb-3 text-xl font-bold text-tinta">
            2. TikTok — filtrar palavras
          </h2>
          <p className="text-tinta">
            O TikTok deixa você listar palavras que nunca mais quer ver. É o
            controle mais poderoso desta página e o menos conhecido.
          </p>
          <Caminho
            partes={[
              "Perfil",
              "Menu",
              "Configurações e privacidade",
              "Preferências de conteúdo",
              "Filtrar palavras-chave de vídeos",
            ]}
          />
          <p className="mt-3 text-tinta">
            Sugestão de lista para começar — vá acrescentando conforme o que
            aparecer para você:
          </p>
          <p className="mt-2 rounded-xl bg-superficie-2 px-4 py-3 font-mono text-[15px] text-tinta">
            aposta, apostas, bet, bets, odd, odds, múltipla, green, red, banca,
            tigrinho, cassino, palpite, bilhete, entrada confirmada, robô,
            plataforma
          </p>
          <p className="mt-3 text-tinta-fraca">
            E, no vídeo que escapar: segure o dedo em cima e escolha{" "}
            <strong>Não interessado</strong>. O aplicativo aprende rápido quando
            você faz isso algumas vezes seguidas.
          </p>
        </Cartao>

        <Cartao>
          <h2 className="mb-3 text-xl font-bold text-tinta">
            3. YouTube — cortar o canal, não só o vídeo
          </h2>
          <p className="text-tinta">
            Nos vídeos recomendados, toque nos três pontinhos ao lado do vídeo e
            escolha <strong>Não recomendar este canal</strong>. É bem mais
            eficaz do que o "Não tenho interesse", que só descarta aquele vídeo.
          </p>
          <p className="mt-3 text-tinta">
            Depois, apague do histórico o que você já assistiu sobre o assunto —
            é dele que vêm as recomendações.
          </p>
          <p className="mt-3">
            <LinkExterno href={LINKS.youtubeHistorico}>
              Abrir o histórico do YouTube
            </LinkExterno>
          </p>
          <p className="mt-3 text-tinta-fraca">
            Se você seguia canal de palpite, cancele a inscrição. Não precisa
            avisar ninguém.
          </p>
        </Cartao>

        <Cartao>
          <h2 className="mb-3 text-xl font-bold text-tinta">
            4. Os perfis e os grupos — um por um
          </h2>
          <p className="text-tinta">
            Esta é a parte que nenhum ajuste automático faz por você, e é a que
            mais muda o seu dia.
          </p>
          <p className="mt-3 text-tinta">
            Pegue papel ou o bloco de notas e liste tudo que te empurra para
            aposta: perfil de palpite, influenciador patrocinado por bet, grupo
            de WhatsApp de bilhete, aquele amigo que manda print de green às
            duas da manhã, canal de Telegram de "sinais".
          </p>
          <div className="mt-4 space-y-2 text-tinta">
            <p>
              <strong>Perfil de palpite ou influenciador:</strong> deixe de
              seguir. Se não quiser deixar de seguir, silencie — ele não é
              avisado.
            </p>
            <p>
              <strong>Grupo de bilhete:</strong> saia. Se sair for criar
              confusão, silencie o grupo e arraste para o fim da lista.
            </p>
            <p>
              <strong>Aquele amigo específico:</strong> silenciar a conversa
              dele já resolve muito. Você não precisa explicar nada para
              ninguém.
            </p>
          </div>
          <p className="mt-4 rounded-xl bg-acento-suave px-4 py-3 text-tinta">
            Se conseguir contar para uma pessoa dessa lista o que você está
            fazendo, conte. Ter alguém sabendo é a barreira que funciona quando
            todas as outras falham.
          </p>
        </Cartao>
      </div>

      <div className="mt-8">
        <CartaoHonestidade
          titulo="O que isso resolve e o que não resolve"
          pontos={[
            <>
              Isto reduz muito, mas não zera. Publicidade de aposta está em
              camisa de time, em placa de estádio e na boca de gente que você
              conhece — não tem botão para desligar isso.
            </>,
            <>
              Depois da{" "}
              <Link
                href="/autoexclusao/"
                className="font-semibold text-acento"
              >
                autoexclusão no gov.br
              </Link>
              , a publicidade dirigida a você das casas autorizadas tem que
              parar por obrigação legal. Vale fazer as duas coisas.
            </>,
            <>
              Os nomes dos menus mudam a cada atualização dos aplicativos. Se o
              caminho aqui não bater com o seu celular, procure na busca das
              configurações por "anúncios", "preferências" ou "palavras".
            </>,
          ]}
        />
      </div>
    </>
  );
}
