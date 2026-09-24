"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { APP } from "@/lib/config";

const NAVEGACAO = [
  { href: "/comecar/", texto: "Começar" },
  { href: "/painel/", texto: "Painel" },
  { href: "/bloqueio/", texto: "Bloqueio" },
  { href: "/autoexclusao/", texto: "Autoexclusão" },
  { href: "/feed/", texto: "Limpar o feed" },
];

export function Cabecalho() {
  const caminho = usePathname();
  const [aberto, setAberto] = useState(false);

  const ehAtual = (href: string) => caminho === href;

  return (
    <header className="sticky top-0 z-20 border-b border-borda bg-fundo/95 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
        <Link
          href="/"
          className="mr-auto text-[17px] font-semibold tracking-tight text-tinta no-underline"
        >
          {APP.nome}
        </Link>

        {/* Ajuda é link fixo, sempre visível, em todas as páginas e em qualquer tela. */}
        <Link
          href="/ajuda/"
          className="rounded-full border border-acento px-4 py-1.5 text-[15px] font-semibold text-acento no-underline"
        >
          Ajuda
        </Link>

        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          aria-expanded={aberto}
          aria-controls="menu-principal"
          className="rounded-lg border border-borda px-3 py-1.5 text-[15px] text-tinta sm:hidden"
        >
          Menu
        </button>

        <nav aria-label="Seções" className="hidden gap-1 sm:flex">
          {NAVEGACAO.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={ehAtual(item.href) ? "page" : undefined}
              className={`rounded-lg px-2.5 py-1.5 text-[15px] no-underline ${
                ehAtual(item.href)
                  ? "bg-acento-suave font-semibold text-acento"
                  : "text-tinta-fraca hover:text-tinta"
              }`}
            >
              {item.texto}
            </Link>
          ))}
        </nav>
      </div>

      {aberto && (
        <nav
          id="menu-principal"
          aria-label="Seções"
          className="border-t border-borda bg-superficie px-4 py-2 sm:hidden"
        >
          {NAVEGACAO.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setAberto(false)}
              aria-current={ehAtual(item.href) ? "page" : undefined}
              className={`block border-b border-borda py-3 no-underline last:border-0 ${
                ehAtual(item.href) ? "font-semibold text-acento" : "text-tinta"
              }`}
            >
              {item.texto}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
