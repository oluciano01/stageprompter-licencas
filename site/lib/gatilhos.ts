/**
 * Os gatilhos que a pessoa escolhe quando a vontade aperta ou quando
 * registra uma recaída. A lista é curta de propósito: escolher entre cinco
 * coisas é possível com a cabeça quente, escolher entre vinte não é.
 */
export const GATILHOS = [
  { id: "briga", rotulo: "Briga ou discussão" },
  { id: "tedio", rotulo: "Tédio, tempo vazio" },
  { id: "cobranca", rotulo: "Cobrança, conta chegando" },
  { id: "pagamento", rotulo: "Dia de pagamento" },
  { id: "notificacao", rotulo: "Notificação, anúncio, propaganda" },
  { id: "jogo", rotulo: "Jogo passando, resultado, palpite de amigo" },
  { id: "bebida", rotulo: "Bebida" },
  { id: "sozinho", rotulo: "Sozinho, de madrugada" },
  { id: "outro", rotulo: "Outra coisa" },
] as const;

export type IdGatilho = (typeof GATILHOS)[number]["id"];

export function nomeDoGatilho(id: string | null): string {
  if (!id) return "não anotado";
  return GATILHOS.find((g) => g.id === id)?.rotulo ?? "não anotado";
}

/** Uma frase curta e concreta para cada gatilho, mostrada no fim do episódio. */
export const CONSELHO_POR_GATILHO: Record<string, string> = {
  briga:
    "Brigar dói e apostar promete anestesiar. Antes da próxima briga virar aposta, combine com você mesmo: primeiro sair de casa e andar dez minutos.",
  tedio:
    "Tédio é o gatilho mais fácil de desarmar, porque ele avisa antes. Deixe decidido de véspera o que fazer nas horas mortas — não decida na hora.",
  cobranca:
    "Aposta nunca pagou conta: é justamente ela que aumenta a conta. Se a dívida está apertando, Procon e Defensoria renegociam de graça.",
  pagamento:
    "Dia de pagamento é o dia mais perigoso do mês. Deixe combinado com você: no dia em que o dinheiro cai, ele sai da conta para as contas, na mesma hora.",
  notificacao:
    "Isso é publicidade fazendo o trabalho dela. Depois da autoexclusão a propaganda diminui muito — e a página Limpar o feed ajuda no resto.",
  jogo: "Assistir jogo e apostar viraram a mesma coisa na sua cabeça porque a propaganda quis assim. Dá para separar os dois de novo, mas leva tempo.",
  bebida:
    "Bebida derruba as barreiras que você acabou de montar. Enquanto estiver difícil, tente não ter as duas coisas juntas na mesma noite.",
  sozinho:
    "Madrugada sozinho é quando a vontade grita mais alto. Combine com alguém que você pode mandar mensagem a qualquer hora — e mande.",
  outro:
    "Você acabou de atravessar. Se conseguir escrever num papel o que estava acontecendo, da próxima vez você reconhece antes.",
};
