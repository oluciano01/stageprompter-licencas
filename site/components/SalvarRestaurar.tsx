"use client";

import { useRef, useState } from "react";
import { useEstado, validar } from "@/lib/estado";

type Recado = { tipo: "ok" | "erro"; texto: string } | null;

/**
 * O preço de não ter cadastro é este: se a pessoa limpar o navegador, o
 * progresso vai junto. O arquivo de backup é a saída honesta — e continua
 * sem servidor nenhum no meio.
 */
export function SalvarRestaurar({
  /** No painel vazio não há nada a salvar — só faz sentido oferecer restaurar. */
  somenteRestaurar = false,
}: {
  somenteRestaurar?: boolean;
} = {}) {
  const { estado, pronto, restaurar } = useEstado();
  const entrada = useRef<HTMLInputElement>(null);
  const [recado, setRecado] = useState<Recado>(null);

  function salvar() {
    if (!estado) return;
    const conteudo = JSON.stringify(estado, null, 2);
    const url = URL.createObjectURL(
      new Blob([conteudo], { type: "application/json" }),
    );
    const hoje = new Date().toISOString().slice(0, 10);
    const link = document.createElement("a");
    link.href = url;
    link.download = `primeiro-dia-${hoje}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setRecado({
      tipo: "ok",
      texto:
        "Arquivo baixado. Guarde no e-mail ou na nuvem — é o seu progresso inteiro.",
    });
  }

  async function aoEscolherArquivo(evento: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = evento.target.files?.[0];
    if (!arquivo) return;
    try {
      const texto = await arquivo.text();
      const recuperado = validar(JSON.parse(texto));
      if (!recuperado) {
        setRecado({
          tipo: "erro",
          texto:
            "Não consegui ler este arquivo. Ele precisa ser o .json que este site baixou.",
        });
        return;
      }
      restaurar(recuperado);
      setRecado({ tipo: "ok", texto: "Pronto, seu progresso voltou." });
    } catch {
      setRecado({
        tipo: "erro",
        texto:
          "Não consegui ler este arquivo. Ele precisa ser o .json que este site baixou.",
      });
    } finally {
      // Permite escolher o mesmo arquivo de novo se der errado na primeira.
      evento.target.value = "";
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {!somenteRestaurar && (
          <button
            type="button"
            onClick={salvar}
            disabled={!pronto}
            className="rounded-xl border border-borda bg-superficie px-4 py-2.5 font-semibold text-tinta disabled:opacity-50"
          >
            Salvar meu progresso
          </button>
        )}
        <button
          type="button"
          onClick={() => entrada.current?.click()}
          className="rounded-xl border border-borda bg-superficie px-4 py-2.5 font-semibold text-tinta"
        >
          Restaurar de um arquivo
        </button>
        <input
          ref={entrada}
          type="file"
          accept="application/json,.json"
          onChange={aoEscolherArquivo}
          className="hidden"
          aria-label="Escolher o arquivo de progresso para restaurar"
        />
      </div>

      {recado && (
        <p
          role="status"
          className={`mt-3 text-[15px] ${
            recado.tipo === "erro" ? "text-aviso" : "text-acento"
          }`}
        >
          {recado.texto}
        </p>
      )}
    </div>
  );
}
