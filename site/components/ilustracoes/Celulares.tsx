import { Celular, Ilustracao, Linha, Opcao, Titulo } from "./Moldura";

/** Android: Configurações › Rede e internet. */
export function TelaAndroidRede() {
  return (
    <Ilustracao
      titulo="Tela de Configurações do Android com a opção Rede e internet em destaque."
      legenda="Abra as Configurações e toque em Rede e internet."
      altura={240}
    >
      <Celular altura={240}>
        <Titulo y={56} texto="Configurações" />
        <Linha y={96} texto="Rede e internet" destaque seta />
        <Linha y={144} texto="Dispositivos conectados" seta />
        <Linha y={186} texto="Apps" seta />
        <Linha y={222} texto="Notificações" seta />
      </Celular>
    </Ilustracao>
  );
}

/** Android: Rede e internet › DNS privado. */
export function TelaAndroidDnsPrivado() {
  return (
    <Ilustracao
      titulo="Tela Rede e internet do Android com a opção DNS privado em destaque."
      legenda="Role até o fim e toque em DNS privado. Em alguns aparelhos ele fica dentro de Avançado."
      altura={250}
    >
      <Celular altura={250}>
        <Titulo y={56} texto="Rede e internet" />
        <Linha y={96} texto="Internet" seta />
        <Linha y={138} texto="Ponto de acesso e roteamento" seta />
        <Linha y={180} texto="Economia de dados" seta />
        <Linha y={222} texto="DNS privado" detalhe="Desativado" destaque seta />
      </Celular>
    </Ilustracao>
  );
}

/** Android: escolha do nome do host do provedor. */
export function TelaAndroidHost() {
  return (
    <Ilustracao
      titulo="Caixa DNS privado do Android com a opção Nome do host do provedor marcada e o endereço digitado."
      legenda="Marque “Nome do host do provedor de DNS privado”, cole o endereço e salve."
      altura={250}
    >
      <Celular altura={250}>
        <Titulo y={56} texto="DNS privado" />

        <Opcao x={32} y={90} marcada={false} />
        <text x="54" y="95" fontSize="14" fill="var(--cor-tinta)">
          Desativado
        </text>

        <Opcao x={32} y={126} marcada={false} />
        <text x="54" y="131" fontSize="14" fill="var(--cor-tinta)">
          Automático
        </text>

        <Opcao x={32} y={162} marcada />
        <text
          x="54"
          y="167"
          fontSize="14"
          fontWeight="700"
          fill="var(--cor-acento)"
        >
          Nome do host do provedor
        </text>

        <rect
          x="54"
          y={180}
          width="270"
          height="32"
          rx="8"
          fill="var(--cor-acento-suave)"
          stroke="var(--cor-acento)"
          strokeWidth="2"
        />
        <text
          x="66"
          y={201}
          fontSize="13"
          fontWeight="700"
          fill="var(--cor-acento)"
          fontFamily="ui-monospace, monospace"
        >
          a1b2c3.dns.nextdns.io
        </text>

        <text
          x="298"
          y={233}
          fontSize="14"
          fontWeight="700"
          fill="var(--cor-acento)"
          textAnchor="middle"
        >
          SALVAR
        </text>
      </Celular>
    </Ilustracao>
  );
}

/** iPhone: Safari em apple.nextdns.io baixando o perfil. */
export function TelaIphoneSafari() {
  return (
    <Ilustracao
      titulo="Safari no iPhone aberto em apple.nextdns.io, com o aviso perguntando se permite baixar o perfil de configuração."
      legenda="Abra apple.nextdns.io no Safari e toque em Permitir quando o aviso aparecer."
      altura={260}
    >
      <Celular altura={260}>
        <rect
          x="24"
          y={38}
          width="312"
          height="26"
          rx="13"
          fill="var(--cor-superficie-2)"
        />
        <text x="40" y={56} fontSize="12" fill="var(--cor-tinta-fraca)">
          apple.nextdns.io
        </text>

        <text x="24" y={92} fontSize="13" fill="var(--cor-tinta)">
          Cole o seu ID e toque em Download:
        </text>
        <rect
          x="24"
          y={104}
          width="200"
          height="30"
          rx="8"
          fill="var(--cor-superficie)"
          stroke="var(--cor-borda)"
          strokeWidth="2"
        />
        <text
          x="36"
          y={124}
          fontSize="13"
          fill="var(--cor-tinta)"
          fontFamily="ui-monospace, monospace"
        >
          a1b2c3
        </text>
        <rect x="232" y={104} width="104" height="30" rx="8" fill="var(--cor-acento)" />
        <text
          x="284"
          y={124}
          fontSize="13"
          fontWeight="700"
          fill="#ffffff"
          textAnchor="middle"
        >
          Download
        </text>

        {/* Aviso do iOS */}
        <rect
          x="52"
          y={156}
          width="256"
          height="86"
          rx="14"
          fill="var(--cor-superficie-2)"
          stroke="var(--cor-borda)"
          strokeWidth="2"
        />
        <text
          x="180"
          y={180}
          fontSize="13"
          fontWeight="700"
          fill="var(--cor-tinta)"
          textAnchor="middle"
        >
          Baixar perfil de configuração?
        </text>
        <line
          x1="52"
          y1={200}
          x2="308"
          y2={200}
          stroke="var(--cor-borda)"
          strokeWidth="2"
        />
        <line
          x1="180"
          y1={200}
          x2="180"
          y2={242}
          stroke="var(--cor-borda)"
          strokeWidth="2"
        />
        <text
          x="116"
          y={227}
          fontSize="14"
          fill="var(--cor-tinta-fraca)"
          textAnchor="middle"
        >
          Ignorar
        </text>
        <text
          x="244"
          y={227}
          fontSize="14"
          fontWeight="700"
          fill="var(--cor-acento)"
          textAnchor="middle"
        >
          Permitir
        </text>
      </Celular>
    </Ilustracao>
  );
}

/** iPhone: Ajustes › Perfil Baixado › Instalar. */
export function TelaIphonePerfil() {
  return (
    <Ilustracao
      titulo="Tela de Ajustes do iPhone mostrando o item Perfil Baixado logo abaixo do nome da conta."
      legenda="Vá em Ajustes. “Perfil Baixado” aparece no topo. Toque nele e depois em Instalar."
      altura={240}
    >
      <Celular altura={240}>
        <Titulo y={56} texto="Ajustes" />
        <Linha y={94} texto="Seu nome" detalhe="ID Apple, iCloud" seta />
        <Linha y={146} texto="Perfil Baixado" destaque seta />
        <Linha y={192} texto="Modo Avião" />
        <Linha y={224} texto="Wi-Fi" seta />
      </Celular>
    </Ilustracao>
  );
}
