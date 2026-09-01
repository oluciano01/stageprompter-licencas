import Link from "next/link";
import type { ReactNode } from "react";

export function TituloPagina({
  titulo,
  linha,
}: {
  titulo: string;
  linha?: ReactNode;
}) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold leading-tight tracking-tight text-tinta sm:text-4xl">
        {titulo}
      </h1>
      {linha && <p className="mt-3 text-lg text-tinta-fraca">{linha}</p>}
    </div>
  );
}

export function Cartao({
  children,
  className = "",
  ...resto
}: React.ComponentPropsWithoutRef<"section"> & { className?: string }) {
  return (
    <section
      className={`rounded-2xl border border-borda bg-superficie p-5 ${className}`}
      {...resto}
    >
      {children}
    </section>
  );
}

/** Link interno com cara de botão principal. */
export function BotaoLink({
  href,
  children,
  variante = "principal",
}: {
  href: string;
  children: ReactNode;
  variante?: "principal" | "secundario";
}) {
  const estilo =
    variante === "principal"
      ? "bg-acento text-white hover:bg-acento-forte"
      : "border border-borda bg-superficie text-tinta hover:bg-superficie-2";
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-xl px-5 py-3 text-center text-[17px] font-semibold no-underline ${estilo}`}
    >
      {children}
    </Link>
  );
}

/** Link para fora do site. Abre em outra aba e diz isso em voz alta. */
export function LinkExterno({
  href,
  children,
  botao = false,
}: {
  href: string;
  children: ReactNode;
  botao?: boolean;
}) {
  const classe = botao
    ? "inline-flex items-center justify-center rounded-xl bg-acento px-5 py-3 text-center text-[17px] font-semibold text-white no-underline hover:bg-acento-forte"
    : "font-medium text-acento underline underline-offset-2";
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classe}>
      {children}
      <span className="sr-only"> (abre em outra aba)</span>
    </a>
  );
}

/**
 * O bloco de honestidade. Aparece nas páginas em que a promessa pode ser
 * lida como maior do que é. Não é letra miúda: é o que separa este site
 * de um blog de afiliado.
 */
export function CartaoHonestidade({
  titulo = "Sendo honesto com você",
  pontos,
}: {
  titulo?: string;
  pontos: ReactNode[];
}) {
  return (
    <section className="rounded-2xl border border-aviso-borda bg-aviso-fundo p-5">
      <h2 className="mb-3 text-lg font-semibold text-aviso">{titulo}</h2>
      <ul className="space-y-2 text-[16px] text-tinta">
        {pontos.map((ponto, i) => (
          <li key={i} className="flex gap-2">
            <span aria-hidden="true" className="text-aviso">
              •
            </span>
            <span>{ponto}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Passo numerado dos guias. */
export function Passo({
  numero,
  titulo,
  children,
  ilustracao,
}: {
  numero: number;
  titulo: string;
  children: ReactNode;
  ilustracao?: ReactNode;
}) {
  return (
    <li className="relative border-b border-borda pb-6 last:border-0 last:pb-0">
      <div className="flex gap-4">
        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-acento-suave text-[17px] font-bold text-acento"
        >
          {numero}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="mb-2 text-lg font-semibold text-tinta">
            <span className="sr-only">Passo {numero}: </span>
            {titulo}
          </h3>
          <div className="space-y-3 text-tinta">{children}</div>
          {ilustracao && <div className="mt-4">{ilustracao}</div>}
        </div>
      </div>
    </li>
  );
}

/** Caminho de menu do celular, do jeito que aparece na tela. */
export function Caminho({ partes }: { partes: string[] }) {
  return (
    <p className="rounded-xl bg-superficie-2 px-4 py-3 font-medium text-tinta">
      {partes.map((parte, i) => (
        <span key={i}>
          {i > 0 && (
            <span aria-hidden="true" className="mx-2 text-tinta-fraca">
              ›
            </span>
          )}
          {i > 0 && <span className="sr-only">, depois </span>}
          {parte}
        </span>
      ))}
    </p>
  );
}
