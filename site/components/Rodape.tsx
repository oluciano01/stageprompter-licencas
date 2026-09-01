import Link from "next/link";
import { APP } from "@/lib/config";
import { LINKS } from "@/lib/links";

export function Rodape() {
  return (
    <footer className="mt-16 border-t border-borda bg-superficie">
      <div className="mx-auto max-w-3xl px-4 py-8 text-[15px] text-tinta-fraca">
        <p className="mb-4">
          Se você está em sofrimento agora, ligue{" "}
          <a href={LINKS.cvvTelefone} className="font-semibold text-acento">
            188
          </a>
          . É gratuito, 24 horas, e a pessoa do outro lado escuta.
        </p>

        <nav aria-label="Rodapé" className="mb-4 flex flex-wrap gap-x-4 gap-y-2">
          <Link href="/ajuda/" className="text-tinta-fraca underline">
            Ajuda
          </Link>
          <Link href="/comecar/" className="text-tinta-fraca underline">
            Começar
          </Link>
          <Link href="/bloqueio/" className="text-tinta-fraca underline">
            Guia do bloqueio
          </Link>
          <Link href="/autoexclusao/" className="text-tinta-fraca underline">
            Autoexclusão
          </Link>
          <Link href="/feed/" className="text-tinta-fraca underline">
            Limpar o feed
          </Link>
          <Link href="/sobre/" className="text-tinta-fraca underline">
            Sobre e privacidade
          </Link>
        </nav>

        <p className="text-[14px]">
          {APP.nome} não é tratamento e não substitui ajuda profissional. Nada
          do que você escreve aqui sai do seu celular.
        </p>
      </div>
    </footer>
  );
}
