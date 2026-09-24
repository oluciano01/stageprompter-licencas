import type { Metadata } from "next";
import {
  Caminho,
  Cartao,
  CartaoHonestidade,
  LinkExterno,
  Passo,
  TituloPagina,
} from "@/components/Base";
import { MarcarEtapa } from "@/components/MarcarEtapa";
import { Trilha } from "@/components/Trilha";
import {
  TelaAndroidDnsPrivado,
  TelaAndroidHost,
  TelaAndroidRede,
  TelaIphonePerfil,
  TelaIphoneSafari,
} from "@/components/ilustracoes/Celulares";
import {
  TelaCategorias,
  TelaDenylist,
  TelaEndereco,
} from "@/components/ilustracoes/Nextdns";
import { LINKS } from "@/lib/links";

export const metadata: Metadata = {
  title: "Ligar o bloqueio no celular",
  description:
    "Passo a passo para bloquear sites e apps de aposta no celular inteiro, no Android e no iPhone, usando o NextDNS gratuito.",
};

function ListaPassos({ children }: { children: React.ReactNode }) {
  return <ol className="mt-6 space-y-6 list-none p-0">{children}</ol>;
}

export default function PaginaBloqueio() {
  return (
    <>
      <TituloPagina
        titulo="Ligar o bloqueio no celular"
        linha="Meia hora de configuração, uma vez só. Depois disso, site e app de aposta simplesmente não abrem."
      />

      <Cartao className="mb-8">
        <h2 className="mb-2 text-lg font-semibold text-tinta">
          O que a gente vai fazer
        </h2>
        <p className="text-tinta">
          Todo aplicativo, antes de abrir um site, pergunta a um serviço na
          internet onde aquele site fica. Esse serviço se chama DNS. A gente vai
          trocar o DNS do seu celular por um que se recusa a responder quando a
          pergunta é sobre casa de aposta.
        </p>
        <p className="mt-3 text-tinta">
          Vale para o celular inteiro: navegador, aplicativo baixado, link que
          chega por mensagem. E é gratuito.
        </p>
      </Cartao>

      <h2 className="mb-4 text-2xl font-bold text-tinta">
        Parte 1 — criar o bloqueio
      </h2>
      <p className="mb-2 text-tinta">
        Esta parte é igual no Android e no iPhone. Dá para fazer pelo próprio
        celular ou por um computador, o que for mais fácil para você.
      </p>

      <ListaPassos>
        <Passo numero={1} titulo="Crie uma conta gratuita no NextDNS">
          <p>
            Entre em{" "}
            <LinkExterno href={LINKS.nextdns}>nextdns.io</LinkExterno>, clique
            em <strong>Try it now</strong> ou <strong>Sign up</strong> e cadastre
            um e-mail e uma senha. Não pede cartão.
          </p>
          <p className="text-tinta-fraca">
            O site do NextDNS é em inglês. Os nomes dos botões que você precisa
            estão escritos aqui embaixo do jeito que aparecem lá.
          </p>
        </Passo>

        <Passo
          numero={2}
          titulo="Ligue a categoria de apostas"
          ilustracao={<TelaCategorias />}
        >
          <p>
            No painel, abra a aba <strong>Parental Control</strong> (controle
            dos pais). Role até <strong>Categories</strong> e ligue a chave da
            categoria <strong>Gambling</strong> — é essa a palavra em inglês
            para aposta e jogo de azar.
          </p>
          <p>
            Isso já derruba milhares de sites de aposta do mundo inteiro, o
            cassino online junto.
          </p>
        </Passo>

        <Passo
          numero={3}
          titulo="Adicione bet.br na lista de bloqueio"
          ilustracao={<TelaDenylist />}
        >
          <p>
            Abra a aba <strong>Denylist</strong> (lista de bloqueio), digite{" "}
            <strong className="rounded bg-superficie-2 px-1.5 py-0.5 font-mono">
              bet.br
            </strong>{" "}
            e clique em adicionar.
          </p>
          <p>
            Este passo é pequeno e vale por muitos. Toda casa de aposta
            autorizada no Brasil é obrigada a funcionar num endereço terminado
            em <strong>.bet.br</strong>. Bloquear esse final derruba o mercado
            legal brasileiro inteiro de uma vez — as que existem hoje e as que
            forem autorizadas amanhã.
          </p>
        </Passo>

        <Passo
          numero={4}
          titulo="Copie o seu endereço pessoal"
          ilustracao={<TelaEndereco />}
        >
          <p>
            Volte para a aba <strong>Setup</strong> (configuração). Procure a
            parte <strong>DNS-over-TLS</strong> e copie o endereço que aparece
            ali — é algo como{" "}
            <strong className="font-mono">a1b2c3.dns.nextdns.io</strong>, com
            letras e números que são só seus.
          </p>
          <p>
            Guarde esse endereço à mão. É ele que você vai colar no celular na
            parte 2.
          </p>
        </Passo>
      </ListaPassos>

      <h2 className="mb-4 mt-12 text-2xl font-bold text-tinta">
        Parte 2 — ligar no seu celular
      </h2>
      <p className="mb-6 text-tinta">
        Escolha o seu aparelho. Se você tem os dois, faça um de cada vez.
      </p>

      <Trilha
        abas={[
          {
            chave: "android",
            rotulo: "Android",
            conteudo: (
              <ListaPassos>
                <Passo
                  numero={5}
                  titulo="Abra as Configurações"
                  ilustracao={<TelaAndroidRede />}
                >
                  <Caminho partes={["Configurações", "Rede e internet"]} />
                  <p className="text-tinta-fraca">
                    Em celular Samsung, o caminho é{" "}
                    <strong>Configurações › Conexões › Mais configurações de
                    conexão</strong>. Em Motorola e Xiaomi, procure por{" "}
                    <strong>Rede e internet</strong> mesmo.
                  </p>
                </Passo>

                <Passo
                  numero={6}
                  titulo="Procure DNS privado"
                  ilustracao={<TelaAndroidDnsPrivado />}
                >
                  <Caminho
                    partes={["Rede e internet", "Avançado", "DNS privado"]}
                  />
                  <p>
                    Em muitos aparelhos ele já aparece direto, sem o{" "}
                    <strong>Avançado</strong>. Se não achar, use a busca das
                    Configurações (a lupa no topo) e digite{" "}
                    <strong>DNS privado</strong>.
                  </p>
                </Passo>

                <Passo
                  numero={7}
                  titulo="Cole o endereço e salve"
                  ilustracao={<TelaAndroidHost />}
                >
                  <p>
                    Marque a opção{" "}
                    <strong>Nome do host do provedor de DNS privado</strong>,
                    cole o endereço que você copiou no passo 4 e toque em{" "}
                    <strong>Salvar</strong>.
                  </p>
                  <p>
                    Se o celular reclamar que não conseguiu conectar, confira se
                    não sobrou espaço em branco no começo ou no fim do endereço.
                  </p>
                </Passo>

                <Passo numero={8} titulo="Teste antes de confiar">
                  <p>
                    Abra o navegador e tente entrar em qualquer site de aposta
                    que você usava. Tem que dar erro de página não encontrada.
                    Tente também pelo aplicativo, se você tiver algum instalado.
                  </p>
                  <p>
                    Deu certo? Então agora <strong>apague os aplicativos de
                    aposta do celular</strong>. Ícone na tela é convite.
                  </p>
                </Passo>
              </ListaPassos>
            ),
          },
          {
            chave: "iphone",
            rotulo: "iPhone",
            conteudo: (
              <ListaPassos>
                <Passo
                  numero={5}
                  titulo="Abra apple.nextdns.io no Safari"
                  ilustracao={<TelaIphoneSafari />}
                >
                  <p>
                    Precisa ser no <strong>Safari</strong> — em outro navegador
                    o iPhone não deixa instalar. Entre em{" "}
                    <LinkExterno href={LINKS.nextdnsPerfilApple}>
                      apple.nextdns.io
                    </LinkExterno>
                    , coloque o seu ID (as letras e números do começo do
                    endereço que você copiou no passo 4) e toque em{" "}
                    <strong>Download</strong>.
                  </p>
                  <p>
                    Vai aparecer um aviso perguntando se permite baixar um perfil
                    de configuração. Toque em <strong>Permitir</strong>.
                  </p>
                </Passo>

                <Passo
                  numero={6}
                  titulo="Instale o perfil nos Ajustes"
                  ilustracao={<TelaIphonePerfil />}
                >
                  <Caminho
                    partes={["Ajustes", "Perfil Baixado", "Instalar"]}
                  />
                  <p>
                    O item <strong>Perfil Baixado</strong> aparece lá em cima,
                    logo abaixo do seu nome. Toque nele, depois em{" "}
                    <strong>Instalar</strong> (no canto de cima, à direita),
                    digite a senha do aparelho e confirme.
                  </p>
                  <p className="text-tinta-fraca">
                    Se o item sumiu, ele foi para{" "}
                    <strong>Ajustes › Geral › VPN e Gerenciamento de
                    Dispositivo</strong>.
                  </p>
                </Passo>

                <Passo numero={7} titulo="Confirme que ficou ligado">
                  <Caminho
                    partes={["Ajustes", "Geral", "VPN, DNS e Dispositivo"]}
                  />
                  <p>
                    O NextDNS tem que aparecer ali como perfil de DNS ativo.
                  </p>
                </Passo>

                <Passo numero={8} titulo="Teste antes de confiar">
                  <p>
                    Tente entrar em algum site de aposta que você usava. Tem que
                    dar erro. Tente também pelo aplicativo.
                  </p>
                  <p>
                    Funcionou? Então <strong>apague os aplicativos de aposta do
                    celular</strong> agora. Ícone na tela é convite.
                  </p>
                </Passo>
              </ListaPassos>
            ),
          },
        ]}
      />

      <div className="mt-10">
        <MarcarEtapa
          etapa="bloqueio"
          rotulo="Liguei o bloqueio no meu celular"
          proximo={{ href: "/comecar/", texto: "Voltar para o passo a passo" }}
        />
      </div>

      <h2 className="mb-4 mt-12 text-2xl font-bold text-tinta">
        Se você travou no meio
      </h2>
      <Cartao>
        <p className="text-tinta">
          Não conseguiu? Não fique sem nada. Os controles que já vêm no seu
          celular são mais fáceis de ligar e mais fáceis de desligar — bloqueiam
          menos, mas bloqueiam.
        </p>
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="font-semibold text-tinta">
              iPhone — Tempo de Uso
            </h3>
            <Caminho
              partes={[
                "Ajustes",
                "Tempo de Uso",
                "Restrições de Conteúdo",
                "Conteúdo da Web",
                "Limitar sites adultos",
              ]}
            />
            <p className="mt-2 text-[15px] text-tinta-fraca">
              Em <strong>Nunca Permitir</strong>, adicione os endereços dos
              sites que você usava. Ponha uma senha do Tempo de Uso diferente da
              senha do aparelho e peça para alguém de confiança guardá-la.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-tinta">
              Android — Bem-estar digital
            </h3>
            <Caminho
              partes={[
                "Configurações",
                "Bem-estar digital",
                "Temporizadores de apps",
              ]}
            />
            <p className="mt-2 text-[15px] text-tinta-fraca">
              Dá para pôr limite de zero minuto nos aplicativos de aposta e usar
              o <strong>Modo Foco</strong> para bloqueá-los em horários fixos —
              principalmente à noite e no dia do pagamento.
            </p>
          </div>
        </div>
      </Cartao>

      <div className="mt-10">
        <CartaoHonestidade
          pontos={[
            <>
              <strong>Você mesmo consegue desligar isso.</strong> São dois
              toques nas configurações. O bloqueio não é uma prisão — ele existe
              para pôr uns minutos e um pouco de trabalho entre a vontade e a
              aposta. Na maioria das vezes, esses minutos bastam.
            </>,
            <>
              O plano gratuito do NextDNS filtra até 300 mil consultas por mês.
              Passando disso, a internet continua funcionando normalmente, mas o
              filtro para de agir até virar o mês — e ele não avisa em voz alta.
              Para um celular só, esse limite dificilmente é alcançado.
            </>,
            <>
              Navegador com DNS próprio (o Chrome tem essa opção escondida) e
              aplicativo de VPN passam por cima do bloqueio. Se você tem uma VPN
              instalada e não precisa dela para trabalhar, apague.
            </>,
            <>
              Rede Wi-Fi de outro lugar não muda nada: o DNS privado do Android e
              o perfil do iPhone valem em qualquer conexão, inclusive nos dados
              móveis.
            </>,
          ]}
        />
      </div>

      <Cartao className="mt-8 bg-superficie-2">
        <h2 className="mb-2 text-lg font-semibold text-tinta">
          Uma ideia que ajuda mais do que parece
        </h2>
        <p className="text-tinta">
          Peça para uma pessoa de confiança criar a conta do NextDNS e guardar a
          senha. Você fica com o bloqueio ligado e sem o poder de desligá-lo num
          impulso de madrugada. Não é vigilância: é você decidindo hoje, com a
          cabeça fria, uma coisa que o você de daqui a pouco não vai conseguir
          decidir.
        </p>
      </Cartao>
    </>
  );
}
