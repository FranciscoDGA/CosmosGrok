# CosmosGrok

> O universo é estranho. Vamos entendê-lo juntos.

App de exploração do conhecimento que combina IA, ciência, espaço e pensamento crítico.
Bilíngue (PT-BR + EN), responsivo, com dark mode nativo e estrutura pronta para conectar
qualquer LLM.

![Next.js](https://img.shields.io/badge/Next.js-16-black) ![React](https://img.shields.io/badge/React-19-black) ![Tailwind](https://img.shields.io/badge/Tailwind-4-black)

## O que tem aqui

| Rota             | O que é                                                              |
| ---------------- | -------------------------------------------------------------------- |
| `/`              | Home: hero com chat em destaque, pergunta/fato do dia, feed de cards  |
| `/chat`          | Chat com IA — histórico salvo, 3 camadas de profundidade, sugestões   |
| `/explorar`      | Feed de temas por categoria (espaço, ciência, IA, filosofia, mente)   |
| `/leitura/[slug]`| Modo foco: artigo com barra de progresso e “perguntar sobre este texto” |
| `/mapa`          | Mapa do conhecimento em constelação (estrelas por tema explorado)     |
| `/perfil`        | Streak de curiosidade, estatísticas e 9 conquistas                    |
| `/config`        | Tema, idioma, profundidade padrão e dados locais                      |
| `/onboarding`    | 4 telas leves (abre automaticamente na primeira visita)               |
| `/api/chat`      | Endpoint de chat (motor local ou LLM real, conforme env vars)         |

## Rodar local

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run lint     # eslint
npx tsc --noEmit # typecheck
```

## Conectar uma LLM (opcional)

Sem configuração, o chat usa o motor local (respostas curadas por tema, bilíngues, com as
3 profundidades). Para usar um modelo real, defina no `.env.local` (ou no dashboard da Vercel):

```bash
COSMOS_LLM_URL=https://api.openai.com/v1/chat/completions
COSMOS_LLM_KEY=sk-...
COSMOS_LLM_MODEL=gpt-4o-mini
```

A chamada segue o formato Chat Completions (compatível com OpenAI, OpenRouter, Groq,
Together e proxies equivalentes). Se a chamada falhar, o app cai no motor local
automaticamente — o usuário nunca fica sem resposta.

Arquivos relevantes:

- `src/lib/chat/engine.ts` — persona, profundidades e integração com LLM
- `src/app/api/chat/route.ts` — validação e resposta

## Design system

- Fundo `#0B0F19` · destaque `#7C5CFF` · secundário `#00D4FF` · texto `#F0F4FF`
- Tokens semânticos em `src/app/globals.css` (`[data-theme="dark|light"]`)
- Tipografia: **Inter** (UI) + **Space Grotesk** (títulos), via `next/font`
- Partículas sutis em `src/components/particle-field.tsx` (canvas, respeita
  `prefers-reduced-motion`)

## Estado e dados

Tudo fica no `localStorage` do dispositivo (nada de servidor):

- `cosmosgrok:settings` — tema, idioma, profundidade
- `cosmosgrok:conversations` — histórico de chat (últimas 40)
- `cosmosgrok:progress` — temas explorados, streak, leituras, conquistas
- `cosmosgrok:profile` — nome do explorador

Conteúdo e i18n ficam em `src/lib/data/topics.ts` e `src/lib/i18n/index.ts`.

## Deploy na Vercel

```bash
# 1. push para o GitHub
git push -u origin main

# 2. deploy (CLI autenticado)
vercel --prod
```

Ou importe o repositório em <https://vercel.com/new> — nenhuma variável de ambiente é
obrigatória; adicione `COSMOS_LLM_*` só se quiser LLM real.

## Estrutura

```
src/
  app/            # rotas (App Router, Next 16)
  components/     # shell, chat, cards, partículas, providers
  lib/
    i18n/         # dicionário PT-BR/EN
    data/         # temas/artigos bilíngues
    chat/         # motor de respostas
    gamification.ts, storage.ts, types.ts
```
