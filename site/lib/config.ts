/**
 * Nome provisório do projeto. Está isolado aqui de propósito:
 * para rebatizar o site, troque estas linhas e mais nada.
 */
export const APP = {
  nome: "Primeiro Dia",
  descricao:
    "Um caminho simples para parar de apostar: autoexclusão no gov.br, bloqueio no celular e um compromisso com prazo. Nada é enviado, nada é guardado.",
  /** Chave única no localStorage. Mudar isto faz todo mundo perder o progresso. */
  chaveArmazenamento: "primeirodia:v1",
  /** Trocar quando o domínio estiver comprado. Usado só nos metadados. */
  url: "https://primeirodia.example",
} as const;
