/**
 * Traduz dinheiro em coisa concreta. "R$ 1.847" não diz nada; "o aluguel de
 * um mês" diz. Os preços são aproximados e variam muito pelo país — o site
 * avisa isso em voz alta, nunca finge precisão que não tem.
 */
type Item = {
  preco: number;
  singular: string;
  plural: string;
};

const ITENS: Item[] = [
  { preco: 60, singular: "um mês de streaming", plural: "meses de streaming" },
  { preco: 120, singular: "um botijão de gás", plural: "botijões de gás" },
  { preco: 250, singular: "uma conta de luz", plural: "contas de luz" },
  {
    preco: 500,
    singular: "o material escolar de uma criança",
    plural: "kits de material escolar",
  },
  { preco: 800, singular: "uma cesta básica do mês", plural: "cestas básicas" },
  { preco: 1500, singular: "um mês de aluguel", plural: "meses de aluguel" },
  { preco: 3000, singular: "uma geladeira nova", plural: "geladeiras novas" },
  { preco: 6000, singular: "um celular e um computador novos", plural: "vezes um celular e um computador novos" },
  { preco: 12000, singular: "uma moto usada", plural: "motos usadas" },
  { preco: 30000, singular: "a entrada de um carro", plural: "entradas de carro" },
];

/**
 * Devolve a maior coisa que cabe no valor, com a quantidade.
 * Abaixo de R$ 60 não tenta traduzir: comparação forçada soa falsa.
 */
export function equivalencia(valor: number): string | null {
  const item = [...ITENS].reverse().find((i) => valor >= i.preco);
  if (!item) return null;

  const quantidade = Math.floor(valor / item.preco);
  if (quantidade === 1) return item.singular;
  return `${quantidade.toLocaleString("pt-BR")} ${item.plural}`;
}
