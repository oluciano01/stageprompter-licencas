import type { ReactNode } from "react";

/**
 * Peças comuns das ilustrações.
 *
 * São desenhos, não capturas de tela: as cores e as fontes seguem o site,
 * e por isso funcionam no modo claro e no escuro. Quando você tiver prints
 * reais dos aparelhos, dá para trocar arquivo por arquivo sem mexer nas
 * páginas — cada ilustração é um componente isolado.
 */

export function Ilustracao({
  titulo,
  legenda,
  altura,
  children,
}: {
  /** Descrição para quem usa leitor de tela. */
  titulo: string;
  /** Legenda visível abaixo do desenho. */
  legenda: string;
  altura: number;
  children: ReactNode;
}) {
  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-xl border border-borda bg-superficie-2 p-4">
        <svg
          viewBox={`0 0 360 ${altura}`}
          role="img"
          aria-label={titulo}
          className="mx-auto block h-auto w-full max-w-[320px]"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          {children}
        </svg>
      </div>
      <figcaption className="mt-2 text-[14px] text-tinta-fraca">
        {legenda} <span className="italic">(desenho ilustrativo)</span>
      </figcaption>
    </figure>
  );
}

/** Contorno de tela de celular. */
export function Celular({
  altura,
  children,
}: {
  altura: number;
  children: ReactNode;
}) {
  return (
    <>
      <rect
        x="4"
        y="4"
        width="352"
        height={altura - 8}
        rx="28"
        fill="var(--cor-superficie)"
        stroke="var(--cor-borda)"
        strokeWidth="2"
      />
      <rect
        x="150"
        y="16"
        width="60"
        height="7"
        rx="3.5"
        fill="var(--cor-borda)"
      />
      {children}
    </>
  );
}

/** Contorno de janela de navegador, para as telas do NextDNS. */
export function Navegador({
  altura,
  endereco,
  children,
}: {
  altura: number;
  endereco: string;
  children: ReactNode;
}) {
  return (
    <>
      <rect
        x="4"
        y="4"
        width="352"
        height={altura - 8}
        rx="12"
        fill="var(--cor-superficie)"
        stroke="var(--cor-borda)"
        strokeWidth="2"
      />
      <rect
        x="4"
        y="4"
        width="352"
        height="34"
        rx="12"
        fill="var(--cor-superficie-2)"
      />
      <rect x="4" y="26" width="352" height="12" fill="var(--cor-superficie-2)" />
      <circle cx="24" cy="21" r="4" fill="var(--cor-borda)" />
      <circle cx="38" cy="21" r="4" fill="var(--cor-borda)" />
      <circle cx="52" cy="21" r="4" fill="var(--cor-borda)" />
      <rect
        x="70"
        y="11"
        width="272"
        height="20"
        rx="10"
        fill="var(--cor-superficie)"
        stroke="var(--cor-borda)"
      />
      <text x="82" y="25" fontSize="11" fill="var(--cor-tinta-fraca)">
        {endereco}
      </text>
      <line
        x1="4"
        y1="38"
        x2="356"
        y2="38"
        stroke="var(--cor-borda)"
        strokeWidth="2"
      />
      {children}
    </>
  );
}

/** Linha de menu, do jeito que aparece nas configurações. */
export function Linha({
  y,
  texto,
  detalhe,
  destaque = false,
  seta = false,
}: {
  y: number;
  texto: string;
  detalhe?: string;
  destaque?: boolean;
  seta?: boolean;
}) {
  return (
    <>
      {destaque && (
        <rect
          x="20"
          y={y - 20}
          width="320"
          height={detalhe ? 46 : 38}
          rx="10"
          fill="var(--cor-acento-suave)"
          stroke="var(--cor-acento)"
          strokeWidth="2"
        />
      )}
      <text
        x="34"
        y={y}
        fontSize="14"
        fontWeight={destaque ? 700 : 400}
        fill={destaque ? "var(--cor-acento)" : "var(--cor-tinta)"}
      >
        {texto}
      </text>
      {detalhe && (
        <text x="34" y={y + 16} fontSize="12" fill="var(--cor-tinta-fraca)">
          {detalhe}
        </text>
      )}
      {seta && (
        <path
          d={`M324 ${y - 9} l6 6 -6 6`}
          fill="none"
          stroke="var(--cor-tinta-fraca)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </>
  );
}

/** Chavinha de ligar/desligar. */
export function Chave({
  x,
  y,
  ligada,
}: {
  x: number;
  y: number;
  ligada: boolean;
}) {
  return (
    <>
      <rect
        x={x}
        y={y}
        width="40"
        height="23"
        rx="11.5"
        fill={ligada ? "var(--cor-acento)" : "var(--cor-borda)"}
      />
      <circle cx={ligada ? x + 28 : x + 12} cy={y + 11.5} r="9" fill="#fff" />
    </>
  );
}

/** Bolinha de opção marcada/desmarcada. */
export function Opcao({
  x,
  y,
  marcada,
}: {
  x: number;
  y: number;
  marcada: boolean;
}) {
  return (
    <>
      <circle
        cx={x}
        cy={y}
        r="9"
        fill="none"
        stroke={marcada ? "var(--cor-acento)" : "var(--cor-tinta-fraca)"}
        strokeWidth="2"
      />
      {marcada && <circle cx={x} cy={y} r="4.5" fill="var(--cor-acento)" />}
    </>
  );
}

/** Cabeçalho de tela, com o título da seção. */
export function Titulo({ y, texto }: { y: number; texto: string }) {
  return (
    <text x="20" y={y} fontSize="16" fontWeight="700" fill="var(--cor-tinta)">
      {texto}
    </text>
  );
}
