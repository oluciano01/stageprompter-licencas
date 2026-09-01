import {
  Chave,
  Ilustracao,
  Linha,
  Navegador,
  Titulo,
} from "./Moldura";

/** Painel do NextDNS: Controle dos pais › Categorias › Apostas. */
export function TelaCategorias() {
  return (
    <Ilustracao
      titulo="Painel do NextDNS na aba Controle dos pais, com a categoria Apostas ligada."
      legenda="Na aba Controle dos pais, role até Categorias e ligue Apostas."
      altura={260}
    >
      <Navegador altura={260} endereco="my.nextdns.io">
        {/* Abas do painel */}
        <text x="20" y="60" fontSize="12" fill="var(--cor-tinta-fraca)">
          Configuração
        </text>
        <text x="106" y="60" fontSize="12" fill="var(--cor-tinta-fraca)">
          Segurança
        </text>
        <text
          x="176"
          y="60"
          fontSize="12"
          fontWeight="700"
          fill="var(--cor-acento)"
        >
          Controle dos pais
        </text>
        <line
          x1="176"
          y1="66"
          x2="284"
          y2="66"
          stroke="var(--cor-acento)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <Titulo y={96} texto="Categorias" />

        <Linha y={130} texto="Pornografia" />
        <Chave x={296} y={118} ligada={false} />

        <Linha y={172} texto="Apostas" detalhe="Gambling" destaque />
        <Chave x={296} y={160} ligada />

        <Linha y={214} texto="Redes sociais" />
        <Chave x={296} y={202} ligada={false} />
      </Navegador>
    </Ilustracao>
  );
}

/** Painel do NextDNS: aba Lista de bloqueio, com bet.br sendo adicionado. */
export function TelaDenylist() {
  return (
    <Ilustracao
      titulo="Painel do NextDNS na aba Denylist, com o domínio bet.br sendo adicionado à lista."
      legenda="Na aba Denylist, digite bet.br e clique em adicionar."
      altura={230}
    >
      <Navegador altura={230} endereco="my.nextdns.io">
        <text x="20" y="60" fontSize="12" fill="var(--cor-tinta-fraca)">
          Analytics
        </text>
        <text x="82" y="60" fontSize="12" fill="var(--cor-tinta-fraca)">
          Allowlist
        </text>
        <text
          x="146"
          y="60"
          fontSize="12"
          fontWeight="700"
          fill="var(--cor-acento)"
        >
          Denylist
        </text>
        <line
          x1="146"
          y1="66"
          x2="196"
          y2="66"
          stroke="var(--cor-acento)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <Titulo y={96} texto="Lista de bloqueio" />

        {/* Campo de digitação com o domínio */}
        <rect
          x="20"
          y={110}
          width="230"
          height="34"
          rx="8"
          fill="var(--cor-superficie)"
          stroke="var(--cor-acento)"
          strokeWidth="2"
        />
        <text
          x="32"
          y={132}
          fontSize="14"
          fontWeight="700"
          fill="var(--cor-tinta)"
        >
          bet.br
        </text>
        <rect x="258" y={110} width="82" height="34" rx="8" fill="var(--cor-acento)" />
        <text
          x="299"
          y={132}
          fontSize="13"
          fontWeight="700"
          fill="#ffffff"
          textAnchor="middle"
        >
          Adicionar
        </text>

        <text x="20" y={172} fontSize="12" fill="var(--cor-tinta-fraca)">
          Bloqueia bet.br e tudo que vem antes do ponto:
        </text>
        <text x="20" y={192} fontSize="12" fill="var(--cor-tinta-fraca)">
          qualquercasa.bet.br, outra.bet.br, todas.
        </text>
      </Navegador>
    </Ilustracao>
  );
}

/** Painel do NextDNS: aba Configuração, com o endereço pessoal. */
export function TelaEndereco() {
  return (
    <Ilustracao
      titulo="Painel do NextDNS na aba Configuração, mostrando o endereço pessoal terminado em dns.nextdns.io."
      legenda="Na aba Configuração, copie o endereço que termina em .dns.nextdns.io."
      altura={200}
    >
      <Navegador altura={200} endereco="my.nextdns.io">
        <text
          x="20"
          y="60"
          fontSize="12"
          fontWeight="700"
          fill="var(--cor-acento)"
        >
          Configuração
        </text>
        <line
          x1="20"
          y1="66"
          x2="88"
          y2="66"
          stroke="var(--cor-acento)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <Titulo y={96} texto="DNS-over-TLS / DNS-over-QUIC" />

        <rect
          x="20"
          y={112}
          width="320"
          height="40"
          rx="8"
          fill="var(--cor-acento-suave)"
          stroke="var(--cor-acento)"
          strokeWidth="2"
        />
        <text
          x="34"
          y={137}
          fontSize="14"
          fontWeight="700"
          fill="var(--cor-acento)"
          fontFamily="ui-monospace, monospace"
        >
          a1b2c3.dns.nextdns.io
        </text>

        <text x="20" y={176} fontSize="12" fill="var(--cor-tinta-fraca)">
          As seis letras do começo são só suas. Copie tudo.
        </text>
      </Navegador>
    </Ilustracao>
  );
}
