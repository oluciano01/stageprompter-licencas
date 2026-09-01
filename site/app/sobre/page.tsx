import type { Metadata } from "next";
import Link from "next/link";
import { Cartao, TituloPagina } from "@/components/Base";
import { SalvarRestaurar } from "@/components/SalvarRestaurar";
import { APP } from "@/lib/config";

export const metadata: Metadata = {
  title: "Sobre e privacidade",
  description:
    "Como este site funciona por dentro: sem cadastro, sem banco de dados e sem nenhum dado saindo do seu celular.",
};

export default function PaginaSobre() {
  return (
    <>
      <TituloPagina
        titulo="Sobre e privacidade"
        linha="A parte que quase nenhum site escreve com clareza — e que aqui é o principal."
      />

      <Cartao className="border-acento bg-acento-suave">
        <h2 className="mb-3 text-xl font-bold text-tinta">
          Nada é enviado. Nada é guardado. Não há cadastro.
        </h2>
        <p className="text-tinta">
          Este site não tem cadastro, não tem login, não tem senha e não tem
          banco de dados. Não existe um servidor com o seu nome em lugar nenhum,
          porque não existe servidor: o site é feito só de páginas prontas.
        </p>
        <p className="mt-3 text-tinta">
          Quantos dias você está sem apostar, quanto você apostava, o seu
          compromisso, os gatilhos que você anotou — tudo isso é gravado no
          armazenamento do <strong>seu próprio navegador</strong>, no seu
          aparelho. Nunca sai dali.
        </p>
      </Cartao>

      <h2 className="mb-3 mt-10 text-2xl font-bold text-tinta">
        Por que foi feito assim
      </h2>
      <Cartao>
        <p className="text-tinta">
          Porque dado sobre vício é dado de saúde, e dado de saúde vaza, é
          pedido em processo, é vendido quando a empresa quebra. A forma mais
          segura de nunca expor a sua informação é <strong>nunca ter</strong> a
          sua informação.
        </p>
        <p className="mt-3 text-tinta">
          Também porque assim você entra e usa em cinco segundos. Quem está
          decidido a parar às três da manhã não vai preencher formulário de
          cadastro e confirmar e-mail.
        </p>
      </Cartao>

      <h2 className="mb-3 mt-10 text-2xl font-bold text-tinta">
        O preço disso, dito na cara
      </h2>
      <Cartao>
        <p className="text-tinta">
          Se você limpar os dados do navegador, trocar de celular, usar aba
          anônima ou desinstalar o navegador, <strong>o seu progresso some</strong>{" "}
          — e não tem como eu recuperar, porque eu nunca tive.
        </p>
        <p className="mt-3 text-tinta">
          Por isso existe o botão abaixo: ele baixa um arquivo com tudo o que
          está guardado. Mande esse arquivo para o seu e-mail de vez em quando.
          Para voltar, é só restaurá-lo aqui.
        </p>
        <div className="mt-4">
          <SalvarRestaurar />
        </div>
      </Cartao>

      <h2 className="mb-3 mt-10 text-2xl font-bold text-tinta">
        Deixe o site à mão
      </h2>
      <Cartao>
        <p className="text-tinta">
          Adicione {APP.nome} à tela de início do celular. Na hora da vontade,
          quanto menos toques até chegar aqui, melhor.
        </p>
        <ul className="mt-3 space-y-2 text-tinta">
          <li>
            <strong>Android:</strong> menu do navegador (os três pontinhos) ›{" "}
            Adicionar à tela inicial.
          </li>
          <li>
            <strong>iPhone:</strong> botão de compartilhar (o quadrado com a
            seta) › Adicionar à Tela de Início.
          </li>
        </ul>
      </Cartao>

      <h2 className="mb-3 mt-10 text-2xl font-bold text-tinta">
        Perguntas diretas
      </h2>
      <div className="space-y-4">
        <Cartao>
          <h3 className="font-semibold text-tinta">
            Vocês têm anúncio ou link de afiliado?
          </h3>
          <p className="mt-2 text-tinta">
            Não. Nenhum link deste site rende dinheiro para ninguém. O NextDNS é
            indicado porque tem um plano gratuito que resolve o problema, e não
            porque paga comissão.
          </p>
        </Cartao>

        <Cartao>
          <h3 className="font-semibold text-tinta">
            Tem rastreador, cookie, pixel do Facebook?
          </h3>
          <p className="mt-2 text-tinta">
            Não. Sem análise de audiência, sem cookie de rastreamento, sem
            pixel. O único armazenamento usado é o do seu navegador, e é para
            guardar o seu progresso para você mesmo.
          </p>
        </Cartao>

        <Cartao>
          <h3 className="font-semibold text-tinta">
            Alguém pode ver que eu usei este site?
          </h3>
          <p className="mt-2 text-tinta">
            Por aqui, não. Mas o endereço fica no histórico do seu navegador,
            como qualquer site. Se isso for um problema para você, apague o
            histórico depois — e lembre que apagar os dados do navegador também
            apaga o seu progresso, então baixe o arquivo antes.
          </p>
        </Cartao>

        <Cartao>
          <h3 className="font-semibold text-tinta">
            Isto substitui tratamento?
          </h3>
          <p className="mt-2 text-tinta">
            Não, e não tenta. Este site monta barreiras e te ajuda a atravessar
            a vontade. Jogo compulsivo tem tratamento gratuito no SUS e grupos
            de apoio anônimos e gratuitos —{" "}
            <Link href="/ajuda/" className="font-semibold text-acento">
              estão todos na página de ajuda
            </Link>
            .
          </p>
        </Cartao>
      </div>

      <Cartao className="mt-10 bg-superficie-2">
        <h2 className="mb-2 text-lg font-semibold text-tinta">
          Esta é a versão 0.5
        </h2>
        <p className="text-tinta">
          O site é novo e está sendo construído com quem usa. Se você travou em
          algum passo, se alguma tela não bateu com o seu celular ou se faltou
          alguma coisa que você precisava, isso é informação valiosa — é com
          ela que a próxima versão vai ser feita.
        </p>
      </Cartao>
    </>
  );
}
