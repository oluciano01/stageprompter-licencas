# Primeiro Dia — versão 0.5

Site que conduz a pessoa por quatro coisas: entender o problema, se autoexcluir
no gov.br, ligar um bloqueio de apostas no celular e assumir um compromisso com
prazo.

Sem servidor, sem banco de dados, sem cadastro. Tudo o que a pessoa anota fica
no `localStorage` do navegador dela e nunca sai do aparelho.

> Este diretório é independente do resto do repositório. O `revogadas.json` da
> raiz é de outro projeto (Painel de Chaves do StagePrompter) e não é tocado por
> nada daqui.

## Rodar localmente

```bash
cd site
npm install
npm run dev      # http://localhost:3000
npm run build    # gera a pasta out/ com o site estático
npm run lint     # checagem de tipos (tsc --noEmit)
```

O `next.config.ts` usa `output: "export"`: o build produz só HTML, CSS e JS
estáticos em `out/`. Não há função de servidor nenhuma para manter.

## Publicar na Vercel

1. Importe o repositório na Vercel.
2. Em **Settings › General**, defina **Root Directory** como `site`.
3. Framework: Next.js (detectado sozinho). Não precisa de variável de ambiente.

Qualquer hospedagem de arquivos estáticos também serve — é só publicar `out/`.

## Onde mexer

| Quero mudar | Arquivo |
| --- | --- |
| Nome do projeto, domínio, chave do `localStorage` | `lib/config.ts` |
| Qualquer link externo | `lib/links.ts` |
| Marcos (7/30/90/180/365) e as cartas de cada um | `lib/marcos.ts` |
| Tradução de dinheiro em coisa concreta | `lib/equivalencias.ts` |
| Lista de gatilhos e os conselhos de cada um | `lib/gatilhos.ts` |
| Cores e tipografia | `app/globals.css` |
| Desenhos das telas dos guias | `components/ilustracoes/` |

**Rebatizar o site** é editar `lib/config.ts` (e o `name`/`short_name` em
`public/manifest.webmanifest`). Trocar `chaveArmazenamento` faz todo mundo que
já usa perder o progresso — não mexa nisso sem motivo.

**As ilustrações são desenhos, não capturas de tela**, e cada uma é um
componente isolado. Para trocar por prints reais depois, substitua um arquivo de
cada vez sem mexer nas páginas.

## Duas regras que o projeto segue

**Honestidade na própria interface.** Em nenhum lugar o site diz que o bloqueio
é impossível de burlar, que a autoexclusão alcança site ilegal ou que isto
substitui tratamento. O componente `CartaoHonestidade` existe para isso e
aparece nas páginas onde a promessa poderia ser lida como maior do que é.

**Nada de recompensa imprevisível.** Os marcos são fixos, sempre os mesmos, e
anunciados antes de a pessoa chegar neles. Aposta funciona com recompensa
aleatória; um site que quer tirar alguém disso não pode usar a mesma mecânica.
Nada de sorteio, roleta ou surpresa.

## Fora de escopo nesta versão

DNS próprio, banco de dados, login, aviso ao parceiro, lista brasileira curada,
IA, mural, adoção e a página "Apadrinhe". Tudo isso é 1.0 — e só depois de 50 a
100 pessoas usando, para saber onde elas travaram de verdade.
