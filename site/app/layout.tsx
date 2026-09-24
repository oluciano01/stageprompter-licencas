import type { Metadata, Viewport } from "next";
import { Cabecalho } from "@/components/Cabecalho";
import { Rodape } from "@/components/Rodape";
import { APP } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(APP.url),
  title: {
    default: `${APP.nome} — parar de apostar, um passo de cada vez`,
    template: `%s — ${APP.nome}`,
  },
  description: APP.descricao,
  manifest: "/manifest.webmanifest",
  applicationName: APP.nome,
  appleWebApp: { capable: true, title: APP.nome, statusBarStyle: "default" },
  icons: { icon: "/icone.svg", apple: "/icone-apple.png" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#101614" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-acento focus:px-4 focus:py-2 focus:text-white"
        >
          Pular para o conteúdo
        </a>
        <Cabecalho />
        <main id="conteudo" className="mx-auto max-w-3xl px-4 py-8">
          {children}
        </main>
        <Rodape />
      </body>
    </html>
  );
}
