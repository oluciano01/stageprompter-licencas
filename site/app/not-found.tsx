import Link from "next/link";
import { Cartao, TituloPagina } from "@/components/Base";
import { LINKS } from "@/lib/links";

export default function PaginaNaoEncontrada() {
  return (
    <>
      <TituloPagina
        titulo="Esta página não existe"
        linha="Provavelmente o endereço mudou. As páginas do site estão logo abaixo."
      />
      <Cartao>
        <ul className="space-y-2 text-tinta">
          <li>
            <Link href="/ajuda/" className="font-semibold text-acento">
              Ajuda agora
            </Link>{" "}
            — CVV 188, CAPS, Jogadores Anônimos
          </li>
          <li>
            <Link href="/comecar/" className="font-semibold text-acento">
              Começar
            </Link>{" "}
            — o passo a passo de quatro etapas
          </li>
          <li>
            <Link href="/painel/" className="font-semibold text-acento">
              Meu painel
            </Link>
          </li>
          <li>
            <Link href="/vontade/" className="font-semibold text-acento">
              Estou com vontade
            </Link>
          </li>
        </ul>
        <p className="mt-4 text-tinta">
          Se você chegou aqui procurando ajuda imediata, ligue{" "}
          <a href={LINKS.cvvTelefone} className="text-xl font-bold text-acento">
            188
          </a>
          .
        </p>
      </Cartao>
    </>
  );
}
