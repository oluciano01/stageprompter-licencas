/**
 * Marcos fixos, sempre os mesmos, sempre anunciados antes de chegar.
 *
 * Isso é de propósito: aposta funciona com recompensa imprevisível — você
 * nunca sabe se vem e quanto vem, e é exatamente esse "não saber" que
 * prende. Um site que quer tirar alguém disso não pode usar a mesma
 * mecânica. Nada de sorteio, nada de surpresa, nada de roleta. A pessoa sabe
 * desde o primeiro dia o que vem aos 7, aos 30 e aos 365.
 */
export type Marco = {
  dias: number;
  nome: string;
  /** Mostrado antes de a pessoa chegar lá. */
  promessa: string;
  /** A carta que aparece quando ela chega. */
  carta: string;
};

export const MARCOS: Marco[] = [
  {
    dias: 7,
    nome: "Uma semana",
    promessa: "Uma carta sobre o que costuma acontecer na primeira semana.",
    carta:
      "Sete dias. A primeira semana é a mais barulhenta: é nela que a vontade aparece mais vezes, mais forte e sem aviso. Você atravessou a semana em que quase todo mundo desiste. Repare numa coisa esta semana: o que você fez com as horas que antes iam para o aplicativo. É esse buraco que precisa de um plano — não a força de vontade, o plano.",
  },
  {
    dias: 30,
    nome: "Um mês",
    promessa:
      "Uma carta sobre o mês fechado e o primeiro balanço do que você preservou.",
    carta:
      "Um mês. Você já passou por um dia de pagamento, por um fim de semana de jogo grande e por pelo menos uma noite ruim — e continuou. Muita gente conta que é por volta daqui que o sono melhora e que a cabeça fica menos ocupada com número, palpite e resultado. Se ainda não aconteceu com você, não quer dizer nada de errado: cada corpo tem o seu tempo. Aproveite este mês para conferir se o bloqueio continua ligado no celular.",
  },
  {
    dias: 90,
    nome: "Três meses",
    promessa: "Uma carta sobre o que muda quando a rotina deixa de ser luta.",
    carta:
      "Noventa dias. Três meses é quando muita gente para de contar os dias e passa a viver os dias. Se você chegou até aqui, a aposta deixou de ser o centro da sua semana. Vale olhar para trás sem susto: os gatilhos que você anotou aqui dizem muito sobre o que ainda precisa de cuidado. E vale olhar para frente — este é um bom momento para procurar um grupo, se você ainda não procurou. O que segura no longo prazo quase nunca é só barreira: é gente.",
  },
  {
    dias: 180,
    nome: "Seis meses",
    promessa: "Uma carta sobre dinheiro, dívida e o que fazer com o que sobrou.",
    carta:
      "Seis meses. Metade de um ano. A esta altura o valor que você preservou já não é simbólico — dá para pagar coisa de verdade. Se sobrou dívida da época das apostas, este é o momento de encarar: Procon e Defensoria renegociam de graça, e negociar com seis meses de chão embaixo do pé é bem diferente de negociar no meio do desespero. Se a sua autoexclusão tinha prazo, confira quando ela vence e renove antes.",
  },
  {
    dias: 365,
    nome: "Um ano",
    promessa: "Uma carta de um ano e o balanço inteiro do que você preservou.",
    carta:
      "Um ano. Trezentos e sessenta e cinco dias em que a vontade veio, você reconheceu e ela passou. Você provavelmente não é mais a mesma pessoa que abriu este site — e o mais importante é que isso não foi sorte, foi construído: uma barreira de cada vez, um dia de cada vez. Continue com o bloqueio ligado. Guarde este site no celular. E se em algum momento você se sentir seguro demais, lembre que essa sensação também é um gatilho.",
  },
];

export function proximoMarco(dias: number): Marco | null {
  return MARCOS.find((m) => m.dias > dias) ?? null;
}

export function marcosAlcancados(dias: number): Marco[] {
  return MARCOS.filter((m) => m.dias <= dias);
}

/** O último marco alcançado — é a carta que o painel mostra. */
export function marcoAtual(dias: number): Marco | null {
  const alcancados = marcosAlcancados(dias);
  return alcancados.length ? alcancados[alcancados.length - 1] : null;
}
